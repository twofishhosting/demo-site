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

**5. Set their template.** The first answer in their content form says which template they picked, for example "Jubilee · Christian (jubilee)". The word in brackets is the file name.
- In GitHub, open the `templates` folder, then that template's file (for example `jubilee.json`), and click the **copy** icon at the top right of the file.
- Go back, open `content/layout.json`, click the pencil, select everything, and paste.
- Change `domain` to their address (for example `www.gracemillermusic.com`) and `timezone` to where they live.
- Click **Commit changes**, then **Commit changes** again.

`templates/README.md` lists all 21 templates. Then put their content in through the editor (Pages CMS). Any section left empty hides itself.

**6. Connect Cloudflare.**
1. In the Cloudflare dashboard's left menu, click **Workers & Pages**.
2. Click **Create application**, then the **Pages** tab, then **Connect to Git**. If you only see Workers choices, look for a link that mentions Pages.
3. Choose **GitHub**. The first time, Cloudflare asks to connect to GitHub: pick your Two Fish account or organization, choose **All repositories**, and click **Install & Authorize**.
4. Pick the musician's repository and click **Begin setup**.
5. Fill in the form:
   - **Project name:** for example `gracemiller`. It becomes `gracemiller.pages.dev`.
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** `node build.js`
   - **Build output directory:** `public`
   - **Root directory:** leave it empty. If you uploaded the `demo-site` folder itself instead of its contents, type `demo-site` here.
6. Click **Save and Deploy**. Wait about a minute until the log says **Success**, then click **Continue to project**. The site is now live at `https://gracemiller.pages.dev`.

**Add their domain (when it's in your Cloudflare account)**
1. In the project, click **Custom domains**, then **Set up a domain**.
2. Type `gracemillermusic.com`, then click **Continue**, then **Activate domain**. Cloudflare adds the DNS record itself.
3. Repeat for `www.gracemillermusic.com`, so both addresses work.
4. Wait for the status to show **Active**. This usually takes a few minutes, and the security certificate is included.
5. In GitHub, check that `domain` in `content/layout.json` matches the main address you want Google to use.

**If the build says "Failed":** click it and read the last red lines.
- `Could not read content/...` means a content file has a typo. GitHub's **History** shows the last change, so you can undo it.
- A Node error: add an environment variable `NODE_VERSION` = `20` under **Settings → Variables and Secrets**, then click **Retry deployment**.

**7. Weekly refresh (optional, recommended).**
- In Cloudflare, open the project, go to **Settings → Builds** and click **Add deploy hook**. Name it `weekly`, choose branch `main`, save it, and copy the link it shows.
- In GitHub, go to **Settings → Secrets and variables → Actions → New secret**. Name it `CF_DEPLOY_HOOK` and paste the link.

**8. Invite the musician to the editor.** In Pages CMS, open their repository and go to **Settings → Collaborators**. Enter the musician's email. They'll get an invitation, and they don't need a GitHub account.

**9. Send them** `HOW-TO-UPDATE-YOUR-SITE.md` (or its contents) as a welcome email.

## Good to know

- **Build limit.** Cloudflare's free plan allows 500 builds a month across all your sites, one at a time. A build happens each time a musician saves. That's plenty for your first customers. When you get busy, Cloudflare's paid plan raises the limit.
- **File size.** A single file can be at most 25 MB, which is fine for photos and MP3 previews. Full albums for sale live on Bandcamp, not here.
- **Undo is built in.** GitHub keeps every version. If a musician deletes something by mistake, you can restore it from the file's **History**.
- **Switching templates.** Copy a different file from `templates` into `content/layout.json` (step 5). Their content stays.
- **Design improvements.** To get a kit update onto every customer site, replace `kit/kit.js` in each repository.
