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

const read = (f, fallback) => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, "content", f), "utf8")); } catch (e) { if (fallback !== undefined) return fallback; throw new Error("Could not read content/" + f + ": " + e.message); } };
const P = read("profile.json"), L = read("layout.json");
const dates = read("dates.json", []), videos = read("videos.json", []), interviews = read("interviews.json", []);
const album = read("album.json", null), merch = read("merch.json", []), resources = read("church-resources.json", []), links = read("links.json", {});
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
                 url: clean(e.link) || "#contact", price: String(Number(e.price) || 0), kind: e.type === "church" ? "church" : "venue" }));

const vids = videos.map((v) => ({ id: youtubeId(v.youtube_link), title: clean(v.title) || "Video" })).filter((v) => v.id);

const ints = interviews.filter((i) => has(i.title)).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
let podcast = null;
if (ints.length) {
  const f = ints[0], yt = youtubeId(f.youtube_link);
  podcast = { show: clean(f.show) || "", episode: "", title: clean(f.title), date: clean(f.date) || "", minutes: Number(f.minutes) || 0, host: "",
              summary: clean(f.summary) || "", type: yt ? "youtube" : "link", id: yt, src: "", url: clean(f.link) || "", links: {},
              more: ints.slice(1).map((i) => ({ title: clean(i.title), show: clean(i.show) || "", date: clean(i.date) || "", url: clean(i.link) || (youtubeId(i.youtube_link) ? "https://www.youtube.com/watch?v=" + youtubeId(i.youtube_link) : "#interviews") })) };
  if (has(f.link) && yt) podcast.links[/spotify/.test(f.link) ? "Spotify" : /apple/.test(f.link) ? "Apple Podcasts" : "Episode page"] = clean(f.link);
}

const songs = album && Array.isArray(album.songs) ? album.songs.filter((s) => has(s.title) && has(s.audio)) : [];
const pick = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => has(v)).map(([k, v]) => [k, clean(v)]));
const streams = pick({ Spotify: links.spotify, "Apple Music": links.apple_music, "YouTube Music": links.youtube_music, Bandcamp: links.bandcamp });
const social = pick({ Instagram: links.instagram, Facebook: links.facebook, YouTube: links.youtube, TikTok: links.tiktok, Spotify: links.spotify });

const recipe = {
  style: L.style, domain: L.domain, genre: L.genre,
  name: clean(P.name), headline: clean(P.headline), intro: clean(P.intro) || "", city: clean(P.hometown) || "",
  shareImage: P.main_photo || "",
  verse: { text: clean(P.verse) || "", ref: clean(P.verse_ref) || "" },
  photos: { hero: P.main_photo, wide: P.main_photo, portrait: P.portrait_photo || P.main_photo, story: P.about_photo || P.portrait_photo, album: (album && album.cover) || P.portrait_photo },
  story: { paragraphs: String(P.story || "").split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean), quote: clean(P.quote) || "", quoteSource: clean(P.quote_by) || "" },
  album: album ? { title: clean(album.title), released: clean(album.released) || "", note: clean(album.note) || "", bandcampUrl: clean(album.bandcamp_link) || "", bandcampAlbumId: String(album.bandcamp_album_id || "").replace(/\D/g, ""),
    tracks: songs.map((s) => ({ title: clean(s.title), length: clean(s.length) || "", ref: clean(s.scripture) || "", story: clean(s.story) || "", file: clean(s.audio), free: !!s.free_download, buy: clean(s.buy_link) || clean(album.bandcamp_link) || "" })) } : undefined,
  streams, social,
  events, videos: vids,
  podcast: podcast || undefined,
  merch: merch.filter((m) => has(m.name) && has(m.link)).map((m) => ({ name: clean(m.name), price: clean(m.price) || "", desc: clean(m.description) || "", url: clean(m.link), photo: m.photo || P.portrait_photo })),
  resources: resources.filter((r) => has(r.song)).map((r) => ({ song: clean(r.song), key: clean(r.key) || "", tempo: String(r.tempo || ""), ccli: clean(r.ccli) || "", chart: clean(r.chord_chart) || "", lead: clean(r.lead_sheet) || "" })),
  contact: { booking: clean(links.booking_email) || "", email: clean(links.email) || "", presskit: clean(links.press_kit) || "", newsletterAction: clean(L.newsletter_form_action) || "", prayerAction: clean(L.prayer_form_action) || "" }
};
if (!recipe.story.paragraphs.length) recipe.story.paragraphs = [""];

/* drop a section when its content is empty, so the page never shows a blank block (dates stay: they show "check back soon") */
const empty = { music: !recipe.album || !recipe.album.tracks.length, videos: !vids.length, podcast: !podcast, merch: !recipe.merch.length, resources: !recipe.resources.length, prayer: !recipe.contact.prayerAction };
recipe.sections = (L.sections || []).filter((s) => !empty[s.k]);
const dropped = (L.sections || []).filter((s) => empty[s.k]).map((s) => s.k);

/* ---------- write /public ---------- */
const out = path.join(__dirname, "public");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "index.html"), kit.assemble(recipe));
fs.cpSync(path.join(__dirname, "media"), path.join(out, "media"), { recursive: true, filter: (src) => !src.endsWith(".gitkeep") });
if (fs.existsSync(path.join(__dirname, "static"))) fs.cpSync(path.join(__dirname, "static"), out, { recursive: true }); // favicons etc.
const site = "https://" + String(L.domain).replace(/^https?:\/\//, "").replace(/\/.*$/, "") + "/";
fs.writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: " + site + "sitemap.xml\n");
fs.writeFileSync(path.join(out, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + site + "</loc><lastmod>" + today + "</lastmod></url></urlset>\n");

console.log("Built " + P.name + ": " + recipe.sections.length + " sections, " + events.length + " upcoming dates (" + (dates.length - events.length) + " past or incomplete hidden), " + vids.length + " videos, " + ints.length + " interviews." + (dropped.length ? " Hidden because empty: " + dropped.join(", ") + "." : ""));
