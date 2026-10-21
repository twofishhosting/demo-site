/*!
 * Two Fish Site Kit
 * One style layer + one section library + one assembler.
 * assemble(recipe) returns a complete, self-contained, W3C-valid page.
 * Works in Node (build.js) and in the browser (the Site Builder).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TwoFishKit = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ======================================================================
     1. STYLES — every section reads only these tokens
     ====================================================================== */
  const STYLES = {
    sanctuary: {
      name: "Sanctuary", note: "Ivory, navy and gold leaf",
      fonts: "family=Cormorant+Garamond:ital,wght@0,600;1,500&family=Manrope:wght@400;500;700",
      t: { bg: "#faf7f1", alt: "#f2ece1", ink: "#1f2b45", soft: "#56607a", accent: "#85601f", fill: "#1f2b45", on: "#faf7f1", line: "#e2d9c9", card: "#ffffff",
           display: '"Cormorant Garamond",Georgia,"Times New Roman",serif', body: '"Manrope",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
           dw: "600", radius: "14px", "h-case": "none", "h-scale": "1", "h-track": "0", deco: "#b48a3c" }
    },
    stage: {
      name: "Stage Light", note: "Stage-dark with warm gold",
      fonts: "",
      t: { bg: "#0e0e12", alt: "#17171d", ink: "#f3f1ec", soft: "#b9b5ad", accent: "#e2a83e", fill: "#e2a83e", on: "#111111", line: "#2c2c35", card: "#202028",
           display: 'Georgia,"Times New Roman",serif', body: 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
           dw: "700", radius: "8px", "h-case": "none", "h-scale": "1", "h-track": ".01em", deco: "#e2a83e" }
    },
    sunlit: {
      name: "Sunlit Editorial", note: "Cream, terracotta, bold type",
      fonts: "family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;700",
      t: { bg: "#f5efe4", alt: "#ebe2d2", ink: "#1f2a24", soft: "#4d5a52", accent: "#a3401f", fill: "#b8492a", on: "#ffffff", line: "#d6cab5", card: "#fff8ec",
           display: '"Bricolage Grotesque",system-ui,sans-serif', body: '"DM Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
           dw: "800", radius: "18px", "h-case": "none", "h-scale": "1", "h-track": "-.02em", deco: "#e0b44a" }
    },
    vinyl: {
      name: "Golden Hour Vinyl", note: "70s sunset, retro and playful",
      fonts: "family=Unbounded:wght@600;800&family=Instrument+Sans:wght@400;600;700&family=Caveat:wght@600",
      t: { bg: "#24113f", alt: "#321a57", ink: "#fff3e2", soft: "#d2c3d6", accent: "#ffb547", fill: "#ffb547", on: "#2a1636", line: "#4a3470", card: "#2c1650",
           display: '"Unbounded",system-ui,sans-serif', body: '"Instrument Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
           dw: "800", radius: "20px", "h-case": "uppercase", "h-track": "-.01em", "h-scale": ".78", deco: "#ff7a59" }
    },
    still: {
      name: "Still Water", note: "Soft, simple, lots of white space",
      fonts: "family=Instrument+Serif:ital@0;1&family=Figtree:wght@300;400;500",
      t: { bg: "#fbfaf7", alt: "#f4f1ec", ink: "#3b3835", soft: "#6f6962", accent: "#8a6553", fill: "#3b3835", on: "#fbfaf7", line: "#e6e1d8", card: "#ffffff",
           display: '"Instrument Serif",Georgia,"Times New Roman",serif', body: '"Figtree",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
           dw: "400", radius: "24px", "h-case": "none", "h-scale": "1", "h-track": "0", deco: "#b9c3b5" }
    }
  };

  /* ======================================================================
     2. SAMPLE CONTENT — every recipe value falls back to these
     ====================================================================== */
  const U = (id, w, h) => "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + w + "&h=" + h + "&q=75";
  const SAMPLE = {
    style: "sanctuary",
    name: "Artist Name",
    headline: "Christian singer-songwriter from Jacksonville, FL",
    intro: "Songs of faith, family and the long roads in between. The new album is out now.",
    description: "Artist Name is a Christian singer-songwriter from Jacksonville, FL. Listen to the new album, watch videos, see upcoming dates and book a show.",
    domain: "www.example.com",
    city: "Jacksonville, FL",
    genre: ["Contemporary Christian", "Worship", "Singer-Songwriter"],
    verse: { text: "O sing unto the LORD a new song: sing unto the LORD, all the earth.", ref: "Psalm 96:1 · KJV" },
    photos: {
      hero: U("1579975329590-63d9c57b2dad", 1920, 1080),
      portrait: U("1474752651386-dc296d69dc90", 800, 1000),
      wide: U("1579975329590-63d9c57b2dad", 1600, 700),
      album: "https://picsum.photos/id/453/700/700",
      story: U("1548198192-9d518ae62ccc", 800, 1000)
    },
    album: {
      title: "Album Title", released: "2026-09-12", note: "Six songs written in one quiet season, recorded live with a few close friends.",
      bandcampAlbumId: "", bandcampUrl: "https://REPLACE.bandcamp.com/album/REPLACE",
      tracks: [
        { title: "Track One", length: "3:42", ref: "Psalm 23", story: "The story behind Track One: the season it was written in and the verse that would not let go.", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", free: true, buy: "" },
        { title: "Track Two", length: "4:05", ref: "Psalm 40:1–3", story: "The story behind Track Two.", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", free: true, buy: "" },
        { title: "Track Three", length: "3:18", ref: "Psalm 46:10", story: "The story behind Track Three.", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", free: false, buy: "https://REPLACE.bandcamp.com/track/track-three" },
        { title: "Track Four", length: "4:31", ref: "Psalm 91", story: "The story behind Track Four.", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", free: false, buy: "https://REPLACE.bandcamp.com/track/track-four" }
      ]
    },
    streams: { Spotify: "https://open.spotify.com/artist/REPLACE", "Apple Music": "https://music.apple.com/us/artist/REPLACE", "YouTube Music": "https://music.youtube.com/channel/REPLACE", Bandcamp: "https://REPLACE.bandcamp.com" },
    videos: [
      { id: "gsnqXt7d1mU", title: "Track One (Live)" }, { id: "HccqokXN2n8", title: "Track Two (Acoustic)" },
      { id: "6stlCkUDG_s", title: "Track Three (Lyric Video)" }, { id: "eg2g6FPsdLI", title: "The Story Behind the Album" }
    ],
    events: [
      { start: "2026-11-14T19:00:00-05:00", venue: "The Listening Room", city: "Jacksonville", region: "FL", note: "Doors 6:30 PM", url: "https://www.example.com/tickets/2026-11-14", price: "20.00", kind: "venue" },
      { start: "2026-11-22T10:30:00-05:00", venue: "Grace Community Church", city: "Savannah", region: "GA", note: "Sunday service", url: "https://www.example.com/events/2026-11-22", price: "0", kind: "church" },
      { start: "2026-12-12T19:00:00-06:00", venue: "Hope Chapel", city: "Nashville", region: "TN", note: "Christmas by Candlelight", url: "https://www.example.com/tickets/2026-12-12", price: "15.00", kind: "church" }
    ],
    story: {
      paragraphs: ["Raised on front-porch harmonies and Sunday hymns, Artist Name writes songs about faith, family and the quiet places where hope grows.",
                   "EDIT: A few sentences of testimony in the artist's own words: how they came to faith, and why they write."],
      quote: "A voice that sounds like it has lived every word it sings.", quoteSource: "Publication Name"
    },
    resources: [
      { song: "Track One", key: "G", tempo: "72", ccli: "0000001", chart: "/resources/track-one-chords.pdf", lead: "/resources/track-one-lead.pdf" },
      { song: "Track Two", key: "D", tempo: "68", ccli: "0000002", chart: "/resources/track-two-chords.pdf", lead: "/resources/track-two-lead.pdf" },
      { song: "Track Three", key: "E", tempo: "124", ccli: "0000003", chart: "/resources/track-three-chords.pdf", lead: "" }
    ],
    podcast: { show: "The Show Name Podcast", episode: 112, title: "Writing Worship from the Psalms", date: "2026-10-08", minutes: 48, host: "Host Name",
               summary: "Artist Name talks about writing the new album through a hard season and what small churches taught them about leading worship.",
               type: "youtube", id: "eg2g6FPsdLI", src: "", links: { Spotify: "https://open.spotify.com/episode/REPLACE", "Apple Podcasts": "https://podcasts.apple.com/us/podcast/REPLACE" } },
    merch: [
      { name: "Vinyl LP", price: "$28", desc: "180g pressing with lyric insert.", url: "https://REPLACE.fourthwall.com/products/vinyl-lp", photo: "https://picsum.photos/id/145/500/500" },
      { name: "Tour Tee", price: "$25", desc: "Soft cotton, unisex sizes.", url: "https://REPLACE.fourthwall.com/products/tour-tee", photo: "https://picsum.photos/id/96/500/500" },
      { name: "Signed CD", price: "$15", desc: "Personally signed.", url: "https://REPLACE.fourthwall.com/products/signed-cd", photo: "https://picsum.photos/id/39/500/500" }
    ],
    contact: { booking: "booking@example.com", email: "hello@example.com", presskit: "/press-kit.pdf", newsletterAction: "https://www.example.com/subscribe", prayerAction: "https://www.example.com/prayer" },
    social: { Instagram: "https://www.instagram.com/REPLACE", Facebook: "https://www.facebook.com/REPLACE", YouTube: "https://www.youtube.com/@REPLACE", Spotify: "https://open.spotify.com/artist/REPLACE" },
    sections: [
      { k: "hero", v: "arch" }, { k: "music", v: "album" }, { k: "videos", v: "feature" },
      { k: "dates", v: "list" }, { k: "story", v: "portrait" }, { k: "contact", v: "letter" }
    ]
  };

  /* ======================================================================
     3. HELPERS
     ====================================================================== */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const attr = esc;
  const ext = (href) => ' href="' + attr(href) + '"' + (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function parts(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || "");
    if (!m) return { mon: "", day: "", wk: "", time: "", year: "" };
    const y = +m[1], mo = +m[2] - 1, d = +m[3];
    const wk = DAYS[new Date(Date.UTC(y, mo, d)).getUTCDay()];
    let time = "";
    if (m[4]) { let h = +m[4]; const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; time = h + ":" + m[5] + " " + ap; }
    return { mon: MONTHS[mo], day: String(d).padStart(2, "0"), wk, time, year: String(y) };
  }
  function longDate(iso) { const p = parts(iso); return p.mon ? p.mon + " " + (+p.day) + ", " + p.year : ""; }
  const WHOLE = ["streams", "social", "links"]; // link lists: the recipe's list replaces the sample's, never mixes with it
  function merge(base, over) {
    if (Array.isArray(base) || typeof base !== "object" || base === null) return over === undefined ? base : over;
    const out = {};
    for (const k of Object.keys(base)) out[k] = over && WHOLE.includes(k) && over[k] !== undefined ? over[k] : merge(base[k], over ? over[k] : undefined);
    if (over) for (const k of Object.keys(over)) if (!(k in out)) out[k] = over[k];
    return out;
  }
  const PH = (label) => "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9c3d9"/><stop offset="1" stop-color="#e9ddd0"/></linearGradient></defs><rect width="800" height="800" fill="url(#g)"/><text x="400" y="410" text-anchor="middle" font-family="sans-serif" font-size="34" fill="#5b5566" letter-spacing="4">' + label + "</text></svg>");

  /* ======================================================================
     4. CSS — base (every page) + one block per section design
     ====================================================================== */
  const BASE_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
[hidden]{display:none !important}
img,svg,iframe{display:block;max-width:100%}
img{height:auto}
button,input,textarea{font:inherit;color:inherit}
ul,ol{list-style:none}
html{scroll-behavior:smooth}
body{min-width:320px;color:var(--ink);background:var(--bg);font-family:var(--body);font-size:1.0625rem;line-height:1.7}
a{color:var(--accent)}
a:hover{color:var(--ink)}
section[id]{scroll-margin-top:5rem}
.wrap{width:100%;max-width:70rem;margin:0 auto;padding:0 1.25rem}
.sec{padding:clamp(4rem,3rem + 4vw,6.5rem) 0}
.sec.alt{background:var(--alt)}
.center{text-align:center}
.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.eyebrow{display:block;margin-bottom:.8rem;font-size:.78rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--accent)}
.title{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2rem,1.4rem + 2.6vw,3.4rem));overflow-wrap:break-word;line-height:1.05;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.lead{max-width:38rem;margin-top:1rem;color:var(--soft);font-size:1.1rem}
.center .lead{margin-left:auto;margin-right:auto}
.head{margin-bottom:2.5rem}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:2.9rem;padding:.75rem 1.4rem;border:1px solid var(--fill);border-radius:999px;background:var(--fill);color:var(--on);font-weight:700;font-size:.95rem;line-height:1.2;text-decoration:none;cursor:pointer;transition:opacity .2s ease}
.btn:hover{color:var(--on);opacity:.88}
.btn-o{background:transparent;color:var(--ink);border-color:var(--line)}
.btn-o:hover{color:var(--ink);border-color:var(--ink)}
.btn-sm{min-height:2.6rem;padding:.5rem 1rem;font-size:.85rem}
.btns{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.75rem}
.center .btns{justify-content:center}
.btn:focus-visible,a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.skip{position:absolute;top:-3rem;left:1rem;z-index:100;padding:.5rem 1rem;border-radius:.5rem;background:var(--fill);color:var(--on);font-weight:700;text-decoration:none}
.skip:focus{top:1rem}
.chip{display:inline-flex;align-items:center;min-height:2.6rem;padding:0 .9rem;border:1px solid var(--line);border-radius:999px;font-size:.82rem;font-weight:600;color:var(--ink);text-decoration:none;white-space:nowrap}
.chip:hover{border-color:var(--accent);color:var(--ink)}
.photo{width:100%;object-fit:cover;border-radius:var(--radius);background:var(--alt)}
.field{width:100%;padding:.8rem 1rem;border:1px solid var(--line);border-radius:.6rem;background:var(--card);color:var(--ink)}
.field::placeholder{color:var(--soft)}
/* header */
.site-header{position:sticky;top:0;z-index:50;background:var(--bg);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;max-width:70rem;margin:0 auto;padding:.9rem 1.25rem}
.logo{font-family:var(--display);font-weight:var(--dw);font-size:1.5rem;line-height:1;letter-spacing:var(--h-track);text-transform:var(--h-case);color:var(--ink);text-decoration:none}
.logo:hover{color:var(--ink)}
.menu{display:flex;align-items:center;gap:1.6rem}
.menu a{font-size:.88rem;font-weight:500;color:var(--soft);text-decoration:none}
.menu a:hover{color:var(--ink)}
.menu-btn{display:none;padding:.4rem .9rem;border:1px solid var(--line);border-radius:999px;background:transparent;font-size:.85rem;font-weight:700;cursor:pointer}
@media (max-width:52em){
  .menu-btn{display:block}
  .menu{position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;padding:0 1.25rem;background:var(--bg);border-bottom:1px solid var(--line);max-height:0;overflow:hidden;visibility:hidden;transition:max-height .35s ease,visibility 0s linear .35s}
  .menu.open{max-height:30rem;visibility:visible;transition:max-height .35s ease,visibility 0s}
  .menu li{border-top:1px solid var(--line)}
  .menu a{display:block;padding:.95rem 0;font-size:1.05rem;color:var(--ink)}
}
/* footer */
.site-footer{padding:3.5rem 0 2.5rem;border-top:1px solid var(--line);text-align:center}
.foot-name{font-family:var(--display);font-weight:var(--dw);font-size:1.7rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.social{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem 1.6rem;margin:1.25rem 0 1.5rem}
.social a{font-size:.85rem;font-weight:600;color:var(--soft);text-decoration:none}
.social a:hover{color:var(--ink)}
.fine{font-size:.8rem;color:var(--soft)}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition-duration:.01ms !important;animation:none !important}}
`;

  const CSS = {
    "hero/arch": `.hero-arch{padding:clamp(3rem,2rem + 4vw,6rem) 0}
.hero-arch .grid{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.hero-arch h1{overflow-wrap:break-word;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.6rem,1.6rem + 4.2vw,5rem));line-height:1;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.hero-arch .frame{position:relative}
.hero-arch .frame::before{content:"";position:absolute;inset:-1.25rem 1.25rem 1.25rem -1.25rem;border-radius:999px 999px var(--radius) var(--radius);background:var(--alt)}
.hero-arch .frame img{position:relative;aspect-ratio:4 / 5;border-radius:999px 999px var(--radius) var(--radius)}
@media (max-width:52em){.hero-arch .grid{grid-template-columns:1fr}.hero-arch .frame{max-width:22rem;margin:1.5rem auto 0;order:-1}}`,
    "hero/photo": `.hero-photo{position:relative;display:flex;align-items:flex-end;min-height:min(80vh,44rem);padding:6rem 0 3.5rem;overflow:hidden;color:#fff}
.hero-photo > img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover}
.hero-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgb(0 0 0 / 10%) 0%,rgb(0 0 0 / 45%) 50%,rgb(0 0 0 / 82%) 100%)}
.hero-photo .wrap{position:relative;z-index:1}
.hero-photo .eyebrow{color:#fff}
.hero-photo h1{overflow-wrap:break-word;max-width:16em;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.6rem,1.6rem + 4.5vw,5.5rem));line-height:1;letter-spacing:var(--h-track);text-transform:var(--h-case);text-shadow:0 2px 14px rgb(0 0 0 / 50%);text-wrap:balance}
.hero-photo .lead{color:rgb(255 255 255 / 88%);text-shadow:0 1px 6px rgb(0 0 0 / 60%)}
.hero-photo .btn-o{color:#fff;border-color:rgb(255 255 255 / 70%)}
.hero-photo .btn-o:hover{color:#fff;border-color:#fff}`,
    "hero/verse": `.hero-verse{padding:clamp(3.5rem,2rem + 5vw,6.5rem) 0 0;text-align:center;background:radial-gradient(ellipse 60% 55% at 50% 0%,var(--alt) 0%,transparent 75%),var(--bg)}
.hero-verse h1{overflow-wrap:break-word;max-width:15em;margin:0 auto;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.6rem,1.6rem + 4.2vw,5rem));line-height:1.02;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.hero-verse blockquote{max-width:34rem;margin:1.5rem auto 0;font-family:var(--display);font-style:italic;font-size:clamp(1.15rem,1rem + .8vw,1.5rem);line-height:1.4;color:var(--soft)}
.hero-verse cite{display:block;margin-top:.5rem;font-family:var(--body);font-size:.78rem;font-style:normal;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.hero-verse .wide{margin-top:3.5rem;aspect-ratio:21 / 9;border-radius:var(--radius) var(--radius) 0 0}
@media (max-width:40em){.hero-verse .wide{aspect-ratio:4 / 3}}`,
    "hero/quiet": `.hero-quiet{padding:clamp(4rem,2.5rem + 6vw,8rem) 0;text-align:center}
.hero-quiet .face{width:9rem;height:9rem;margin:0 auto 2rem;border-radius:50%;aspect-ratio:1}
.hero-quiet h1{overflow-wrap:break-word;max-width:14em;margin:0 auto;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.6rem,1.6rem + 4.2vw,5rem));line-height:1.02;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}`,
    "hero/record": `.hero-record{padding:clamp(3rem,2rem + 4vw,6rem) 0;overflow:hidden;background:linear-gradient(180deg,var(--bg) 0%,var(--alt) 100%)}
.hero-record .grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.hero-record h1{overflow-wrap:break-word;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.4rem,1.4rem + 4.2vw,4.8rem));line-height:1;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.turntable{position:relative;width:min(100%,28rem);aspect-ratio:1;margin:0 auto}
.turntable .sun{position:absolute;inset:-5%;border-radius:50%;background:linear-gradient(180deg,var(--accent),var(--deco));opacity:.9}
.turntable .disc{position:absolute;inset:7%;border-radius:50%;background:repeating-radial-gradient(circle at center,#141018 0 2px,#231b2b 2px 3px,#141018 3px 5px);box-shadow:0 24px 50px -20px rgb(0 0 0 / 80%);animation:spin 7s linear infinite}
.turntable .label{position:absolute;inset:33%;overflow:hidden;border-radius:50%}
.turntable .label img{width:100%;height:100%;object-fit:cover}
.turntable.paused .disc{animation-play-state:paused}
.spin{position:absolute;right:2%;bottom:4%;width:3.25rem;height:3.25rem;border:0;border-radius:50%;background:var(--ink);color:var(--bg);cursor:pointer;font-size:1rem}
@keyframes spin{to{transform:rotate(360deg)}}
@media (max-width:52em){.hero-record .grid{grid-template-columns:1fr;text-align:center}.hero-record .btns{justify-content:center}.hero-record .lead{margin-left:auto;margin-right:auto}.turntable{width:min(80%,20rem);order:-1}}`,

    player: `.lp{margin:1.75rem 0}
.lp-player{border:1px solid var(--line);border-radius:var(--radius);background:var(--card);overflow:hidden}
.lp-now{display:grid;grid-template-columns:auto 1fr;gap:1rem;align-items:center;padding:1.1rem 1.25rem;border-bottom:1px solid var(--line)}
.lp-now.solo{border-bottom:0}
.lp-toggle{display:grid;place-items:center;width:3.25rem;height:3.25rem;border:0;border-radius:50%;background:var(--fill);color:var(--on);font-size:1rem;cursor:pointer}
.lp-meta{min-width:0}
.lp-title{font-family:var(--display);font-weight:var(--dw);font-size:1.25rem;line-height:1.2;overflow-wrap:anywhere}
.lp-bar{display:flex;align-items:center;gap:.75rem;margin-top:.4rem;font-size:.8rem;color:var(--soft);font-variant-numeric:tabular-nums}
.lp-seek{flex:1;min-width:0;height:1.5rem;accent-color:var(--accent);cursor:pointer}
.lp-list li{display:grid;grid-template-columns:auto auto 1fr auto auto;gap:.6rem 1rem;align-items:center;padding:.7rem 1.25rem;border-bottom:1px solid var(--line)}
.lp-list li:last-child{border-bottom:0}
.lp-list li.on{background:var(--alt)}
.lp-play{display:grid;place-items:center;width:2.6rem;height:2.6rem;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--ink);font-size:.75rem;cursor:pointer}
.lp-num{min-width:1.6rem;font-size:.85rem;color:var(--accent);font-variant-numeric:tabular-nums}
.lp-name{min-width:0;overflow-wrap:anywhere}
.lp-time{font-size:.85rem;color:var(--soft);font-variant-numeric:tabular-nums}
.also{margin:1.5rem 0 .7rem;font-size:.78rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.streams{display:flex;flex-wrap:wrap;gap:.5rem}
.store{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-top:1.5rem;padding:1.1rem 1.25rem}
.store p{color:var(--soft);font-size:.95rem}
.store strong{display:block;color:var(--ink)}
.store-actions{display:flex;flex-wrap:wrap;gap:.6rem}
.bc-embed iframe{display:block;width:100%;height:472px;margin-top:1rem;border:0;border-radius:var(--radius)}
@media (max-width:36em){.lp-list li{grid-template-columns:auto 1fr auto;padding:.7rem 1rem}.lp-num,.lp-time{display:none}}`,
    "music/album": `.music-album .grid{display:grid;grid-template-columns:minmax(0,22rem) 1fr;gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:start}
.music-album .cover{aspect-ratio:1;border-radius:calc(var(--radius) / 2);box-shadow:0 28px 50px -30px rgb(0 0 0 / 55%)}
.music-album .meta{margin-top:.6rem;color:var(--soft)}
@media (max-width:52em){.music-album .grid{grid-template-columns:1fr}.music-album .cover{max-width:20rem}}`,
    "music/stories": `.music-stories .grid{display:grid;grid-template-columns:minmax(0,20rem) 1fr;gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:start}
.music-stories .cover{aspect-ratio:1;border-radius:calc(var(--radius) / 2)}
.songs{margin-top:1.5rem;border-top:1px solid var(--line)}
.song-row{display:grid;grid-template-columns:auto 1fr;gap:.25rem .75rem;align-items:start;padding-left:.25rem;border-bottom:1px solid var(--line)}
.song-row.on{background:var(--alt)}
.song-row > .lp-play{margin-top:.6rem}
.song-row summary{display:flex;flex-wrap:wrap;align-items:baseline;gap:.3rem 1rem;padding:.9rem .5rem .9rem 0;cursor:pointer;list-style:none}
.song-row summary::-webkit-details-marker{display:none}
.song-row summary::after{content:"+";margin-left:auto;color:var(--accent)}
.song-row details[open] summary::after{content:"−"}
.song-row .ref{font-family:var(--display);font-style:italic;color:var(--soft)}
.song-row .len{color:var(--soft);font-size:.9rem;font-variant-numeric:tabular-nums}
.song-story{padding:0 .5rem 1.1rem 0;color:var(--soft)}
.song-story .acts{margin-top:.75rem}
@media (max-width:52em){.music-stories .grid{grid-template-columns:1fr}.music-stories .cover{max-width:18rem}}`,
    "music/compact": `.music-compact .box{max-width:44rem;margin:0 auto}
.music-compact .streams{justify-content:center}`,

    "videos/feature": `.video-frame{position:relative;overflow:hidden;aspect-ratio:16 / 9;max-width:100%;border-radius:var(--radius);background:var(--alt)}
.video-frame iframe{width:100%;height:100%;border:0}
.vload{position:relative;display:block;width:100%;height:100%;padding:0;border:0;background:var(--alt);cursor:pointer}
.vload img{width:100%;height:100%;object-fit:cover}
.vload .play{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:4.25rem;height:4.25rem;border-radius:50%;background:rgb(255 255 255 / 92%);color:#111;font-size:1.05rem;transform:translate(-50%,-50%)}
.vcap{margin-top:1rem;font-family:var(--display);font-weight:var(--dw);font-size:1.4rem;text-align:center}
.vlist{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin-top:1.25rem}
.vlist button{min-height:2.6rem;padding:0 1rem;border:1px solid var(--line);border-radius:999px;background:transparent;font-size:.88rem;color:var(--soft);cursor:pointer}
.vlist button[aria-pressed="true"]{border-color:var(--ink);color:var(--ink)}`,
    "videos/grid": `.video-frame{position:relative;overflow:hidden;aspect-ratio:16 / 9;max-width:100%;border-radius:var(--radius);background:var(--alt)}
.video-frame iframe{width:100%;height:100%;border:0}
.vload{position:relative;display:block;width:100%;height:100%;padding:0;border:0;background:var(--alt);cursor:pointer}
.vload img{width:100%;height:100%;object-fit:cover}
.vload .play{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:3.5rem;height:3.5rem;border-radius:50%;background:rgb(255 255 255 / 92%);color:#111;font-size:.95rem;transform:translate(-50%,-50%)}
.vgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}
.vgrid h3{margin-top:.75rem;font-family:var(--display);font-weight:var(--dw);font-size:1.2rem;letter-spacing:var(--h-track)}
@media (max-width:36em){.vgrid{grid-template-columns:1fr}}`,

    "dates/list": `.none{max-width:36rem;margin:0 auto;text-align:center;color:var(--soft)}
.dlist{max-width:52rem;margin:0 auto;border-top:1px solid var(--line)}
.dlist li{display:grid;grid-template-columns:7rem 1fr auto;gap:1.5rem;align-items:center;padding:1.4rem 0;border-bottom:1px solid var(--line)}
.dlist time{font-family:var(--display);font-weight:var(--dw);font-size:1.5rem;line-height:1.1}
.dlist time small,.dlist .where small{display:block;margin-top:.2rem;font-family:var(--body);font-size:.8rem;font-weight:400;color:var(--soft)}
@media (max-width:36em){.dlist li{grid-template-columns:5.5rem 1fr}.dlist .btn{grid-column:2;justify-self:start}}`,
    "dates/tickets": `.none{max-width:36rem;margin:0 auto;text-align:center;color:var(--soft)}
.tickets{display:grid;gap:1rem;max-width:52rem;margin:0 auto}
.ticket{display:grid;grid-template-columns:7rem 1fr 10rem;overflow:hidden}
.ticket time{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.1rem .5rem;background:var(--fill);color:var(--on);font-family:var(--display);font-weight:var(--dw);line-height:1;text-align:center}
.ticket time .m{font-family:var(--body);font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.ticket time .d{margin:.3rem 0;font-size:2.4rem}
.ticket time .w{font-family:var(--body);font-size:.75rem;font-weight:400}
.ticket .body{padding:1.1rem 1.4rem}
.ticket .city{font-family:var(--display);font-weight:var(--dw);font-size:1.35rem;line-height:1.15;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.ticket .body p{color:var(--soft);font-size:.95rem}
.ticket .stub{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1rem;border-left:2px dashed var(--line)}
.ticket .price{font-family:var(--display);font-weight:var(--dw);font-size:1.2rem}
@media (max-width:40em){.ticket{grid-template-columns:5.5rem 1fr}.ticket .stub{grid-column:1 / -1;flex-direction:row;justify-content:space-between;border-left:0;border-top:2px dashed var(--line)}}`,

    "story/portrait": `.story-portrait .grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.story-portrait .photo{aspect-ratio:4 / 5}
.story-portrait p + p{margin-top:1rem}
.story-portrait .body p{color:var(--soft)}
.story-portrait blockquote{margin-top:2rem;padding:1.4rem 1.6rem;border-radius:var(--radius);background:var(--alt)}
.story-portrait blockquote p{font-family:var(--display);font-weight:var(--dw);font-size:1.25rem;line-height:1.4;color:var(--ink)}
.story-portrait cite{display:block;margin-top:.6rem;font-size:.85rem;font-style:normal;color:var(--accent)}
@media (max-width:52em){.story-portrait .grid{grid-template-columns:1fr}.story-portrait .photo{max-width:22rem}}`,
    "story/quote": `.story-quote .box{max-width:40rem;margin:0 auto}
.story-quote .body p{margin-top:1.1rem;color:var(--soft)}
.story-quote .body p:first-child{color:var(--ink);font-size:1.2rem}
.story-quote blockquote{margin-top:3rem;text-align:center}
.story-quote blockquote p{font-family:var(--display);font-style:italic;font-size:clamp(1.5rem,1.2rem + 1.4vw,2.2rem);line-height:1.3}
.story-quote cite{display:block;margin-top:1rem;font-size:.8rem;font-style:normal;letter-spacing:.2em;text-transform:uppercase;color:var(--soft)}`,

    "resources/table": `.res-note{max-width:44rem;margin:0 auto 2rem;padding:1.1rem 1.4rem;color:var(--soft);font-size:.95rem}
.res-note strong{color:var(--ink)}
.tbl{overflow-x:auto;border:1px solid var(--line);border-radius:var(--radius);background:var(--card)}
.res{width:100%;min-width:36rem;border-collapse:collapse}
.res th,.res td{padding:.9rem 1.1rem;border-bottom:1px solid var(--line);text-align:left;vertical-align:middle}
.res thead th{font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
.res tbody th{font-family:var(--display);font-weight:var(--dw);font-size:1.15rem}
.res tbody tr:last-child th,.res tbody tr:last-child td{border-bottom:0}
.res .num{font-variant-numeric:tabular-nums;white-space:nowrap}
.res .dl{display:flex;flex-wrap:wrap;gap:.4rem}`,
    "podcast/feature": `.pod{display:grid;grid-template-columns:15rem 1fr;gap:2.5rem;align-items:start;max-width:60rem;margin:0 auto;padding:2rem}
.pod .art{display:grid;place-items:center;aspect-ratio:1;border-radius:calc(var(--radius) / 1.5);background:var(--fill);color:var(--on)}
.pod .art svg{width:40%;height:40%}
.pod .badge{display:inline-block;padding:.2rem .7rem;border-radius:999px;background:var(--alt);font-size:.72rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--accent)}
.pod .show{margin-top:.8rem;font-size:.88rem;font-weight:700;color:var(--soft)}
.pod h3{margin:.2rem 0 .4rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.5rem,1.2rem + 1.2vw,2.1rem));line-height:1.1;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.pod .when{font-size:.9rem;color:var(--soft)}
.pod .sum{margin-top:.9rem;color:var(--soft)}
.pod-player{margin-top:1.25rem}
.pod-player iframe{display:block;width:100%;border:0;border-radius:var(--radius)}
.pod-player iframe.video{aspect-ratio:16 / 9;height:auto}
.pod-player audio{width:100%}
.pod .also-on{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1.1rem;margin-top:1.1rem;font-size:.9rem;font-weight:700}
.pod .also-on span{font-weight:400;color:var(--soft)}
.more-int{max-width:60rem;margin:2rem auto 0}
.more-int h3{margin:0 0 .7rem;font-size:.78rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.more-int li{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.25rem 1rem;padding:.85rem 0;border-bottom:1px solid var(--line)}
.more-int li a{font-weight:600}
.more-int li span{color:var(--soft);font-size:.9rem}
@media (max-width:52em){.pod{grid-template-columns:1fr;padding:1.4rem}.pod .art{max-width:12rem}}`,
    "merch/cards": `.merch{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem}
.merch article{display:flex;flex-direction:column;padding:1rem}
.merch img{aspect-ratio:1;border-radius:calc(var(--radius) / 1.5)}
.merch .top{display:flex;justify-content:space-between;gap:1rem;margin-top:1rem}
.merch h3{font-family:var(--display);font-weight:var(--dw);font-size:1.2rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.merch .price{font-weight:700;color:var(--accent)}
.merch p{flex:1;margin:.3rem 0 1rem;color:var(--soft);font-size:.95rem}
.merch .btn{align-self:flex-start}
@media (max-width:52em){.merch{grid-template-columns:1fr;max-width:24rem;margin:0 auto}}`,
    "prayer/form": `.prayer{max-width:42rem;margin:0 auto;padding:2.5rem 2rem;text-align:center}
.prayer form{margin-top:1.75rem;text-align:left}
.prayer label{display:block;margin-bottom:.35rem;font-size:.85rem;font-weight:700}
.prayer textarea.field{min-height:7rem;resize:vertical}
.prayer .two{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem}
.prayer .check{display:flex;gap:.6rem;align-items:flex-start;margin-top:1rem;font-size:.9rem;font-weight:400;color:var(--soft)}
.prayer .check input{width:1.1rem;height:1.1rem;margin-top:.3rem;accent-color:var(--fill)}
.prayer .go{margin-top:1.5rem;text-align:center}
.prayer .fine{margin-top:1rem;text-align:center}
@media (max-width:36em){.prayer{padding:1.75rem 1.1rem}.prayer .two{grid-template-columns:1fr}}`,
    "contact/letter": `.letter-form{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;max-width:32rem;margin:2.25rem auto 0}
.letter-form .field{flex:1 1 15rem;min-height:2.9rem;border-radius:999px}
.contacts{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem 2.5rem;margin-top:3rem;font-size:.95rem}
.contacts span{display:block;font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--soft)}`,
    "contact/postcard": `.postcard{display:grid;grid-template-columns:1fr 1fr;max-width:62rem;margin:0 auto;transform:rotate(-.8deg)}
.postcard > div{padding:2.4rem}
.postcard > div + div{border-left:1px dashed var(--line)}
.postcard .hi{font-family:var(--display);font-style:italic;font-size:2rem;line-height:1;color:var(--accent)}
.postcard h2{margin:.7rem 0 .9rem;font-family:var(--display);font-weight:var(--dw);font-size:1.6rem;line-height:1.1;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.postcard p{color:var(--soft)}
.postcard dl div{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.2rem 1rem;padding:.55rem 0;border-bottom:1px dashed var(--line)}
.postcard dt{font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--soft)}
.stamp{float:right;display:grid;place-items:center;width:5.5rem;height:6.5rem;margin:0 0 1rem 1rem;border:2px dashed var(--accent);border-radius:.3rem;font-size:.65rem;font-weight:700;line-height:1.3;text-align:center;text-transform:uppercase;color:var(--accent)}
.postcard h3{clear:both;padding-top:.75rem;font-family:var(--display);font-weight:var(--dw);font-size:1.2rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.postcard form{display:flex;flex-direction:column;gap:.9rem;margin-top:1rem}
.postcard form .btn{align-self:flex-start}
.pc-social{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}
@media (max-width:52em){.postcard{grid-template-columns:1fr;transform:none}.postcard > div + div{border-left:0;border-top:1px dashed var(--line)}.postcard > div{padding:1.6rem}}`
  };

  /* ======================================================================
     5. SECTION LIBRARY — label, menu label, designs, renderer
     ====================================================================== */
  const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>';

  function playerBlock(d, withList) {
    return '<div class="lp" id="listen-play"><div class="lp-player"><div class="lp-now' + (withList ? "" : " solo") + '">' +
      '<button class="lp-toggle" id="lpToggle" type="button" aria-label="Play">&#9654;</button><div class="lp-meta">' +
      '<p class="lp-title" id="lpNow" aria-live="polite">' + esc(d.album.tracks[0] ? d.album.tracks[0].title : "") + '</p>' +
      '<div class="lp-bar"><span id="lpCur">0:00</span><input class="lp-seek" id="lpSeek" type="range" min="0" max="100" step="0.1" value="0" aria-label="Seek"><span id="lpDur">0:00</span></div></div></div>' +
      (withList ? '<ol class="lp-list" id="lpList"></ol>' : "") + '<audio id="lpAudio" preload="none"></audio></div></div>';
  }
  function streamsBlock(d, center) {
    const keys = Object.keys(d.streams || {}); if (!keys.length) return "";
    return '<h3 class="also"' + (center ? ' style="text-align:center"' : "") + '>Also on</h3><ul class="streams">' + keys.map((k) => '<li><a class="chip"' + ext(d.streams[k]) + ">" + esc(k) + "</a></li>").join("") + "</ul>";
  }
  function storeBlock(d) {
    if (!d.album.bandcampUrl) return "";
    return '<div class="store card" id="lpStore" data-album="' + attr(d.album.bandcampAlbumId || "") + '"><p><strong>Own the album</strong>High-quality downloads on Bandcamp. Name your price or pay what the artist sets.</p>' +
      '<div class="store-actions"><a class="btn btn-sm"' + ext(d.album.bandcampUrl) + '>Buy on Bandcamp</a><button class="btn btn-o btn-sm" id="lpEmbedBtn" type="button" hidden>Show the Bandcamp player</button></div></div><div class="bc-embed" id="lpEmbed"></div>';
  }
  const heroBtns = (a, b) => '<div class="btns"><a class="btn" href="' + a[1] + '">' + a[0] + '</a>' + (b ? '<a class="btn btn-o" href="' + b[1] + '">' + b[0] + "</a>" : "") + "</div>";
  function heroTargets(d) {
    const has = (k) => d.sections.some((s) => s.k === k);
    const first = has("music") ? ["Listen now", "#music"] : has("videos") ? ["Watch", "#videos"] : ["Get in touch", "#contact"];
    const second = has("dates") ? ["Upcoming dates", "#dates"] : has("contact") ? ["Book a show", "#contact"] : null;
    return [first, second];
  }

  const LIB = {
    hero: {
      label: "Welcome", fixed: "top",
      v: {
        arch: { name: "Arched portrait", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-arch" id="top" aria-labelledby="hero-title"><div class="wrap grid"><div><span class="eyebrow">' + esc(d.name) + (d.city ? " &middot; " + esc(d.city) : "") + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) +
            '</div><div class="frame"><img src="' + attr(d.photos.portrait) + '" width="800" height="1000" alt="' + attr(d.name) + '"></div></div></section>'; } },
        photo: { name: "Full photo", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-photo" id="top" aria-labelledby="hero-title"><img src="' + attr(d.photos.hero) + '" width="1920" height="1080" alt="' + attr(d.name) + ' performing"><div class="wrap"><span class="eyebrow">' + esc(d.name) + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + "</div></section>"; } },
        verse: { name: "Centered with verse", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-verse" id="top" aria-labelledby="hero-title"><div class="wrap"><span class="eyebrow">' + esc(d.name) + (d.city ? " &middot; " + esc(d.city) : "") + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><blockquote><p>&ldquo;' + esc(d.verse.text) + '&rdquo;</p><cite>' + esc(d.verse.ref) + "</cite></blockquote>" + heroBtns(a, b) +
            '<img class="photo wide" src="' + attr(d.photos.wide) + '" width="1600" height="700" alt="' + attr(d.name) + ' leading worship"></div></section>'; } },
        quiet: { name: "Quiet headline", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-quiet" id="top" aria-labelledby="hero-title"><div class="wrap"><img class="photo face" src="' + attr(d.photos.portrait) + '" width="400" height="400" alt="' + attr(d.name) + '"><span class="eyebrow">' + esc(d.name) + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + "</div></section>"; } },
        record: { name: "Spinning record", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-record" id="top" aria-labelledby="hero-title"><div class="wrap grid"><div><span class="eyebrow">' + esc(d.name) + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) +
            '</div><div class="turntable" id="turntable"><div class="sun" aria-hidden="true"></div><div class="disc" aria-hidden="true"><div class="label"><img src="' + attr(d.photos.album) + '" width="400" height="400" alt=""></div></div><button class="spin" type="button" aria-pressed="false" aria-label="Pause spinning record">&#10074;&#10074;</button></div></div></section>'; } }
      }
    },
    music: {
      label: "Album and player", nav: "Music",
      v: {
        album: { name: "Album + player", js: ["player"], css: ["player"], r: (d, alt) =>
          '<section class="sec music-album' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap grid"><img class="cover" src="' + attr(d.photos.album) + '" width="700" height="700" alt="' + attr(d.album.title) + ' album cover"><div><span class="eyebrow">Latest release</span><h2 class="title" id="music-title">' + esc(d.album.title) + '</h2>' +
          '<p class="meta">Released <time datetime="' + attr(d.album.released) + '">' + esc(longDate(d.album.released)) + "</time> &middot; " + d.album.tracks.length + " songs</p>" + playerBlock(d, true) + streamsBlock(d) + storeBlock(d) + "</div></div></section>" },
        stories: { name: "Song stories", js: ["player"], css: ["player"], r: (d, alt) =>
          '<section class="sec music-stories' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap grid"><img class="cover" src="' + attr(d.photos.album) + '" width="700" height="700" alt="' + attr(d.album.title) + ' album cover"><div><span class="eyebrow">New album</span><h2 class="title" id="music-title">' + esc(d.album.title) + '</h2><p class="lead">Press play to listen, or tap a song for the story and scripture behind it.</p>' +
          playerBlock(d, false) + '<div class="songs">' + d.album.tracks.map((t, i) => '<div class="song-row"><button class="lp-play" type="button" data-lp="' + i + '" aria-label="Play ' + attr(t.title) + '">&#9654;</button><details><summary><strong>' + esc(t.title) + "</strong>" + (t.ref ? '<span class="ref">' + esc(t.ref) + "</span>" : "") + '<span class="len">' + esc(t.length) + '</span></summary><div class="song-story"><p>' + esc(t.story || "") + '</p><p class="acts" data-lp-actions="' + i + '"></p></div></details></div>').join("") + "</div>" +
          streamsBlock(d) + storeBlock(d) + "</div></div></section>" },
        compact: { name: "Compact player", js: ["player"], css: ["player"], r: (d, alt) =>
          '<section class="sec music-compact' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap"><div class="box"><div class="center"><span class="eyebrow">Listen</span><h2 class="title" id="music-title">' + esc(d.album.title) + '</h2><p class="lead">' + esc(d.album.note) + "</p></div>" + playerBlock(d, true) + '<div class="center">' + streamsBlock(d, true) + "</div>" + storeBlock(d) + "</div></div></section>" }
      }
    },
    videos: {
      label: "Videos", nav: "Videos",
      v: {
        feature: { name: "Featured + list", js: ["videos"], r: (d, alt) =>
          '<section class="sec' + alt + '" id="videos" aria-labelledby="videos-title"><div class="wrap"><div class="head center"><span class="eyebrow">Watch</span><h2 class="title" id="videos-title">Videos</h2></div><div class="video-frame" data-video="0"></div><p class="vcap" id="vCap" aria-live="polite">' + esc(d.videos[0] ? d.videos[0].title : "") + '</p><div class="vlist" id="vList" role="group" aria-label="Choose a video"></div></div></section>' },
        grid: { name: "Video grid", js: ["videos"], r: (d, alt) =>
          '<section class="sec' + alt + '" id="videos" aria-labelledby="videos-title"><div class="wrap"><div class="head center"><span class="eyebrow">Watch</span><h2 class="title" id="videos-title">Videos</h2></div><div class="vgrid">' + d.videos.map((v, i) => '<article><div class="video-frame" data-video="' + i + '"></div><h3>' + esc(v.title) + "</h3></article>").join("") + "</div></div></section>" }
      }
    },
    dates: {
      label: "Upcoming dates", nav: "Dates",
      v: {
        list: { name: "Simple list", r: (d, alt) =>
          '<section class="sec' + alt + '" id="dates" aria-labelledby="dates-title"><div class="wrap"><div class="head center"><span class="eyebrow">Come and listen</span><h2 class="title" id="dates-title">Upcoming dates</h2></div>' + (d.events.length ? '' : '<p class="none">No dates on the calendar right now. Check back soon' + (d.sections.some((x) => x.k === "contact") ? ', or <a href="#contact">invite me to your church or venue</a>' : '') + '.</p>') + (d.events.length ? '<ul class="dlist">' : '') +
          d.events.map((e) => { const p = parts(e.start); return '<li><time datetime="' + attr(e.start) + '">' + p.mon + " " + (+p.day) + "<small>" + p.wk + '</small></time><p class="where">' + esc(e.venue) + "<small>" + esc(e.city + ", " + e.region) + (p.time ? " &middot; " + p.time : "") + (e.note ? " &middot; " + esc(e.note) : "") + '</small></p><a class="btn btn-o btn-sm"' + ext(e.url) + ">" + (+e.price > 0 ? "Tickets" : "Details") + "</a></li>"; }).join("") +
          (d.events.length ? "</ul>" : "") + "</div></section>" },
        tickets: { name: "Ticket stubs", r: (d, alt) =>
          '<section class="sec' + alt + '" id="dates" aria-labelledby="dates-title"><div class="wrap"><div class="head center"><span class="eyebrow">See you there</span><h2 class="title" id="dates-title">Upcoming dates</h2></div>' + (d.events.length ? '' : '<p class="none">No dates on the calendar right now. Check back soon' + (d.sections.some((x) => x.k === "contact") ? ', or <a href="#contact">invite me to your church or venue</a>' : '') + '.</p>') + (d.events.length ? '<ul class="tickets">' : '') +
          d.events.map((e) => { const p = parts(e.start); return '<li class="ticket card"><time datetime="' + attr(e.start) + '"><span class="m">' + p.mon + '</span><span class="d">' + p.day + '</span><span class="w">' + p.wk + '</span></time><div class="body"><p class="city">' + esc(e.city + ", " + e.region) + "</p><p>" + esc(e.venue) + (p.time ? " &middot; " + p.time : "") + (e.note ? " &middot; " + esc(e.note) : "") + '</p></div><div class="stub"><span class="price">' + (+e.price > 0 ? "$" + esc(String(+e.price)) : "Free") + '</span><a class="btn btn-sm"' + ext(e.url) + ">" + (+e.price > 0 ? "Get tickets" : "Details") + "</a></div></li>"; }).join("") +
          (d.events.length ? "</ul>" : "") + "</div></section>" }
      }
    },
    resources: {
      label: "Church resources", nav: "For Churches",
      v: { table: { name: "Chord charts table", r: (d, alt) =>
        '<section class="sec' + alt + '" id="churches" aria-labelledby="churches-title"><div class="wrap"><div class="head center"><span class="eyebrow">For worship teams</span><h2 class="title" id="churches-title">Sing these songs with your church</h2></div>' +
        '<p class="res-note card"><strong>Free for churches.</strong> Chord charts and lead sheets are free to download. Every song is registered with CCLI, so your church can project and stream it under its CCLI license.</p>' +
        '<div class="tbl"><table class="res"><thead><tr><th scope="col">Song</th><th scope="col">Key</th><th scope="col">Tempo</th><th scope="col">CCLI #</th><th scope="col">Downloads</th></tr></thead><tbody>' +
        d.resources.map((r) => '<tr><th scope="row">' + esc(r.song) + "</th><td>" + esc(r.key) + '</td><td class="num">' + esc(r.tempo) + ' BPM</td><td class="num">' + esc(r.ccli) + '</td><td><div class="dl">' + (r.chart ? '<a class="chip"' + ext(r.chart) + ">Chord chart</a>" : "") + (r.lead ? '<a class="chip"' + ext(r.lead) + ">Lead sheet</a>" : "") + "</div></td></tr>").join("") +
        "</tbody></table></div></div></section>" } }
    },
    podcast: {
      label: "Podcasts and interviews", nav: "Interviews",
      v: { feature: { name: "Featured episode", js: ["podcast"], r: (d, alt) => { const p = d.podcast;
        return '<section class="sec' + alt + '" id="interviews" aria-labelledby="interviews-title"><div class="wrap"><div class="head center"><span class="eyebrow">Podcasts and interviews</span><h2 class="title" id="interviews-title">Conversations about faith and songwriting</h2></div>' +
          '<article class="pod card"><div class="art" role="img" aria-label="' + attr(p.show) + ' artwork">' + MIC + '</div><div><span class="badge">Latest interview</span><p class="show">' + esc(p.show) + (p.episode ? " &middot; Episode " + esc(p.episode) : "") + "</p><h3>" + esc(p.title) + '</h3><p class="when"><time datetime="' + attr(p.date) + '">' + esc(longDate(p.date)) + "</time>" + (p.minutes ? " &middot; " + esc(p.minutes) + " min" : "") + (p.host ? " &middot; Hosted by " + esc(p.host) : "") + '</p><p class="sum">' + esc(p.summary) + "</p>" +
          ((p.id || p.src) ? '<div class="pod-player" id="podPlayer" data-type="' + attr(p.type) + '" data-id="' + attr(p.id) + '" data-src="' + attr(p.src) + '" data-title="' + attr(p.title) + '"><button class="btn pod-play" type="button">&#9654;&ensp;Play episode here</button></div>' : (p.url ? '<div class="pod-player"><a class="btn"' + ext(p.url) + '>&#9654;&ensp;Listen to the episode</a></div>' : "")) +
          (Object.keys(p.links || {}).length ? '<div class="also-on"><span>Also on</span>' + Object.keys(p.links).map((k) => "<a" + ext(p.links[k]) + ">" + esc(k) + "</a>").join("") + "</div>" : "") + "</div></article>" +
          ((p.more || []).length ? '<div class="more-int"><h3 class="also">More interviews</h3><ul>' + p.more.map((m) => '<li><a' + ext(m.url) + '>' + esc(m.title) + '</a><span>' + esc(m.show || "") + (m.date ? ' &middot; <time datetime="' + attr(m.date) + '">' + esc(longDate(m.date)) + '</time>' : "") + '</span></li>').join("") + "</ul></div>" : "") + "</div></section>"; } } }
    },
    story: {
      label: "Your story", nav: "Story",
      v: {
        portrait: { name: "Photo + story", r: (d, alt) =>
          '<section class="sec story-portrait' + alt + '" id="story" aria-labelledby="story-title"><div class="wrap grid"><img class="photo" src="' + attr(d.photos.story) + '" width="800" height="1000" alt="' + attr(d.name) + '"><div><span class="eyebrow">My story</span><h2 class="title" id="story-title">About ' + esc(d.name) + '</h2><div class="body" style="margin-top:1.25rem">' + d.story.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("") + "</div>" +
          (d.story.quote ? "<blockquote><p>&ldquo;" + esc(d.story.quote) + "&rdquo;</p><cite>&mdash; " + esc(d.story.quoteSource) + "</cite></blockquote>" : "") + "</div></div></section>" },
        quote: { name: "Centered with quote", r: (d, alt) =>
          '<section class="sec story-quote' + alt + '" id="story" aria-labelledby="story-title"><div class="wrap"><div class="box"><div class="center"><span class="eyebrow">The story</span><h2 class="title" id="story-title">About ' + esc(d.name) + '</h2></div><div class="body">' + d.story.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("") + "</div>" +
          (d.story.quote ? "<blockquote><p>&ldquo;" + esc(d.story.quote) + "&rdquo;</p><cite>" + esc(d.story.quoteSource) + "</cite></blockquote>" : "") + "</div></div></section>" }
      }
    },
    merch: {
      label: "Merch", nav: "Merch",
      v: { cards: { name: "Product cards", r: (d, alt) =>
        '<section class="sec' + alt + '" id="merch" aria-labelledby="merch-title"><div class="wrap"><div class="head center"><span class="eyebrow">Support the music</span><h2 class="title" id="merch-title">Merch</h2></div><div class="merch">' +
        d.merch.map((m) => '<article class="card"><img src="' + attr(m.photo) + '" width="500" height="500" alt="' + attr(m.name) + '"><div class="top"><h3>' + esc(m.name) + '</h3><span class="price">' + esc(m.price) + "</span></div><p>" + esc(m.desc) + '</p><a class="btn btn-sm"' + ext(m.url) + ">Buy</a></article>").join("") +
        "</div></div></section>" } }
    },
    prayer: {
      label: "Prayer requests",
      v: { form: { name: "Private prayer form", r: (d, alt) =>
        '<section class="sec' + alt + '" id="prayer" aria-labelledby="prayer-title"><div class="wrap"><div class="prayer card"><span class="eyebrow">Prayer</span><h2 class="title" id="prayer-title">Can we pray for you?</h2><p class="lead">Our team prays over every request we receive. You don&rsquo;t need to share your name.</p>' +
        '<form action="' + attr(d.contact.prayerAction) + '" method="post"><label for="p-req">Your prayer request</label><textarea class="field" id="p-req" name="request" required></textarea>' +
        '<div class="two"><div><label for="p-name">First name (optional)</label><input class="field" id="p-name" name="name" type="text" autocomplete="given-name"></div><div><label for="p-mail">Email (optional, for a reply)</label><input class="field" id="p-mail" name="email" type="email" autocomplete="email"></div></div>' +
        '<label class="check"><input type="checkbox" name="private" value="yes" checked> Keep my request private to the prayer team</label><div class="go"><button class="btn" type="submit">Send prayer request</button></div></form><p class="fine">Requests are never shared publicly or added to the mailing list.</p></div></div></section>' } }
    },
    contact: {
      label: "Stay in touch", nav: "Contact",
      v: {
        letter: { name: "Newsletter + booking", r: (d, alt) =>
          '<section class="sec center' + alt + '" id="contact" aria-labelledby="contact-title"><div class="wrap"><span class="eyebrow">Stay in touch</span><h2 class="title" id="contact-title">' + (d.contact.newsletterAction ? "A short letter, now and then" : "Let&rsquo;s talk") + "</h2>" + (d.contact.newsletterAction ? '<p class="lead">New songs, upcoming dates and the occasional story from the road. Never more than once a month.</p>' +
          '<form class="letter-form" action="' + attr(d.contact.newsletterAction) + '" method="post"><label class="visually-hidden" for="nl-email">Email address</label><input class="field" id="nl-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required><button class="btn" type="submit">Subscribe</button></form>' : '<p class="lead">For concerts, church services, interviews or just to say hello.</p>') +
          '<div class="contacts"><p><span>Booking</span><a href="mailto:' + attr(d.contact.booking) + '">' + esc(d.contact.booking) + '</a></p><p><span>Hello</span><a href="mailto:' + attr(d.contact.email) + '">' + esc(d.contact.email) + "</a></p>" + (d.contact.presskit ? '<p><span>Press kit</span><a href="' + attr(d.contact.presskit) + '">Download EPK (PDF)</a></p>' : "") + "</div></div></section>" },
        postcard: { name: "Postcard", r: (d, alt) =>
          '<section class="sec' + alt + '" id="contact" aria-labelledby="contact-title"><div class="wrap"><div class="postcard card"><div><p class="hi">Hey friend,</p><h2 id="contact-title">Booking and contact</h2><p>Concerts, churches, festivals, house concerts and private events.</p><dl style="margin-top:1.25rem">' +
          '<div><dt>Booking</dt><dd><a href="mailto:' + attr(d.contact.booking) + '">' + esc(d.contact.booking) + "</a></dd></div><div><dt>Hello</dt><dd><a href=\"mailto:" + attr(d.contact.email) + '">' + esc(d.contact.email) + "</a></dd></div>" + (d.contact.presskit ? '<div><dt>Press kit</dt><dd><a href="' + attr(d.contact.presskit) + '">Download EPK (PDF)</a></dd></div>' : "") + "</dl></div>" +
          '<div><div class="stamp" aria-hidden="true">Two<br>Fish<br>Mail</div>' + (d.contact.newsletterAction ? '<h3>Join the mailing list</h3><p>New songs and shows near you.</p><form action="' + attr(d.contact.newsletterAction) + '" method="post"><label class="visually-hidden" for="pc-email">Email address</label><input class="field" id="pc-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required><button class="btn" type="submit">Send it</button></form>'
            : '<h3>Follow along</h3><p>New songs, videos and dates, wherever you already are.</p><ul class="pc-social">' + Object.keys(d.social || {}).map((k) => "<li><a class=\"chip\"" + ext(d.social[k]) + ">" + esc(k) + "</a></li>").join("") + "</ul>") + '</div></div></div></section>' }
      }
    },
    footer: {
      label: "Footer", fixed: "bottom",
      v: { simple: { name: "Name, links and copyright", r: (d) =>
        '<footer class="site-footer"><div class="wrap"><p class="foot-name">' + esc(d.name) + '</p><ul class="social">' + Object.keys(d.social || {}).map((k) => "<li><a" + ext(d.social[k]) + ">" + esc(k) + "</a></li>").join("") + '</ul><p class="fine">&copy; <span id="year">' + new Date().getFullYear() + "</span> " + esc(d.name) + ". All rights reserved.</p></div></footer>" } }
    }
  };

  /* ======================================================================
     6. SCRIPTS — included only when a section needs them
     ====================================================================== */
  const JS = {
    nav: `(function(){var b=document.querySelector(".menu-btn"),m=document.getElementById("menu");if(!b||!m)return;
function s(o){m.classList.toggle("open",o);b.setAttribute("aria-expanded",String(o));b.textContent=o?"Close":"Menu";}
b.addEventListener("click",function(){s(!m.classList.contains("open"));});
m.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){s(false);});});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&m.classList.contains("open")){s(false);b.focus();}});
var y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();
var t=document.getElementById("turntable");if(t){var k=t.querySelector(".spin");k.addEventListener("click",function(){var p=t.classList.toggle("paused");k.setAttribute("aria-pressed",String(p));k.setAttribute("aria-label",p?"Resume spinning record":"Pause spinning record");k.innerHTML=p?"&#9654;":"&#10074;&#10074;";});}})();`,
    player: `(function(){var songs=window.TF_SONGS||[],audio=document.getElementById("lpAudio");if(!audio||!songs.length)return;
var tg=document.getElementById("lpToggle"),now=document.getElementById("lpNow"),seek=document.getElementById("lpSeek"),cur=document.getElementById("lpCur"),dur=document.getElementById("lpDur"),list=document.getElementById("lpList"),btns=[],c=0,loaded=-1;
function f(s){if(!isFinite(s))return "0:00";var m=Math.floor(s/60),r=Math.floor(s%60);return m+":"+(r<10?"0":"")+r;}
function refresh(){var p=!audio.paused;tg.innerHTML=p?"&#10074;&#10074;":"&#9654;";tg.setAttribute("aria-label",(p?"Pause ":"Play ")+songs[c].title);now.textContent=songs[c].title;
btns.forEach(function(b,i){if(!b)return;var on=i===c,pp=on&&p,row=b.closest("li, .song-row");if(row)row.classList.toggle("on",on);b.innerHTML=pp?"&#10074;&#10074;":"&#9654;";b.setAttribute("aria-label",(pp?"Pause ":"Play ")+songs[i].title);});}
function play(i){if(i===c&&loaded===i){if(audio.paused){audio.play().catch(function(){});}else{audio.pause();}return;}
c=i;loaded=i;audio.src=songs[i].file;seek.value=0;cur.textContent="0:00";dur.textContent=songs[i].length;audio.play().catch(function(){});refresh();}
function link(s){var a=document.createElement("a");if(s.free){a.className="chip";a.href=s.file;a.setAttribute("download","");a.textContent="Free download";a.setAttribute("aria-label","Free download: "+s.title);}
else{a.className="chip";a.href=s.buy;a.target="_blank";a.rel="noopener";a.textContent="Buy";a.setAttribute("aria-label","Buy "+s.title+" on Bandcamp");}return a;}
songs.forEach(function(s,i){var b;if(list){var li=document.createElement("li");b=document.createElement("button");b.type="button";b.className="lp-play";
var n=document.createElement("span");n.className="lp-num";n.textContent=String(i+1).padStart(2,"0");var nm=document.createElement("span");nm.className="lp-name";nm.textContent=s.title;
var t=document.createElement("span");t.className="lp-time";t.textContent=s.length;li.append(b,n,nm,t,link(s));list.appendChild(li);}
else{b=document.querySelector('.lp-play[data-lp="'+i+'"]');var spot=document.querySelector('[data-lp-actions="'+i+'"]');if(spot)spot.appendChild(link(s));}
if(b)b.addEventListener("click",function(){play(i);});btns.push(b);});
tg.addEventListener("click",function(){play(c);});audio.addEventListener("play",refresh);audio.addEventListener("pause",refresh);
audio.addEventListener("loadedmetadata",function(){dur.textContent=f(audio.duration);});
audio.addEventListener("timeupdate",function(){if(audio.duration)seek.value=audio.currentTime/audio.duration*100;cur.textContent=f(audio.currentTime);});
audio.addEventListener("ended",function(){if(c<songs.length-1){play(c+1);}else{refresh();}});
seek.addEventListener("input",function(){if(audio.duration)audio.currentTime=seek.value/100*audio.duration;});dur.textContent=songs[0].length;refresh();
var st=document.getElementById("lpStore"),eb=document.getElementById("lpEmbedBtn"),em=document.getElementById("lpEmbed");
if(st&&eb&&/^\\d+$/.test(st.dataset.album||"")){eb.hidden=false;eb.addEventListener("click",function(){var fr=document.createElement("iframe");
fr.src="https://bandcamp.com/EmbeddedPlayer/album="+st.dataset.album+"/size=large/bgcol=ffffff/linkcol=333333/artwork=small/transparent=true/";fr.title="Bandcamp album player";fr.loading="lazy";em.replaceChildren(fr);eb.hidden=true;});}})();`,
    videos: `(function(){var vids=window.TF_VIDEOS||[],preview=!!window.TF_PREVIEW;
function poster(frame,i){var v=vids[i];if(!v)return;var b=document.createElement("button");b.type="button";b.className="vload";b.setAttribute("aria-label","Play "+v.title);
var img=document.createElement("img");img.src=preview?window.TF_PH:"https://i.ytimg.com/vi/"+encodeURIComponent(v.id)+"/hqdefault.jpg";img.alt="";img.loading="lazy";img.width=480;img.height=360;
var p=document.createElement("span");p.className="play";p.setAttribute("aria-hidden","true");p.textContent="\\u25B6";b.append(img,p);
b.addEventListener("click",function(){if(preview)return;var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(v.id)+"?autoplay=1&playsinline=1&rel=0";
f.title=v.title;f.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";f.referrerPolicy="strict-origin-when-cross-origin";f.allowFullscreen=true;frame.replaceChildren(f);f.focus();});
frame.replaceChildren(b);}
var list=document.getElementById("vList"),cap=document.getElementById("vCap"),main=document.querySelector('.video-frame[data-video="0"]');
if(list&&main){vids.forEach(function(v,i){var b=document.createElement("button");b.type="button";b.textContent=v.title;b.addEventListener("click",function(){poster(main,i);cap.textContent=v.title;
list.querySelectorAll("button").forEach(function(x,j){x.setAttribute("aria-pressed",j===i?"true":"false");});});list.appendChild(b);});poster(main,0);list.firstChild&&list.firstChild.setAttribute("aria-pressed","true");}
else{document.querySelectorAll(".video-frame[data-video]").forEach(function(fr){poster(fr,+fr.dataset.video);});}})();`,
    podcast: `(function(){var p=document.getElementById("podPlayer");if(!p)return;var b=p.querySelector(".pod-play");b.addEventListener("click",function(){if(window.TF_PREVIEW)return;
var t=p.dataset.type,id=encodeURIComponent(p.dataset.id||""),src=p.dataset.src||"",ti=p.dataset.title||"Podcast episode",el;
if(t==="audio"){el=document.createElement("audio");el.controls=true;el.src=src;el.setAttribute("aria-label",ti);}
else{el=document.createElement("iframe");el.title=ti;el.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
if(t==="spotify"){el.src="https://open.spotify.com/embed/episode/"+id;el.height="152";}
else if(t==="apple"){el.src=src;el.height="175";}
else{el.src="https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1&playsinline=1&rel=0";el.className="video";el.referrerPolicy="strict-origin-when-cross-origin";el.allowFullscreen=true;}}
p.replaceChildren(el);if(t==="audio")el.play().catch(function(){});el.focus();});})();`,
    preview: `(function(){document.addEventListener("click",function(e){var s=e.target.closest("[data-tf-i]");if(s){e.preventDefault();parent.postMessage({tf:"select",i:+s.getAttribute("data-tf-i")},"*");}},true);
window.addEventListener("message",function(e){if(e.data&&e.data.tf==="show"){var s=document.querySelector('[data-tf-i="'+e.data.i+'"]');document.querySelectorAll(".tf-sel").forEach(function(x){x.classList.remove("tf-sel");});if(s){s.classList.add("tf-sel");s.scrollIntoView({block:"center",behavior:"smooth"});}}});})();`
  };
  const PREVIEW_CSS = `[data-tf-i]{cursor:pointer}[data-tf-i]:hover{outline:2px dashed var(--accent);outline-offset:-6px}.tf-sel{outline:3px solid var(--accent) !important;outline-offset:-6px}`;

  /* ======================================================================
     7. SCHEMA (JSON-LD) — written from the recipe, not by hand
     ====================================================================== */
  function schema(d, base) {
    const has = (k) => d.sections.some((s) => s.k === k);
    const g = [
      { "@type": "WebSite", "@id": base + "#website", url: base, name: d.name, publisher: { "@id": base + "#artist" }, inLanguage: "en-US" },
      { "@type": "WebPage", "@id": base + "#webpage", url: base, name: d.headline + " | " + d.name, description: d.description, isPartOf: { "@id": base + "#website" }, about: { "@id": base + "#artist" }, inLanguage: "en-US" }
    ];
    const artist = { "@type": "MusicGroup", "@id": base + "#artist", name: d.name, url: base, description: d.headline, genre: d.genre, sameAs: Object.values(d.streams || {}).concat(Object.values(d.social || {})).filter((u) => /^https?:/.test(u)) };
    if (d.city) artist.foundingLocation = { "@type": "Place", name: d.city };
    if (d.contact && d.contact.booking) artist.email = "mailto:" + d.contact.booking;
    g.push(artist);
    if (has("music")) {
      artist.album = { "@id": base + "#album" };
      g.push({ "@type": "MusicAlbum", "@id": base + "#album", name: d.album.title, byArtist: { "@id": base + "#artist" }, datePublished: d.album.released, numTracks: d.album.tracks.length,
        track: { "@type": "ItemList", numberOfItems: d.album.tracks.length, itemListElement: d.album.tracks.map((t, i) => {
          const m = /^(\d+):(\d{2})$/.exec(t.length || ""); const rec = { "@type": "MusicRecording", name: t.title }; if (m) rec.duration = "PT" + (+m[1]) + "M" + (+m[2]) + "S";
          return { "@type": "ListItem", position: i + 1, item: rec }; }) } });
    }
    if (has("videos") && d.videos[0]) g.push({ "@type": "VideoObject", name: d.name + " – " + d.videos[0].title, description: d.videos[0].title + " by " + d.name, thumbnailUrl: "https://i.ytimg.com/vi/" + d.videos[0].id + "/hqdefault.jpg", uploadDate: d.album.released, embedUrl: "https://www.youtube-nocookie.com/embed/" + d.videos[0].id, contentUrl: "https://www.youtube.com/watch?v=" + d.videos[0].id });
    if (has("dates")) {
      artist.event = d.events.map((e, i) => ({ "@id": base + "#event-" + (i + 1) }));
      d.events.forEach((e, i) => g.push({ "@type": "MusicEvent", "@id": base + "#event-" + (i + 1), name: (e.note && e.kind === "church" ? e.note + " – " : "") + d.name + " at " + e.venue, startDate: e.start,
        eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": e.kind === "church" ? "Church" : "MusicVenue", name: e.venue, address: { "@type": "PostalAddress", addressLocality: e.city, addressRegion: e.region, addressCountry: "US" } },
        performer: { "@id": base + "#artist" }, offers: { "@type": "Offer", url: e.url, price: String(+e.price || 0), priceCurrency: "USD", availability: "https://schema.org/InStock" } }));
    }
    if (has("podcast")) g.push({ "@type": "PodcastEpisode", name: d.podcast.title, description: d.podcast.summary, datePublished: d.podcast.date, timeRequired: d.podcast.minutes ? "PT" + d.podcast.minutes + "M" : undefined, episodeNumber: d.podcast.episode, partOfSeries: { "@type": "PodcastSeries", name: d.podcast.show }, actor: { "@id": base + "#artist" } });
    return JSON.stringify({ "@context": "https://schema.org", "@graph": g }, null, 2).replace(/</g, "\\u003c");
  }

  /* ======================================================================
     8. ASSEMBLE — recipe in, complete page out
     ====================================================================== */
  function normalize(recipe) {
    let d = merge(SAMPLE, recipe || {});
    if (!STYLES[d.style]) d.style = "sanctuary";
    // sample copy says "Artist Name": swap in the real name wherever the recipe didn't supply its own text
    if (d.name && d.name !== SAMPLE.name) {
      const walk = (v) => typeof v === "string" ? v.split(SAMPLE.name).join(d.name) : Array.isArray(v) ? v.map(walk) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)])) : v;
      const keepName = d.name; d = walk(d); d.name = keepName;
    }
    if (!recipe || !recipe.description) d.description = d.name + ": " + d.headline + ". Listen to the music, watch videos, see upcoming dates and get in touch.";
    let secs = (d.sections || []).filter((s) => LIB[s.k] && LIB[s.k].v[s.v] && !LIB[s.k].fixed);
    const seen = new Set(); secs = secs.filter((s) => (seen.has(s.k) ? false : seen.add(s.k)));
    const hero = (recipe && recipe.sections || []).find((s) => s.k === "hero" && LIB.hero.v[s.v]) || { k: "hero", v: "arch" };
    d.sections = [hero].concat(secs, [{ k: "footer", v: "simple" }]);
    return d;
  }

  function assemble(recipe, opts) {
    opts = opts || {};
    const preview = !!opts.preview;
    const d = normalize(recipe);
    if (preview) {
      const ph = PH("YOUR PHOTO");
      d.photos = { hero: ph, portrait: ph, wide: ph, album: PH("ALBUM COVER"), story: ph };
      d.merch = d.merch.map((m) => Object.assign({}, m, { photo: PH("PRODUCT") }));
    }
    const st = STYLES[d.style];
    const base = "https://" + String(d.domain).replace(/^https?:\/\//, "").replace(/\/.*$/, "") + "/";
    const tokens = ":root{" + Object.keys(st.t).map((k) => "--" + k + ":" + st.t[k]).join(";") + "}";
    const cssKeys = [], jsKeys = ["nav"];
    let alt = false, body = "";
    d.sections.forEach((s, i) => {
      const def = LIB[s.k].v[s.v];
      const key = s.k + "/" + s.v;
      (def.css || []).forEach((k) => { if (!cssKeys.includes(k)) cssKeys.push(k); });
      if (CSS[key] && !cssKeys.includes(key)) cssKeys.push(key);
      (def.js || []).forEach((k) => { if (!jsKeys.includes(k)) jsKeys.push(k); });
      let altCls = "";
      if (s.k !== "hero" && s.k !== "footer") { alt = !alt; altCls = alt ? " alt" : ""; }
      let html = def.r(d, altCls);
      if (preview) html = html.replace(/^<(section|footer)/, '<$1 data-tf-i="' + i + '"');
      body += "\n" + html;
    });
    const links = d.sections.filter((s) => LIB[s.k].nav).slice(0, 6)
      .map((s) => '<li><a href="#' + ({ music: "music", videos: "videos", dates: "dates", resources: "churches", podcast: "interviews", story: "story", merch: "merch", contact: "contact" }[s.k]) + '">' + esc(LIB[s.k].nav) + "</a></li>").join("");
    const header = '<a class="skip" href="#main">Skip to content</a>\n<header class="site-header"><nav class="nav" aria-label="Main navigation"><a class="logo" href="#top">' + esc(d.name) + '</a>' +
      (links ? '<button class="menu-btn" type="button" aria-controls="menu" aria-expanded="false">Menu</button><ul class="menu" id="menu">' + links + "</ul>" : "") + "</nav></header>";
    const title = d.headline + " | " + d.name;
    const fontLink = st.fonts ? '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?' + st.fonts + '&amp;display=swap" rel="stylesheet">\n' : "";
    const data = [];
    if (jsKeys.includes("player")) data.push("window.TF_SONGS=" + JSON.stringify(d.album.tracks.map((t) => ({ title: t.title, length: t.length, file: t.file, free: !!t.free, buy: t.buy || "" }))).replace(/</g, "\\u003c") + ";");
    if (jsKeys.includes("videos")) data.push("window.TF_VIDEOS=" + JSON.stringify(d.videos).replace(/</g, "\\u003c") + ";");
    if (preview) { data.push("window.TF_PREVIEW=true;window.TF_PH=" + JSON.stringify(PH("")) + ";"); jsKeys.push("preview"); }
    const css = tokens + BASE_CSS + cssKeys.map((k) => CSS[k]).join("\n") + (preview ? PREVIEW_CSS : "");
    return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      "<!-- Built by the Two Fish Site Kit. Style: " + esc(st.name) + ". Sections: " + d.sections.map((s) => s.k + "/" + s.v).join(", ") + " -->\n" +
      "<title>" + esc(title) + "</title>\n" +
      '<meta name="description" content="' + attr(d.description) + '">\n<meta name="robots" content="index, follow, max-image-preview:large">\n<meta name="theme-color" content="' + st.t.bg + '">\n' +
      '<link rel="canonical" href="' + attr(base) + '">\n<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n' +
      '<meta property="og:type" content="website">\n<meta property="og:site_name" content="' + attr(d.name) + '">\n<meta property="og:title" content="' + attr(title) + '">\n<meta property="og:description" content="' + attr(d.description) + '">\n<meta property="og:url" content="' + attr(base) + '">\n<meta property="og:image" content="' + attr(d.shareImage ? (/^https?:/.test(d.shareImage) ? d.shareImage : base + String(d.shareImage).replace(/^\//, "")) : base + "images/share-1200x630.jpg") + '">\n<meta name="twitter:card" content="summary_large_image">\n' +
      fontLink +
      '<script type="application/ld+json">\n' + schema(d, base) + "\n</script>\n<style>\n" + css + "\n</style>\n</head>\n<body>\n" +
      header + '\n<main id="main">' + body.replace(/\n<footer[\s\S]*$/, "") + "\n</main>" + body.match(/\n<footer[\s\S]*$/)[0] + "\n" +
      "<script>\n" + data.join("\n") + "\n" + jsKeys.map((k) => JS[k]).join("\n") + "\n</script>\n</body>\n</html>\n";
  }

  /* ======================================================================
     9. PUBLIC API
     ====================================================================== */
  function catalog() {
    const out = {};
    Object.keys(LIB).forEach((k) => { out[k] = { label: LIB[k].label, fixed: LIB[k].fixed || null, designs: Object.keys(LIB[k].v).map((v) => ({ id: v, name: LIB[k].v[v].name })) }; });
    return out;
  }
  return {
    version: "1.1.0",
    styles: Object.keys(STYLES).map((id) => ({ id, name: STYLES[id].name, note: STYLES[id].note, swatch: [STYLES[id].t.bg, STYLES[id].t.alt, STYLES[id].t.fill, STYLES[id].t.deco] })),
    catalog, assemble, sample: SAMPLE
  };
});
