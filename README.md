# A Two Fish musician website

This folder is one musician's whole website, which starts out as the "Grace Miller" demo.

## The three folders that matter

| Folder | What's inside | Who changes it |
|---|---|---|
| `content/` | The musician's words, dates, videos, interviews, songs and links, one file each | **The musician**, through the editor |
| `media/` | Their photos, song previews and PDFs | **The musician**, through the editor |
| `kit/` | The designs, which is the part we built and tested | **Two Fish only**. It never needs touching. |

`content/layout.json` names the template (for example `frontporch`) and holds the domain and time zone. The musician's editor doesn't show this file, so only Two Fish changes the look. The `templates` folder holds the design of each of the 21 templates on twofishhosting.com/design.html. Don't edit those files.

The site also has a press kit page at `/epk/`, built from the same content and the **Press kit** item in the editor. Each template picks one of five press kit designs; `"epk": "<design>"` in `content/layout.json` changes it, and `"epk": "none"` turns it off.

## How it works

1. **The musician saves** a change in the editor, for example a new date.
2. **The editor saves** that change into this folder on GitHub.
3. **Cloudflare notices** the change, runs `build.js` and puts the updated site online. This takes about a minute.

The musician never touches code, so they can't break the design.

## Smart things the build does for them

- **Past dates hide themselves.** The site also rebuilds every Monday, so a finished show drops off even if nobody edits anything that week.
- **Empty sections disappear.** If there are no videos or merch yet, that section isn't shown. If there are no dates, the page says "No dates on the calendar right now. Check back soon."
- **YouTube links just work.** They can paste any kind of YouTube link: the normal one, a youtu.be share link, or a Shorts link.
- **The newest interview is featured** at the top, and the older ones are listed below it.
- **Search tags update themselves.** The Google search tags, music data and sitemap rebuild with every change.

Setting this up for a new customer takes about 20 minutes. See `SETUP-FOR-TWO-FISH.md`.
