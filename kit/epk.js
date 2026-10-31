/*!
 * Two Fish EPK Kit
 * render(recipe, design) returns a complete, self-contained electronic press kit page.
 * It reads the same recipe build.js makes for the website (name, photos, story, album,
 * videos, press quotes, dates, links), plus recipe.epk for the press-kit extras.
 * Empty sections hide themselves.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TwoFishEPK = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const VERSION = "1.0.0";

  /* ---------- helpers ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const attr = esc;
  const has = (v) => (typeof v === "string" ? v.trim() !== "" : Array.isArray(v) ? v.length > 0 : v != null);
  const ext = (u) => ' href="' + attr(u) + '" target="_blank" rel="noopener"';
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const LONGM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function parts(iso) { const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || ""); if (!m) return null; return { y: m[1], mo: +m[2] - 1, d: +m[3], h: m[4] ? +m[4] : null, mi: m[5] || "00" }; }
  function longDate(iso) { const p = parts(iso); return p ? LONGM[p.mo] + " " + p.d + ", " + p.y : ""; }
  function time12(p) { if (!p || p.h == null) return ""; const h = p.h % 12 || 12; return h + (p.mi !== "00" ? ":" + p.mi : "") + (p.h < 12 ? " AM" : " PM"); }
  const slug = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const yearOf = (iso) => (parts(iso) || {}).y || "";

  /* ---------- normalise what the page needs ---------- */
  function data(r) {
    const e = r.epk || {};
    const tracks = (r.album && r.album.tracks) || ((r.sets || [])[0] || {}).tracks || [];
    const contacts = (e.contacts || []).filter((c) => has(c.email) || has(c.phone));
    if (!contacts.length && r.contact) {
      if (has(r.contact.booking)) contacts.push({ role: "Booking", name: "", email: r.contact.booking, phone: "" });
      if (has(r.contact.email) && r.contact.email !== r.contact.booking) contacts.push({ role: "General", name: "", email: r.contact.email, phone: "" });
    }
    const story = ((r.story || {}).paragraphs || []).filter(has);
    return {
      name: r.name || "", headline: r.headline || "", city: r.city || "", genre: e.genre || r.genre || "",
      act: e.act || "", short: e.shortBio || r.intro || "", long: story, verse: r.verse || {},
      photos: r.photos || {}, presskitPhotos: (e.photos || []).filter((p) => has(p.src)),
      facts: (e.facts || []).filter((f) => has(f.n) && has(f.l)),
      highlights: (e.highlights || []).filter((h) => has(h.text)),
      album: r.album && tracks.length ? { title: r.album.title || "", released: r.album.released || "", note: r.album.note || "", url: r.album.bandcampUrl || "", cover: (r.photos || {}).album || "" } : null,
      tracks, streams: r.streams || {}, social: r.social || {},
      videos: (r.videos || []).filter((v) => has(v.id)),
      quotes: ((r.press || {}).quotes || []).filter((q) => has(q.q)), fansOf: (r.press || {}).fansOf || "",
      coverage: (e.coverage || []).filter((c) => has(c.title)),
      events: (r.events || []).slice(0, e.showCount || 4),
      lineup: e.lineup || "", setLength: e.setLength || "", tech: (e.tech || []).filter((t) => has(t.label) && has(t.url)), techNote: e.techNote || "",
      onePager: e.onePager || "", contacts, site: e.site || "/", updated: e.updated || "",
      labels: Object.assign({ tech: "Booking details", photos: "Press photos", press: "Press", highlights: "Highlights", shows: "Upcoming shows", listen: "Listen", watch: "Watch", bio: "Bio", facts: "At a glance", contact: "Contact" }, e.labels || {})
    };
  }

  /* ---------- shared section pieces (each design wraps and styles them) ---------- */
  const P = {
    copyBtn: (id, label) => '<button class="copy" type="button" data-copy="' + id + '">' + esc(label || "Copy") + "</button>",
    shortBio: (d, opts) => !has(d.short) ? "" : '<div class="bio-short"><div class="bio-bar"><h3>Short bio</h3>' + P.copyBtn("bio-short-text", "Copy short bio") + '</div><p id="bio-short-text">' + esc(d.short) + "</p></div>",
    longBio: (d) => !d.long.length ? "" : '<div class="bio-long"><div class="bio-bar"><h3>Full bio</h3>' + P.copyBtn("bio-long-text", "Copy full bio") + '</div><div id="bio-long-text">' + d.long.map((p) => "<p>" + esc(p) + "</p>").join("") + "</div></div>",
    facts: (d, cls) => !d.facts.length ? "" : '<dl class="' + (cls || "facts") + '">' + d.facts.map((f) => "<div><dt>" + esc(f.l) + "</dt><dd>" + esc(f.n) + "</dd></div>").join("") + "</dl>",
    tracks: (d) => !d.tracks.length ? "" : '<ol class="tracks">' + d.tracks.map((t, i) => '<li><div class="t-meta"><span class="t-n">' + String(i + 1).padStart(2, "0") + '</span><span class="t-title">' + esc(t.title) + "</span>" + (t.length ? '<span class="t-len">' + esc(t.length) + "</span>" : "") + '</div><audio controls preload="none" src="' + attr(t.file) + '" aria-label="Play ' + attr(t.title) + '"></audio></li>').join("") + "</ol>",
    streams: (d) => !Object.keys(d.streams).length ? "" : '<ul class="streams">' + Object.entries(d.streams).map(([k, u]) => "<li><a" + ext(u) + ">" + esc(k) + "</a></li>").join("") + "</ul>",
    social: (d) => !Object.keys(d.social).length ? "" : '<ul class="social">' + Object.entries(d.social).map(([k, u]) => "<li><a" + ext(u) + ">" + esc(k) + "</a></li>").join("") + "</ul>",
    video: (v, big) => '<figure class="vid' + (big ? " big" : "") + '"><button class="yt" type="button" data-id="' + attr(v.id) + '" aria-label="Play video: ' + attr(v.title) + '"><img src="' + attr(v.thumb || "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg") + '" width="480" height="360" alt="" loading="lazy"><span class="play" aria-hidden="true"></span></button><figcaption>' + esc(v.title) + "</figcaption></figure>",
    videos: (d, featured) => !d.videos.length ? "" : (featured ? P.video(d.videos[0], true) + (d.videos.length > 1 ? '<div class="vids">' + d.videos.slice(1).map((v) => P.video(v)).join("") + "</div>" : "") : '<div class="vids">' + d.videos.map((v) => P.video(v)).join("") + "</div>"),
    quotes: (d, n) => !d.quotes.length ? "" : '<div class="quotes">' + d.quotes.slice(0, n || 99).map((q) => "<blockquote><p>" + esc(q.q) + "</p>" + (q.src ? "<footer>" + esc(q.src) + "</footer>" : "") + "</blockquote>").join("") + "</div>",
    coverage: (d) => !d.coverage.length ? "" : '<ul class="coverage">' + d.coverage.map((c) => "<li>" + (c.url ? "<a" + ext(c.url) + ">" + esc(c.title) + "</a>" : esc(c.title)) + (c.outlet || c.date ? '<span>' + esc([c.outlet, c.date ? longDate(c.date) : ""].filter(Boolean).join(" · ")) + "</span>" : "") + "</li>").join("") + "</ul>",
    fansOf: (d) => !has(d.fansOf) ? "" : '<p class="fans"><span>For fans of</span> ' + esc(d.fansOf) + "</p>",
    photos: (d) => !d.presskitPhotos.length ? "" : '<ul class="pk-photos">' + d.presskitPhotos.map((p, i) => '<li><figure><img src="' + attr(p.thumb || p.src) + '" width="' + (p.w || 800) + '" height="' + (p.h || 1000) + '" alt="' + attr(p.alt || d.name + " press photo " + (i + 1)) + '" loading="lazy"><figcaption>' + (p.caption ? esc(p.caption) : "") + (p.credit ? ' <span class="credit">Photo: ' + esc(p.credit) + "</span>" : "") + '</figcaption></figure><a class="dl" href="' + attr(p.src) + '" download>Download high-res<span class="vh"> photo ' + (i + 1) + "</span></a></li>").join("") + "</ul>",
    highlights: (d) => !d.highlights.length ? "" : '<ul class="highlights">' + d.highlights.map((h) => "<li>" + (h.year ? '<span class="yr">' + esc(h.year) + "</span>" : "") + "<span>" + esc(h.text) + "</span></li>").join("") + "</ul>",
    shows: (d) => !d.events.length ? "" : '<ul class="shows">' + d.events.map((e) => { const p = parts(e.start); return '<li><time datetime="' + attr(e.start) + '"><span class="m">' + (p ? MONTHS[p.mo] : "") + '</span><span class="d">' + (p ? p.d : "") + '</span></time><div><strong>' + esc(e.venue) + "</strong><span>" + esc([e.city, e.region].filter(Boolean).join(", ")) + (p && p.h != null ? " · " + time12(p) : "") + "</span></div></li>"; }).join("") + "</ul>",
    tech: (d) => (!d.lineup && !d.setLength && !d.tech.length && !d.techNote) ? "" : '<div class="tech">' + ((d.lineup || d.setLength) ? '<dl class="tech-dl">' + (d.lineup ? "<div><dt>Lineup</dt><dd>" + esc(d.lineup) + "</dd></div>" : "") + (d.setLength ? "<div><dt>Set length</dt><dd>" + esc(d.setLength) + "</dd></div>" : "") + "</dl>" : "") + (d.techNote ? '<p class="tech-note">' + esc(d.techNote) + "</p>" : "") + (d.tech.length ? '<ul class="files">' + d.tech.map((t) => "<li><a" + ext(t.url) + ">" + esc(t.label) + "</a></li>").join("") + "</ul>" : "") + "</div>",
    contacts: (d) => !d.contacts.length ? "" : '<ul class="contacts">' + d.contacts.map((c) => '<li><span class="role">' + esc(c.role || "Contact") + "</span>" + (c.name ? '<span class="who">' + esc(c.name) + "</span>" : "") + (c.email ? '<a href="mailto:' + attr(c.email) + '">' + esc(c.email) + "</a>" : "") + (c.phone ? '<a href="tel:' + attr(String(c.phone).replace(/[^\d+]/g, "")) + '">' + esc(c.phone) + "</a>" : "") + "</li>").join("") + "</ul>",
    onePager: (d, label) => !has(d.onePager) ? "" : '<a class="btn" href="' + attr(d.onePager) + '" download>' + esc(label || "Download one-sheet (PDF)") + "</a>",
    sec: (id, title, inner, cls, eyebrow) => !inner ? "" : '<section class="sec ' + (cls || "") + '" id="' + id + '" aria-labelledby="' + id + '-t">' + (eyebrow ? '<p class="eyebrow">' + esc(eyebrow) + "</p>" : "") + '<h2 id="' + id + '-t">' + esc(title) + "</h2>" + inner + "</section>"
  };

  /* ---------- shared base CSS (every design sets its own tokens and look) ---------- */
  const BASE = `*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);font-size:1.0625rem;line-height:1.65;overflow-wrap:break-word}
img{max-width:100%;height:auto;display:block}
a{color:var(--link,var(--accent))}
a:focus-visible,button:focus-visible{outline:3px solid var(--focus,var(--accent));outline-offset:3px}
h1,h2,h3{font-family:var(--display);line-height:1.1;margin:0;text-wrap:balance}
p{margin:0}
.wrap{width:min(1180px,100%);margin-inline:auto;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:-999px;top:0;background:var(--ink);color:var(--bg);padding:.6rem 1rem;z-index:9}
.skip:focus{left:1rem}
.sec{padding-block:clamp(2.75rem,2rem + 3vw,4.5rem)}
.sec>h2{font-size:clamp(1.7rem,1.3rem + 1.6vw,2.4rem);margin-bottom:1.25rem}
.eyebrow{font-size:.78rem;letter-spacing:.18em;text-transform:uppercase;color:var(--soft);margin-bottom:.5rem;font-weight:600}
.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.8rem 1.25rem;border-radius:var(--radius,6px);background:var(--fill);color:var(--on);font-weight:700;text-decoration:none;border:2px solid var(--fill)}
.btn:hover{filter:brightness(1.08)}
.btn-o{background:transparent;color:var(--ink);border-color:currentColor}
.copy{font:inherit;font-size:.8rem;font-weight:600;padding:.35rem .75rem;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer;white-space:nowrap}
.copy.done{background:var(--fill);color:var(--on);border-color:var(--fill)}
.bio-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:.75rem}
.bio-bar h3{font-size:1.05rem;font-family:var(--body);font-weight:700;letter-spacing:.02em}
.bio-long p+p{margin-top:1em}
.bio-short{margin-bottom:2rem}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,10rem),1fr));gap:1px;margin:0;padding:1px}
.facts div{background:var(--card);outline:1px solid var(--line);padding:1.1rem 1.2rem;display:flex;flex-direction:column-reverse;gap:.15rem}
.facts dd{margin:0;font-family:var(--display);font-size:clamp(1.6rem,1.2rem + 1.5vw,2.3rem);line-height:1;color:var(--accent-ink,var(--ink))}
.facts dt{font-size:.85rem;color:var(--soft)}
.tracks{list-style:none;margin:0;padding:0;display:grid;gap:.6rem}
.tracks li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:.4rem 1rem;align-items:center;padding:.65rem .9rem;border:1px solid var(--line);border-radius:var(--radius,6px);background:var(--card)}
.t-meta{display:flex;gap:.75rem;align-items:baseline;min-width:0}
.t-n{font-variant-numeric:tabular-nums;color:var(--soft);font-size:.85rem}
.t-title{font-weight:600;flex:1;min-width:0}
.t-len{color:var(--soft);font-size:.85rem;font-variant-numeric:tabular-nums}
.tracks audio{width:100%;height:36px}
@media (max-width:640px){.tracks li{grid-template-columns:minmax(0,1fr)}}
.streams,.social,.files{list-style:none;margin:1rem 0 0;padding:0;display:flex;flex-wrap:wrap;gap:.5rem}
.streams a,.social a,.files a{display:inline-block;padding:.45rem .9rem;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--ink);font-size:.9rem;font-weight:600;background:var(--card)}
.files a::before{content:"\\2193  ";color:var(--accent)}
.vids{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));gap:1.25rem;margin-top:1.25rem}
.vid{margin:0}
.vid figcaption{font-size:.92rem;margin-top:.5rem;font-weight:600}
.yt{position:relative;display:block;width:100%;padding:0;border:0;cursor:pointer;background:#111;aspect-ratio:16/9;overflow:hidden;border-radius:var(--radius,6px)}
.yt img{width:100%;height:100%;object-fit:cover;opacity:.88;transition:opacity .2s}
.yt:hover img{opacity:1}
.play{position:absolute;inset:0;margin:auto;width:68px;height:48px;border-radius:12px;background:rgba(0,0,0,.72)}
.play::after{content:"";position:absolute;left:27px;top:14px;border-style:solid;border-width:10px 0 10px 17px;border-color:transparent transparent transparent #fff}
.vid iframe{display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:var(--radius,6px)}
.quotes{display:grid;gap:1.5rem}
blockquote{margin:0}
blockquote footer{margin-top:.6rem;font-size:.9rem;color:var(--soft)}
blockquote footer::before{content:"\\2014\\00a0"}
.fans{margin-top:1.5rem;font-size:1rem}
.fans span{font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.75rem;color:var(--soft);margin-right:.4rem}
.coverage{list-style:none;padding:0;margin:1.75rem 0 0;display:grid;gap:.75rem}
.coverage li{display:flex;flex-direction:column;padding-bottom:.75rem;border-bottom:1px solid var(--line)}
.coverage a{font-weight:600}
.coverage span{font-size:.88rem;color:var(--soft)}
.pk-photos{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,14rem),1fr));gap:1.25rem}
.pk-photos figure{margin:0}
.pk-photos img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:var(--radius,6px);background:var(--alt)}
.pk-photos figcaption{font-size:.85rem;margin-top:.45rem;color:var(--soft)}
.credit{display:block;font-size:.78rem}
.dl{display:inline-block;margin-top:.4rem;font-weight:700;font-size:.88rem}
.highlights{list-style:none;margin:0;padding:0;display:grid;gap:.75rem}
.highlights li{display:flex;gap:1rem;align-items:baseline}
.yr{font-family:var(--display);font-weight:700;min-width:3.2rem;color:var(--accent-ink,var(--accent))}
.shows{list-style:none;margin:0;padding:0;display:grid;gap:.65rem}
.shows li{display:flex;gap:1rem;align-items:center;padding:.7rem .9rem;border:1px solid var(--line);border-radius:var(--radius,6px);background:var(--card)}
.shows time{display:flex;flex-direction:column;align-items:center;min-width:3.2rem;line-height:1.05}
.shows .m{font-size:.75rem;text-transform:uppercase;letter-spacing:.12em;color:var(--soft)}
.shows .d{font-family:var(--display);font-size:1.6rem;font-weight:700}
.shows li div{display:flex;flex-direction:column;min-width:0}
.shows li div span{font-size:.9rem;color:var(--soft)}
.tech-dl{margin:0;display:grid;gap:.9rem}
.tech-dl dt{font-size:.78rem;text-transform:uppercase;letter-spacing:.14em;color:var(--soft);font-weight:700}
.tech-dl dd{margin:.15rem 0 0}
.tech-note{margin-top:1rem}
.contacts{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));gap:1rem}
.contacts li{display:flex;flex-direction:column;gap:.1rem;padding:1rem 1.1rem;border:1px solid var(--line);border-radius:var(--radius,6px);background:var(--card)}
.role{font-size:.75rem;text-transform:uppercase;letter-spacing:.16em;color:var(--soft);font-weight:700}
.who{font-weight:600}
.contacts a{font-weight:600;word-break:break-word}
.site-foot{padding-block:2rem;font-size:.85rem;color:var(--soft);border-top:1px solid var(--line)}
.site-foot .wrap{display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;justify-content:space-between}
@media print{
  .copy,.yt .play,.skip,.noprint,audio{display:none!important}
  body{background:#fff;color:#000;font-size:10.5pt}
  .sec{padding-block:14pt;break-inside:avoid-page}
  a{color:#000}
  .pk-photos{grid-template-columns:repeat(4,1fr)}
}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}`;

  const SCRIPT = `(function(){
document.querySelectorAll(".yt").forEach(function(b){b.addEventListener("click",function(){var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+b.getAttribute("data-id")+"?autoplay=1&rel=0";f.title=b.getAttribute("aria-label").replace("Play video: ","");f.allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";f.allowFullscreen=true;b.replaceWith(f);});});
document.querySelectorAll(".copy").forEach(function(b){b.addEventListener("click",function(){var el=document.getElementById(b.getAttribute("data-copy"));if(!el)return;var t=el.innerText.trim(),old=b.textContent;function ok(){b.textContent="Copied";b.classList.add("done");setTimeout(function(){b.textContent=old;b.classList.remove("done");},1800);}
function pick(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,pick);}else{pick();}});});
var pb=document.querySelector("[data-print]");if(pb)pb.addEventListener("click",function(){window.print();});
var audios=document.querySelectorAll("audio");audios.forEach(function(a){a.addEventListener("play",function(){audios.forEach(function(o){if(o!==a)o.pause();});});});
})();`;

  /* ---------- the five designs ---------- */
  const DESIGNS = {
    /* 1. HEADLINER: dark stage, full-bleed photo, giant condensed name, video first */
    headliner: {
      name: "Headliner", note: "Dark stage, full-bleed photo, video first. For bands and high-energy acts.",
      fonts: "family=Anton&family=Inter:wght@400;600;700",
      css: `:root{--bg:#0d0d10;--alt:#16161b;--card:#1c1c22;--ink:#f4f2ee;--soft:#b7b3ab;--line:#33333c;--accent:#ff5a36;--accent-ink:#ff7a5c;--link:#ff8a6e;--fill:#ff5a36;--on:#120806;--radius:4px;--display:"Anton",Impact,"Arial Narrow",sans-serif;--body:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
h2,.sec>h2{text-transform:uppercase;letter-spacing:.02em;font-weight:400}
.hl-hero{position:relative;min-height:min(92vh,880px);display:flex;align-items:flex-end;isolation:isolate;overflow:hidden}
.hl-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.hl-hero::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(13,13,16,.15) 0%,rgba(13,13,16,.35) 45%,rgba(13,13,16,.96) 100%)}
.hl-top{position:absolute;top:0;left:0;right:0;padding-top:1.25rem}
.hl-top .wrap{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap}
.tag{font-size:.75rem;letter-spacing:.3em;text-transform:uppercase;font-weight:700;background:var(--accent);color:var(--on);padding:.35rem .7rem}
.hl-top a{color:var(--ink);font-weight:600;font-size:.9rem}
.hl-name{font-size:clamp(3.6rem,1.5rem + 11vw,10.5rem);text-transform:uppercase;line-height:.88;letter-spacing:-.005em;font-weight:400}
.hl-sub{display:flex;flex-wrap:wrap;gap:.4rem 1.5rem;margin:1.1rem 0 2rem;font-size:1.05rem;color:var(--ink)}
.hl-sub span::before{content:"";display:inline-block;width:.5rem;height:.5rem;background:var(--accent);margin-right:.55rem;vertical-align:.12em}
.hl-hero .facts{margin-bottom:2.5rem}
.hl-hero .facts div{background:rgba(22,22,27,.88)}
.facts dd{color:var(--accent-ink)}
.hl-quote{background:var(--accent);color:var(--on)}
.hl-quote blockquote p{font-family:var(--display);font-size:clamp(1.9rem,1.2rem + 3.2vw,3.6rem);line-height:1.05;text-transform:uppercase}
.hl-quote blockquote footer{color:var(--on);font-weight:700}
.hl-quote .quotes{gap:2.5rem}
.hl-quote .fans{color:var(--on)}.hl-quote .fans span{color:var(--on)}
.hl-quote .coverage li{border-color:rgba(18,8,6,.35)}.hl-quote .coverage a,.hl-quote .coverage span{color:var(--on)}.hl-quote .sec>h2{color:var(--on)}
.vid.big figcaption{font-size:1.1rem}
.cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,4vw,4rem)}
@media (max-width:820px){.cols{grid-template-columns:minmax(0,1fr)}}
.alt{background:var(--alt)}
.contact-band{background:var(--card);border-top:4px solid var(--accent)}
.contact-band h2{font-size:clamp(2.4rem,1.5rem + 4vw,4.6rem)}
.contact-band .btns{margin-top:1.75rem;display:flex;flex-wrap:wrap;gap:.75rem}`,
      body: (d) => '<header class="hl-hero">' + (d.photos.hero ? '<img src="' + attr(d.photos.hero) + '" width="1920" height="1080" alt="' + attr(d.name + " live") + '" fetchpriority="high">' : "") +
        '<div class="hl-top"><div class="wrap"><span class="tag">Press kit</span><a href="' + attr(d.site) + '">Visit the website</a></div></div>' +
        '<div class="wrap"><h1 class="hl-name">' + esc(d.name) + '</h1><p class="hl-sub">' + [d.genre, d.city, d.act].filter(Boolean).map((x) => "<span>" + esc(x) + "</span>").join("") + "</p>" + P.facts(d) + "</div></header>" +
        '<main id="main">' +
        (d.videos.length ? '<div class="wrap">' + P.sec("watch", d.labels.watch, P.videos(d, true)) + "</div>" : "") +
        (d.quotes.length ? '<div class="hl-quote"><div class="wrap">' + P.sec("press", d.labels.press, P.quotes(d, 2) + P.fansOf(d) + P.coverage(d)) + "</div></div>" : "") +
        '<div class="wrap">' + ((d.short || d.long.length || d.tracks.length) ? '<div class="cols">' + P.sec("bio", d.labels.bio, P.shortBio(d) + P.longBio(d)) + P.sec("listen", d.labels.listen, P.tracks(d) + P.streams(d)) + "</div>" : "") + "</div>" +
        (d.presskitPhotos.length ? '<div class="alt"><div class="wrap">' + P.sec("photos", d.labels.photos, P.photos(d)) + "</div></div>" : "") +
        '<div class="wrap">' + ((d.events.length || d.highlights.length) ? '<div class="cols">' + P.sec("shows", d.labels.shows, P.shows(d)) + P.sec("highlights", d.labels.highlights, P.highlights(d)) + "</div>" : "") + P.sec("tech", d.labels.tech, P.tech(d)) + "</div>" +
        '<div class="contact-band"><div class="wrap">' + P.sec("contact", "Book " + d.name, P.contacts(d) + '<div class="btns">' + P.onePager(d) + "</div>" + P.social(d)) + "</div></div></main>"
    },

    /* 2. BROADSHEET: newspaper editorial, serif masthead, columns and rules */
    broadsheet: {
      name: "Broadsheet", note: "Newspaper editorial with a masthead, columns and pull quotes. For singer-songwriters.",
      fonts: "family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Inter:wght@500;700",
      css: `:root{--bg:#f6f2ea;--alt:#ede7da;--card:#fbf8f2;--ink:#1a1a1a;--soft:#555049;--line:#cfc6b4;--accent:#8c1c13;--accent-ink:#8c1c13;--fill:#1a1a1a;--on:#f6f2ea;--radius:0;--display:"Playfair Display",Georgia,"Times New Roman",serif;--body:"Source Serif 4",Georgia,"Times New Roman",serif;--ui:"Inter",system-ui,sans-serif}
.eyebrow,.role,.tech-dl dt,.fans span,.copy,.btn,.bs-strap,.bs-folio{font-family:var(--ui)}
.bs-folio{border-bottom:1px solid var(--ink);padding-block:.6rem;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700}
.bs-folio .wrap{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.bs-folio a{color:var(--ink)}
.bs-mast{text-align:center;padding-block:clamp(1.5rem,1rem + 2vw,2.5rem) 1rem;border-bottom:4px double var(--ink)}
.bs-mast .eyebrow{color:var(--accent);letter-spacing:.35em}
.bs-name{font-size:clamp(3rem,1.2rem + 8vw,7.5rem);font-weight:900;letter-spacing:-.02em;line-height:.95}
.bs-deck{font-style:italic;font-size:clamp(1.15rem,1rem + .6vw,1.5rem);margin-top:.85rem;color:var(--soft)}
.bs-strap{display:flex;justify-content:center;flex-wrap:wrap;gap:.4rem 1.4rem;padding-block:.7rem;border-bottom:1px solid var(--ink);font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700}
.bs-front{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(1.5rem,3vw,3rem);padding-block:2.5rem;border-bottom:1px solid var(--ink)}
@media (max-width:860px){.bs-front{grid-template-columns:minmax(0,1fr)}}
.bs-front figure{margin:0}
.bs-front figure img{width:100%;aspect-ratio:4/5;object-fit:cover;filter:grayscale(.15) contrast(1.05)}
.bs-front figcaption{font-size:.85rem;color:var(--soft);margin-top:.5rem;font-style:italic;border-top:1px solid var(--line);padding-top:.4rem}
.bs-lede h2{font-size:clamp(1.8rem,1.3rem + 2vw,2.8rem);margin-bottom:1rem}
.bs-lede #bio-short-text{font-size:1.2rem;line-height:1.6}
.bs-lede #bio-short-text::first-letter{float:left;font-family:var(--display);font-weight:900;font-size:4.2rem;line-height:.82;padding:.3rem .5rem 0 0;color:var(--accent)}
.bs-pull{margin-top:1.75rem;padding-block:1.25rem;border-top:3px solid var(--ink);border-bottom:1px solid var(--ink)}
.bs-pull p{font-family:var(--display);font-style:italic;font-weight:700;font-size:clamp(1.4rem,1.1rem + 1.2vw,2rem);line-height:1.2}
.bs-pull footer{font-family:var(--ui);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase}
.bs-cols{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:clamp(1.5rem,3vw,3.5rem)}
@media (max-width:860px){.bs-cols{grid-template-columns:minmax(0,1fr)}}
.bs-cols>*{min-width:0}
.bs-article #bio-long-text{columns:2 17rem;column-gap:2.25rem;column-rule:1px solid var(--line)}
.bs-article #bio-long-text p{break-inside:avoid-column}
.sec>h2{font-size:clamp(1.5rem,1.2rem + 1.2vw,2.1rem);border-top:3px solid var(--ink);padding-top:.75rem}
.sec{padding-block:clamp(2rem,1.5rem + 2vw,3rem)}
.bs-side .sec{padding-top:2rem}
.facts{grid-template-columns:minmax(0,1fr);gap:0;padding:0}
.facts div{background:none;outline:0;border-bottom:1px solid var(--line);padding:.7rem 0;flex-direction:row;justify-content:space-between;align-items:baseline;gap:1rem}
.facts dd{font-size:1.6rem;font-weight:900;color:var(--accent)}
.facts dt{font-family:var(--ui);font-size:.85rem}
.quotes{grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr));gap:2rem}
.quotes blockquote{border-left:3px solid var(--accent);padding-left:1rem}
.quotes p{font-style:italic;font-size:1.15rem}
.tracks li,.shows li,.contacts li{border-radius:0;background:transparent;border:0;border-bottom:1px solid var(--line);padding-inline:0}
.shows .d{color:var(--accent)}
.streams a,.social a,.files a{border-radius:0;border-color:var(--ink);background:transparent;font-family:var(--ui);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em}
.pk-photos img{filter:grayscale(.1)}
.bs-end{border-top:4px double var(--ink);margin-top:1rem}`,
      body: (d) => {
        const q = d.quotes[0];
        return '<div class="bs-folio"><div class="wrap"><span>Electronic press kit' + (d.updated ? " · " + esc(d.updated) : "") + '</span><a href="' + attr(d.site) + '">' + esc(d.name) + " &rarr; website</a></div></div>" +
          '<header class="bs-mast"><div class="wrap"><p class="eyebrow">' + esc(d.genre || "Press kit") + '</p><h1 class="bs-name">' + esc(d.name) + "</h1>" + (d.headline ? '<p class="bs-deck">' + esc(d.headline) + "</p>" : "") + "</div></header>" +
          ((d.city || d.act || d.album) ? '<div class="bs-strap">' + [d.city, d.act, d.album ? "New: " + d.album.title : ""].filter(Boolean).map((x) => "<span>" + esc(x) + "</span>").join("") + "</div>" : "") +
          '<main id="main"><div class="wrap"><div class="bs-front">' + (d.photos.portrait ? '<figure><img src="' + attr(d.photos.portrait) + '" width="800" height="1000" alt="' + attr(d.name) + '" fetchpriority="high"><figcaption>' + esc(d.name + (d.city ? ", " + d.city : "")) + "</figcaption></figure>" : "") +
          '<div class="bs-lede"><h2>' + esc(d.album ? "The story behind " + d.album.title : "Meet " + d.name) + "</h2>" + P.shortBio(d) + (q ? '<blockquote class="bs-pull"><p>&ldquo;' + esc(q.q) + "&rdquo;</p>" + (q.src ? "<footer>" + esc(q.src) + "</footer>" : "") + "</blockquote>" : "") + "</div></div>" +
          '<div class="bs-cols"><div>' + P.sec("bio", "The full story", P.longBio(d), "bs-article") + P.sec("listen", d.labels.listen, P.tracks(d) + P.streams(d)) + P.sec("watch", d.labels.watch, P.videos(d)) + "</div>" +
          '<aside class="bs-side">' + P.sec("facts", d.labels.facts, P.facts(d) + P.fansOf(d)) + P.sec("highlights", d.labels.highlights, P.highlights(d)) + P.sec("shows", d.labels.shows, P.shows(d)) + "</aside></div>" +
          P.sec("press", "What the press says", P.quotes({ quotes: d.quotes.slice(1).length ? d.quotes.slice(1) : d.quotes }) + P.coverage(d)) +
          P.sec("photos", d.labels.photos, P.photos(d)) + P.sec("tech", d.labels.tech, P.tech(d)) +
          '<div class="bs-end">' + P.sec("contact", d.labels.contact, P.contacts(d) + (d.onePager ? '<p style="margin-top:1.25rem">' + P.onePager(d) + "</p>" : "") + P.social(d)) + "</div></div></main>";
      }
    },

    /* 3. ONE SHEET: clean Swiss grid, everything on one screen, prints to a tidy page */
    onesheet: {
      name: "One Sheet", note: "Clean, compact grid that prints neatly. For working bands, wedding and event acts.",
      fonts: "family=Archivo:wght@400;600;800&family=Archivo+Narrow:wght@600;700",
      css: `:root{--bg:#ffffff;--alt:#f3f5f7;--card:#ffffff;--ink:#0f1a24;--soft:#4f5b66;--line:#dde3e8;--accent:#0b63ce;--accent-ink:#0b63ce;--fill:#0b63ce;--on:#ffffff;--radius:10px;--display:"Archivo",system-ui,sans-serif;--body:"Archivo",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--narrow:"Archivo Narrow","Arial Narrow",sans-serif}
body{font-size:1rem;background:var(--alt)}
.os-page{background:var(--bg);max-width:1180px;margin:clamp(0px,2vw,2rem) auto;box-shadow:0 1px 3px rgba(15,26,36,.08),0 12px 40px rgba(15,26,36,.06);border-radius:clamp(0px,1vw,14px);overflow:hidden}
.os-head{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);align-items:stretch}
@media (max-width:760px){.os-head{grid-template-columns:minmax(0,1fr)}}
.os-head>img{width:100%;height:100%;min-height:260px;object-fit:cover}
.os-id{padding:clamp(1.5rem,1rem + 2vw,2.75rem);display:flex;flex-direction:column;gap:1rem;justify-content:center;border-left:8px solid var(--accent)}
@media (max-width:760px){.os-id{border-left:0;border-top:8px solid var(--accent)}}
.os-id .eyebrow{color:var(--accent);margin:0}
.os-name{font-size:clamp(2.4rem,1.4rem + 4vw,4.4rem);font-weight:800;letter-spacing:-.03em;line-height:.95}
.os-tags{display:flex;flex-wrap:wrap;gap:.4rem;list-style:none;margin:0;padding:0}
.os-tags li{font-family:var(--narrow);font-weight:700;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em;background:var(--alt);padding:.3rem .65rem;border-radius:6px}
.os-actions{display:flex;flex-wrap:wrap;gap:.6rem}
.os-actions button{font:inherit}
.os-body{padding:clamp(1.25rem,1rem + 2vw,2.5rem);display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:clamp(1.25rem,2vw,2rem)}
.os-body>*{grid-column:span 12;min-width:0}
@media (min-width:900px){.span-7{grid-column:span 7}.span-5{grid-column:span 5}.span-6{grid-column:span 6}.span-4{grid-column:span 4}.span-8{grid-column:span 8}}
.os-body .sec{padding:0}
.sec>h2{font-family:var(--narrow);font-size:.95rem;text-transform:uppercase;letter-spacing:.14em;color:var(--accent);margin-bottom:.85rem;padding-bottom:.5rem;border-bottom:2px solid var(--ink)}
.facts{border-radius:var(--radius);overflow:hidden}
.facts dd{font-weight:800;letter-spacing:-.02em}
.quotes{gap:1rem}
.quotes blockquote{background:var(--alt);padding:1rem 1.15rem;border-radius:var(--radius)}
.quotes p{font-size:1.02rem;font-weight:600}
.pk-photos{grid-template-columns:repeat(auto-fill,minmax(min(100%,9.5rem),1fr));gap:.9rem}
.pk-photos img{aspect-ratio:1}
.vids{grid-template-columns:repeat(auto-fill,minmax(min(100%,12rem),1fr));margin-top:0;gap:1rem}
.btn-print{background:transparent;color:var(--ink);border-color:var(--line);cursor:pointer}
.bio-short p{font-size:1.1rem}
.contacts li{background:var(--alt);border:0}
@media print{
  body{background:#fff}.os-page{box-shadow:none;margin:0;border-radius:0}
  .os-head{grid-template-columns:200px 1fr}.os-head>img{min-height:0;max-height:250px}
  .os-body{grid-template-columns:repeat(12,1fr);gap:12pt}.span-7{grid-column:span 7}.span-5{grid-column:span 5}.span-6{grid-column:span 6}.span-4{grid-column:span 4}.span-8{grid-column:span 8}
  .vids,.os-actions,#listen .tracks{display:none}
  .bio-long{display:none}
}`,
      body: (d) => '<div class="os-page"><header class="os-head">' + (d.photos.portrait ? '<img src="' + attr(d.photos.portrait) + '" width="800" height="1000" alt="' + attr(d.name) + '" fetchpriority="high">' : "") +
        '<div class="os-id"><p class="eyebrow">Electronic press kit</p><h1 class="os-name">' + esc(d.name) + "</h1>" + (d.headline ? "<p>" + esc(d.headline) + "</p>" : "") +
        '<ul class="os-tags">' + [d.genre, d.city, d.act].filter(Boolean).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
        '<div class="os-actions noprint">' + (d.contacts[0] && d.contacts[0].email ? '<a class="btn" href="mailto:' + attr(d.contacts[0].email) + '">Book ' + esc(d.name) + "</a>" : "") + '<button class="btn btn-print" type="button" data-print>Print or save as PDF</button></div></div></header>' +
        '<main id="main" class="os-body">' +
        (d.facts.length ? '<div class="span-12">' + P.facts(d) + "</div>" : "") +
        '<div class="span-7">' + P.sec("bio", d.labels.bio, P.shortBio(d) + P.longBio(d)) + "</div>" +
        '<div class="span-5">' + P.sec("press", d.labels.press, P.quotes(d, 3) + P.fansOf(d)) + "</div>" +
        (d.tracks.length ? '<div class="span-6">' + P.sec("listen", d.labels.listen, P.tracks(d) + P.streams(d)) + "</div>" : "") +
        (d.videos.length ? '<div class="span-6">' + P.sec("watch", d.labels.watch, P.videos(d)) + "</div>" : "") +
        (d.presskitPhotos.length ? '<div class="span-8">' + P.sec("photos", d.labels.photos, P.photos(d)) + "</div>" : "") +
        '<div class="span-4">' + P.sec("tech", d.labels.tech, P.tech(d)) + "</div>" +
        (d.events.length ? '<div class="span-6">' + P.sec("shows", d.labels.shows, P.shows(d)) + "</div>" : "") +
        (d.highlights.length ? '<div class="' + (d.events.length ? "span-6" : "span-12") + '">' + P.sec("highlights", d.labels.highlights, P.highlights(d)) + "</div>" : "") +
        '<div class="span-12">' + P.sec("contact", d.labels.contact, P.contacts(d) + '<div class="os-actions" style="margin-top:1rem">' + P.onePager(d) + "</div>" + P.social(d)) + "</div></main></div>"
    },

    /* 4. LINER NOTES: the album is the star; cover, side-A tracklist and liner-note bio */
    liner: {
      name: "Liner Notes", note: "Built around the new record: big cover, tracklist and liner-note bio. For an album release.",
      fonts: "family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,500&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;600",
      css: `:root{--bg:#efe6d6;--alt:#e5d8c2;--card:#f7f0e3;--ink:#2a2118;--soft:#5e5143;--line:#cbb99c;--accent:#b4441f;--accent-ink:#9c3a1a;--link:#8e3518;--fill:#2a2118;--on:#f7f0e3;--radius:2px;--display:"Fraunces",Georgia,serif;--body:"IBM Plex Sans",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,Menlo,monospace}
.eyebrow,.t-n,.t-len,.role,.tech-dl dt,.fans span,.yr,.ln-cat,.shows .m,.copy{font-family:var(--mono)}
.ln-hero{padding-block:clamp(2rem,1rem + 4vw,4.5rem);border-bottom:1px solid var(--line)}
.ln-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,4vw,4.5rem);align-items:center}
@media (max-width:860px){.ln-grid{grid-template-columns:minmax(0,1fr)}}
.ln-sleeve{position:relative;max-width:560px;width:100%;justify-self:center}
.ln-sleeve::before{content:"";position:absolute;top:4%;right:-9%;width:92%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#2a2118 0 13%,#e9b24b 13.5% 16%,#1a140f 16.5% 100%);box-shadow:inset 0 0 0 10px #241c14,inset 0 0 0 11px #3a2f24,inset 0 0 0 30px #1a140f,inset 0 0 0 31px #3a2f24}
@media (max-width:560px){.ln-sleeve::before{right:-4%}}
.ln-sleeve img{position:relative;width:92%;aspect-ratio:1;object-fit:cover;box-shadow:0 18px 40px rgba(42,33,24,.35)}
.ln-cat{font-size:.8rem;letter-spacing:.12em;color:var(--soft);text-transform:uppercase}
.ln-name{font-size:clamp(2.6rem,1.4rem + 5vw,5.4rem);font-weight:800;letter-spacing:-.02em;line-height:.95;margin:.5rem 0 .25rem}
.ln-album{font-family:var(--display);font-style:italic;font-weight:500;font-size:clamp(1.4rem,1.1rem + 1.4vw,2.2rem);color:var(--accent-ink)}
.ln-meta{margin-top:1.25rem;display:flex;flex-wrap:wrap;gap:.4rem 1.25rem;font-family:var(--mono);font-size:.85rem}
.ln-side{margin-top:1.75rem}
.ln-side h2{font-family:var(--mono);font-size:.82rem;letter-spacing:.2em;text-transform:uppercase;font-weight:600;border-bottom:1px solid var(--ink);padding-bottom:.4rem;margin-bottom:.4rem}
.tracks{gap:0}
.tracks li{background:transparent;border:0;border-bottom:1px dashed var(--line);border-radius:0;padding-inline:0}
.sec>h2{font-weight:800}
.ln-notes{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,2fr);gap:clamp(1.5rem,4vw,4rem)}
@media (max-width:860px){.ln-notes{grid-template-columns:minmax(0,1fr)}}
.ln-notes>*{min-width:0}
.ln-left{padding-top:clamp(2.75rem,2rem + 3vw,4.5rem)}
.credits{position:sticky;top:1rem}
#bio-long-text p{font-family:var(--display);font-size:1.18rem;line-height:1.7}
#bio-long-text p:first-child::first-line{font-variant:small-caps;letter-spacing:.04em}
.credits{border:1px solid var(--ink);padding:1.25rem 1.4rem;background:var(--card)}
.credits .facts{grid-template-columns:minmax(0,1fr);gap:0;padding:0}
.credits .facts div{background:none;outline:0;flex-direction:row;justify-content:space-between;gap:1rem;padding:.45rem 0;border-bottom:1px dotted var(--line)}
.credits .facts dt{font-family:var(--mono);font-size:.82rem;color:var(--soft)}
.credits .facts dd{font-family:var(--mono);font-size:.95rem;font-weight:600;color:var(--ink)}
.credits h3{font-family:var(--mono);font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;margin-bottom:.5rem}
.alt{background:var(--alt)}
.quotes{grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))}
.quotes blockquote{background:var(--card);padding:1.4rem;border-top:4px solid var(--accent)}
.quotes p{font-family:var(--display);font-size:1.25rem;font-style:italic;line-height:1.35}
.pk-photos img{border:10px solid #fbf6ec;box-shadow:0 6px 18px rgba(42,33,24,.18);border-radius:0}
.pk-photos li:nth-child(odd) figure{transform:rotate(-1.2deg)}
.pk-photos li:nth-child(even) figure{transform:rotate(1deg)}
.shows li,.contacts li{border-radius:0}
.streams a,.social a,.files a{border-radius:0;border-color:var(--ink);font-family:var(--mono);font-size:.82rem}`,
      body: (d) => '<header class="ln-hero"><div class="wrap"><div class="ln-grid"><div class="ln-sleeve">' + ((d.album && d.album.cover) || d.photos.portrait ? '<img src="' + attr((d.album && d.album.cover) || d.photos.portrait) + '" width="700" height="700" alt="' + attr(d.album ? d.album.title + " album cover" : d.name) + '" fetchpriority="high">' : "") + "</div>" +
        '<div><p class="ln-cat">Press kit &middot; ' + esc(d.genre || "New music") + '</p><h1 class="ln-name">' + esc(d.name) + "</h1>" + (d.album ? '<p class="ln-album">' + esc(d.album.title) + "</p>" : "") + (d.headline ? '<p style="margin-top:.75rem">' + esc(d.headline) + "</p>" : "") +
        '<p class="ln-meta">' + [d.album && d.album.released ? "Released " + longDate(d.album.released) : "", d.city].filter(Boolean).map((x) => "<span>" + esc(x) + "</span>").join("") + "</p>" +
        (d.tracks.length ? '<section class="ln-side" id="listen" aria-labelledby="listen-t"><h2 id="listen-t">' + esc(d.labels.listen) + " &middot; Side A</h2>" + P.tracks(d) + P.streams(d) + "</section>" : "") + "</div></div></div></header>" +
        '<main id="main"><div class="wrap"><div class="ln-notes"><div class="ln-left">' + (d.facts.length ? '<div class="credits"><h3>Credits &amp; facts</h3>' + P.facts(d) + "</div>" : "") + "</div>" + P.sec("bio", "Liner notes", P.shortBio(d) + P.longBio(d)) + "</div></div>" +
        (d.quotes.length ? '<div class="alt"><div class="wrap">' + P.sec("press", "Reviews", P.quotes(d) + P.fansOf(d) + P.coverage(d)) + "</div></div>" : "") +
        '<div class="wrap">' + P.sec("watch", d.labels.watch, P.videos(d, true)) + P.sec("photos", d.labels.photos, P.photos(d)) + "</div>" +
        '<div class="alt"><div class="wrap">' + P.sec("shows", d.labels.shows, P.shows(d)) + P.sec("highlights", d.labels.highlights, P.highlights(d)) + P.sec("tech", d.labels.tech, P.tech(d)) + "</div></div>" +
        '<div class="wrap">' + P.sec("contact", d.labels.contact, P.contacts(d) + (d.onePager ? '<p style="margin-top:1.25rem">' + P.onePager(d) + "</p>" : "") + P.social(d)) + "</div></main>"
    },

    /* 5. SANCTUARY: warm and gentle, written for churches booking a worship leader */
    sanctuary: {
      name: "Sanctuary", note: "Warm and gentle, with what churches need up front. For worship leaders and ministry artists.",
      fonts: "family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700",
      css: `:root{--bg:#f8f5ef;--alt:#eef0e9;--card:#ffffff;--ink:#23312d;--soft:#55625d;--line:#dcdccf;--accent:#5d7a5f;--accent-ink:#46634a;--link:#3f5c44;--fill:#2f4a3a;--on:#f8f5ef;--radius:16px;--display:"Cormorant Garamond",Georgia,serif;--body:"Nunito Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--gold:#a57b2c}
.sec>h2{font-weight:700;font-size:clamp(2rem,1.5rem + 1.8vw,2.8rem)}
.eyebrow{color:var(--accent-ink)}
.sa-hero{padding-block:clamp(2.5rem,1.5rem + 4vw,5rem);text-align:center;background:radial-gradient(ellipse at 50% 0%,#fffdf8 0%,var(--bg) 70%)}
.sa-arch{width:min(320px,70vw);aspect-ratio:4/5;margin:0 auto 1.75rem;border-radius:999px 999px 18px 18px;overflow:hidden;border:6px solid #fff;box-shadow:0 0 0 1px var(--line),0 20px 40px rgba(35,49,45,.12)}
.sa-arch img{width:100%;height:100%;object-fit:cover}
.sa-name{font-size:clamp(2.8rem,1.6rem + 4.5vw,5rem);font-weight:700;line-height:1}
.sa-head{font-size:1.15rem;color:var(--soft);margin:.75rem auto 0;max-width:38rem}
.sa-verse{margin:1.75rem auto 0;max-width:34rem;font-family:var(--display);font-style:italic;font-size:1.3rem;line-height:1.4;color:var(--ink)}
.sa-verse cite{display:block;margin-top:.4rem;font-family:var(--body);font-style:normal;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.sa-btns{margin-top:1.75rem;display:flex;justify-content:center;flex-wrap:wrap;gap:.75rem}
.btn{border-radius:999px}
.sa-church{background:var(--fill);color:var(--on)}
.sa-church .sec>h2,.sa-church .eyebrow{color:var(--on)}
.sa-church .eyebrow{opacity:.85}
.sa-church-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(1.5rem,4vw,3.5rem);align-items:start}
@media (max-width:820px){.sa-church-grid{grid-template-columns:minmax(0,1fr)}}
.sa-church .tech-dl dt{color:#cfdccf}
.sa-church .tech-dl dd{font-size:1.15rem}
.sa-church .files a{background:transparent;color:var(--on);border-color:rgba(248,245,239,.5)}
.sa-church .files a::before{color:#e3c27a}
.sa-church a{color:var(--on)}
.sa-church .facts div{background:#2a4234;outline-color:rgba(248,245,239,.25)}
.sa-church .facts dd{color:#f0d79a}
.sa-church .facts dt{color:#d7e1d6}
.quotes{grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))}
.quotes blockquote{background:var(--card);padding:1.5rem 1.6rem;border-radius:var(--radius);box-shadow:0 1px 0 var(--line)}
.quotes blockquote::before{content:"\\201C";display:block;font-family:var(--display);font-size:3.5rem;line-height:.6;color:var(--gold);height:1.6rem}
.quotes p{font-family:var(--display);font-size:1.3rem;line-height:1.4}
.alt{background:var(--alt)}
.two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(1.5rem,4vw,3.5rem)}
@media (max-width:820px){.two{grid-template-columns:minmax(0,1fr)}}
.highlights li{background:var(--card);padding:.8rem 1rem;border-radius:12px}
.yr{color:var(--gold);font-size:1.25rem}
.center{text-align:center}
.center .contacts{text-align:left}`,
      body: (d) => '<header class="sa-hero"><div class="wrap">' + (d.photos.portrait ? '<div class="sa-arch"><img src="' + attr(d.photos.portrait) + '" width="800" height="1000" alt="' + attr(d.name) + '" fetchpriority="high"></div>' : "") +
        '<p class="eyebrow">Ministry press kit' + (d.city ? " &middot; " + esc(d.city) : "") + '</p><h1 class="sa-name">' + esc(d.name) + "</h1>" + (d.headline ? '<p class="sa-head">' + esc(d.headline) + "</p>" : "") +
        (d.verse && d.verse.text ? '<blockquote class="sa-verse"><p>' + esc(d.verse.text) + "</p>" + (d.verse.ref ? "<cite>" + esc(d.verse.ref) + "</cite>" : "") + "</blockquote>" : "") +
        '<div class="sa-btns">' + (d.contacts[0] && d.contacts[0].email ? '<a class="btn" href="mailto:' + attr(d.contacts[0].email) + '?subject=' + encodeURIComponent("Booking " + d.name) + '">Invite ' + esc(d.name) + "</a>" : "") + '<a class="btn btn-o" href="' + attr(d.site) + '">Visit the website</a></div></div></header>' +
        '<main id="main">' + ((d.lineup || d.setLength || d.tech.length || d.facts.length) ? '<div class="sa-church"><div class="wrap">' + P.sec("tech", d.labels.tech, '<div class="sa-church-grid">' + P.tech(d) + P.facts(d) + "</div>", "", "For churches and events") + "</div></div>" : "") +
        '<div class="wrap"><div class="two">' + P.sec("bio", d.labels.bio, P.shortBio(d) + P.longBio(d)) + P.sec("listen", d.labels.listen, P.tracks(d) + P.streams(d)) + "</div></div>" +
        (d.quotes.length ? '<div class="alt"><div class="wrap">' + P.sec("press", d.labels.press, P.quotes(d) + P.fansOf(d) + P.coverage(d), "", "Kind words") + "</div></div>" : "") +
        '<div class="wrap">' + P.sec("watch", d.labels.watch, P.videos(d)) + "</div>" +
        ((d.highlights.length || d.events.length) ? '<div class="alt"><div class="wrap"><div class="two">' + P.sec("highlights", d.labels.highlights, P.highlights(d)) + P.sec("shows", d.labels.shows, P.shows(d)) + "</div></div></div>" : "") +
        '<div class="wrap">' + P.sec("photos", d.labels.photos, P.photos(d)) + '<div class="center">' + P.sec("contact", d.labels.contact, P.contacts(d) + (d.onePager ? '<p style="margin-top:1.25rem">' + P.onePager(d) + "</p>" : "") + P.social(d)) + "</div></div></main>"
    }
  };

  /* ---------- assemble one page ---------- */
  function render(recipe, design, opts) {
    opts = opts || {};
    const key = DESIGNS[design] ? design : "headliner";
    const D = DESIGNS[key], d = data(recipe);
    const domain = String(recipe.domain || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const url = domain ? "https://" + domain + "/epk/" : "";
    const desc = (d.short || d.headline || d.name + " electronic press kit").slice(0, 300);
    const share = d.photos.hero || d.photos.portrait || "";
    const fonts = D.fonts ? '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?' + D.fonts.replace(/&/g, "&amp;") + '&amp;display=swap" rel="stylesheet">\n' : "";
    const ld = { "@context": "https://schema.org", "@type": recipe.epk && recipe.epk.isGroup ? "MusicGroup" : "Person", name: d.name, description: desc };
    if (domain) ld.url = "https://" + domain + "/";
    if (share && /^https?:/.test(share)) ld.image = share;
    const sameAs = Object.values(d.social).concat(Object.values(d.streams)).filter((u) => /^https?:/.test(u) && !/REPLACE/.test(u));
    if (sameAs.length) ld.sameAs = Array.from(new Set(sameAs));
    if (ld["@type"] === "MusicGroup" && d.genre) ld.genre = d.genre;
    const title = d.name + " | Electronic Press Kit";
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
      "<title>" + esc(title) + "</title>\n" +
      '<meta name="description" content="' + attr(desc) + '">\n' +
      '<meta name="robots" content="' + (opts.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large") + '">\n' +
      (url ? '<link rel="canonical" href="' + attr(url) + '">\n' : "") +
      '<meta property="og:type" content="website">\n<meta property="og:title" content="' + attr(title) + '">\n<meta property="og:description" content="' + attr(desc) + '">\n' + (share ? '<meta property="og:image" content="' + attr(share) + '">\n' : "") + (url ? '<meta property="og:url" content="' + attr(url) + '">\n' : "") +
      '<meta name="twitter:card" content="summary_large_image">\n' +
      '<meta name="theme-color" content="' + (/--bg:(#[0-9a-f]{6})/i.exec(D.css) || [0, "#ffffff"])[1] + '">\n' +
      '<meta name="generator" content="Two Fish EPK Kit ' + VERSION + " (" + key + ')">\n' +
      fonts +
      "<style>\n" + BASE + "\n" + D.css + "\n</style>\n" +
      '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, "\\u003c") + "</script>\n" +
      "</head>\n<body>\n" +
      '<a class="skip" href="#main">Skip to the press kit</a>\n' +
      D.body(d) + "\n" +
      '<footer class="site-foot"><div class="wrap"><span>&copy; ' + new Date().getFullYear() + " " + esc(d.name) + (d.updated ? " &middot; Updated " + esc(d.updated) : "") + '</span><a href="' + attr(d.site) + '">' + esc(domain || "Back to the website") + "</a></div></footer>\n" +
      "<script>" + SCRIPT + "</script>\n</body>\n</html>\n";
  }

  return { VERSION, render, designs: Object.keys(DESIGNS).map((k) => ({ id: k, name: DESIGNS[k].name, note: DESIGNS[k].note })) };
});
