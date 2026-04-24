# jordanotomu.com

Personal site for Jordan Otomu — a holistic, minimal cream-and-ink page: engineering, music, UGC, experience, projects, and personal lore.

## Run locally

No build step. Any static server works.

```bash
# python
python3 -m http.server 8000

# or node
npx serve .
```

Then open `http://localhost:8000`.

## Files

```
.
├── index.html         page structure + semantic fieldsets
├── styles.css         cream + ink design tokens, responsive, dark mode
├── script.js          theme toggle, tabs, smooth scroll, now-playing polling
├── api/
│   └── now-playing.js Vercel serverless function → Spotify API
├── scripts/
│   └── get-refresh-token.mjs  one-time OAuth helper
├── vercel.json        Vercel function config
├── .env.example       template env vars
└── profile/           separate repo (github.com/jordanotomu/jordanotomu)
```

## Sections

1. **Header** — name, social chips (LinkedIn, GitHub, X, TikTok, Instagram), theme toggle
2. **`cat ~/for-visitors.md`** — short welcome for people coming in from videos/posts
3. **`whoami`** — bio + GitHub-avatar photo
4. **`cat ~/music.md`** — currently-on-repeat tracks, playlists
5. **`cat ~/ugc.md`** — video/content grid (TikTok, Instagram, YouTube)
6. **`cat ~/experience.md`** — Snap intern, UH
7. **`cat ~/projects.md`** — featured (CoogGrid Houston) + grid
8. **`cat ~/random.md`** — life motto + tabbed panels (Toolbox, Music Life, Wins, Lore, Travel)
9. **Footer** — last-updated + view-source link

## Design tokens

Defined at the top of `styles.css`:

```css
--bg:     #f3f1e7;   /* warm cream */
--ink:    #1a1a1a;   /* near-black */
--muted:  rgba(26,26,26,0.56);
--faint:  rgba(26,26,26,0.12);
--border: rgba(26,26,26,0.85);
```

Dark mode inverts these via `[data-theme="dark"]`. Preference is saved to `localStorage["jotheme"]`; system preference is the default.

## Fonts

- `Courier Prime` (Google Fonts) — name, section legends, mono labels, bold italic
- `Inter` (Google Fonts) — body text

## Current state

The entire structure is in place. Most content is placeholder so the visuals can be reviewed and iterated on before filling in. Look for:

- `// your bio here`-style comments and obvious placeholder text in music tracks, UGC cards, toolbox entries
- Social links point to assumed handles (`@jordanotomu` everywhere) — update in `index.html` if any handle differs

## Spotify "now playing"

The music section has a live-updating card that shows whatever I'm listening to on Spotify right now (or my most recently played track when I'm offline). It polls `/api/now-playing` every 30s; the serverless function refreshes an OAuth token server-side and calls the Spotify Web API.

### One-time setup

1. **Create a Spotify app** at <https://developer.spotify.com/dashboard> → *Create app*.
   - Redirect URI: `http://127.0.0.1:8888/callback` (exactly this — Spotify requires the loopback IP, not `localhost`)
   - Which API? "Web API"
2. Copy the **Client ID** and **Client Secret**.
3. **Get a refresh token** (one time only):

   ```bash
   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-refresh-token.mjs
   ```

   A browser tab opens → approve access → the terminal prints a refresh token.
4. **Add three env vars** to your Vercel project (*Settings → Environment Variables*):

   ```
   SPOTIFY_CLIENT_ID
   SPOTIFY_CLIENT_SECRET
   SPOTIFY_REFRESH_TOKEN
   ```

5. **Deploy** (or redeploy) — card goes live.

### Local dev with the function

```bash
npm i -g vercel     # first time only
vercel dev          # serves static site + /api routes on :3000
```

Copy `.env.example` to `.env.local` and fill in the three values.

Plain `python -m http.server` works for everything *except* the now-playing card (the endpoint will 404). That's fine for design work; use `vercel dev` when you want to test the Spotify flow.

## Deploy

Vercel is the simplest path because of the serverless function. Import the repo at <https://vercel.com/new> — zero config. Add the three env vars under *Settings → Environment Variables* and redeploy.

Netlify and Cloudflare Pages both work too, but the function will need a small adapter (different serverless signatures).

GitHub Pages won't work for now-playing (no serverless), but the rest of the site renders fine there.
