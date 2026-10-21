# Setting up a musician's site and editor

You do this once per customer, and it takes about 20 minutes. Steps 1 to 3 happen only for your very first customer.

## One time only

**1. GitHub (where the site's files live).** Create a free GitHub account for Two Fish at github.com. You can also create a free "organization" called `twofishhosting` so every customer's site is in one place.

**2. Cloudflare.** You already have this account.

**3. Pages CMS (the editor).** Go to app.pagescms.org and click **Sign in with GitHub**. When it asks, allow it to access your Two Fish repositories.

## For each new musician

**4. Make their copy of the site.**
- On GitHub, click **New repository**. Name it after the musician (for example `gracemiller-site`) and set it to **Private**.
- Click **uploading an existing file** and drag in everything from this folder. Hidden items are easy to miss, so make sure `.pages.yml` and `.github` are included. On a Mac, press Cmd+Shift+. to show hidden files.
- Click **Commit changes**.

**5. Put in their details.** In GitHub, open `content/layout.json` and click the pencil to edit it. Set these:
- `domain`
- `style`
- `timezone`
- the section order (copy it from the recipe they sent from the Site Builder)

You can fill in their content now, or let them do it in the editor.

**6. Connect Cloudflare.**
- In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git**, then pick the repository.
- **Build command:** `node build.js`
- **Build output directory:** `public`
- Click **Save and Deploy**. In about a minute the site is live at a `.pages.dev` address.
- Then go to **Custom domains** and add their domain. Their domain stays at Hover, and Cloudflare shows the DNS record to add there.

**7. Weekly refresh (optional, recommended).**
- In Cloudflare, go to the project's **Settings → Builds → Deploy hooks**. Create a hook and copy the link.
- In GitHub, go to **Settings → Secrets and variables → Actions → New secret**. Name it `CF_DEPLOY_HOOK` and paste the link.

**8. Invite the musician to the editor.** In Pages CMS, open their repository and go to **Settings → Collaborators**. Enter the musician's email. They'll get an invitation, and they don't need a GitHub account.

**9. Send them** `HOW-TO-UPDATE-YOUR-SITE.md` (or its contents) as a welcome email.

## Good to know

- **Build limit.** Cloudflare's free plan allows 500 builds a month across all your sites, one at a time. A build happens each time a musician saves. That's plenty for your first customers. When you get busy, Cloudflare's paid plan raises the limit.
- **File size.** A single file can be at most 25 MB, which is fine for photos and MP3 previews. Full albums for sale live on Bandcamp, not here.
- **Undo is built in.** GitHub keeps every version. If a musician deletes something by mistake, you can restore it from the file's **History**.
- **Changing the look later.** Edit `content/layout.json`. To get a design improvement onto every customer site, replace `kit/kit.js` in each repository.
