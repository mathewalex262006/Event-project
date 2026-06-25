# Event Hub

A multi-page Event Registration Website built with plain **HTML, CSS, and JavaScript** — no frameworks, no backend. User accounts and registrations are stored in the browser's `localStorage`, so it runs entirely as a static site (perfect for GitHub Pages).

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Hero + search + featured upcoming events |
| Sign up | `signup.html` | Creates an account (`localStorage`) |
| Login | `login.html` | Authenticates against stored accounts |
| Events | `events.html` | Full event list, category filter, search, live countdown timers, image gallery |
| Register | `registration.html?id=evt-101` | Event summary + registration form, success message |
| My Registrations | `my-registrations.html` | Lists the logged-in user's registrations, view details / cancel |
| Dashboard | `dashboard.html` | User profile, stats, log out |

## Folder structure

```
event-hub/
├── index.html
├── login.html
├── signup.html
├── events.html
├── registration.html
├── my-registrations.html
├── dashboard.html
├── css/
│   └── style.css
└── js/
    ├── data.js              (sample events + localStorage helpers — included on every page)
    ├── main.js               (navbar behaviour — included on every page)
    ├── events.js              (events.html only)
    ├── register.js            (registration.html only)
    ├── myregistrations.js     (my-registrations.html only)
    └── dashboard.js           (dashboard.html only)
```

## How the "backend" works

There's no server. `js/data.js` defines a hardcoded `EVENTS` array and a handful of helper functions that read/write three `localStorage` keys:

- `eh_users` — every signed-up account (`{ name, email, password }`)
- `eh_session` — the currently logged-in user (no password stored here)
- `eh_registrations` — every registration anyone has made

This is fine for a class project / portfolio piece, but **don't use it for real passwords** — there's no encryption and anyone using the browser's dev tools can read `localStorage`.

---

# Setup instructions

## 1. Open the project in VS Code

1. Install [VS Code](https://code.visualstudio.com/) if you don't already have it.
2. Unzip the project folder you downloaded (`event-hub.zip`) somewhere on your computer.
3. Open VS Code → **File → Open Folder…** → select the unzipped `event-hub` folder.
4. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`, search "Live Server").
5. Right-click `index.html` in the file explorer → **Open with Live Server**. Your browser opens the site at a local address like `http://127.0.0.1:5500/index.html` and refreshes automatically whenever you save a file.

> Why Live Server and not just double-clicking the file? Opening `index.html` directly with `file://` mostly works here, but some browsers restrict certain JavaScript/localStorage behaviour on `file://` pages. A local server avoids that entirely and is the standard way to preview a site while building it.

## 2. Try it out

1. Go to **Sign up**, create an account.
2. Go to **Events**, filter by category, search by name, click **Register** on any event.
3. Fill in the registration form → you'll see the success message.
4. Check **My Registrations** to view/cancel it, and **Dashboard** to see your stats.

## 3. Customize it for your assignment

- Edit the `EVENTS` array in `js/data.js` to use your own events, dates, venues, and fees.
- Replace the `image` URLs (currently placeholder photos) with your own images — put image files in a new `images/` folder and reference them as `images/yourfile.jpg`.
- Tweak colors/fonts in `css/style.css` — the color values are all defined once at the top in `:root`, so changing the theme is a matter of editing a handful of hex codes.

## 4. (Optional) Recreate the Figma step

Since the assignment also asks for a Figma wireframe: open [figma.com](https://figma.com), create a new design file, and rebuild the layout of `index.html`/`events.html` as frames/wireframes before (or after) coding — many instructors want to see the Figma file alongside the code as evidence of the design step.

---

# Publishing with GitHub Pages

## 1. Create a GitHub repository

1. Go to [github.com](https://github.com) and log in (create a free account if you don't have one).
2. Click the **+** icon (top right) → **New repository**.
3. Name it something like `event-hub`, leave it **Public**, don't initialize with a README (we already have one), click **Create repository**.

## 2. Push your code from VS Code

**Option A — VS Code's built-in Git panel (no terminal commands to memorize):**

1. In VS Code, open the **Source Control** panel (the icon with branching lines, or `Ctrl+Shift+G`).
2. Click **Initialize Repository**.
3. Stage all files (click the **+** next to "Changes"), type a commit message like `Initial commit`, click the ✓ **Commit** button.
4. Click **Publish Branch** (or "Publish to GitHub" if prompted) → choose **Public** → select the repository name you created (or let VS Code create it for you, in which case you can skip step 1 above entirely).

**Option B — Terminal commands**, run inside the `event-hub` folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/event-hub.git
git push -u origin main
```

(Replace `YOUR-USERNAME` with your actual GitHub username, and `event-hub` with whatever you named the repo.)

## 3. Turn on GitHub Pages

1. On GitHub, open your repository → **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
5. Wait about 30–60 seconds, then refresh the page — GitHub will show you the live URL, something like:

   ```
   https://YOUR-USERNAME.github.io/event-hub/
   ```

6. Open that link — your Event Hub site is now live and shareable.

## 4. Updating the live site later

Any time you make changes locally:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Pages automatically redeploys the updated files within a minute or so.

---

## Notes for your write-up

- **HTML** → structure of all seven pages.
- **CSS** (`css/style.css`) → all styling: layout, colors, the responsive nav, cards, forms.
- **JavaScript** → button interactions: filtering, search, the live countdown timers, the lightbox gallery, form validation, login/signup, and saving/cancelling registrations via `localStorage`.
- **Figma** → use it for the wireframe/design step before or alongside this code, per the assignment instructions.
- **GitHub** → hosting, via GitHub Pages as set up above.
