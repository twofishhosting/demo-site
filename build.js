#!/usr/bin/env node
/*
 * Two Fish — build this musician's site.
 * Reads the files in /content, writes the finished website to /public.
 * Cloudflare Pages runs this automatically every time the musician saves in the editor.
 *   Build command: node build.js      Output folder: public
 */
"use strict";
const fs = require("fs");
const path = require("path");
const kit = require("./kit/kit.js");
const epkKit = require("./kit/epk.js");

const read = (f, fallback) => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, "content", f), "utf8")); } catch (e) { if (fallback !== undefined) return fallback; throw new Error("Could not read content/" + f + ": " + e.message); } };
const P = read("profile.json");
/* content/layout.json names a template, for example {"template": "frontporch", "domain": "...", "timezone": "..."}.
   The template's design comes from templates/<name>.json; anything else in layout.json overrides it. */
const L = (() => {
  const own = read("layout.json");
  if (!own.template) return own; // an older, full layout file still works
  const name = String(own.template).trim().toLowerCase();
  const file = path.join(__dirname, "templates", name + ".json");
  if (!fs.existsSync(file)) throw new Error('content/layout.json asks for the template "' + own.template + '", but there is no templates/' + name + '.json. Check the spelling against templates/README.md.');
  const base = JSON.parse(fs.readFileSync(file, "utf8"));
  delete base._note;
  return Object.assign({}, base, own);
})();
const dates = read("dates.json", []), videos = read("videos.json", []), interviews = read("interviews.json", []);
const album = read("album.json", null), merch = read("merch.json", []), resources = read("church-resources.json", []), links = read("links.json", {});
/* files added with kit 1.4 (the 21 templates); each one is optional */
const collections = read("collections.json", []), booking = read("booking.json", {}), press = read("press.json", {}), songlist = read("songlist.json", {});
const packages = read("packages.json", []), devotions = read("devotions.json", []), giving = read("giving.json", {}), hosting = read("hosting.json", {});
const T = L.titles || {};
const tz = L.timezone || "America/New_York";
const clean = (v) => (typeof v === "string" ? v.trim() : v);
const has = (v) => typeof v === "string" ? v.trim() !== "" : v != null;

/* "https://youtu.be/abc", "watch?v=abc", "/shorts/abc" or a bare ID → "abc" */
function youtubeId(u) {
  u = clean(u) || "";
  const m = /(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/.exec(u);
  return m ? m[1] : (/^[\w-]{11}$/.test(u) ? u : "");
}
/* local date-time + time zone → ISO 8601 with offset, e.g. 2026-11-14T19:00:00-05:00 */
function withOffset(local) {
  const m = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(clean(local) || "");
  if (!m) return null;
  const t = m[2] || "00:00";
  const guess = new Date(m[1] + "T" + t + ":00Z");
  const name = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName").value;
  const off = name === "GMT" ? "+00:00" : name.replace("GMT", "");
  return m[1] + "T" + t + ":00" + off;
}
const today = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

/* ---------- turn the musician's files into a kit recipe ---------- */
const events = dates
  .filter((e) => has(e.when) && has(e.venue) && String(e.when).slice(0, 10) >= today) // past dates hide themselves
  .sort((a, b) => String(a.when).localeCompare(String(b.when)))
  .map((e) => ({ start: withOffset(e.when), venue: clean(e.venue), city: clean(e.city) || "", region: clean(e.state) || "", note: clean(e.details) || "",
                 url: clean(e.link) || "#contact", price: String(Number(e.price) || 0), kind: e.type === "church" ? "church" : "venue", tag: clean(e.tag) || "" }));

const vids = videos.map((v) => ({ id: youtubeId(v.youtube_link), title: clean(v.title) || "Video" })).filter((v) => v.id);

const ints = interviews.filter((i) => has(i.title)).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
let podcast = null;
if (ints.length) {
  const f = ints[0], yt = youtubeId(f.youtube_link);
  podcast = { show: clean(f.show) || "", episode: "", title: clean(f.title), date: clean(f.date) || "", minutes: Number(f.minutes) || 0, host: "",
              eyebrow: clean(T.podcast_eyebrow) || "", heading: clean(T.podcast_heading) || "", badge: clean(T.podcast_badge) || "",
              summary: clean(f.summary) || "", type: yt ? "youtube" : "link", id: yt, src: "", url: clean(f.link) || "", links: {},
              more: ints.slice(1).map((i) => ({ title: clean(i.title), show: clean(i.show) || "", date: clean(i.date) || "", url: clean(i.link) || (youtubeId(i.youtube_link) ? "https://www.youtube.com/watch?v=" + youtubeId(i.youtube_link) : "#interviews") })) };
  if (has(f.link) && yt) podcast.links[/spotify/.test(f.link) ? "Spotify" : /apple/.test(f.link) ? "Apple Podcasts" : "Episode page"] = clean(f.link);
}

const track = (s, fallbackBuy) => ({ title: clean(s.title), length: clean(s.length) || "", ref: clean(s.scripture) || "", story: clean(s.story) || "", file: clean(s.audio), free: !!s.free_download, buy: clean(s.buy_link) || clean(fallbackBuy) || "" });
const list = (v) => Array.isArray(v) ? v.map(clean).filter(has) : String(v || "").split(/\n|,/).map((x) => x.trim()).filter(Boolean);
const sets = (Array.isArray(collections) ? collections : []).filter((c) => has(c.title)).map((c) => ({ label: clean(c.label) || clean(c.title), title: clean(c.title), released: clean(c.released) || "", note: clean(c.note) || "",
  cover: c.cover || "", bandcampUrl: clean(c.bandcamp_link) || "", tracks: (c.songs || []).filter((s) => has(s.title) && has(s.audio)).map((s) => track(s, c.bandcamp_link)) })).filter((c) => c.tracks.length);
/* booking options: "church" and "venue" keep their names (the church/venue designs need them); anything else gets a name from its label */
const audiences = {};
(Array.isArray(booking.options) ? booking.options : []).filter((o) => has(o.label)).slice(0, 2).forEach((o, i) => {
  let key = o.type === "church" || o.type === "venue" ? o.type : String(o.label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "option" + (i + 1);
  if (audiences[key]) key += "-" + (i + 1);
  audiences[key] = { label: clean(o.label), title: clean(o.title) || clean(o.label), blurb: clean(o.blurb) || "", offers: list(o.offers), button: clean(o.button) || "Get in touch",
    listen: clean(o.listen_label) || "", photo: o.photo || "", subject: o.type === "church" || o.type === "venue" ? "" : clean(o.label) + " booking" };
});
const songs = album && Array.isArray(album.songs) ? album.songs.filter((s) => has(s.title) && has(s.audio)) : [];
const pick = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => has(v)).map(([k, v]) => [k, clean(v)]));
const streams = pick({ Spotify: links.spotify, "Apple Music": links.apple_music, "YouTube Music": links.youtube_music, Bandcamp: links.bandcamp });
const social = pick({ Instagram: links.instagram, Facebook: links.facebook, YouTube: links.youtube, TikTok: links.tiktok, Spotify: links.spotify });

/* press kit page (/epk/): the design comes from the template, or "epk" in content/layout.json ("none" turns it off) */
const epkDesign = (() => { const v = String(L.epk || "onesheet").trim().toLowerCase(); return v === "none" || v === "off" ? "" : v; })();
if (epkDesign && !epkKit.designs.some((x) => x.id === epkDesign)) throw new Error('content/layout.json asks for the press kit design "' + L.epk + '". Use one of: ' + epkKit.designs.map((x) => x.id).join(", ") + ', or "none".');
const objs = (v) => (Array.isArray(v) ? v : []);
const monthYear = new Intl.DateTimeFormat("en-US", { timeZone: tz, month: "long", year: "numeric" }).format(new Date());
const epkData = {
  isGroup: !!press.is_group, genre: clean(press.genre) || "", act: clean(press.lineup_type) || "", updated: monthYear,
  shortBio: clean(press.short_bio) || "",
  facts: objs(press.facts).filter((f) => has(f.number) && has(f.label)).map((f) => ({ n: String(f.number).trim(), l: clean(f.label) })),
  highlights: objs(press.highlights).filter((h) => has(h.text)).map((h) => ({ year: String(h.year || "").trim(), text: clean(h.text) })),
  lineup: clean(press.lineup) || "", setLength: clean(press.set_length) || "", techNote: clean(press.booking_note) || "",
  tech: objs(press.booking_files).filter((f) => has(f.label) && has(f.file)).map((f) => ({ label: clean(f.label), url: clean(f.file) })),
  photos: objs(press.press_photos).filter((p) => has(p.photo)).map((p) => ({ src: clean(p.photo), caption: clean(p.caption) || "", credit: clean(p.credit) || "" })),
  coverage: objs(press.coverage).filter((c) => has(c.title)).map((c) => ({ title: clean(c.title), outlet: clean(c.outlet) || "", date: clean(c.date) || "", url: clean(c.link) || "" }))
    .concat(ints.map((i) => ({ title: clean(i.title), outlet: clean(i.show) || "", date: clean(i.date) || "", url: clean(i.link) || (youtubeId(i.youtube_link) ? "https://www.youtube.com/watch?v=" + youtubeId(i.youtube_link) : "") })))
    .sort((a, b) => String(b.date).localeCompare(String(a.date))),
  contacts: objs(press.contacts).filter((c) => has(c.email) || has(c.phone)).map((c) => ({ role: clean(c.role) || "Contact", name: clean(c.name) || "", email: clean(c.email) || "", phone: clean(c.phone) || "" })),
  onePager: clean(press.one_sheet) || "", site: "/"
};

const recipe = {
  style: L.style, domain: L.domain, genre: L.genre,
  name: clean(P.name), headline: clean(P.headline), intro: clean(P.intro) || "", city: clean(P.hometown) || "",
  shareImage: P.main_photo || "",
  verse: { text: clean(P.verse) || "", ref: clean(P.verse_ref) || "" },
  photos: { hero: P.main_photo, wide: P.main_photo, portrait: P.portrait_photo || P.main_photo, story: P.about_photo || P.portrait_photo, album: (album && album.cover) || P.portrait_photo },
  story: { paragraphs: String(P.story || "").split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean), quote: clean(P.quote) || "", quoteSource: clean(P.quote_by) || "",
    timeline: (P.timeline || []).filter((t) => has(t.year) && has(t.text)).map((t) => ({ year: String(t.year).trim(), text: clean(t.text) })) },
  album: album ? { title: clean(album.title), released: clean(album.released) || "", note: clean(album.note) || "", bandcampUrl: clean(album.bandcamp_link) || "", bandcampAlbumId: String(album.bandcamp_album_id || "").replace(/\D/g, ""),
    tracks: songs.map((s) => track(s, album.bandcamp_link)) } : undefined,
  sets, audiences: Object.keys(audiences).length ? audiences : undefined,
  bookLabel: clean(L.book_label) || "", dateKinds: L.date_kinds || undefined,
  press: { fansOf: clean(press.fans_of) || "", photos: clean(press.photos_link) || "", quotes: (press.quotes || []).filter((q) => has(q.quote)).map((q) => ({ q: clean(q.quote), src: clean(q.source) || "" })) },
  repertoire: { eyebrow: clean(T.songlist_eyebrow) || "", heading: clean(T.songlist_heading) || clean(songlist.heading) || "", unit: clean(T.songlist_unit) || "", note: clean(songlist.note) || "",
    groups: (songlist.groups || []).filter((g) => has(g.name)).map((g) => ({ name: clean(g.name), songs: (g.songs || []).filter((s) => has(s.title)).map((s) => [clean(s.title), clean(s.artist) || ""]) })).filter((g) => g.songs.length) },
  packages: (Array.isArray(packages) ? packages : []).filter((k) => has(k.name)).map((k) => ({ name: clean(k.name), desc: clean(k.description) || "", includes: list(k.includes) })),
  devotions: (Array.isArray(devotions) ? devotions : []).filter((x) => has(x.verse)).map((x) => ({ song: clean(x.song) || "", ref: clean(x.reference) || "", verse: clean(x.verse), text: clean(x.reflection) || "" })),
  devEyebrow: clean(T.devotions_eyebrow) || "", devHeading: clean(T.devotions_heading) || "",
  resHeading: clean(T.resources_heading) || "", resNote: clean(T.resources_note) || "",
  give: { heading: clean(giving.heading) || "", text: clean(giving.text) || "", button: clean(giving.button) || "", url: clean(giving.link) || "", fine: clean(giving.fine_print) || "" },
  hosting: { heading: clean(hosting.heading) || "", button: clean(hosting.button) || "", needsHeading: clean(hosting.needs_heading) || "", needs: list(hosting.needs),
    steps: (hosting.steps || []).filter((s) => has(s.title)).map((s) => ({ title: clean(s.title), text: clean(s.text) || "" })) },
  streams, social,
  events, videos: vids,
  podcast: podcast || undefined,
  merch: merch.filter((m) => has(m.name) && has(m.link)).map((m) => ({ name: clean(m.name), price: clean(m.price) || "", desc: clean(m.description) || "", url: clean(m.link), photo: m.photo || P.portrait_photo })),
  resources: resources.filter((r) => has(r.song)).map((r) => ({ song: clean(r.song), key: clean(r.key) || "", tempo: String(r.tempo || ""), ccli: clean(r.ccli) || "", chart: clean(r.chord_chart) || "", lead: clean(r.lead_sheet) || "",
    chartLabel: clean(r.chart_label) || "", video: clean(r.video_link) || "", videoLabel: clean(r.video_label) || "" })),
  contact: { booking: clean(links.booking_email) || "", email: clean(links.email) || "", presskit: clean(links.press_kit) || (epkDesign ? "/epk/" : ""), newsletterAction: clean(L.newsletter_form_action) || "", prayerAction: clean(L.prayer_form_action) || "",
    bookingNote: clean(booking.note) || "", packagesNote: clean(booking.packages_note) || "" }
};
if (!recipe.story.paragraphs.length) recipe.story.paragraphs = [""];

/* drop a section when its content is empty, so the page never shows a blank block (dates stay: they show "check back soon") */
const usesSetsDesign = (L.sections || []).some((s) => s.k === "music" && ["sets", "records", "playlist"].includes(s.v));
const empty = { music: usesSetsDesign ? !sets.length : (!recipe.album || !recipe.album.tracks.length), videos: !vids.length, podcast: !podcast, merch: !recipe.merch.length, resources: !recipe.resources.length, prayer: !recipe.contact.prayerAction,
  paths: !(audiences.church && audiences.venue), press: !recipe.press.quotes.length, repertoire: !recipe.repertoire.groups.length, devotions: !recipe.devotions.length,
  give: !recipe.give.url, links: !Object.keys(streams).length };
const bookingEmpty = (v) => v === "packages" ? !recipe.packages.length : v === "steps" ? !recipe.hosting.steps.length : !Object.keys(audiences).length;
const isEmpty = (s) => s.k === "booking" ? bookingEmpty(s.v) : !!empty[s.k];
recipe.sections = (L.sections || []).filter((s) => !isEmpty(s));
const dropped = (L.sections || []).filter(isEmpty).map((s) => s.k);

/* ---------- write /public ---------- */
const out = path.join(__dirname, "public");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "index.html"), kit.assemble(recipe));
if (epkDesign) {
  fs.mkdirSync(path.join(out, "epk"), { recursive: true });
  fs.writeFileSync(path.join(out, "epk", "index.html"), epkKit.render(Object.assign({}, recipe, { genre: undefined, epk: epkData }), epkDesign));
}
fs.cpSync(path.join(__dirname, "media"), path.join(out, "media"), { recursive: true, filter: (src) => !src.endsWith(".gitkeep") });
if (fs.existsSync(path.join(__dirname, "static"))) fs.cpSync(path.join(__dirname, "static"), out, { recursive: true }); // favicons etc.
const site = "https://" + String(L.domain).replace(/^https?:\/\//, "").replace(/\/.*$/, "") + "/";
fs.writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: " + site + "sitemap.xml\n");
fs.writeFileSync(path.join(out, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + site + "</loc><lastmod>" + today + "</lastmod></url>" + (epkDesign ? "<url><loc>" + site + "epk/</loc><lastmod>" + today + "</lastmod></url>" : "") + "</urlset>\n");

console.log("Built " + P.name + ": " + recipe.sections.length + " sections, " + events.length + " upcoming dates (" + (dates.length - events.length) + " past or incomplete hidden), " + vids.length + " videos, " + ints.length + " interviews." + (dropped.length ? " Hidden because empty: " + dropped.join(", ") + "." : "") + (epkDesign ? " Press kit: /epk/ (" + epkDesign + ")." : " No press kit page."));
