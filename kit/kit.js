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
  /* press kit link label: a PDF says so, a page (/epk/) does not */
  const PKL = (u, pdf, page) => (/\.pdf([?#]|$)/i.test(String(u || "")) ? pdf : page);

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
    },
    crossroads: {
      name: "Crossroads", note: "Americana and country: denim, sand and rust", group: "mixed",
      fonts: "family=Bitter:wght@600;700&family=Work+Sans:wght@400;500;700",
      t: {"bg": "#f4efe6", "alt": "#e9e0d1", "ink": "#22303c", "soft": "#4f5c66", "accent": "#97391a", "fill": "#22303c", "on": "#f4efe6", "line": "#d6c9b3", "card": "#fbf7f0", "display": "\"Bitter\",Georgia,serif", "body": "\"Work Sans\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "700", "radius": "6px", "h-case": "none", "h-scale": "1", "h-track": "-.01em", "deco": "#c98a3a"},
      css: ".site-header{border-bottom:3px solid var(--ink)}\n.logo{font-size:1.15rem;text-transform:uppercase;letter-spacing:.08em}\n.head.center{text-align:left}\n.head.center .lead{margin-left:0}\n.head .title{display:inline-block;padding-bottom:.5rem;border-bottom:4px solid var(--accent)}\n.set-tabs,.dfilter{justify-content:flex-start}\n.card{border:2px solid var(--ink);box-shadow:5px 5px 0 var(--line)}\n.btn{border-radius:4px;text-transform:uppercase;letter-spacing:.06em;font-size:.82rem}\n.eyebrow{letter-spacing:.3em}"
    },
    frontporch: {
      name: "Front Porch", note: "Bluegrass, folk and hymns: pine, cream and barn red", group: "mixed",
      fonts: "family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;600;700",
      t: {"bg": "#fbf8f1", "alt": "#eceee1", "ink": "#233127", "soft": "#515d53", "accent": "#8a3324", "fill": "#2f4a35", "on": "#fbf8f1", "line": "#d9dac7", "card": "#ffffff", "display": "\"Libre Baskerville\",Georgia,serif", "body": "\"Source Sans 3\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "700", "radius": "10px", "h-case": "none", "h-scale": ".92", "h-track": "-.01em", "deco": "#b5793a"},
      css: "@media (min-width:52.01em){.nav{flex-direction:column;gap:.7rem;padding:1.2rem 1.25rem .9rem}.logo{font-size:1.7rem}}\n.head .title::after{content:\"\\2766\";display:block;margin-top:.6rem;font-size:1.2rem;line-height:1;color:var(--accent)}\n.card{border:2px dashed var(--line);box-shadow:0 0 0 6px var(--card)}\n.sec.alt{border-top:1px solid var(--line);border-bottom:1px solid var(--line)}\n.eyebrow{font-style:italic;letter-spacing:.12em;text-transform:none;font-size:.95rem;font-weight:600}"
    },
    velvet: {
      name: "Velvet Hour", note: "Jazz, standards and hymns: midnight and champagne", group: "mixed",
      fonts: "family=DM+Serif+Display:ital@0;1&family=Karla:wght@400;500;700",
      t: {"bg": "#15101a", "alt": "#1f1725", "ink": "#f4ece1", "soft": "#c4b6ab", "accent": "#dcb673", "fill": "#dcb673", "on": "#1a1210", "line": "#3a2d3f", "card": "#231a2a", "display": "\"DM Serif Display\",Georgia,serif", "body": "\"Karla\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "4px", "h-case": "none", "h-scale": "1", "h-track": ".005em", "deco": "#8e3b4f"},
      css: "@media (min-width:52.01em){.nav{flex-direction:column;gap:.6rem;padding:1.4rem 1.25rem 1rem}.logo{font-size:2rem}}\n.site-header{border-bottom:1px solid var(--accent)}\n.menu a{letter-spacing:.18em;text-transform:uppercase;font-size:.72rem}\n.eyebrow{letter-spacing:.38em;font-weight:500}\n.card{background:transparent;border:0;border-top:1px solid var(--accent);border-bottom:1px solid var(--line);border-radius:0}\n.btn{border-radius:0;letter-spacing:.14em;text-transform:uppercase;font-size:.75rem;font-weight:700}\n.head .title::before{content:\"\";display:block;width:3rem;height:1px;margin:0 auto 1.1rem;background:var(--accent)}\n.site-footer{border-top:1px solid var(--accent)}"
    },
    revival: {
      name: "Neon Revival", note: "Rock and pop bands: night stage and neon", group: "mixed",
      fonts: "family=Oswald:wght@500;600&family=Inter:wght@400;500;700",
      t: {"bg": "#0d0f14", "alt": "#151924", "ink": "#f1f3f7", "soft": "#aab1c0", "accent": "#ff6b86", "fill": "#ff6b86", "on": "#0d0f14", "line": "#272d3b", "card": "#171c28", "display": "\"Oswald\",\"Arial Narrow\",system-ui,sans-serif", "body": "\"Inter\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "600", "radius": "4px", "h-case": "uppercase", "h-scale": ".95", "h-track": ".02em", "deco": "#38d9c6"},
      css: ".site-header{background:var(--bg);border-bottom:2px solid var(--fill)}\n.logo{letter-spacing:.12em}\n.title{text-shadow:0 0 28px rgb(255 107 134 / 40%)}\n.btn{border-radius:0;text-transform:uppercase;letter-spacing:.1em;font-size:.82rem}\n.card{border-color:var(--deco);border-radius:0}\n.sec{border-top:1px solid var(--line)}\n.eyebrow{color:var(--deco)}\n.head.center{text-align:left}\n.head.center .lead{margin-left:0}\n.set-tabs,.dfilter{justify-content:flex-start}"
    },
    sundaysoul: {
      name: "Sunday Soul", note: "Soul, R&B and gospel: plum, cream and amber", group: "mixed",
      fonts: "family=Abril+Fatface&family=Nunito+Sans:wght@400;600;700",
      t: {"bg": "#fff7ec", "alt": "#f6e6d1", "ink": "#2b1630", "soft": "#5b475c", "accent": "#9a4405", "fill": "#5b2a63", "on": "#fff7ec", "line": "#e8d4bb", "card": "#fffdf8", "display": "\"Abril Fatface\",Georgia,serif", "body": "\"Nunito Sans\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "16px", "h-case": "none", "h-scale": "1", "h-track": "0", "deco": "#e6a23c"},
      css: ".site-header{border-bottom:0;box-shadow:0 10px 30px -22px rgb(91 42 99 / 60%)}\n.title{color:var(--fill)}\n.card{border:0;border-radius:28px;box-shadow:0 22px 44px -28px rgb(91 42 99 / 55%)}\n.sec.alt{background:radial-gradient(circle at 8% 12%,rgb(230 162 60 / 22%) 0,rgb(230 162 60 / 0%) 32%),radial-gradient(circle at 92% 88%,rgb(91 42 99 / 12%) 0,rgb(91 42 99 / 0%) 34%),var(--alt)}\n.eyebrow{display:inline-block;padding:.3rem .9rem;border-radius:999px;background:var(--alt)}\n.sec.alt .eyebrow{background:var(--bg)}\n.btn{min-height:3.1rem;padding:.8rem 1.6rem}"
    },
    coastline: {
      name: "Coastline", note: "Acoustic and coffeehouse: sea glass and sand", group: "mixed",
      fonts: "family=Fraunces:opsz,wght@9..144,600&family=Outfit:wght@300;400;600",
      t: {"bg": "#f6f8f6", "alt": "#e5eeea", "ink": "#1f3a3d", "soft": "#4c6163", "accent": "#28676b", "fill": "#1f3a3d", "on": "#f6f8f6", "line": "#d0ddd8", "card": "#ffffff", "display": "\"Fraunces\",Georgia,serif", "body": "\"Outfit\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "600", "radius": "22px", "h-case": "none", "h-scale": "1", "h-track": "-.015em", "deco": "#d9c6a5"},
      css: ".site-header{border-bottom:0;background:rgb(246 248 246 / 92%)}\n.sec{padding:clamp(5rem,3.5rem + 5vw,8.5rem) 0}\n.sec.alt{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60' preserveAspectRatio='none'%3E%3Cpath d='M0 0h1440v22c-180 26-360 26-540 8S540 6 360 20 120 46 0 30z' fill='%23f6f8f6'/%3E%3C/svg%3E\") top / 100% 46px no-repeat,var(--alt)}\n.card{border:0;box-shadow:0 1px 0 var(--line),0 14px 34px -26px rgb(31 58 61 / 45%)}\n.title{font-weight:600}\n.eyebrow{letter-spacing:.3em;font-weight:600}\n.btn{font-weight:600}"
    },
    heartland: {
      name: "Heartland", note: "Country and southern gospel: navy, wheat and red", group: "mixed",
      fonts: "family=Alfa+Slab+One&family=Mulish:wght@400;600;700",
      t: {"bg": "#fdfaf3", "alt": "#f1e7d3", "ink": "#1d2a44", "soft": "#4a5570", "accent": "#a3262e", "fill": "#a3262e", "on": "#ffffff", "line": "#e0d3b8", "card": "#ffffff", "display": "\"Alfa Slab One\",Georgia,serif", "body": "\"Mulish\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "8px", "h-case": "none", "h-scale": ".9", "h-track": "0", "deco": "#d8a13a"},
      css: ".site-header{border-top:6px solid var(--fill)}\n.logo{color:var(--fill)}\n.logo:hover{color:var(--fill)}\n.head .title{display:inline-block;padding:.4rem 1.3rem .5rem;background:var(--ink);color:var(--bg);border-radius:4px}\n.eyebrow::before,.eyebrow::after{content:\"\\2605\";margin:0 .5rem;color:var(--deco)}\n.card{border-top:5px solid var(--fill)}\n.btn{border-radius:6px}\n.site-footer{border-top:6px solid var(--fill)}"
    },
    garage: {
      name: "Garage", note: "Indie and alternative rock: newsprint, black and safety orange", group: "secular",
      fonts: "family=Archivo+Black&family=Archivo:wght@400;500;700",
      t: {"bg": "#f1efe9", "alt": "#e3e0d6", "ink": "#111111", "soft": "#45443f", "accent": "#ad3a08", "fill": "#111111", "on": "#f1efe9", "line": "#c9c4b6", "card": "#faf9f5", "display": "\"Archivo Black\",Impact,\"Arial Black\",sans-serif", "body": "\"Archivo\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "0", "h-case": "uppercase", "h-scale": ".9", "h-track": "-.01em", "deco": "#ff5a1f"},
      css: ".site-header{border-bottom:4px solid var(--ink)}\n.logo{text-transform:uppercase;letter-spacing:.02em}\n.sec{border-top:4px solid var(--ink)}\n.head.center{text-align:left}\n.head.center .lead{margin-left:0}\n.set-tabs,.dfilter{justify-content:flex-start}\n.eyebrow{display:inline-block;padding:.2rem .55rem;background:var(--ink);color:var(--bg);letter-spacing:.18em}\n.card{border:3px solid var(--ink);border-radius:0;box-shadow:none}\n.btn{border-radius:0;text-transform:uppercase;letter-spacing:.08em;font-size:.82rem}\n.title{font-size:calc(var(--h-scale) * clamp(2.2rem,1.4rem + 3.4vw,4.2rem))}"
    },
    afterglow: {
      name: "Afterglow", note: "R&B and hip-hop: midnight violet and amber light", group: "secular",
      fonts: "family=Syne:wght@700;800&family=Manrope:wght@400;500;700",
      t: {"bg": "#100c18", "alt": "#1a132a", "ink": "#f5f0ff", "soft": "#bcb1d4", "accent": "#ffb86b", "fill": "#c4a2ff", "on": "#100c18", "line": "#30264a", "card": "#1d1630", "display": "\"Syne\",system-ui,sans-serif", "body": "\"Manrope\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "800", "radius": "20px", "h-case": "none", "h-scale": "1", "h-track": "-.02em", "deco": "#ff7ab6"},
      css: ".site-header{background:rgb(16 12 24 / 90%);border-bottom:1px solid var(--line)}\n.btn{border-radius:999px}\n.chip{border-radius:999px}\n.sec.alt{background:radial-gradient(circle at 10% 0,rgb(196 162 255 / 18%) 0,rgb(196 162 255 / 0%) 40%),radial-gradient(circle at 95% 100%,rgb(255 122 182 / 14%) 0,rgb(255 122 182 / 0%) 40%),var(--alt)}\n.title{text-shadow:0 0 40px rgb(196 162 255 / 45%)}\n.card{border:1px solid var(--line);box-shadow:0 30px 60px -40px rgb(0 0 0 / 90%)}\n.eyebrow{color:var(--deco)}"
    },
    twolane: {
      name: "Two Lane", note: "Country and honky-tonk: saddle leather, cream and teal", group: "secular",
      fonts: "family=Rye&family=Libre+Franklin:wght@400;600;700",
      t: {"bg": "#f8efe0", "alt": "#eedfc4", "ink": "#2a1a10", "soft": "#5a4433", "accent": "#9e2d13", "fill": "#9e2d13", "on": "#fff8ee", "line": "#d9c29d", "card": "#fffaf1", "display": "\"Rye\",Georgia,serif", "body": "\"Libre Franklin\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "6px", "h-case": "none", "h-scale": ".82", "h-track": "0", "deco": "#2f6b6b"},
      css: ".site-header{border-bottom:3px double var(--ink)}\n.logo{color:var(--fill)}\n.logo:hover{color:var(--fill)}\n.card{border:2px dashed var(--fill);box-shadow:0 0 0 6px var(--card)}\n.eyebrow{color:var(--deco);letter-spacing:.28em}\n.head .title::after{content:\"\";display:block;width:5rem;height:6px;margin:.9rem auto 0;border-top:2px solid var(--fill);border-bottom:2px solid var(--fill)}\n.head:not(.center) .title::after{margin-left:0}\n.btn{border-radius:4px;text-transform:uppercase;letter-spacing:.1em;font-size:.8rem}\n.site-footer{border-top:3px double var(--ink)}"
    },
    ballroom: {
      name: "Ballroom", note: "Wedding and party bands: ivory, navy and gold", group: "secular",
      fonts: "family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Jost:wght@400;500;600",
      t: {"bg": "#fbf8f2", "alt": "#f1eadc", "ink": "#1b2333", "soft": "#4a5265", "accent": "#835d12", "fill": "#1b2333", "on": "#fbf8f2", "line": "#e0d5bf", "card": "#ffffff", "display": "\"Cormorant Garamond\",Georgia,\"Times New Roman\",serif", "body": "\"Jost\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "600", "radius": "2px", "h-case": "none", "h-scale": "1.12", "h-track": "0", "deco": "#c9a24a"},
      css: ".site-header{border-bottom:1px solid var(--line)}\n.logo{font-family:var(--display);font-size:1.4rem;font-style:italic}\n.eyebrow{letter-spacing:.38em;font-weight:500}\n.title{font-style:italic}\n.head .title::after{content:\"\\2766\";display:block;margin-top:.4rem;font-size:1.1rem;font-style:normal;color:var(--deco)}\n.card{border:1px solid var(--line);outline:1px solid var(--line);outline-offset:-9px;box-shadow:none}\n.btn{text-transform:uppercase;letter-spacing:.18em;font-size:.76rem;font-weight:500}"
    },
    signal: {
      name: "Signal", note: "Electronic and DJ: black, grid lines and electric teal", group: "secular",
      fonts: "family=Unbounded:wght@600;700&family=Space+Grotesk:wght@400;500;700",
      t: {"bg": "#06080b", "alt": "#0b1015", "ink": "#e6f1f0", "soft": "#93a5a7", "accent": "#3ee6c8", "fill": "#3ee6c8", "on": "#06080b", "line": "#1c2a30", "card": "#0d141a", "display": "\"Unbounded\",system-ui,sans-serif", "body": "\"Space Grotesk\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "700", "radius": "0", "h-case": "uppercase", "h-scale": ".8", "h-track": ".01em", "deco": "#ff3df2"},
      css: ".site-header{background:var(--bg);border-bottom:1px solid var(--line)}\n.sec.alt{background-image:linear-gradient(var(--line) 1px,rgb(0 0 0 / 0%) 1px),linear-gradient(90deg,var(--line) 1px,rgb(0 0 0 / 0%) 1px);background-size:56px 56px}\n.head.center{text-align:left}\n.head.center .lead{margin-left:0}\n.set-tabs,.dfilter{justify-content:flex-start}\n.eyebrow::before{content:\"// \";color:var(--deco)}\n.card{border:1px solid var(--accent);border-radius:0;box-shadow:none}\n.btn{border-radius:0;text-transform:uppercase;letter-spacing:.14em;font-size:.78rem}"
    },
    recital: {
      name: "Recital", note: "Classical and piano: white, black and burgundy", group: "secular",
      fonts: "family=EB+Garamond:ital,wght@0,500;1,500&family=Hanken+Grotesk:wght@400;500;600",
      t: {"bg": "#ffffff", "alt": "#f6f4f0", "ink": "#161616", "soft": "#55524e", "accent": "#7b1e2b", "fill": "#161616", "on": "#ffffff", "line": "#e3dfd8", "card": "#ffffff", "display": "\"EB Garamond\",Garamond,Georgia,serif", "body": "\"Hanken Grotesk\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "500", "radius": "0", "h-case": "none", "h-scale": "1.08", "h-track": "-.005em", "deco": "#b9a58c"},
      css: ".site-header{border-bottom:1px solid var(--ink)}\n.logo{font-family:var(--display);font-size:1.35rem;font-weight:500;letter-spacing:.02em}\n.sec{padding:clamp(5rem,3.5rem + 5vw,9rem) 0}\n.eyebrow{font-weight:500;letter-spacing:.32em}\n.title{font-style:italic}\n.card{border:0;border-top:1px solid var(--ink);border-radius:0;box-shadow:none;background:var(--card)}\n.btn{border-radius:0;letter-spacing:.06em}\n.btn-o{border-width:1px}"
    },
    papermoon: {
      name: "Paper Moon", note: "Folk and singer-songwriter: kraft paper, indigo and clay", group: "secular",
      fonts: "family=Young+Serif&family=Atkinson+Hyperlegible:wght@400;700",
      t: {"bg": "#f3efe6", "alt": "#e8e0cf", "ink": "#2b2924", "soft": "#59544a", "accent": "#3a4a86", "fill": "#3a4a86", "on": "#ffffff", "line": "#d5cab3", "card": "#fbf8f1", "display": "\"Young Serif\",Georgia,serif", "body": "\"Atkinson Hyperlegible\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "10px", "h-case": "none", "h-scale": "1", "h-track": "-.01em", "deco": "#c46a45"},
      css: ".site-header{border-bottom:0}\nbody{background-image:radial-gradient(rgb(43 41 36 / 5%) 1px,rgb(0 0 0 / 0%) 1px);background-size:6px 6px}\n.photo,.cover,.frame img,.mfeat > img{box-shadow:0 0 0 10px #fff,0 18px 34px -16px rgb(43 41 36 / 45%)}\n.card{border:0;box-shadow:0 1px 0 var(--line),0 16px 34px -26px rgb(43 41 36 / 50%)}\n.eyebrow{letter-spacing:.24em}\n.head .title{text-decoration:underline;text-decoration-color:var(--deco);text-decoration-thickness:3px;text-underline-offset:.25em}\n.btn{border-radius:999px}"
    },
    lumen: {
      name: "Lumen", note: "Modern worship: charcoal, candlelight and gold", group: "christian",
      fonts: "family=Big+Shoulders+Display:wght@700;800&family=Inter+Tight:wght@400;500;700",
      t: {"bg": "#131211", "alt": "#1c1a18", "ink": "#f4efe7", "soft": "#b8b0a4", "accent": "#f2b64c", "fill": "#f2b64c", "on": "#131211", "line": "#34302b", "card": "#1f1c19", "display": "\"Big Shoulders Display\",\"Arial Narrow\",system-ui,sans-serif", "body": "\"Inter Tight\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "800", "radius": "4px", "h-case": "uppercase", "h-scale": "1.05", "h-track": ".01em", "deco": "#e07a3f"},
      css: ".site-header{background:rgb(19 18 17 / 92%);border-bottom:1px solid var(--line)}\n.logo{text-transform:uppercase;letter-spacing:.14em}\n.sec.alt{background:radial-gradient(ellipse 70% 60% at 50% 0,rgb(242 182 76 / 12%) 0,rgb(242 182 76 / 0%) 70%),var(--alt)}\n.title{text-shadow:0 0 36px rgb(242 182 76 / 30%)}\n.card{border:1px solid var(--line)}\n.btn{text-transform:uppercase;letter-spacing:.12em;font-size:.8rem}\n.eyebrow{letter-spacing:.32em}"
    },
    jubilee: {
      name: "Jubilee", note: "Gospel and choirs: royal purple, lilac and gold", group: "christian",
      fonts: "family=Playfair+Display:ital,wght@0,800;1,700&family=Nunito:wght@400;600;700",
      t: {"bg": "#fbf7ff", "alt": "#efe5fa", "ink": "#26113f", "soft": "#55456b", "accent": "#6c2ea6", "fill": "#4a1d78", "on": "#ffffff", "line": "#ddcdee", "card": "#ffffff", "display": "\"Playfair Display\",Georgia,serif", "body": "\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "800", "radius": "14px", "h-case": "none", "h-scale": "1", "h-track": "-.01em", "deco": "#e2a72e"},
      css: ".site-header{border-top:6px solid var(--deco);border-bottom:0}\n.logo{color:var(--fill)}\n.logo:hover{color:var(--fill)}\n.title{color:var(--fill)}\n.head .title::after{content:\"\";display:block;width:4rem;height:4px;margin:.9rem auto 0;border-radius:4px;background:var(--deco)}\n.head:not(.center) .title::after{margin-left:0}\n.card{border:0;box-shadow:0 18px 40px -26px rgb(74 29 120 / 55%)}\n.btn{border-radius:999px;font-weight:700}\n.site-footer{border-top:6px solid var(--deco)}"
    },
    homecoming: {
      name: "Homecoming", note: "Southern gospel: forest green, cream and brass", group: "christian",
      fonts: "family=Arvo:wght@700&family=Lato:wght@400;700",
      t: {"bg": "#fff9ef", "alt": "#f2e8d4", "ink": "#1f2b1c", "soft": "#4f5a49", "accent": "#8a2f1d", "fill": "#2f4a2a", "on": "#fff9ef", "line": "#e0d2b6", "card": "#fffdf8", "display": "\"Arvo\",Rockwell,Georgia,serif", "body": "\"Lato\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "700", "radius": "8px", "h-case": "none", "h-scale": ".95", "h-track": "0", "deco": "#c99b3b"},
      css: ".site-header{border-top:8px solid var(--fill);border-bottom:3px double var(--deco)}\n.logo{color:var(--fill)}\n.logo:hover{color:var(--fill)}\n.eyebrow{color:var(--accent)}\n.head .title{padding-bottom:.6rem;border-bottom:3px double var(--deco)}\n.card{border:1px solid var(--line);border-left:6px solid var(--fill)}\n.btn{border-radius:6px}"
    },
    hymnal: {
      name: "Hymnal", note: "Hymns and sacred piano: parchment, ink and oxblood", group: "christian",
      fonts: "family=IM+Fell+English:ital@0;1&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600",
      t: {"bg": "#f7f1e4", "alt": "#ede4d1", "ink": "#2b2118", "soft": "#5a4b3c", "accent": "#7a2a1c", "fill": "#2b2118", "on": "#f7f1e4", "line": "#d8cbb1", "card": "#fbf7ee", "display": "\"IM Fell English\",Garamond,Georgia,serif", "body": "\"Source Serif 4\",Georgia,\"Times New Roman\",serif", "dw": "400", "radius": "0", "h-case": "none", "h-scale": "1.1", "h-track": "0", "deco": "#a8875a"},
      css: ".site-header{border-bottom:1px solid var(--ink);box-shadow:0 3px 0 -2px var(--ink)}\n.logo{font-family:var(--display);font-size:1.35rem}\n.eyebrow{font-variant:small-caps;text-transform:lowercase;letter-spacing:.14em;font-size:1rem;font-weight:600}\n.head .title::before{content:\"\\2766\";display:block;margin-bottom:.4rem;font-size:1.1rem;color:var(--accent)}\n.card{border:1px solid var(--ink);border-radius:0;box-shadow:none}\n.btn{border-radius:0;font-family:var(--body);letter-spacing:.04em}"
    },
    morning: {
      name: "New Morning", note: "Christian singer-songwriter: blush, coral and navy", group: "christian",
      fonts: "family=Gloock&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700",
      t: {"bg": "#fffaf6", "alt": "#fbeee6", "ink": "#22263a", "soft": "#52566b", "accent": "#b0412f", "fill": "#22263a", "on": "#fffaf6", "line": "#f0dcd0", "card": "#ffffff", "display": "\"Gloock\",Georgia,serif", "body": "\"DM Sans\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "18px", "h-case": "none", "h-scale": "1", "h-track": "-.01em", "deco": "#f6b9a2"},
      css: ".site-header{border-bottom:0;background:rgb(255 250 246 / 92%)}\n.card{border:0;box-shadow:0 1px 0 var(--line),0 20px 40px -30px rgb(176 65 47 / 45%)}\n.eyebrow{display:inline-block;padding:.25rem .8rem;border-radius:999px;background:var(--alt)}\n.sec.alt .eyebrow{background:var(--bg)}\n.btn{border-radius:999px}\n.sec.alt{background:linear-gradient(180deg,var(--alt) 0,var(--bg) 100%)}"
    },
    testimony: {
      name: "Testimony", note: "Christian hip-hop and youth: concrete, electric blue and hot pink", group: "christian",
      fonts: "family=Anton&family=Rubik:wght@400;500;700",
      t: {"bg": "#f3f3ef", "alt": "#e6e6e0", "ink": "#0b0b0c", "soft": "#46464a", "accent": "#1d46d6", "fill": "#1d46d6", "on": "#ffffff", "line": "#cfcfc7", "card": "#ffffff", "display": "\"Anton\",Impact,\"Arial Narrow\",sans-serif", "body": "\"Rubik\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "400", "radius": "12px", "h-case": "uppercase", "h-scale": "1.05", "h-track": ".01em", "deco": "#ff2e63"},
      css: ".site-header{border-bottom:3px solid var(--ink)}\n.logo{font-family:var(--display);text-transform:uppercase;letter-spacing:.04em}\n.head.center{text-align:left}\n.head.center .lead{margin-left:0}\n.set-tabs,.dfilter{justify-content:flex-start}\n.eyebrow{display:inline-block;padding:.25rem .7rem;background:var(--ink);color:var(--bg);transform:rotate(-2deg)}\n.title{text-decoration:underline;text-decoration-color:var(--deco);text-decoration-thickness:.12em;text-underline-offset:.12em}\n.card{border:2px solid var(--ink);box-shadow:6px 6px 0 var(--ink)}\n.btn{border-radius:8px;text-transform:uppercase;letter-spacing:.06em;box-shadow:3px 3px 0 var(--ink)}"
    },
    sprout: {
      name: "Sprout", note: "Kids and family worship: sunshine, sky blue and leaf green", group: "christian",
      fonts: "family=Baloo+2:wght@700;800&family=Lexend:wght@400;500;600",
      t: {"bg": "#fffdf2", "alt": "#eef6ff", "ink": "#1d2a44", "soft": "#4a5670", "accent": "#0d6b40", "fill": "#1d4fd8", "on": "#ffffff", "line": "#d9e4f2", "card": "#ffffff", "display": "\"Baloo 2\",\"Trebuchet MS\",system-ui,sans-serif", "body": "\"Lexend\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif", "dw": "800", "radius": "24px", "h-case": "none", "h-scale": "1.05", "h-track": "-.01em", "deco": "#ffcd3c"},
      css: ".site-header{border-bottom:0;box-shadow:0 6px 0 var(--deco)}\n.logo{color:var(--fill)}\n.logo:hover{color:var(--fill)}\n.title{color:var(--fill)}\n.eyebrow{display:inline-block;padding:.3rem .9rem;border-radius:999px;background:var(--deco);color:var(--ink)}\n.card{border:3px solid var(--line);box-shadow:0 8px 0 var(--line)}\n.btn{border-radius:999px;font-weight:600;box-shadow:0 5px 0 var(--ink)}\n.sec.alt{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 40' preserveAspectRatio='none'%3E%3Cpath d='M0 0h1440v18c-120 22-240 22-360 0s-240-22-360 0-240 22-360 0S120-4 0 18z' fill='%23fffdf2'/%3E%3C/svg%3E\") top / 100% 34px no-repeat,var(--alt)}"
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
      quote: "A voice that sounds like it has lived every word it sings.", quoteSource: "Publication Name",
      timeline: [{ year: "2018", text: "EDIT: The first song, the first show." }, { year: "2022", text: "EDIT: A turning point." }, { year: "2026", text: "EDIT: Where things are now." }]
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
    audiences: {
      church: { label: "For churches", title: "Worship, concerts and retreats",
        blurb: "Sunday worship, concerts of praise, youth nights and retreats, sized to your room and your budget.",
        offers: ["Sunday worship sets", "Evening concerts", "Youth and retreat weekends", "Christmas and Easter services"], button: "Book for your church" },
      venue: { label: "For venues and events", title: "Shows, weddings and private events",
        blurb: "Original songs and well-loved covers for listening rooms, festivals, weddings and private parties.",
        offers: ["Listening rooms and bars", "Festivals and fairs", "Weddings and receptions", "Corporate and private events"], button: "Book a show or event" }
    },
    sets: [
      { label: "Worship and faith", title: "Album Title", released: "2026-09-12", note: "Songs of faith, written for the church and the quiet hours.", cover: "", bandcampUrl: "https://REPLACE.bandcamp.com/album/REPLACE",
        tracks: [
          { title: "Track One", length: "3:42", ref: "Psalm 23", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", free: true, buy: "" },
          { title: "Track Two", length: "4:05", ref: "Psalm 40", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", free: false, buy: "https://REPLACE.bandcamp.com/track/track-two" },
          { title: "Track Three", length: "3:18", ref: "", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", free: false, buy: "https://REPLACE.bandcamp.com/track/track-three" } ] },
      { label: "Originals and covers", title: "Second Album Title", released: "2025-05-02", note: "Songs about life, love and the long road home, plus a few favorites.", cover: "", bandcampUrl: "https://REPLACE.bandcamp.com/album/REPLACE-2",
        tracks: [
          { title: "Song Four", length: "3:55", ref: "", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", free: true, buy: "" },
          { title: "Song Five", length: "4:12", ref: "", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", free: false, buy: "https://REPLACE.bandcamp.com/track/song-five" },
          { title: "Song Six", length: "3:27", ref: "", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", free: false, buy: "https://REPLACE.bandcamp.com/track/song-six" } ] }
    ],
    repertoire: { note: "A few favorites from a much longer list. Send us your must-play songs and your do-not-play list.",
      groups: [{ name: "First dances", songs: [["Song Title", "Original Artist"], ["Song Title", "Original Artist"], ["Song Title", "Original Artist"]] },
               { name: "Dance floor", songs: [["Song Title", "Original Artist"], ["Song Title", "Original Artist"], ["Song Title", "Original Artist"]] },
               { name: "Dinner and cocktails", songs: [["Song Title", "Original Artist"], ["Song Title", "Original Artist"], ["Song Title", "Original Artist"]] }] },
    packages: [{ name: "Ceremony", desc: "EDIT: what this package covers.", includes: ["EDIT: what's included", "EDIT: what's included"] },
               { name: "Reception", desc: "EDIT: what this package covers.", includes: ["EDIT: what's included", "EDIT: what's included"] },
               { name: "The whole day", desc: "EDIT: what this package covers.", includes: ["EDIT: what's included", "EDIT: what's included"] }],
    devotions: [
      { song: "Track One", ref: "Psalm 23:1 · KJV", verse: "The LORD is my shepherd; I shall not want.", text: "EDIT: A few sentences on what this verse means to you and how it shaped the song." },
      { song: "Track Two", ref: "Psalm 40:3 · KJV", verse: "And he hath put a new song in my mouth, even praise unto our God.", text: "EDIT: A few sentences on what this verse means to you and how it shaped the song." },
      { song: "Track Three", ref: "Psalm 46:10 · KJV", verse: "Be still, and know that I am God.", text: "EDIT: A few sentences on what this verse means to you and how it shaped the song." }],
    hosting: { heading: "Host a night of worship", needs: ["EDIT: what you need from the church", "EDIT: what you need from the church"],
      steps: [{ title: "Pick a date", text: "EDIT: how booking starts." }, { title: "Plan the night", text: "EDIT: how you plan with the pastor or worship leader." }, { title: "Worship together", text: "EDIT: what the night looks like." }] },
    give: { heading: "Partner with the ministry", text: "EDIT: what gifts make possible.", button: "Give", url: "https://REPLACE.com/give" },
    press: { fansOf: "", quotes: [{ q: "A voice that sounds like it has lived every word it sings.", src: "Publication Name" }, { q: "The kind of songwriter who makes a room go quiet.", src: "Music Blog" }], photos: "" },
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
  const WHOLE = ["streams", "social", "links", "audiences"]; // link lists: the recipe's list replaces the sample's, never mixes with it
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
.hero-arch .grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.hero-arch h1{overflow-wrap:break-word;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.6rem,1.6rem + 4.2vw,5rem));line-height:1;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.hero-arch .frame{position:relative}
.hero-arch .frame::before{content:"";position:absolute;inset:-1.25rem 1.25rem 1.25rem -1.25rem;border-radius:999px 999px var(--radius) var(--radius);background:var(--alt)}
.hero-arch .frame img{position:relative;aspect-ratio:4 / 5;border-radius:999px 999px var(--radius) var(--radius)}
@media (max-width:52em){.hero-arch .grid{grid-template-columns:minmax(0,1fr)}.hero-arch .frame{width:100%;max-width:22rem;margin:1.5rem auto 0;order:-1}}`,
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
.hero-record .grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:3rem;align-items:center}
.hero-record h1{overflow-wrap:break-word;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.4rem,1.4rem + 4.2vw,4.8rem));line-height:1;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.turntable{position:relative;width:min(100%,28rem);aspect-ratio:1;margin:0 auto}
.turntable .sun{position:absolute;inset:-5%;border-radius:50%;background:linear-gradient(180deg,var(--accent),var(--deco));opacity:.9}
.turntable .disc{position:absolute;inset:7%;border-radius:50%;background:repeating-radial-gradient(circle at center,#141018 0 2px,#231b2b 2px 3px,#141018 3px 5px);box-shadow:0 24px 50px -20px rgb(0 0 0 / 80%);animation:spin 7s linear infinite}
.turntable .label{position:absolute;inset:33%;overflow:hidden;border-radius:50%}
.turntable .label img{width:100%;height:100%;object-fit:cover}
.turntable.paused .disc{animation-play-state:paused}
.spin{position:absolute;right:2%;bottom:4%;width:3.25rem;height:3.25rem;border:0;border-radius:50%;background:var(--ink);color:var(--bg);cursor:pointer;font-size:1rem}
@keyframes spin{to{transform:rotate(360deg)}}
@media (max-width:52em){.hero-record .grid{grid-template-columns:minmax(0,1fr);text-align:center}.hero-record .btns{justify-content:center}.hero-record .lead{margin-left:auto;margin-right:auto}.turntable{width:min(80%,20rem);order:-1}}`,

    player: `.lp{margin:1.75rem 0}
.lp-player{border:1px solid var(--line);border-radius:var(--radius);background:var(--card);overflow:hidden}
.lp-now{display:grid;grid-template-columns:auto minmax(0,1fr);gap:1rem;align-items:center;padding:1.1rem 1.25rem;border-bottom:1px solid var(--line)}
.lp-now.solo{border-bottom:0}
.lp-toggle{display:grid;place-items:center;width:3.25rem;height:3.25rem;border:0;border-radius:50%;background:var(--fill);color:var(--on);font-size:1rem;cursor:pointer}
.lp-meta{min-width:0}
.lp-title{font-family:var(--display);font-weight:var(--dw);font-size:1.25rem;line-height:1.2;overflow-wrap:anywhere}
.lp-bar{display:flex;align-items:center;gap:.75rem;margin-top:.4rem;font-size:.8rem;color:var(--soft);font-variant-numeric:tabular-nums}
.lp-seek{flex:1;min-width:0;height:1.5rem;accent-color:var(--accent);cursor:pointer}
.lp-list li{display:grid;grid-template-columns:auto auto minmax(0,1fr) auto auto;gap:.6rem 1rem;align-items:center;padding:.7rem 1.25rem;border-bottom:1px solid var(--line)}
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
@media (max-width:36em){.lp-list li{grid-template-columns:auto minmax(0,1fr) auto;padding:.7rem 1rem}.lp-num,.lp-time{display:none}}`,
    "music/album": `.music-album .grid{display:grid;grid-template-columns:minmax(0,22rem) 1fr;gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:start}
.music-album .cover{aspect-ratio:1;border-radius:calc(var(--radius) / 2);box-shadow:0 28px 50px -30px rgb(0 0 0 / 55%)}
.music-album .meta{margin-top:.6rem;color:var(--soft)}
@media (max-width:52em){.music-album .grid{grid-template-columns:minmax(0,1fr)}.music-album .cover{max-width:min(100%,20rem)}}`,
    "music/stories": `.music-stories .grid{display:grid;grid-template-columns:minmax(0,20rem) 1fr;gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:start}
.music-stories .cover{aspect-ratio:1;border-radius:calc(var(--radius) / 2)}
.songs{margin-top:1.5rem;border-top:1px solid var(--line)}
.song-row{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.25rem .75rem;align-items:start;padding-left:.25rem;border-bottom:1px solid var(--line)}
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
@media (max-width:52em){.music-stories .grid{grid-template-columns:minmax(0,1fr)}.music-stories .cover{max-width:min(100%,18rem)}}`,
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
@media (max-width:36em){.vgrid{grid-template-columns:minmax(0,1fr)}}`,

    "dates/list": `.none{max-width:36rem;margin:0 auto;text-align:center;color:var(--soft)}
.dlist{max-width:52rem;margin:0 auto;border-top:1px solid var(--line)}
.dlist li{display:grid;grid-template-columns:7rem minmax(0,1fr) auto;gap:1.5rem;align-items:center;padding:1.4rem 0;border-bottom:1px solid var(--line)}
.dlist time{font-family:var(--display);font-weight:var(--dw);font-size:1.5rem;line-height:1.1}
.dlist time small,.dlist .where small{display:block;margin-top:.2rem;font-family:var(--body);font-size:.8rem;font-weight:400;color:var(--soft)}
@media (max-width:36em){.dlist li{grid-template-columns:5.5rem minmax(0,1fr)}.dlist .btn{grid-column:2;justify-self:start}}`,
    "dates/tickets": `.none{max-width:36rem;margin:0 auto;text-align:center;color:var(--soft)}
.tickets{display:grid;gap:1rem;max-width:52rem;margin:0 auto}
.ticket{display:grid;grid-template-columns:7rem minmax(0,1fr) 10rem;overflow:hidden}
.ticket time{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.1rem .5rem;background:var(--fill);color:var(--on);font-family:var(--display);font-weight:var(--dw);line-height:1;text-align:center}
.ticket time .m{font-family:var(--body);font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.ticket time .d{margin:.3rem 0;font-size:2.4rem}
.ticket time .w{font-family:var(--body);font-size:.75rem;font-weight:400}
.ticket .body{padding:1.1rem 1.4rem}
.ticket .city{font-family:var(--display);font-weight:var(--dw);font-size:1.35rem;line-height:1.15;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.ticket .body p{color:var(--soft);font-size:.95rem}
.ticket .stub{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1rem;border-left:2px dashed var(--line)}
.ticket .price{font-family:var(--display);font-weight:var(--dw);font-size:1.2rem}
.ticket .tag{display:inline-block;margin-bottom:.3rem;padding:.1rem .6rem;border-radius:999px;background:var(--alt);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
@media (max-width:40em){.ticket{grid-template-columns:5.5rem minmax(0,1fr)}.ticket .stub{grid-column:1 / -1;flex-direction:row;justify-content:space-between;border-left:0;border-top:2px dashed var(--line)}}`,

    "paths/split": `.paths .duo{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}
.path{display:flex;flex-direction:column;padding:clamp(1.5rem,1rem + 2vw,2.5rem)}
.path .ic{display:grid;place-items:center;width:3.25rem;height:3.25rem;border-radius:50%;background:var(--alt);color:var(--accent)}
.path .ic svg{width:1.6rem;height:1.6rem}
.path h3{margin-top:1.1rem;font-size:.78rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.path .pt{margin-top:.35rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.5rem,1.2rem + 1vw,2rem));line-height:1.1;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.path > p{margin-top:.75rem;color:var(--soft)}
.path ul{flex:1;margin-top:1.1rem}
.path li{position:relative;padding:.45rem 0 .45rem 1.6rem;border-top:1px solid var(--line)}
.path li::before{content:"";position:absolute;left:.2rem;top:1.05rem;width:.55rem;height:.3rem;border-left:2px solid var(--accent);border-bottom:2px solid var(--accent);transform:rotate(-45deg)}
.path .btns{margin-top:1.5rem}
@media (max-width:52em){.paths .duo{grid-template-columns:minmax(0,1fr)}}`,
    "music/sets": `.music-sets .grid{display:grid;grid-template-columns:minmax(0,20rem) 1fr;gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:start}
.music-sets .cover{aspect-ratio:1;border-radius:calc(var(--radius) / 2);box-shadow:0 28px 50px -30px rgb(0 0 0 / 55%)}
.set-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin-top:1.5rem}
.set-tabs button{min-height:2.9rem;padding:.6rem 1.3rem;border:1px solid var(--line);border-radius:999px;background:transparent;font-weight:700;font-size:.92rem;color:var(--soft);cursor:pointer}
.set-tabs button[aria-selected="true"]{border-color:var(--fill);background:var(--fill);color:var(--on)}
.set-panel h3{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.6rem,1.2rem + 1.4vw,2.4rem));line-height:1.05;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.set-panel .meta{margin-top:.5rem;color:var(--soft);font-size:.95rem}
.set-panel .note{margin-top:.75rem;color:var(--soft)}
.set-panel .store{margin-top:1.25rem}
.lp-list li[hidden]{display:none}
@media (max-width:52em){.music-sets .grid{grid-template-columns:minmax(0,1fr)}.music-sets .cover{max-width:min(100%,18rem)}}`,
    "dates/split": `.none{max-width:36rem;margin:0 auto;text-align:center;color:var(--soft)}
.dfilter{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin:-1rem 0 2rem}
.dfilter button{min-height:2.6rem;padding:0 1.1rem;border:1px solid var(--line);border-radius:999px;background:transparent;font-size:.88rem;font-weight:600;color:var(--soft);cursor:pointer}
.dfilter button[aria-pressed="true"]{border-color:var(--ink);color:var(--ink)}
.dsplit{max-width:54rem;margin:0 auto;border-top:1px solid var(--line)}
.dsplit li{display:grid;grid-template-columns:6.5rem minmax(0,1fr) auto;gap:1.25rem;align-items:center;padding:1.3rem 0;border-bottom:1px solid var(--line)}
.dsplit li[hidden]{display:none}
.dsplit time{font-family:var(--display);font-weight:var(--dw);font-size:1.45rem;line-height:1.1}
.dsplit time small,.dsplit .where small{display:block;margin-top:.2rem;font-family:var(--body);font-size:.8rem;font-weight:400;color:var(--soft)}
.dsplit .tag{display:inline-block;margin-bottom:.3rem;padding:.1rem .6rem;border-radius:999px;background:var(--alt);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.dsplit .where{min-width:0}
@media (max-width:36em){.dsplit li{grid-template-columns:5.25rem minmax(0,1fr)}.dsplit .btn{grid-column:2;justify-self:start}}`,
    "booking/two": `.book-duo{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}
.book-card{display:flex;flex-direction:column;padding:clamp(1.5rem,1rem + 2vw,2.25rem)}
.book-card h3{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.4rem,1.15rem + 1vw,1.9rem));line-height:1.1;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.book-card > p{margin-top:.6rem;color:var(--soft)}
.book-card ul{flex:1;display:flex;flex-wrap:wrap;gap:.4rem;margin:1.1rem 0 1.5rem}
.book-card li{padding:.3rem .8rem;border:1px solid var(--line);border-radius:999px;font-size:.85rem;color:var(--ink)}
.book-card .btn{align-self:flex-start}
.book-more{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem 2.5rem;margin-top:2.5rem;font-size:.95rem;text-align:center}
.book-more span{display:block;font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--soft)}
@media (max-width:52em){.book-duo{grid-template-columns:minmax(0,1fr)}}`,
    "hero/split": `.hero-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:min(86vh,46rem);background:var(--alt)}
.hero-split > img{width:100%;height:100%;max-width:none;object-fit:cover}
.hero-split .txt{display:flex;flex-direction:column;justify-content:center;padding:clamp(2.5rem,1.5rem + 4vw,5.5rem) clamp(1.25rem,1rem + 3vw,4.5rem)}
.hero-split h1{overflow-wrap:break-word;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.3rem,1.5rem + 3.4vw,4.4rem));line-height:1.02;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
@media (max-width:52em){.hero-split{grid-template-columns:minmax(0,1fr);min-height:0}.hero-split > img{aspect-ratio:4 / 3;height:auto}}`,
    "hero/frame": `.hero-frame{padding:clamp(3rem,2rem + 4vw,6rem) 0 clamp(2.5rem,2rem + 3vw,5rem);text-align:center}
.hero-frame h1{overflow-wrap:break-word;max-width:17em;margin:0 auto;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.3rem,1.5rem + 3.6vw,4.4rem));line-height:1.05;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.hero-frame .lead{margin-left:auto;margin-right:auto}
.hero-frame .btns{justify-content:center}
.hero-frame figure{position:relative;max-width:58rem;margin:3rem auto 0;padding:.9rem;border:1px solid var(--accent)}
.hero-frame figure::before{content:"";position:absolute;inset:.35rem;border:1px solid var(--line);pointer-events:none}
.hero-frame figure img{position:relative;width:100%;aspect-ratio:16 / 8;object-fit:cover}
@media (max-width:40em){.hero-frame figure img{aspect-ratio:4 / 3}}`,
    "hero/poster": `.hero-poster{position:relative;overflow:hidden;padding:clamp(3rem,2rem + 4vw,6rem) 0 clamp(3rem,2rem + 3vw,5rem);background:var(--bg)}
.hero-poster > img{position:absolute;top:0;right:0;width:58%;height:100%;max-width:none;object-fit:cover;clip-path:polygon(22% 0,100% 0,100% 100%,0 100%);opacity:.55}
.hero-poster::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--bg) 35%,rgb(0 0 0 / 0%) 100%)}
.hero-poster .wrap{position:relative;z-index:1}
.hero-poster .big{font-family:var(--display);font-weight:var(--dw);font-size:min(9rem,calc(min(100vw,70rem) * 1.2 / var(--n)));line-height:.88;letter-spacing:var(--h-track);text-transform:var(--h-case);color:var(--accent);overflow-wrap:anywhere}
.hero-poster h1{overflow-wrap:break-word;max-width:20em;margin-top:1.25rem;font-family:var(--body);font-weight:700;font-size:clamp(1.2rem,1rem + .9vw,1.6rem);line-height:1.3}
.hero-poster .stripe{display:block;width:6rem;height:.4rem;margin-top:1.5rem;background:var(--deco)}
@media (max-width:52em){.hero-poster > img{width:100%;opacity:.25;clip-path:none}}`,
    "hero/banner": `.hero-banner{text-align:center}
.hero-banner .band{padding:clamp(2.5rem,2rem + 3vw,4.5rem) 0 clamp(2rem,1.5rem + 2vw,3.5rem);background:var(--fill);color:var(--on)}
.hero-banner .stars{letter-spacing:.6em;font-size:.9rem;color:var(--on)}
.hero-banner .big{margin-top:.6rem;font-family:var(--display);font-weight:var(--dw);font-size:clamp(2.6rem,1.4rem + 6vw,6.5rem);line-height:.95;letter-spacing:var(--h-track);text-transform:var(--h-case);overflow-wrap:anywhere}
.hero-banner h1{overflow-wrap:break-word;max-width:28em;margin:1.1rem auto 0;font-family:var(--body);font-weight:600;font-size:clamp(1.05rem,.95rem + .6vw,1.35rem);line-height:1.4}
.hero-banner .btns{justify-content:center}
.hero-banner .band .btn{background:var(--on);border-color:var(--on);color:var(--fill)}
.hero-banner .band .btn-o{background:transparent;color:var(--on);border-color:var(--on)}
.hero-banner .strip{width:100%;max-width:none;height:clamp(14rem,30vw,26rem);object-fit:cover}
.hero-banner .lead{margin:1.75rem auto 0;padding:0 1.25rem}`,
    "paths/doors": `.doors{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.door{display:flex;flex-direction:column;padding:clamp(2.5rem,1.5rem + 4vw,5.5rem) clamp(1.25rem,1rem + 3vw,4.5rem)}
.door-a{background:var(--fill);color:var(--on)}
.door-b{background:var(--card);color:var(--ink)}
.door .k{font-size:.78rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase}
.door-b .k{color:var(--accent)}
.door h2{margin-top:.5rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2rem,1.4rem + 2.4vw,3.2rem));line-height:1.02;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.door p{margin-top:1rem;max-width:30rem}
.door-b p{color:var(--soft)}
.door ul{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.4rem}
.door li{padding:.25rem .8rem;border:1px solid currentColor;border-radius:999px;font-size:.85rem}
.door-b li{border-color:var(--line)}
.door .btns{margin-top:auto;padding-top:2rem}
.door-a .btn{background:var(--on);border-color:var(--on);color:var(--fill)}
.door-a .btn:hover{color:var(--fill)}
.door-a .btn-o{background:transparent;color:var(--on);border-color:var(--on)}
.door-a .btn-o:hover{color:var(--on)}
.door-a .btn:focus-visible,.door-a a:focus-visible{outline-color:var(--on)}
@media (max-width:52em){.doors{grid-template-columns:minmax(0,1fr)}}`,
    "paths/toggle": `.ptoggle{max-width:54rem;margin:0 auto}
.pswitch{display:flex;justify-content:center;gap:.25rem;width:max-content;max-width:100%;margin:0 auto 2rem;padding:.3rem;border:1px solid var(--line);border-radius:999px;background:var(--card)}
.pswitch button{min-height:2.9rem;padding:.5rem 1.4rem;border:0;border-radius:999px;background:transparent;font-weight:700;font-size:.95rem;color:var(--soft);cursor:pointer}
.pswitch button[aria-pressed="true"]{background:var(--fill);color:var(--on)}
.ppanel{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(1.5rem,1rem + 3vw,3.5rem);align-items:center;padding:clamp(1.5rem,1rem + 2.5vw,3rem)}
.ppanel + .ppanel{margin-top:1.5rem}
.ppanel h3{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.6rem,1.2rem + 1.5vw,2.4rem));line-height:1.1;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.ppanel p{margin-top:.75rem;color:var(--soft)}
.ppanel ul{display:grid;gap:.5rem}
.ppanel li{display:flex;gap:.7rem;align-items:center;font-weight:600}
.ppanel li::before{content:"";flex:none;width:.55rem;height:.55rem;border-radius:50%;background:var(--accent)}
@media (max-width:44em){.ppanel{grid-template-columns:minmax(0,1fr)}}`,
    "paths/stacked": `.pstack{display:grid;gap:clamp(2.5rem,2rem + 3vw,5rem)}
.prow{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.prow:nth-child(2) .pimg{order:2}
.pimg{width:100%;aspect-ratio:5 / 4;object-fit:cover;border-radius:var(--radius)}
.prow h3{font-size:.78rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--accent)}
.prow .pt{margin-top:.4rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.8rem,1.3rem + 1.8vw,2.8rem));line-height:1.05;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.prow p{margin-top:.9rem;color:var(--soft)}
.prow .offers{margin-top:1rem;color:var(--ink);font-size:.95rem}
@media (max-width:52em){.prow{grid-template-columns:minmax(0,1fr)}.prow:nth-child(2) .pimg{order:0}}`,
    "music/records": `.records{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(1.5rem,1rem + 2vw,2.5rem);margin-top:1.5rem}
.record{padding:clamp(1.25rem,1rem + 1vw,1.75rem)}
.record .top{display:grid;grid-template-columns:7.5rem minmax(0,1fr);gap:1.25rem;align-items:center}
.record .top img{aspect-ratio:1;border-radius:calc(var(--radius) / 2)}
.record .lbl{font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.record h3{margin-top:.25rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * 1.6rem);line-height:1.1;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.record .meta{margin-top:.25rem;color:var(--soft);font-size:.88rem}
.record ol{margin-top:1.25rem;border-top:1px solid var(--line)}
.record li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:.4rem .9rem;align-items:center;padding:.6rem .25rem;border-bottom:1px solid var(--line)}
.record li.on{background:var(--alt)}
.record .nm{min-width:0;overflow-wrap:anywhere}
.record .tm{color:var(--soft);font-size:.85rem;font-variant-numeric:tabular-nums}
.record .acts{grid-column:2 / -1}
.record .acts:empty{display:none}
.record .bc{margin-top:1rem}
@media (max-width:52em){.records{grid-template-columns:minmax(0,1fr)}}`,
    "music/playlist": `.plist{max-width:50rem;margin:0 auto}
.plist .lp{margin-top:0}
.pgroup{margin-top:2rem}
.pgroup h3{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:.25rem 1rem;padding-bottom:.6rem;border-bottom:2px solid var(--accent)}
.pgroup h3 span{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * 1.5rem);letter-spacing:var(--h-track);text-transform:var(--h-case)}
.pgroup h3 small{font-size:.8rem;font-weight:600;color:var(--soft)}
.pgroup li{display:grid;grid-template-columns:auto 2rem minmax(0,1fr) auto;gap:.4rem .9rem;align-items:center;padding:.65rem .25rem;border-bottom:1px solid var(--line)}
.pgroup li.on{background:var(--alt)}
.pgroup .n{color:var(--accent);font-size:.85rem;font-variant-numeric:tabular-nums}
.pgroup .nm{min-width:0;overflow-wrap:anywhere}
.pgroup .tm{color:var(--soft);font-size:.85rem;font-variant-numeric:tabular-nums}
.pgroup .acts{grid-column:3 / -1}
.pgroup .acts:empty{display:none}
.pgroup .bc{margin-top:.9rem;font-size:.92rem}
@media (max-width:36em){.pgroup li{grid-template-columns:auto minmax(0,1fr) auto}.pgroup .n{display:none}}`,
    "dates/cards": `.none{max-width:36rem;margin:0 auto;text-align:center;color:var(--soft)}
.dfilter{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin:-1rem 0 2rem}
.dfilter button{min-height:2.6rem;padding:0 1.1rem;border:1px solid var(--line);border-radius:999px;background:transparent;font-size:.88rem;font-weight:600;color:var(--soft);cursor:pointer}
.dfilter button[aria-pressed="true"]{border-color:var(--ink);color:var(--ink)}
.dcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,16rem),1fr));gap:1.25rem}
.dcard{display:flex;flex-direction:column;padding:1.4rem}
.dcard[hidden]{display:none}
.dcard time{display:flex;align-items:baseline;gap:.5rem;font-family:var(--display);font-weight:var(--dw)}
.dcard time .d{font-size:2.6rem;line-height:1}
.dcard time .m{font-size:1.1rem;color:var(--accent)}
.dcard .w{margin-top:.15rem;font-size:.85rem;color:var(--soft)}
.dcard .tag{align-self:flex-start;margin-top:1rem;padding:.1rem .6rem;border-radius:999px;background:var(--alt);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.dcard .v{margin-top:.5rem;font-weight:700}
.dcard .c{flex:1;color:var(--soft);font-size:.92rem}
.dcard .btn{align-self:flex-start;margin-top:1.1rem}`,
    "dates/poster": `.none{max-width:36rem;margin:0 auto;text-align:center;color:var(--soft)}
.dfilter{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin:-1rem 0 2rem}
.dfilter button{min-height:2.6rem;padding:0 1.1rem;border:1px solid var(--line);border-radius:999px;background:transparent;font-size:.88rem;font-weight:600;color:var(--soft);cursor:pointer}
.dfilter button[aria-pressed="true"]{border-color:var(--ink);color:var(--ink)}
.dposter{border-top:3px solid var(--ink)}
.dposter li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:1.5rem;align-items:center;padding:1.25rem 0;border-bottom:1px solid var(--line)}
.dposter li[hidden]{display:none}
.dposter time{display:grid;grid-template-columns:auto auto;gap:0 .6rem;align-items:center;min-width:8.5rem;font-family:var(--display);font-weight:var(--dw);line-height:.9}
.dposter time .d{grid-row:span 2;font-size:3.4rem}
.dposter time .m{font-size:1rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.dposter time .w{font-family:var(--body);font-size:.78rem;font-weight:400;color:var(--soft)}
.dposter .v{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.3rem,1.1rem + .8vw,1.7rem));line-height:1.1;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.dposter .c{color:var(--soft);font-size:.92rem}
.dposter .tag{font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
@media (max-width:40em){.dposter li{grid-template-columns:auto minmax(0,1fr);gap:1rem}.dposter .btn{grid-column:2;justify-self:start}.dposter time{min-width:0}}`,
    "booking/banner": `.bbanner{background:var(--fill);color:var(--on);text-align:center}
.bbanner .eyebrow{color:var(--on)}
.bbanner h2{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.2rem,1.4rem + 3.4vw,4.2rem));line-height:1;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.bbanner .lead{margin-left:auto;margin-right:auto;color:var(--on)}
.bbanner .twin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1.25rem;max-width:52rem;margin:2.5rem auto 0;text-align:left}
.bbanner .twin > div{padding:1.5rem;border:1px solid var(--on);border-radius:var(--radius)}
.bbanner h3{font-size:.78rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.bbanner .twin p{margin-top:.5rem;font-size:.95rem}
.bbanner .btn{margin-top:1.25rem;background:var(--on);border-color:var(--on);color:var(--fill)}
.bbanner .btn:hover{color:var(--fill)}
.bbanner a{color:var(--on)}
.bbanner a:focus-visible{outline-color:var(--on)}
.bbanner .more{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem 2rem;margin-top:2rem;font-size:.92rem}
@media (max-width:44em){.bbanner .twin{grid-template-columns:minmax(0,1fr)}}`,
    "booking/letter": `.bletter{max-width:48rem;margin:0 auto;padding:clamp(2rem,1.5rem + 3vw,3.5rem);text-align:center}
.bletter .orn{font-family:var(--display);font-size:1.6rem;line-height:1;color:var(--accent)}
.bletter h2{margin-top:.6rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2rem,1.4rem + 2.4vw,3rem));line-height:1.05;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.bletter .lead{margin-left:auto;margin-right:auto}
.bletter .cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);margin-top:2rem;text-align:left}
.bletter .cols > div{padding:0 1.5rem}
.bletter .cols > div + div{border-left:1px solid var(--line)}
.bletter h3{font-family:var(--display);font-weight:var(--dw);font-size:1.3rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.bletter ul{margin-top:.6rem;color:var(--soft);font-size:.95rem}
.bletter li + li{margin-top:.2rem}
.bletter .btn{margin-top:1.1rem}
.bletter .sig{margin-top:2.25rem;padding-top:1.25rem;border-top:1px solid var(--line);font-size:.92rem;color:var(--soft)}
@media (max-width:44em){.bletter .cols{grid-template-columns:minmax(0,1fr);gap:1.5rem}.bletter .cols > div{padding:0}.bletter .cols > div + div{border-left:0;border-top:1px solid var(--line);padding-top:1.5rem}}`,
    "videos/wide": `.vtheater{background:#0c0c10;color:#f2f0ec}
.vtheater .eyebrow{color:#e9c27a}
.vtheater .title{color:#f2f0ec}
.vt-grid{display:grid;grid-template-columns:minmax(0,2.2fr) minmax(0,1fr);gap:1.5rem;align-items:start}
.video-frame{position:relative;overflow:hidden;aspect-ratio:16 / 9;max-width:100%;border-radius:var(--radius);background:#1d1d24}
.video-frame iframe{width:100%;height:100%;border:0}
.vload{position:relative;display:block;width:100%;height:100%;padding:0;border:0;background:#1d1d24;cursor:pointer}
.vload img{width:100%;height:100%;object-fit:cover}
.vload .play{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:4.25rem;height:4.25rem;border-radius:50%;background:rgb(255 255 255 / 92%);color:#111;font-size:1.05rem;transform:translate(-50%,-50%)}
.vtheater .vcap{margin-top:1rem;font-family:var(--display);font-weight:var(--dw);font-size:1.3rem;text-align:left}
.vtheater .vlist{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:.5rem;margin-top:0}
.vtheater .vlist button{min-height:3rem;padding:.7rem 1rem;border:1px solid #3a3a44;border-radius:calc(var(--radius) / 2);background:transparent;color:#cfccc6;text-align:left;font-size:.92rem;cursor:pointer}
.vtheater .vlist button[aria-pressed="true"]{border-color:#e9c27a;color:#fff}
.vtheater .vlist button:focus-visible{outline:3px solid #e9c27a;outline-offset:2px}
@media (max-width:52em){.vt-grid{grid-template-columns:minmax(0,1fr)}}`,
    "merch/shelf": `.shelf{max-width:52rem;margin:0 auto;border-top:1px solid var(--line)}
.shelf li{display:grid;grid-template-columns:5.5rem minmax(0,1fr) auto;gap:1.25rem;align-items:center;padding:1rem 0;border-bottom:1px solid var(--line)}
.shelf img{aspect-ratio:1;border-radius:calc(var(--radius) / 2)}
.shelf h3{font-family:var(--display);font-weight:var(--dw);font-size:1.2rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.shelf p{color:var(--soft);font-size:.92rem}
.shelf .buy{display:flex;flex-direction:column;align-items:flex-end;gap:.4rem}
.shelf .price{font-weight:700;color:var(--accent)}
@media (max-width:36em){.shelf li{grid-template-columns:4.5rem minmax(0,1fr)}.shelf .buy{grid-column:2;flex-direction:row;align-items:center;justify-content:space-between}}`,
    "merch/feature": `.mfeat{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:center}
.mfeat > img{aspect-ratio:1;border-radius:var(--radius)}
.mfeat .tagline{font-size:.78rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.mfeat h3{margin-top:.4rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.8rem,1.3rem + 1.8vw,2.8rem));line-height:1.05;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.mfeat .desc{margin-top:.75rem;color:var(--soft)}
.mfeat .price{margin-top:1rem;font-family:var(--display);font-weight:var(--dw);font-size:1.6rem}
.mfeat .more{margin-top:2rem;padding-top:1rem;border-top:1px solid var(--line);font-size:.95rem}
.mfeat .more a{margin-right:1.25rem;font-weight:600}
@media (max-width:52em){.mfeat{grid-template-columns:minmax(0,1fr)}.mfeat > img{max-width:min(100%,24rem)}}`,
    "press/kit": `.epk{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:clamp(2rem,1rem + 4vw,4rem);align-items:start}
.epk blockquote{padding:1.5rem 0;border-bottom:1px solid var(--line)}
.epk blockquote:first-child{padding-top:0}
.epk blockquote p{font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(1.3rem,1.1rem + .9vw,1.8rem));line-height:1.3;letter-spacing:var(--h-track)}
.epk cite{display:block;margin-top:.6rem;font-size:.82rem;font-style:normal;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.facts{padding:1.6rem}
.facts h3{font-size:.78rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.facts dl{margin-top:.75rem}
.facts dl div{display:grid;grid-template-columns:7.5rem minmax(0,1fr);gap:.75rem;padding:.6rem 0;border-bottom:1px solid var(--line)}
.facts dt{font-size:.85rem;color:var(--soft)}
.facts dd{font-weight:600;overflow-wrap:anywhere}
.facts .btns{margin-top:1.4rem}
@media (max-width:52em){.epk{grid-template-columns:minmax(0,1fr)}}`,
    "hero/marquee": `.hero-marquee{position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:min(90vh,50rem);overflow:hidden;background:#0b0b0b;color:#fff}
.hero-marquee > img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15)}
.hero-marquee::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgb(0 0 0 / 15%) 0,rgb(0 0 0 / 78%) 72%)}
.hero-marquee .wrap{position:relative;z-index:1;padding-top:7rem;padding-bottom:2.5rem}
.hero-marquee .big{font-family:var(--display);font-weight:var(--dw);font-size:min(10rem,calc(min(100vw,72rem) * 1.25 / var(--n)));line-height:.86;letter-spacing:var(--h-track);text-transform:uppercase;overflow-wrap:anywhere}
.hero-marquee h1{max-width:30em;margin-top:1.1rem;font-family:var(--body);font-weight:600;font-size:clamp(1.05rem,.95rem + .6vw,1.35rem);line-height:1.4;overflow-wrap:break-word}
.hero-marquee .btn-o{border-color:#fff;color:#fff}
.ticker{position:relative;z-index:1;background:var(--fill);color:var(--on)}
.ticker .wrap{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1.75rem;padding-top:.9rem;padding-bottom:.9rem}
.ticker .tk-h{font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.ticker ul{display:flex;flex-wrap:wrap;gap:.4rem 1.75rem;list-style:none}
.ticker li{font-weight:600}
.ticker time{margin-right:.4rem;font-family:var(--display);text-transform:uppercase}
.ticker a{margin-left:auto;color:var(--on);font-weight:700}`,
    "hero/cover": `.hero-cover{padding:clamp(3rem,2rem + 4vw,6.5rem) 0;background:radial-gradient(circle at 78% 30%,var(--alt) 0,var(--bg) 62%)}
.hero-cover .grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.hero-cover .art{position:relative;max-width:min(100%,30rem)}
.hero-cover .art img{aspect-ratio:1;border-radius:calc(var(--radius) / 2);box-shadow:0 40px 80px -30px rgb(0 0 0 / 70%);transform:rotate(-2.5deg)}
.hero-cover .sticker{position:absolute;top:-1rem;right:-1rem;display:grid;place-items:center;width:6.5rem;height:6.5rem;border-radius:50%;background:var(--fill);color:var(--on);font-size:.8rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;text-align:center;transform:rotate(12deg)}
.hero-cover .rel{margin-top:.75rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.8rem,1.6rem + 5vw,5.6rem));line-height:.95;letter-spacing:var(--h-track);text-transform:var(--h-case);color:var(--accent);overflow-wrap:anywhere}
.hero-cover h1{max-width:26em;margin-top:1rem;font-family:var(--body);font-weight:600;font-size:clamp(1.05rem,.95rem + .6vw,1.35rem);line-height:1.4;overflow-wrap:break-word}
.hero-cover .streams{margin-top:1.4rem}
@media (max-width:52em){.hero-cover .grid{grid-template-columns:minmax(0,1fr)}.hero-cover .art{max-width:min(100%,20rem);margin:0 auto 1rem}.hero-cover .sticker{right:0;width:5.25rem;height:5.25rem;font-size:.7rem}}`,
    "hero/collage": `.hero-collage{padding:clamp(2rem,1.5rem + 3vw,4.5rem) 0 clamp(3rem,2rem + 3vw,5rem)}
.mosaic{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:1rem;align-items:start}
.mosaic img{width:100%;height:100%;object-fit:cover;border-radius:var(--radius)}
.mosaic .m1{grid-column:1 / 8;grid-row:1 / 3;aspect-ratio:4 / 3}
.mosaic .m2{grid-column:8 / 13;grid-row:1;aspect-ratio:16 / 10}
.mosaic .m3{grid-column:8 / 13;grid-row:2;aspect-ratio:16 / 10}
.mosaic .tag{position:relative;z-index:1;grid-column:2 / 10;grid-row:3;margin-top:-6rem;padding:clamp(1.5rem,1rem + 2vw,2.5rem)}
.mosaic h1{margin-top:.5rem;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2rem,1.3rem + 3vw,3.6rem));line-height:1.02;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance;overflow-wrap:break-word}
@media (max-width:52em){.mosaic{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.mosaic .m1{grid-column:1 / 3;grid-row:auto}.mosaic .m2,.mosaic .m3{grid-column:auto;grid-row:auto;aspect-ratio:1}.mosaic .tag{grid-column:1 / 3;grid-row:auto;margin-top:0}}`,
    "hero/type": `.hero-type{position:relative;overflow:hidden;padding:clamp(4rem,3rem + 5vw,8rem) 0 clamp(3.5rem,2.5rem + 4vw,6.5rem)}
.hero-type .rings{position:absolute;top:50%;right:-14rem;width:42rem;height:42rem;border-radius:50%;background:repeating-radial-gradient(circle,var(--line) 0,var(--line) 1px,rgb(0 0 0 / 0%) 2px,rgb(0 0 0 / 0%) 26px);transform:translateY(-50%)}
.hero-type .rings::after{content:"";position:absolute;inset:38%;border-radius:50%;background:var(--deco);opacity:.85}
.hero-type .wrap{position:relative;z-index:1}
.hero-type .big{font-family:var(--display);font-weight:var(--dw);font-size:min(11rem,calc(min(100vw,72rem) * 1.05 / var(--n)));line-height:.9;letter-spacing:var(--h-track);text-transform:var(--h-case);color:var(--ink);overflow-wrap:anywhere}
.hero-type .big span{display:block}
.hero-type .big span:nth-child(2){color:var(--accent)}
.hero-type h1{max-width:28em;margin-top:1.6rem;font-family:var(--body);font-weight:500;font-size:clamp(1.05rem,.95rem + .6vw,1.35rem);line-height:1.45;overflow-wrap:break-word}
@media (max-width:52em){.hero-type .rings{right:-22rem;opacity:.5}}`,
    "links/bar": `.lb{display:grid;grid-template-columns:minmax(0,1fr);gap:1.5rem}
.lb .title{overflow-wrap:normal}
.lb ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,10rem),1fr));gap:.75rem;list-style:none}
.lb-tile{display:flex;flex-direction:column;gap:.2rem;min-height:5.5rem;padding:1rem 1.1rem;border:1px solid var(--line);border-radius:var(--radius);background:var(--card);color:var(--ink);text-decoration:none}
.lb-tile span{font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--soft)}
.lb-tile strong{font-family:var(--display);font-weight:var(--dw);font-size:1.25rem}
.lb-tile:hover{border-color:var(--accent);color:var(--ink)}
.lb-tile:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
`,
    "repertoire/list": `.rep-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));gap:1.25rem 2.5rem}
.rep-col h3{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;padding-bottom:.6rem;border-bottom:2px solid var(--ink);font-family:var(--display);font-weight:var(--dw);font-size:1.3rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.rep-col small{font-family:var(--body);font-size:.8rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
.rep-col ul{list-style:none}
.rep-col li{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.1rem 1rem;padding:.65rem 0;border-bottom:1px solid var(--line)}
.rep-col li span{color:var(--soft);font-size:.9rem}
.rep-foot{margin-top:2rem;text-align:center;color:var(--soft)}`,
    "story/timeline": `.story-time .grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(2rem,1rem + 4vw,5rem);align-items:start}
.story-time .body p{margin-top:1rem;color:var(--soft)}
.story-time blockquote{margin-top:2rem;padding-left:1.25rem;border-left:4px solid var(--accent)}
.story-time blockquote p{font-family:var(--display);font-weight:var(--dw);font-size:1.3rem;line-height:1.35}
.story-time cite{display:block;margin-top:.5rem;font-size:.85rem;font-style:normal;color:var(--accent)}
.tl{position:relative;list-style:none;padding-left:2rem}
.tl::before{content:"";position:absolute;top:.4rem;bottom:.4rem;left:.45rem;width:2px;background:var(--line)}
.tl li{position:relative;padding-bottom:1.75rem}
.tl li::before{content:"";position:absolute;top:.35rem;left:-1.95rem;width:.9rem;height:.9rem;border:3px solid var(--bg);border-radius:50%;background:var(--accent)}
.tl .yr{font-family:var(--display);font-weight:var(--dw);font-size:1.6rem;line-height:1;color:var(--accent)}
.tl p{margin-top:.35rem}
@media (max-width:52em){.story-time .grid{grid-template-columns:minmax(0,1fr)}}`,
    "booking/packages": `.pk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr));gap:1.25rem}
.pk{display:flex;flex-direction:column;padding:1.75rem}
.pk h3{font-family:var(--display);font-weight:var(--dw);font-size:1.6rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.pk > p{margin-top:.5rem;color:var(--soft)}
.pk ul{flex:1;margin:1.1rem 0 1.4rem;list-style:none}
.pk li{padding:.5rem 0 .5rem 1.4rem;border-top:1px solid var(--line);background:linear-gradient(var(--accent),var(--accent)) 0 1.05rem / .55rem 2px no-repeat}
.pk .btn{align-self:flex-start}
.pk-more{margin-top:2rem;text-align:center;color:var(--soft)}
.pk-more a{font-weight:600}`,
    "hero/hymnal": `.hero-hymnal{padding:clamp(3rem,2rem + 4vw,6rem) 0}
.hero-hymnal .grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.hero-hymnal .page{padding:clamp(1.75rem,1rem + 3vw,3.25rem);border:1px solid var(--ink);outline:1px solid var(--ink);outline-offset:6px;background:var(--card);text-align:center}
.hero-hymnal .orn{font-size:1.6rem;line-height:1;color:var(--accent)}
.hero-hymnal .eyebrow{display:block;margin-top:.75rem}
.hero-hymnal h1{max-width:16em;margin:.75rem auto 0;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.2rem,1.4rem + 3.4vw,4.2rem));line-height:1.05;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance;overflow-wrap:break-word}
.hero-hymnal .lead{margin-left:auto;margin-right:auto}
.hero-hymnal blockquote{max-width:30rem;margin:1.5rem auto 0;padding-top:1.25rem;border-top:1px solid var(--line);font-family:var(--display);font-style:italic;font-size:1.2rem;line-height:1.45;color:var(--soft)}
.hero-hymnal cite{display:block;margin-top:.4rem;font-family:var(--body);font-size:.75rem;font-style:normal;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.hero-hymnal .btns{justify-content:center}
.hero-hymnal .oval img{aspect-ratio:3 / 4;border-radius:50%;box-shadow:0 0 0 8px var(--card),0 0 0 9px var(--ink)}
@media (max-width:52em){.hero-hymnal .grid{grid-template-columns:minmax(0,1fr)}.hero-hymnal .oval{width:100%;max-width:15rem;margin:0 auto;order:-1}}`,
    "hero/window": `.hero-window{padding:clamp(3rem,2rem + 4vw,6rem) 0}
.hero-window .grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.hero-window h1{overflow-wrap:break-word;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.4rem,1.5rem + 4vw,4.8rem));line-height:1.02;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.glass{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr) minmax(0,1fr);grid-template-rows:repeat(3,minmax(0,1fr));gap:8px;width:100%;max-width:30rem;margin:0 auto;aspect-ratio:4 / 5;overflow:hidden;padding:8px;border-radius:999px 999px 6px 6px;background:var(--ink)}
.glass img{grid-column:2;grid-row:1 / 4;width:100%;height:100%;object-fit:cover;border-radius:999px 999px 2px 2px}
.glass span:nth-of-type(1){background:var(--fill)}
.glass span:nth-of-type(2){background:var(--deco)}
.glass span:nth-of-type(3){background:var(--deco)}
.glass span:nth-of-type(4){background:var(--accent)}
.glass span:nth-of-type(5){border-radius:0 0 0 2px;background:var(--accent)}
.glass span:nth-of-type(6){border-radius:0 0 2px 0;background:var(--fill)}
.glass span{opacity:.85}
@media (max-width:52em){.hero-window .grid{grid-template-columns:minmax(0,1fr)}.glass{max-width:min(100%,19rem);order:-1}}`,
    "hero/dawn": `.hero-dawn{position:relative;overflow:hidden;padding:clamp(4rem,3rem + 5vw,8rem) 0 clamp(5rem,4rem + 6vw,10rem);text-align:center;background:linear-gradient(180deg,var(--bg) 0,var(--alt) 100%)}
.hero-dawn .sun{position:absolute;bottom:-26rem;left:50%;width:46rem;height:46rem;border-radius:50%;background:radial-gradient(circle,var(--deco) 0,var(--deco) 38%,rgb(255 255 255 / 0%) 70%);opacity:.55;transform:translateX(-50%)}
.hero-dawn .wrap{position:relative;z-index:1}
.hero-dawn .face{width:8rem;height:8rem;margin:0 auto 1.75rem;border-radius:50%;aspect-ratio:1;box-shadow:0 0 0 6px var(--bg)}
.hero-dawn h1{overflow-wrap:break-word;max-width:15em;margin:.6rem auto 0;font-family:var(--display);font-weight:var(--dw);font-size:calc(var(--h-scale) * clamp(2.5rem,1.5rem + 4.4vw,5.2rem));line-height:1.02;letter-spacing:var(--h-track);text-transform:var(--h-case);text-wrap:balance}
.hero-dawn .lead{margin-left:auto;margin-right:auto}
.hero-dawn .btns{justify-content:center}`,
    "devotions/cards": `.dev-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr));gap:1.25rem}
.dev{display:flex;flex-direction:column;padding:1.75rem}
.dev .ref{font-size:.75rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
.dev blockquote{margin-top:.75rem;font-family:var(--display);font-weight:var(--dw);font-size:1.3rem;line-height:1.35;letter-spacing:var(--h-track)}
.dev h3{margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--line);font-size:.95rem}
.dev h3 span{font-weight:400;color:var(--soft)}
.dev > p:last-child{margin-top:.4rem;color:var(--soft);font-size:.95rem}`,
    "resources/cards": `.rcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr));gap:1rem;list-style:none}
.rcard{padding:1.4rem}
.rcard h3{font-family:var(--display);font-weight:var(--dw);font-size:1.3rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.rcard .facts{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.7rem;padding:0}
.rcard .facts span{padding:.2rem .6rem;border-radius:999px;background:var(--alt);font-size:.8rem;font-weight:600;font-variant-numeric:tabular-nums}
.rcard .dl{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1rem}`,
    "booking/steps": `.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr));gap:1.5rem 2rem;list-style:none;counter-reset:st}
.steps li{position:relative;padding-top:3.4rem}
.steps li::before{counter-increment:st;content:counter(st);position:absolute;top:0;left:0;display:grid;place-items:center;width:2.6rem;height:2.6rem;border-radius:50%;background:var(--fill);color:var(--on);font-family:var(--display);font-weight:var(--dw);font-size:1.2rem}
.steps h3{font-family:var(--display);font-weight:var(--dw);font-size:1.3rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.steps p{margin-top:.4rem;color:var(--soft)}
.needs{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:1.5rem 2.5rem;align-items:center;margin-top:2.5rem;padding:clamp(1.5rem,1rem + 2vw,2.25rem)}
.needs h3{font-size:.78rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.needs ul{margin-top:.6rem;padding-left:1.2rem}
.needs li{margin-top:.3rem}
.needs .go p{margin-top:.75rem;font-size:.92rem;color:var(--soft);overflow-wrap:anywhere}
@media (max-width:52em){.needs{grid-template-columns:minmax(0,1fr)}}`,
    "give/band": `.sec.give{background:var(--fill);color:var(--on)}
.give .gv{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.5rem 3rem}
.give .gv > div{flex:1 1 26rem;min-width:0}
.give .eyebrow,.give .title,.give .lead{color:var(--on)}
.give .lead{opacity:.92}
.give .btn{background:var(--on);border-color:var(--on);color:var(--fill)}
.give .btn:hover{background:var(--on);color:var(--fill);opacity:.9}
.give .fine{margin-top:.75rem;font-size:.85rem;color:var(--on)}`,
    "story/portrait": `.story-portrait .grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(2rem,1rem + 4vw,5rem);align-items:center}
.story-portrait .photo{aspect-ratio:4 / 5}
.story-portrait p + p{margin-top:1rem}
.story-portrait .body p{color:var(--soft)}
.story-portrait blockquote{margin-top:2rem;padding:1.4rem 1.6rem;border-radius:var(--radius);background:var(--alt)}
.story-portrait blockquote p{font-family:var(--display);font-weight:var(--dw);font-size:1.25rem;line-height:1.4;color:var(--ink)}
.story-portrait cite{display:block;margin-top:.6rem;font-size:.85rem;font-style:normal;color:var(--accent)}
@media (max-width:52em){.story-portrait .grid{grid-template-columns:minmax(0,1fr)}.story-portrait .photo{max-width:min(100%,22rem)}}`,
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
    "podcast/feature": `.pod{display:grid;grid-template-columns:15rem minmax(0,1fr);gap:2.5rem;align-items:start;max-width:60rem;margin:0 auto;padding:2rem}
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
@media (max-width:52em){.pod{grid-template-columns:minmax(0,1fr);padding:1.4rem}.pod .art{max-width:min(100%,12rem)}}`,
    "merch/cards": `.merch{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem}
.merch article{display:flex;flex-direction:column;padding:1rem}
.merch img{aspect-ratio:1;border-radius:calc(var(--radius) / 1.5)}
.merch .top{display:flex;justify-content:space-between;gap:1rem;margin-top:1rem}
.merch h3{font-family:var(--display);font-weight:var(--dw);font-size:1.2rem;letter-spacing:var(--h-track);text-transform:var(--h-case)}
.merch .price{font-weight:700;color:var(--accent)}
.merch p{flex:1;margin:.3rem 0 1rem;color:var(--soft);font-size:.95rem}
.merch .btn{align-self:flex-start}
@media (max-width:52em){.merch{grid-template-columns:minmax(0,1fr);max-width:24rem;margin:0 auto}}`,
    "prayer/form": `.prayer{max-width:42rem;margin:0 auto;padding:2.5rem 2rem;text-align:center}
.prayer form{margin-top:1.75rem;text-align:left}
.prayer label{display:block;margin-bottom:.35rem;font-size:.85rem;font-weight:700}
.prayer textarea.field{min-height:7rem;resize:vertical}
.prayer .two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1rem;margin-top:1rem}
.prayer .check{display:flex;gap:.6rem;align-items:flex-start;margin-top:1rem;font-size:.9rem;font-weight:400;color:var(--soft)}
.prayer .check input{width:1.1rem;height:1.1rem;margin-top:.3rem;accent-color:var(--fill)}
.prayer .go{margin-top:1.5rem;text-align:center}
.prayer .fine{margin-top:1rem;text-align:center}
@media (max-width:36em){.prayer{padding:1.75rem 1.1rem}.prayer .two{grid-template-columns:minmax(0,1fr)}}`,
    "contact/letter": `.letter-form{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;max-width:32rem;margin:2.25rem auto 0}
.letter-form .field{flex:1 1 15rem;min-height:2.9rem;border-radius:999px}
.contacts{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem 2.5rem;margin-top:3rem;font-size:.95rem}
.contacts span{display:block;font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--soft)}`,
    "contact/postcard": `.postcard{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);max-width:62rem;margin:0 auto;transform:rotate(-.8deg)}
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
@media (max-width:52em){.postcard{grid-template-columns:minmax(0,1fr);transform:none}.postcard > div + div{border-left:0;border-top:1px dashed var(--line)}.postcard > div{padding:1.6rem}}`
  };

  /* ======================================================================
     5. SECTION LIBRARY — label, menu label, designs, renderer
     ====================================================================== */
  const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>';

  const CHURCH = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M10 4h4M6 21V11l6-5 6 5v10M3 21h18M10 21v-4a2 2 0 0 1 4 0v4"/></svg>';
  const STAGE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM9 9l11-2"/></svg>';
  const usesSets = (d) => d.sections.some((s) => s.k === "music" && s.v === "sets");
  const usesGroups = (d) => d.sections.some((s) => s.k === "music" && (s.v === "records" || s.v === "playlist"));
  function songsOf(d) {
    if (usesSets(d) || usesGroups(d)) return [].concat(...(d.sets || []).map((st, si) => (st.tracks || []).map((t) => Object.assign({}, t, { set: si }))));
    return d.album.tracks;
  }
  function datesWrap(d, alt, list) {
    const kinds = new Set(d.events.map((e) => e.kind === "church" ? "church" : "venue")), bk = d.sections.some((x) => x.k === "booking");
    return '<section class="sec' + alt + '" id="dates" aria-labelledby="dates-title"><div class="wrap"><div class="head center"><span class="eyebrow">Come and listen</span><h2 class="title" id="dates-title">Upcoming dates</h2></div>' +
      (d.events.length ? (kinds.size > 1 ? '<div class="dfilter" id="dFilter" role="group" aria-label="Show dates"><button type="button" data-kind="all" aria-pressed="true">All dates</button><button type="button" data-kind="church" aria-pressed="false">' + esc((d.dateKinds || {}).church || "Church services") + '</button><button type="button" data-kind="venue" aria-pressed="false">' + esc((d.dateKinds || {}).venue || "Shows and events") + '</button></div>' : "") + list
        : '<p class="none">No dates on the calendar right now. Check back soon' + (bk || d.sections.some((x) => x.k === "contact") ? ', or <a href="#' + (bk ? "booking" : "contact") + '">' + (d.audiences && d.audiences.church ? "invite me to your church or venue" : "get in touch about your event") + "</a>" : "") + ".</p>") + "</div></section>";
  }
  function listenLink(d, set, label) {
    if (!d.sets || !d.sets[set]) return "";
    if (usesSets(d)) return '<a class="btn btn-o" href="#music" data-show-set="' + set + '">' + esc(label || "Hear the songs") + "</a>";
    if (usesGroups(d)) return '<a class="btn btn-o" href="#set-' + set + '">' + esc(label || "Hear the songs") + "</a>";
    return "";
  }
  const mailto = (to, subject) => "mailto:" + attr(to) + "?subject=" + encodeURIComponent(subject).replace(/'/g, "%27");
  function playerBlock(d, withList) {
    const first = songsOf(d)[0];
    return '<div class="lp" id="listen-play"><div class="lp-player"><div class="lp-now' + (withList ? "" : " solo") + '">' +
      '<button class="lp-toggle" id="lpToggle" type="button" aria-label="Play">&#9654;</button><div class="lp-meta">' +
      '<p class="lp-title" id="lpNow" aria-live="polite">' + esc(first ? first.title : "") + '</p>' +
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
    const second = has("booking") ? [esc(d.bookLabel || "Book me"), "#booking"] : has("dates") ? ["Upcoming dates", "#dates"] : has("contact") ? ["Book a show", "#contact"] : null;
    return [first, second];
  }

  const LIB = {
    hero: {
      label: "Welcome", fixed: "top",
      v: {
        hymnal: { name: "Hymnal page", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-hymnal" id="top" aria-labelledby="hero-title"><div class="wrap grid"><div class="page"><p class="orn" aria-hidden="true">&#10086;</p><span class="eyebrow">' + esc(d.name) + (d.city ? " &middot; " + esc(d.city) : "") + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" +
            (d.verse && d.verse.text ? "<blockquote><p>&ldquo;" + esc(d.verse.text) + "&rdquo;</p><cite>" + esc(d.verse.ref) + "</cite></blockquote>" : "") + heroBtns(a, b) + '</div><div class="oval"><img src="' + attr(d.photos.portrait) + '" width="600" height="800" alt="' + attr(d.name) + '"></div></div></section>'; } },
        window: { name: "Stained-glass window", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-window" id="top" aria-labelledby="hero-title"><div class="wrap grid"><div><span class="eyebrow">' + esc(d.name) + (d.city ? " &middot; " + esc(d.city) : "") + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) +
            '</div><div class="glass"><span></span><img src="' + attr(d.photos.portrait) + '" width="600" height="1000" alt="' + attr(d.name) + '"><span></span><span></span><span></span><span></span><span></span></div></div></section>'; } },
        dawn: { name: "Sunrise", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-dawn" id="top" aria-labelledby="hero-title"><div class="sun" aria-hidden="true"></div><div class="wrap"><img class="face" src="' + attr(d.photos.portrait) + '" width="400" height="400" alt="' + attr(d.name) + '"><span class="eyebrow">' + esc(d.name) + (d.city ? " &middot; " + esc(d.city) : "") + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + "</div></section>"; } },
        marquee: { name: "Marquee with next shows", r: (d) => { const [a, b] = heroTargets(d), nx = (d.events || []).slice(0, 3), dt = d.sections.some((s) => s.k === "dates");
          return '<section class="hero-marquee" id="top" aria-labelledby="hero-title"><img src="' + attr(d.photos.hero) + '" width="1920" height="1080" alt="' + attr(d.name) + ' on stage"><div class="wrap"><p class="big" style="--n:' + Math.max(6, Math.max(...String(d.name).split(/\s+/).map((w) => w.length))) + '">' + esc(d.name) + '</p><h1 id="hero-title">' + esc(d.headline) + "</h1>" + heroBtns(a, b) + "</div>" +
            (nx.length ? '<div class="ticker"><div class="wrap"><p class="tk-h">Next shows</p><ul>' + nx.map((e) => { const q = parts(e.start); return '<li><time datetime="' + attr(e.start) + '">' + q.mon + " " + (+q.day) + "</time>" + esc(e.venue) + ", " + esc(e.city) + "</li>"; }).join("") + "</ul>" + (dt ? '<a href="#dates">All dates</a>' : "") + "</div></div>" : "") + "</section>"; } },
        cover: { name: "New release cover", r: (d) => { const [a, b] = heroTargets(d), keys = Object.keys(d.streams || {});
          return '<section class="hero-cover" id="top" aria-labelledby="hero-title"><div class="wrap grid"><div class="art"><img src="' + attr(d.photos.album) + '" width="700" height="700" alt="' + attr(d.album.title) + ' cover"><span class="sticker">Out now</span></div><div><span class="eyebrow">' + esc(d.name) + ' &middot; New release</span><p class="rel">' + esc(d.album.title) + '</p><h1 id="hero-title">' + esc(d.headline) + "</h1>" + heroBtns(a, b) +
            (keys.length ? '<ul class="streams" aria-label="Listen on">' + keys.map((k) => '<li><a class="chip"' + ext(d.streams[k]) + ">" + esc(k) + "</a></li>").join("") + "</ul>" : "") + "</div></div></section>"; } },
        collage: { name: "Photo collage", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-collage" id="top" aria-labelledby="hero-title"><div class="wrap"><div class="mosaic"><img class="m1" src="' + attr(d.photos.hero) + '" width="1200" height="900" alt="' + attr(d.name) + ' on stage"><img class="m2" src="' + attr(d.photos.portrait) + '" width="800" height="500" alt=""><img class="m3" src="' + attr(d.photos.story) + '" width="800" height="500" alt="">' +
            '<div class="tag card"><span class="eyebrow">' + esc(d.name) + (d.city ? " &middot; " + esc(d.city) : "") + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + "</div></div></div></section>"; } },
        type: { name: "Big type", r: (d) => { const [a, b] = heroTargets(d), w = String(d.name).split(/\s+/);
          return '<section class="hero-type" id="top" aria-labelledby="hero-title"><div class="rings" aria-hidden="true"></div><div class="wrap"><p class="big" style="--n:' + Math.max(5, Math.max(...w.map((x) => x.length))) + '">' + w.map((x) => "<span>" + esc(x) + "</span>").join(" ") + '</p><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + "</div></section>"; } },
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
        split: { name: "Split photo and text", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-split" id="top" aria-labelledby="hero-title"><img src="' + attr(d.photos.portrait) + '" width="800" height="1000" alt="' + attr(d.name) + '"><div class="txt"><span class="eyebrow">' + esc(d.name) + (d.city ? " &middot; " + esc(d.city) : "") + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + "</div></section>"; } },
        frame: { name: "Framed photo", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-frame" id="top" aria-labelledby="hero-title"><div class="wrap"><span class="eyebrow">' + esc(d.name) + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + '<figure><img src="' + attr(d.photos.wide) + '" width="1600" height="700" alt="' + attr(d.name) + ' performing"></figure></div></section>'; } },
        poster: { name: "Big-name poster", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-poster" id="top" aria-labelledby="hero-title"><img src="' + attr(d.photos.hero) + '" width="1920" height="1080" alt=""><div class="wrap"><p class="big" style="--n:' + Math.max(6, Math.max(...String(d.name).split(/\s+/).map((w) => w.length))) + '">' + esc(d.name) + '</p><span class="stripe" aria-hidden="true"></span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) + "</div></section>"; } },
        banner: { name: "Name banner", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-banner" id="top" aria-labelledby="hero-title"><div class="band"><div class="wrap"><p class="stars" aria-hidden="true">&#9733; &#9733; &#9733;</p><p class="big">' + esc(d.name) + '</p><h1 id="hero-title">' + esc(d.headline) + "</h1>" + heroBtns(a, b) + '</div></div><img class="strip" src="' + attr(d.photos.wide) + '" width="1600" height="700" alt="' + attr(d.name) + ' performing"><p class="lead">' + esc(d.intro) + "</p></section>"; } },
        record: { name: "Spinning record", r: (d) => { const [a, b] = heroTargets(d);
          return '<section class="hero-record" id="top" aria-labelledby="hero-title"><div class="wrap grid"><div><span class="eyebrow">' + esc(d.name) + '</span><h1 id="hero-title">' + esc(d.headline) + '</h1><p class="lead">' + esc(d.intro) + "</p>" + heroBtns(a, b) +
            '</div><div class="turntable" id="turntable"><div class="sun" aria-hidden="true"></div><div class="disc" aria-hidden="true"><div class="label"><img src="' + attr(d.photos.album) + '" width="400" height="400" alt=""></div></div><button class="spin" type="button" aria-pressed="false" aria-label="Pause spinning record">&#10074;&#10074;</button></div></div></section>'; } }
      }
    },
    paths: {
      label: "Two audiences",
      v: {
        doors: { name: "Two doors", js: ["sets"], r: (d, alt) => { const a = d.audiences, sets = usesSets(d) || usesGroups(d);
          const door = (key, cls, set) => { const x = a[key];
            return '<div class="door ' + cls + '"><p class="k">' + esc(x.label) + '</p><h2' + (key === "church" ? ' id="paths-title"' : "") + ">" + esc(x.title) + "</h2><p>" + esc(x.blurb) + "</p><ul>" + (x.offers || []).map((o) => "<li>" + esc(o) + "</li>").join("") + "</ul>" +
              '<div class="btns"><a class="btn" href="#booking-' + key + '">' + esc(x.button) + "</a>" + listenLink(d, set, x.listen) + "</div></div>"; };
          return '<section class="paths-doors" id="paths" aria-labelledby="paths-title"><div class="doors">' + door("church", "door-a", 0) + door("venue", "door-b", 1) + "</div></section>"; } },
        toggle: { name: "Church or venue switch", js: ["paths", "sets"], r: (d, alt) => { const a = d.audiences, sets = usesSets(d) || usesGroups(d);
          const panel = (key, set, i) => { const x = a[key];
            return '<div class="ppanel card" id="pp-' + key + '"><div><h3>' + esc(x.title) + "</h3><p>" + esc(x.blurb) + '</p><div class="btns"><a class="btn" href="#booking-' + key + '">' + esc(x.button) + "</a>" + listenLink(d, set, x.listen) + "</div></div><ul>" + (x.offers || []).map((o) => "<li>" + esc(o) + "</li>").join("") + "</ul></div>"; };
          return '<section class="sec' + alt + '" id="paths" aria-labelledby="paths-title"><div class="wrap ptoggle"><div class="head center"><span class="eyebrow">Book ' + esc(d.name) + '</span><h2 class="title" id="paths-title">Who are you booking for?</h2></div>' +
            '<div class="pswitch" id="pSwitch" role="group" aria-label="Who are you booking for?" hidden><button type="button" aria-pressed="true" aria-controls="pp-church">' + esc(a.church.label) + '</button><button type="button" aria-pressed="false" aria-controls="pp-venue">' + esc(a.venue.label) + "</button></div>" +
            panel("church", 0) + panel("venue", 1) + "</div></section>"; } },
        stacked: { name: "Stacked photo rows", js: ["sets"], r: (d, alt) => { const a = d.audiences, sets = usesSets(d) || usesGroups(d);
          const row = (key, img, set) => { const x = a[key];
            return '<div class="prow"><img class="pimg" src="' + attr(x.photo || img) + '" width="800" height="640" alt="' + attr(d.name) + " " + (key === "church" ? "leading worship" : "performing") + '"><div><h3>' + esc(x.label) + '</h3><p class="pt">' + esc(x.title) + "</p><p>" + esc(x.blurb) + '</p><p class="offers">' + (x.offers || []).map(esc).join(" &middot; ") + '</p><div class="btns"><a class="btn" href="#booking-' + key + '">' + esc(x.button) + "</a>" + listenLink(d, set, x.listen) + "</div></div></div>"; };
          return '<section class="sec' + alt + '" id="paths" aria-labelledby="paths-title"><div class="wrap"><div class="head center"><span class="eyebrow">Book ' + esc(d.name) + '</span><h2 class="title" id="paths-title">Two kinds of stages</h2></div><div class="pstack">' + row("church", d.photos.story, 0) + row("venue", d.photos.hero, 1) + "</div></div></section>"; } },
        split: { name: "Church and venue paths", js: ["sets"], r: (d, alt) => { const a = d.audiences, sets = usesSets(d) || usesGroups(d);
        const card = (key, icon, set, listen) => { const x = a[key];
          return '<article class="path card"><span class="ic">' + icon + "</span><h3>" + esc(x.label) + '</h3><p class="pt">' + esc(x.title) + "</p><p>" + esc(x.blurb) + "</p><ul>" + (x.offers || []).map((o) => "<li>" + esc(o) + "</li>").join("") + "</ul>" +
            '<div class="btns"><a class="btn" href="#booking-' + key + '">' + esc(x.button) + "</a>" + listenLink(d, set, listen) + "</div></article>"; };
        return '<section class="sec paths' + alt + '" id="paths" aria-labelledby="paths-title"><div class="wrap"><div class="head center"><span class="eyebrow">Book ' + esc(d.name) + '</span><h2 class="title" id="paths-title">Who are you booking for?</h2></div><div class="duo">' +
          card("church", CHURCH, 0, a.church.listen || "Hear the songs") + card("venue", STAGE, 1, a.venue.listen || "Hear the songs") + "</div></div></section>"; } }
      }
    },
    music: {
      label: "Album and player", nav: "Music",
      v: {
        records: { name: "Two albums side by side", js: ["player"], css: ["player"], r: (d, alt) => { let n = 0;
          const rec = (st, i) => '<article class="record card" id="set-' + i + '"><div class="top"><img src="' + attr(st.cover || (i === 0 ? d.photos.album : d.photos.album2 || d.photos.album)) + '" width="300" height="300" alt="' + attr(st.title) + ' cover"><div><p class="lbl">' + esc(st.label) + "</p><h3>" + esc(st.title) + '</h3><p class="meta">' + (st.released ? esc(parts(st.released).year) + " &middot; " : "") + (st.tracks || []).length + " songs</p></div></div><ol>" +
            (st.tracks || []).map((t) => { const k = n++; return '<li class="song-row"><button class="lp-play" type="button" data-lp="' + k + '" aria-label="Play ' + attr(t.title) + '">&#9654;</button><span class="nm">' + esc(t.title) + '</span><span class="tm">' + esc(t.length) + '</span><span class="acts" data-lp-actions="' + k + '"></span></li>'; }).join("") + "</ol>" +
            (st.bandcampUrl ? '<p class="bc"><a class="btn btn-o btn-sm"' + ext(st.bandcampUrl) + ">Buy " + esc(st.title) + " on Bandcamp</a></p>" : "") + "</article>";
          return '<section class="sec' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap"><div class="head center"><span class="eyebrow">Listen</span><h2 class="title" id="music-title">Two sides of the music</h2></div>' + playerBlock(d, false) + '<div class="records">' + (d.sets || []).map(rec).join("") + "</div>" + streamsBlock(d, true) + "</div></section>"; } },
        playlist: { name: "One playlist, two parts", js: ["player"], css: ["player"], r: (d, alt) => { let n = 0;
          const grp = (st, i) => '<div class="pgroup" id="set-' + i + '"><h3><span>' + esc(st.label) + "</span><small>" + esc(st.title) + (st.released ? " &middot; " + esc(parts(st.released).year) : "") + "</small></h3><ol>" +
            (st.tracks || []).map((t) => { const k = n++; return '<li class="song-row"><button class="lp-play" type="button" data-lp="' + k + '" aria-label="Play ' + attr(t.title) + '">&#9654;</button><span class="n">' + String(k + 1).padStart(2, "0") + '</span><span class="nm">' + esc(t.title) + '</span><span class="tm">' + esc(t.length) + '</span><span class="acts" data-lp-actions="' + k + '"></span></li>'; }).join("") + "</ol>" +
            (st.bandcampUrl ? '<p class="bc"><a' + ext(st.bandcampUrl) + ">Buy " + esc(st.title) + " on Bandcamp</a></p>" : "") + "</div>";
          return '<section class="sec' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap plist"><div class="head center"><span class="eyebrow">Listen</span><h2 class="title" id="music-title">The set list</h2></div>' + playerBlock(d, false) + (d.sets || []).map(grp).join("") + '<div class="center">' + streamsBlock(d, true) + "</div></div></section>"; } },
        sets: { name: "Two collections", js: ["player", "sets"], css: ["player"], r: (d, alt) => { const sets = d.sets || [];
          const cover = (st, i) => '<img class="cover" id="set-cover-' + i + '" src="' + attr(st.cover || (i === 0 ? d.photos.album : d.photos.album2 || d.photos.album)) + '" width="700" height="700" alt="' + attr(st.title) + ' cover"' + (i ? " hidden" : "") + ">";
          return '<section class="sec music-sets' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap"><div class="head center"><span class="eyebrow">Listen</span><h2 class="title" id="music-title">Music</h2>' +
            '<div class="set-tabs" id="setTabs" role="tablist" aria-label="Music collections">' + sets.map((st, i) => '<button type="button" role="tab" id="set-tab-' + i + '" aria-controls="set-panel-' + i + '" aria-selected="' + (i ? "false" : "true") + '"' + (i ? ' tabindex="-1"' : "") + ">" + esc(st.label) + "</button>").join("") + "</div></div>" +
            '<div class="grid"><div>' + sets.map(cover).join("") + "</div><div>" +
            sets.map((st, i) => '<div class="set-panel" role="tabpanel" id="set-panel-' + i + '" aria-labelledby="set-tab-' + i + '"' + (i ? " hidden" : "") + "><h3>" + esc(st.title) + '</h3><p class="meta">' + (st.released ? 'Released <time datetime="' + attr(st.released) + '">' + esc(longDate(st.released)) + "</time> &middot; " : "") + (st.tracks || []).length + " songs</p>" + (st.note ? '<p class="note">' + esc(st.note) + "</p>" : "") +
              (st.bandcampUrl ? '<div class="store card"><p><strong>Own ' + esc(st.title) + "</strong>Downloads on Bandcamp.</p><a class=\"btn btn-sm\"" + ext(st.bandcampUrl) + ">Buy on Bandcamp</a></div>" : "") + "</div>").join("") +
            playerBlock(d, true) + streamsBlock(d) + "</div></div></div></section>"; } },
        album: { name: "Album + player", js: ["player"], css: ["player"], r: (d, alt) =>
          '<section class="sec music-album' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap grid"><img class="cover" src="' + attr(d.photos.album) + '" width="700" height="700" alt="' + attr(d.album.title) + ' album cover"><div><span class="eyebrow">Latest release</span><h2 class="title" id="music-title">' + esc(d.album.title) + '</h2>' +
          '<p class="meta">Released <time datetime="' + attr(d.album.released) + '">' + esc(longDate(d.album.released)) + "</time> &middot; " + d.album.tracks.length + " songs</p>" + playerBlock(d, true) + streamsBlock(d) + storeBlock(d) + "</div></div></section>" },
        stories: { name: "Song stories", js: ["player"], css: ["player"], r: (d, alt) =>
          '<section class="sec music-stories' + alt + '" id="music" aria-labelledby="music-title"><div class="wrap grid"><img class="cover" src="' + attr(d.photos.album) + '" width="700" height="700" alt="' + attr(d.album.title) + ' album cover"><div><span class="eyebrow">New album</span><h2 class="title" id="music-title">' + esc(d.album.title) + '</h2><p class="lead">Press play to listen, or tap a song for the story' + (d.album.tracks.some((t) => t.ref) ? " and scripture" : "") + ' behind it.</p>' +
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
        wide: { name: "Dark theater", js: ["videos"], r: (d, alt) =>
          '<section class="sec vtheater" id="videos" aria-labelledby="videos-title"><div class="wrap"><div class="head"><span class="eyebrow">Watch</span><h2 class="title" id="videos-title">On stage and in the studio</h2></div><div class="vt-grid"><div><div class="video-frame" data-video="0"></div><p class="vcap" id="vCap" aria-live="polite">' + esc(d.videos[0] ? d.videos[0].title : "") + '</p></div><div class="vlist" id="vList" role="group" aria-label="Choose a video"></div></div></div></section>' },
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
        split: { name: "Church and show dates", js: ["datesfilter"], r: (d, alt) => { const kinds = new Set(d.events.map((e) => e.kind === "church" ? "church" : "venue"));
          return '<section class="sec' + alt + '" id="dates" aria-labelledby="dates-title"><div class="wrap"><div class="head center"><span class="eyebrow">Come and listen</span><h2 class="title" id="dates-title">Upcoming dates</h2></div>' +
            (d.events.length ? (kinds.size > 1 ? '<div class="dfilter" id="dFilter" role="group" aria-label="Show dates"><button type="button" data-kind="all" aria-pressed="true">All dates</button><button type="button" data-kind="church" aria-pressed="false">' + esc((d.dateKinds || {}).church || "Church services") + '</button><button type="button" data-kind="venue" aria-pressed="false">' + esc((d.dateKinds || {}).venue || "Shows and events") + '</button></div>' : "") +
              '<ul class="dsplit">' + d.events.map((e) => { const p = parts(e.start), k = e.kind === "church" ? "church" : "venue";
                return '<li class="drow" data-kind="' + k + '"><time datetime="' + attr(e.start) + '">' + p.mon + " " + (+p.day) + "<small>" + p.wk + '</small></time><div class="where"><span class="tag">' + esc(e.tag || (k === "church" ? "Church" : "Show")) + "</span><p>" + esc(e.venue) + "<small>" + esc(e.city + ", " + e.region) + (p.time ? " &middot; " + p.time : "") + (e.note ? " &middot; " + esc(e.note) : "") + '</small></p></div><a class="btn btn-o btn-sm"' + ext(e.url) + ">" + (+e.price > 0 ? "Tickets" : "Details") + "</a></li>"; }).join("") + "</ul>"
              : '<p class="none">No dates on the calendar right now. Check back soon' + (d.sections.some((x) => x.k === "booking" || x.k === "contact") ? ', or <a href="#' + (d.sections.some((x) => x.k === "booking") ? "booking" : "contact") + '">invite me to your church or venue</a>' : "") + ".</p>") + "</div></section>"; } },
        cards: { name: "Date cards", js: ["datesfilter"], r: (d, alt) => datesWrap(d, alt, '<ul class="dcards">' + d.events.map((e) => { const p = parts(e.start), k = e.kind === "church" ? "church" : "venue";
          return '<li class="dcard card drow" data-kind="' + k + '"><time datetime="' + attr(e.start) + '"><span class="d">' + p.day + '</span><span class="m">' + p.mon + '</span></time><p class="w">' + p.wk + (p.time ? " &middot; " + p.time : "") + '</p><span class="tag">' + esc(e.tag || (k === "church" ? "Church" : "Show")) + '</span><p class="v">' + esc(e.venue) + '</p><p class="c">' + esc(e.city + ", " + e.region) + (e.note ? " &middot; " + esc(e.note) : "") + '</p><a class="btn btn-o btn-sm"' + ext(e.url) + ">" + (+e.price > 0 ? "Tickets" : "Details") + "</a></li>"; }).join("") + "</ul>") },
        poster: { name: "Poster rows", js: ["datesfilter"], r: (d, alt) => datesWrap(d, alt, '<ul class="dposter">' + d.events.map((e) => { const p = parts(e.start), k = e.kind === "church" ? "church" : "venue";
          return '<li class="drow" data-kind="' + k + '"><time datetime="' + attr(e.start) + '"><span class="d">' + p.day + '</span><span class="m">' + p.mon + '</span><span class="w">' + p.wk + '</span></time><div><p class="tag">' + esc(e.tag || (k === "church" ? "Church" : "Show")) + (p.time ? " &middot; " + p.time : "") + '</p><p class="v">' + esc(e.venue) + '</p><p class="c">' + esc(e.city + ", " + e.region) + (e.note ? " &middot; " + esc(e.note) : "") + '</p></div><a class="btn btn-sm"' + ext(e.url) + ">" + (+e.price > 0 ? "Tickets" : "Details") + "</a></li>"; }).join("") + "</ul>") },
        tickets: { name: "Ticket stubs", r: (d, alt) =>
          '<section class="sec' + alt + '" id="dates" aria-labelledby="dates-title"><div class="wrap"><div class="head center"><span class="eyebrow">See you there</span><h2 class="title" id="dates-title">Upcoming dates</h2></div>' + (d.events.length ? '' : '<p class="none">No dates on the calendar right now. Check back soon' + (d.sections.some((x) => x.k === "contact") ? ', or <a href="#contact">invite me to your church or venue</a>' : '') + '.</p>') + (d.events.length ? '<ul class="tickets">' : '') +
          d.events.map((e) => { const p = parts(e.start); return '<li class="ticket card"><time datetime="' + attr(e.start) + '"><span class="m">' + p.mon + '</span><span class="d">' + p.day + '</span><span class="w">' + p.wk + '</span></time><div class="body">' + (e.tag || e.kind === "church" ? '<span class="tag">' + esc(e.tag || "Church") + "</span>" : "") + '<p class="city">' + esc(e.city + ", " + e.region) + "</p><p>" + esc(e.venue) + (p.time ? " &middot; " + p.time : "") + (e.note ? " &middot; " + esc(e.note) : "") + '</p></div><div class="stub"><span class="price">' + (+e.price > 0 ? "$" + esc(String(+e.price)) : "Free") + '</span><a class="btn btn-sm"' + ext(e.url) + ">" + (+e.price > 0 ? "Get tickets" : "Details") + "</a></div></li>"; }).join("") +
          (d.events.length ? "</ul>" : "") + "</div></section>" }
      }
    },
    resources: {
      label: "Church resources", nav: "For Churches",
      v: { cards: { name: "Song cards", r: (d, alt) =>
        '<section class="sec' + alt + '" id="churches" aria-labelledby="churches-title"><div class="wrap"><div class="head center"><span class="eyebrow">For worship teams</span><h2 class="title" id="churches-title">' + esc(d.resHeading || "Sing these songs with your church") + "</h2></div>" +
        '<p class="res-note card"><strong>Free for churches.</strong> ' + esc(d.resNote || "Chord charts and lead sheets are free to download. Every song is registered with CCLI, so your church can project and stream it under its CCLI license.") + '</p><ul class="rcards">' +
        d.resources.map((r) => '<li class="rcard card"><h3>' + esc(r.song) + '</h3><p class="facts">' + (r.key ? "<span>Key of " + esc(r.key) + "</span>" : "") + (r.tempo ? "<span>" + esc(r.tempo) + " BPM</span>" : "") + (r.ccli ? "<span>CCLI " + esc(r.ccli) + "</span>" : "") + '</p><div class="dl">' +
          (r.chart ? '<a class="chip"' + ext(r.chart) + ">" + esc(r.chartLabel || "Chord chart") + "</a>" : "") + (r.lead ? '<a class="chip"' + ext(r.lead) + ">Lead sheet</a>" : "") + (r.video ? '<a class="chip"' + ext(r.video) + ">" + esc(r.videoLabel || "Tutorial video") + "</a>" : "") + "</div></li>").join("") + "</ul></div></section>" },
        table: { name: "Chord charts table", r: (d, alt) =>
        '<section class="sec' + alt + '" id="churches" aria-labelledby="churches-title"><div class="wrap"><div class="head center"><span class="eyebrow">For worship teams</span><h2 class="title" id="churches-title">Sing these songs with your church</h2></div>' +
        '<p class="res-note card"><strong>Free for churches.</strong> Chord charts and lead sheets are free to download. Every song is registered with CCLI, so your church can project and stream it under its CCLI license.</p>' +
        '<div class="tbl"><table class="res"><thead><tr><th scope="col">Song</th><th scope="col">Key</th><th scope="col">Tempo</th><th scope="col">CCLI #</th><th scope="col">Downloads</th></tr></thead><tbody>' +
        d.resources.map((r) => '<tr><th scope="row">' + esc(r.song) + "</th><td>" + esc(r.key) + '</td><td class="num">' + esc(r.tempo) + ' BPM</td><td class="num">' + esc(r.ccli) + '</td><td><div class="dl">' + (r.chart ? '<a class="chip"' + ext(r.chart) + ">Chord chart</a>" : "") + (r.lead ? '<a class="chip"' + ext(r.lead) + ">Lead sheet</a>" : "") + "</div></td></tr>").join("") +
        "</tbody></table></div></div></section>" } }
    },
    podcast: {
      label: "Podcasts and interviews", nav: "Interviews",
      v: { feature: { name: "Featured episode", js: ["podcast"], r: (d, alt) => { const p = d.podcast;
        return '<section class="sec' + alt + '" id="interviews" aria-labelledby="interviews-title"><div class="wrap"><div class="head center"><span class="eyebrow">' + esc(p.eyebrow || "Podcasts and interviews") + '</span><h2 class="title" id="interviews-title">' + esc(p.heading || "Conversations about faith and songwriting") + '</h2></div>' +
          '<article class="pod card"><div class="art" role="img" aria-label="' + attr(p.show) + ' artwork">' + MIC + '</div><div><span class="badge">' + esc(p.badge || "Latest interview") + '</span><p class="show">' + esc(p.show) + (p.episode ? " &middot; Episode " + esc(p.episode) : "") + "</p><h3>" + esc(p.title) + '</h3><p class="when"><time datetime="' + attr(p.date) + '">' + esc(longDate(p.date)) + "</time>" + (p.minutes ? " &middot; " + esc(p.minutes) + " min" : "") + (p.host ? " &middot; Hosted by " + esc(p.host) : "") + '</p><p class="sum">' + esc(p.summary) + "</p>" +
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
        timeline: { name: "Story + timeline", r: (d, alt) =>
          '<section class="sec story-time' + alt + '" id="story" aria-labelledby="story-title"><div class="wrap grid"><div><span class="eyebrow">The story</span><h2 class="title" id="story-title">About ' + esc(d.name) + '</h2><div class="body">' + d.story.paragraphs.map((x) => "<p>" + esc(x) + "</p>").join("") + "</div>" +
          (d.story.quote ? "<blockquote><p>&ldquo;" + esc(d.story.quote) + "&rdquo;</p><cite>" + esc(d.story.quoteSource) + "</cite></blockquote>" : "") + '</div><ol class="tl">' + (d.story.timeline || []).map((t) => '<li><p class="yr">' + esc(t.year) + "</p><p>" + esc(t.text) + "</p></li>").join("") + "</ol></div></section>" },
        quote: { name: "Centered with quote", r: (d, alt) =>
          '<section class="sec story-quote' + alt + '" id="story" aria-labelledby="story-title"><div class="wrap"><div class="box"><div class="center"><span class="eyebrow">The story</span><h2 class="title" id="story-title">About ' + esc(d.name) + '</h2></div><div class="body">' + d.story.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("") + "</div>" +
          (d.story.quote ? "<blockquote><p>&ldquo;" + esc(d.story.quote) + "&rdquo;</p><cite>" + esc(d.story.quoteSource) + "</cite></blockquote>" : "") + "</div></div></section>" }
      }
    },
    booking: {
      label: "Booking for churches and venues", nav: "Booking",
      v: {
        steps: { name: "Host a night (steps)", r: (d, alt) => { const c = d.contact, h = d.hosting || { steps: [], needs: [] };
          return '<section class="sec' + alt + '" id="booking" aria-labelledby="booking-title"><div class="wrap"><div class="head center"><span class="eyebrow">Booking</span><h2 class="title" id="booking-title">' + esc(h.heading || "Host a night of worship") + '</h2><p class="lead">' + esc(c.bookingNote || "Share the date, the place and a little about your event.") + '</p></div><ol class="steps">' +
            h.steps.map((s) => "<li><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>").join("") + '</ol><div class="needs card"><div><h3>' + esc(h.needsHeading || "What we'll ask of you") + "</h3><ul>" + (h.needs || []).map((n) => "<li>" + esc(n) + "</li>").join("") + '</ul></div><div class="go"><a class="btn" href="' + mailto(c.booking, (h.subject || "Booking request") + " for " + d.name) + '">' + esc(h.button || "Start the conversation") + '</a><p><a href="mailto:' + attr(c.booking) + '">' + esc(c.booking) + "</a>" + (c.presskit ? ' &middot; <a href="' + attr(c.presskit) + '">' + esc(PKL(c.presskit, "Press kit (PDF)", "Press kit")) + '</a>' : "") + "</p></div></div></div></section>"; } },
        packages: { name: "Packages", r: (d, alt) => { const c = d.contact;
          return '<section class="sec' + alt + '" id="booking" aria-labelledby="booking-title"><div class="wrap"><div class="head center"><span class="eyebrow">Booking</span><h2 class="title" id="booking-title">Packages</h2><p class="lead">' + esc(c.bookingNote || "Share the date, the place and a little about your event.") + '</p></div><div class="pk-grid">' +
            (d.packages || []).map((k) => '<article class="pk card"><h3>' + esc(k.name) + "</h3><p>" + esc(k.desc) + "</p><ul>" + (k.includes || []).map((i) => "<li>" + esc(i) + "</li>").join("") + '</ul><a class="btn btn-sm" href="' + mailto(c.booking, k.name + " enquiry for " + d.name) + '">Ask about ' + esc(k.name) + "</a></article>").join("") +
            '</div><p class="pk-more">' + esc(c.packagesNote || "Tell us your date and venue and we'll send a quote.") + ' <a href="mailto:' + attr(c.booking) + '">' + esc(c.booking) + "</a>" + (c.presskit ? ' &middot; <a href="' + attr(c.presskit) + '">' + esc(PKL(c.presskit, "Press kit (PDF)", "Press kit")) + '</a>' : "") + "</p></div></section>"; } },
        banner: { name: "Bold banner", r: (d, alt) => { const a = d.audiences, c = d.contact;
          const box = (key) => { const x = a[key]; return '<div id="booking-' + key + '"><h3>' + esc(x.label) + "</h3><p>" + (x.offers || []).map(esc).join(" &middot; ") + '</p><a class="btn" href="' + mailto(c.booking, (x.subject || (key === "church" ? "Church booking" : "Show or event booking")) + " for " + d.name) + '">' + esc(x.button) + "</a></div>"; };
          return '<section class="sec bbanner" id="booking" aria-labelledby="booking-title"><div class="wrap"><span class="eyebrow">Booking</span><h2 id="booking-title">Let&rsquo;s make some music together</h2><p class="lead">' + esc(c.bookingNote || "Share the date, the place and a little about your event.") + '</p><div class="twin">' + Object.keys(a).map(box).join("") + '</div><p class="more"><a href="mailto:' + attr(c.booking) + '">' + esc(c.booking) + "</a>" + (c.presskit ? '<a href="' + attr(c.presskit) + '">' + esc(PKL(c.presskit, "Download the press kit (PDF)", "See the press kit")) + '</a>' : "") + "</p></div></section>"; } },
        letter: { name: "Booking letter", r: (d, alt) => { const a = d.audiences, c = d.contact;
          const col = (key) => { const x = a[key]; return '<div id="booking-' + key + '"><h3>' + esc(x.label) + "</h3><ul>" + (x.offers || []).map((o) => "<li>" + esc(o) + "</li>").join("") + '</ul><a class="btn btn-sm" href="' + mailto(c.booking, (x.subject || (key === "church" ? "Church booking" : "Show or event booking")) + " for " + d.name) + '">' + esc(x.button) + "</a></div>"; };
          return '<section class="sec' + alt + '" id="booking" aria-labelledby="booking-title"><div class="wrap"><div class="bletter card"><p class="orn" aria-hidden="true">&#10086;</p><h2 id="booking-title">The pleasure of your invitation</h2><p class="lead">' + esc(c.bookingNote || "Share the date, the place and a little about your event.") + '</p><div class="cols">' + Object.keys(a).map(col).join("") + '</div><p class="sig">Write to <a href="mailto:' + attr(c.booking) + '">' + esc(c.booking) + "</a>" + (c.presskit ? ' &middot; <a href="' + attr(c.presskit) + '">' + esc(PKL(c.presskit, "Press kit (PDF)", "Press kit")) + '</a>' : "") + "</p></div></div></section>"; } },
        two: { name: "Two booking cards", r: (d, alt) => { const a = d.audiences, c = d.contact;
        const card = (key) => { const x = a[key];
          return '<article class="book-card card" id="booking-' + key + '"><h3>' + esc(x.label) + "</h3><p>" + esc(x.blurb) + "</p><ul>" + (x.offers || []).map((o) => "<li>" + esc(o) + "</li>").join("") + '</ul><a class="btn" href="' + mailto(c.booking, (x.subject || (key === "church" ? "Church booking" : "Show or event booking")) + " for " + d.name) + '">' + esc(x.button) + "</a></article>"; };
        return '<section class="sec' + alt + '" id="booking" aria-labelledby="booking-title"><div class="wrap"><div class="head center"><span class="eyebrow">Booking</span><h2 class="title" id="booking-title">Bring ' + esc(d.name) + ' to your stage</h2><p class="lead">' + esc(c.bookingNote || "Share the date, the place and a little about your event.") + '</p></div><div class="book-duo">' + Object.keys(a).map(card).join("") + "</div>" +
          '<div class="book-more"><p><span>Booking email</span><a href="mailto:' + attr(c.booking) + '">' + esc(c.booking) + "</a></p>" + (c.email ? '<p><span>Hello</span><a href="mailto:' + attr(c.email) + '">' + esc(c.email) + "</a></p>" : "") + (c.presskit ? '<p><span>Press kit</span><a href="' + attr(c.presskit) + '">' + esc(PKL(c.presskit, "Download EPK (PDF)", "Electronic press kit")) + '</a></p>' : "") + "</div></div></section>"; } }
      }
    },
    merch: {
      label: "Merch", nav: "Merch",
      v: {
        shelf: { name: "Shelf list", r: (d, alt) =>
          '<section class="sec' + alt + '" id="merch" aria-labelledby="merch-title"><div class="wrap"><div class="head center"><span class="eyebrow">Take a little music home</span><h2 class="title" id="merch-title">The merch table</h2></div><ul class="shelf">' +
          d.merch.map((m) => '<li><img src="' + attr(m.photo) + '" width="200" height="200" alt="' + attr(m.name) + '"><div><h3>' + esc(m.name) + "</h3><p>" + esc(m.desc) + '</p></div><div class="buy"><span class="price">' + esc(m.price) + '</span><a class="btn btn-sm"' + ext(m.url) + ' aria-label="Buy ' + attr(m.name) + '">Buy</a></div></li>').join("") + "</ul></div></section>" },
        feature: { name: "Featured product", r: (d, alt) => { const f = d.merch[0] || { name: "", desc: "", price: "", url: "#", photo: "" }, rest = d.merch.slice(1);
          return '<section class="sec' + alt + '" id="merch" aria-labelledby="merch-title"><div class="wrap mfeat"><img src="' + attr(f.photo) + '" width="500" height="500" alt="' + attr(f.name) + '"><div><span class="eyebrow">Merch</span><h2 class="visually-hidden" id="merch-title">Merch</h2><h3>' + esc(f.name) + '</h3><p class="desc">' + esc(f.desc) + '</p><p class="price">' + esc(f.price) + '</p><div class="btns"><a class="btn"' + ext(f.url) + ">Buy " + esc(f.name) + "</a></div>" +
            (rest.length ? '<p class="more">Also: ' + rest.map((m) => "<a" + ext(m.url) + ">" + esc(m.name) + " (" + esc(m.price) + ")</a>").join("") + "</p>" : "") + "</div></div></section>"; } },
        cards: { name: "Product cards", r: (d, alt) =>
        '<section class="sec' + alt + '" id="merch" aria-labelledby="merch-title"><div class="wrap"><div class="head center"><span class="eyebrow">Support the music</span><h2 class="title" id="merch-title">Merch</h2></div><div class="merch">' +
        d.merch.map((m) => '<article class="card"><img src="' + attr(m.photo) + '" width="500" height="500" alt="' + attr(m.name) + '"><div class="top"><h3>' + esc(m.name) + '</h3><span class="price">' + esc(m.price) + "</span></div><p>" + esc(m.desc) + '</p><a class="btn btn-sm"' + ext(m.url) + ">Buy</a></article>").join("") +
        "</div></div></section>" }
      }
    },
    devotions: {
      label: "Song devotions", nav: "Devotions",
      v: { cards: { name: "Verse cards", r: (d, alt) =>
        '<section class="sec' + alt + '" id="devotions" aria-labelledby="devotions-title"><div class="wrap"><div class="head center"><span class="eyebrow">' + esc(d.devEyebrow || "Devotions") + '</span><h2 class="title" id="devotions-title">' + esc(d.devHeading || "The scripture behind the songs") + '</h2></div><div class="dev-grid">' +
        (d.devotions || []).map((x) => '<article class="dev card"><p class="ref">' + esc(x.ref) + "</p><blockquote><p>&ldquo;" + esc(x.verse) + "&rdquo;</p></blockquote><h3>" + esc(x.song) + " <span>&middot; the song</span></h3><p>" + esc(x.text) + "</p></article>").join("") + "</div></div></section>" } }
    },
    give: {
      label: "Give", nav: "Give",
      v: { band: { name: "Giving band", r: (d, alt) => { const g = d.give || {};
        return '<section class="sec give" id="give" aria-labelledby="give-title"><div class="wrap gv"><div><span class="eyebrow">' + esc(g.eyebrow || "Partner with us") + '</span><h2 class="title" id="give-title">' + esc(g.heading || "Partner with the ministry") + '</h2><p class="lead">' + esc(g.text || "") + "</p>" + (g.fine ? '<p class="fine">' + esc(g.fine) + "</p>" : "") + '</div><a class="btn"' + ext(g.url || "#") + ">" + esc(g.button || "Give") + "</a></div></section>"; } } }
    },
    links: {
      label: "Streaming links",
      v: { bar: { name: "Listen everywhere", r: (d, alt) => { const keys = Object.keys(d.streams || {});
        return '<section class="sec' + alt + '" id="listen" aria-labelledby="listen-title"><div class="wrap lb"><div><span class="eyebrow">Stream</span><h2 class="title" id="listen-title">Listen everywhere</h2></div><ul>' +
          keys.map((k) => '<li><a class="lb-tile"' + ext(d.streams[k]) + "><span>Listen on</span><strong>" + esc(k) + "</strong></a></li>").join("") + "</ul></div></section>"; } } }
    },
    repertoire: {
      label: "Song list", nav: "Songs",
      v: { list: { name: "Song list by moment", r: (d, alt) => { const r = d.repertoire || { groups: [] };
        return '<section class="sec' + alt + '" id="songs" aria-labelledby="songs-title"><div class="wrap"><div class="head center"><span class="eyebrow">' + esc(r.eyebrow || "Song list") + '</span><h2 class="title" id="songs-title">' + esc(r.heading || "What we play") + "</h2></div><div class=\"rep-cols\">" +
          r.groups.map((g) => '<div class="rep-col"><h3>' + esc(g.name) + "<small>" + g.songs.length + " " + esc(r.unit || "songs") + "</small></h3><ul>" + g.songs.map((s) => "<li>" + esc(s[0]) + "<span>" + esc(s[1] || "") + "</span></li>").join("") + "</ul></div>").join("") +
          "</div>" + (r.note ? '<p class="rep-foot">' + esc(r.note) + "</p>" : "") + "</div></section>"; } } }
    },
    press: {
      label: "Press kit (EPK)", nav: "Press",
      v: { kit: { name: "Quotes and quick facts", r: (d, alt) => { const pr = d.press || {}, c = d.contact || {};
        const facts = [["Based in", d.city], ["Genre", (d.genre || []).join(", ")], ["For fans of", pr.fansOf], ["Booking", c.booking ? '<a href="mailto:' + attr(c.booking) + '">' + esc(c.booking) + "</a>" : ""]].filter((f) => f[1]);
        return '<section class="sec' + alt + '" id="press" aria-labelledby="press-title"><div class="wrap"><div class="head"><span class="eyebrow">Press kit</span><h2 class="title" id="press-title">What people are saying</h2></div><div class="epk"><div>' +
          (pr.quotes || []).map((x) => "<blockquote><p>&ldquo;" + esc(x.q) + "&rdquo;</p><cite>" + esc(x.src) + "</cite></blockquote>").join("") + '</div><div class="facts card"><h3>Quick facts</h3><dl>' +
          facts.map((f) => "<div><dt>" + esc(f[0]) + "</dt><dd>" + (f[0] === "Booking" ? f[1] : esc(f[1])) + "</dd></div>").join("") + "</dl>" +
          '<div class="btns">' + (c.presskit ? '<a class="btn btn-sm" href="' + attr(c.presskit) + '">' + esc(PKL(c.presskit, "Download the EPK (PDF)", "See the press kit")) + '</a>' : "") + (pr.photos ? '<a class="btn btn-o btn-sm"' + ext(pr.photos) + ">Press photos</a>" : "") + "</div></div></div></div></section>"; } } }
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
          '<div class="contacts"><p><span>Booking</span><a href="mailto:' + attr(d.contact.booking) + '">' + esc(d.contact.booking) + '</a></p><p><span>Hello</span><a href="mailto:' + attr(d.contact.email) + '">' + esc(d.contact.email) + "</a></p>" + (d.contact.presskit ? '<p><span>Press kit</span><a href="' + attr(d.contact.presskit) + '">' + esc(PKL(d.contact.presskit, "Download EPK (PDF)", "Electronic press kit")) + '</a></p>' : "") + "</div></div></section>" },
        postcard: { name: "Postcard", r: (d, alt) =>
          '<section class="sec' + alt + '" id="contact" aria-labelledby="contact-title"><div class="wrap"><div class="postcard card"><div><p class="hi">Hey friend,</p><h2 id="contact-title">Booking and contact</h2><p>Concerts, churches, festivals, house concerts and private events.</p><dl style="margin-top:1.25rem">' +
          '<div><dt>Booking</dt><dd><a href="mailto:' + attr(d.contact.booking) + '">' + esc(d.contact.booking) + "</a></dd></div><div><dt>Hello</dt><dd><a href=\"mailto:" + attr(d.contact.email) + '">' + esc(d.contact.email) + "</a></dd></div>" + (d.contact.presskit ? '<div><dt>Press kit</dt><dd><a href="' + attr(d.contact.presskit) + '">' + esc(PKL(d.contact.presskit, "Download EPK (PDF)", "Electronic press kit")) + '</a></dd></div>' : "") + "</dl></div>" +
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
songs.forEach(function(s,i){var b;if(list){var li=document.createElement("li");if(s.set!=null)li.setAttribute("data-set",String(s.set));b=document.createElement("button");b.type="button";b.className="lp-play";
var n=document.createElement("span");n.className="lp-num";n.textContent=String(i+1).padStart(2,"0");var nm=document.createElement("span");nm.className="lp-name";nm.textContent=s.title;
var t=document.createElement("span");t.className="lp-time";t.textContent=s.length;li.append(b,n,nm,t,link(s));list.appendChild(li);}
else{b=document.querySelector('.lp-play[data-lp="'+i+'"]');var spot=document.querySelector('[data-lp-actions="'+i+'"]');if(spot)spot.appendChild(link(s));}
if(b)b.addEventListener("click",function(){play(i);});btns.push(b);});
tg.addEventListener("click",function(){play(c);});audio.addEventListener("play",refresh);audio.addEventListener("pause",refresh);
audio.addEventListener("loadedmetadata",function(){dur.textContent=f(audio.duration);});
audio.addEventListener("timeupdate",function(){if(audio.duration)seek.value=audio.currentTime/audio.duration*100;cur.textContent=f(audio.currentTime);});
audio.addEventListener("ended",function(){if(c<songs.length-1&&songs[c+1].set===songs[c].set){play(c+1);}else{refresh();}});
window.TF_CUE=function(i){if(!audio.paused||!songs[i])return;c=i;loaded=-1;now.textContent=songs[i].title;dur.textContent=songs[i].length;seek.value=0;cur.textContent="0:00";refresh();};
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
    sets: `(function(){var tabs=[].slice.call(document.querySelectorAll("#setTabs [role=tab]")),list=document.getElementById("lpList"),songs=window.TF_SONGS||[];
function show(i,focus){if(!tabs.length)return;tabs.forEach(function(t,j){var on=j===i;t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;var p=document.getElementById(t.getAttribute("aria-controls"));if(p)p.hidden=!on;var cv=document.getElementById("set-cover-"+j);if(cv)cv.hidden=!on;});
if(list)[].slice.call(list.children).forEach(function(li){li.hidden=li.getAttribute("data-set")!==String(i);});
for(var k=0;k<songs.length;k++){if(songs[k].set===i){if(window.TF_CUE)window.TF_CUE(k);break;}}if(focus)tabs[i].focus();}
tabs.forEach(function(t,i){t.addEventListener("click",function(){show(i);});t.addEventListener("keydown",function(e){var n=e.key==="ArrowRight"?(i+1)%tabs.length:e.key==="ArrowLeft"?(i-1+tabs.length)%tabs.length:e.key==="Home"?0:e.key==="End"?tabs.length-1:-1;if(n<0)return;e.preventDefault();show(n,true);});});
document.querySelectorAll("[data-show-set]").forEach(function(a){a.addEventListener("click",function(){show(+a.getAttribute("data-show-set"));});});
show(0);})();`,
    paths: `(function(){var s=document.getElementById("pSwitch");if(!s)return;var bs=[].slice.call(s.querySelectorAll("button"));s.hidden=false;
function show(b){bs.forEach(function(x){var on=x===b;x.setAttribute("aria-pressed",on?"true":"false");var p=document.getElementById(x.getAttribute("aria-controls"));if(p)p.hidden=!on;});}
bs.forEach(function(b){b.addEventListener("click",function(){show(b);});});show(bs[0]);})();`,
    datesfilter: `(function(){var f=document.getElementById("dFilter");if(!f)return;var bs=[].slice.call(f.querySelectorAll("button")),rows=[].slice.call(document.querySelectorAll("#dates .drow"));
bs.forEach(function(b){b.addEventListener("click",function(){var k=b.getAttribute("data-kind");bs.forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});rows.forEach(function(r){r.hidden=k!=="all"&&r.getAttribute("data-kind")!==k;});});});})();`,
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
    if (has("music") && (usesSets(d) || usesGroups(d))) {
      artist.album = (d.sets || []).map((st, i) => ({ "@id": base + "#album-" + (i + 1) }));
      (d.sets || []).forEach((st, i) => { const tr = st.tracks || [];
        g.push({ "@type": "MusicAlbum", "@id": base + "#album-" + (i + 1), name: st.title, byArtist: { "@id": base + "#artist" }, datePublished: st.released || undefined, numTracks: tr.length,
          track: { "@type": "ItemList", numberOfItems: tr.length, itemListElement: tr.map((t, j) => { const m = /^(\d+):(\d{2})$/.exec(t.length || ""); const rec = { "@type": "MusicRecording", name: t.title }; if (m) rec.duration = "PT" + (+m[1]) + "M" + (+m[2]) + "S"; return { "@type": "ListItem", position: j + 1, item: rec }; }) } }); });
    } else if (has("music")) {
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
      d.photos = { hero: ph, portrait: ph, wide: ph, album: PH("ALBUM COVER"), album2: PH("ALBUM COVER"), story: ph };
      d.sets = (d.sets || []).map((st) => Object.assign({}, st, { cover: "" }));
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
      .map((s) => '<li><a href="#' + ({ music: "music", videos: "videos", dates: "dates", resources: "churches", podcast: "interviews", story: "story", booking: "booking", press: "press", repertoire: "songs", devotions: "devotions", give: "give", merch: "merch", contact: "contact" }[s.k]) + '">' + esc(LIB[s.k].nav) + "</a></li>").join("");
    const header = '<a class="skip" href="#main">Skip to content</a>\n<header class="site-header"><nav class="nav" aria-label="Main navigation"><a class="logo" href="#top">' + esc(d.name) + '</a>' +
      (links ? '<button class="menu-btn" type="button" aria-controls="menu" aria-expanded="false">Menu</button><ul class="menu" id="menu">' + links + "</ul>" : "") + "</nav></header>";
    const title = d.headline + " | " + d.name;
    const fontLink = st.fonts ? '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?' + st.fonts + '&amp;display=swap" rel="stylesheet">\n' : "";
    const data = [];
    if (jsKeys.includes("player")) data.push("window.TF_SONGS=" + JSON.stringify(songsOf(d).map((t) => Object.assign({ title: t.title, length: t.length, file: t.file, free: !!t.free, buy: t.buy || "" }, t.set != null ? { set: t.set } : {}))).replace(/</g, "\\u003c") + ";");
    if (jsKeys.includes("videos")) data.push("window.TF_VIDEOS=" + JSON.stringify(d.videos).replace(/</g, "\\u003c") + ";");
    if (preview) { data.push("window.TF_PREVIEW=true;window.TF_PH=" + JSON.stringify(PH("")) + ";"); jsKeys.push("preview"); }
    const css = tokens + BASE_CSS + cssKeys.map((k) => CSS[k]).join("\n") + (st.css ? "\n/* style */\n" + st.css : "") + (preview ? PREVIEW_CSS : "");
    return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      "<!-- Built by the Two Fish Site Kit. Style: " + esc(st.name) + ". Sections: " + d.sections.map((s) => s.k + "/" + s.v).join(", ") + " -->\n" +
      "<title>" + esc(title) + "</title>\n" +
      '<meta name="description" content="' + attr(d.description) + '">\n<meta name="robots" content="index, follow, max-image-preview:large">\n<meta name="theme-color" content="' + st.t.bg + '">\n' +
      '<link rel="canonical" href="' + attr(base) + '">\n<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n' +
      '<meta property="og:type" content="website">\n<meta property="og:site_name" content="' + attr(d.name) + '">\n<meta property="og:title" content="' + attr(title) + '">\n<meta property="og:description" content="' + attr(d.description) + '">\n<meta property="og:url" content="' + attr(base) + '">\n<meta property="og:image" content="' + attr(d.shareImage ? (/^https?:/.test(d.shareImage) ? d.shareImage : base + String(d.shareImage).replace(/^\//, "")) : base + "images/share-1200x630.jpg") + '">\n<meta name="twitter:card" content="summary_large_image">\n' +
      fontLink +
      '<script type="application/ld+json">\n' + schema(d, base) + "\n</script>\n<style>\n" + css + "\n</style>\n</head>\n<body>\n" +
      header + '\n<main id="main">' + body.replace(/\n<footer[\s\S]*$/, "") + "\n</main>" + body.match(/\n<footer[\s\S]*$/)[0] + "\n" +
      "<script>\n" + data.join("\n") + "\n" + Object.keys(JS).filter((k) => jsKeys.includes(k)).map((k) => JS[k]).join("\n") + "\n</script>\n</body>\n</html>\n";
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
    version: "1.5.0",
    styles: Object.keys(STYLES).map((id) => ({ id, name: STYLES[id].name, note: STYLES[id].note, group: STYLES[id].group || "christian", swatch: [STYLES[id].t.bg, STYLES[id].t.alt, STYLES[id].t.fill, STYLES[id].t.deco] })),
    catalog, assemble, sample: SAMPLE
  };
});
