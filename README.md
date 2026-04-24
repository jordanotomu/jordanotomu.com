# jordanotomu.com

Personal site for Jordan Otomu — minimal cream-and-ink home, a multi-page
`/work` section, and a `/random/*` playground with a 3D globe, album mosaic,
flip-card trophies, FAQ mini-games, and a live toolbox terminal.

Stack: **Astro 5** + **`@astrojs/vercel`** adapter, deployed as a Vercel
serverless function. Hand-rolled CSS, no framework UI libs.

## Run locally

```bash
npm install
npm run dev
# http://localhost:4321
```

`npm run build` produces the Vercel bundle at `.vercel/output/`.

## Layout

```
.
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro      cream+ink shell (fonts, theme toggle, SEO)
│   │   └── RandomLayout.astro    adds terminal pathbar + mono type for /random/*
│   ├── components/
│   │   ├── Chips.astro           social links (linkedin, github, x, spotify, ig, resume)
│   │   ├── Portrait.astro        profile photo
│   │   ├── SiteFooter.astro      last-updated + view source
│   │   ├── PathBar.astro         ~/random/<tab>.md breadcrumb
│   │   ├── NowPlaying.astro      live Spotify card (polls /api/now-playing)
│   │   ├── ExpCard.astro         experience + education row
│   │   └── ProjectCard.astro     project card (hero / featured / sandbox variants)
│   ├── pages/
│   │   ├── index.astro           home: portrait + whoami + nav tiles
│   │   ├── work.astro            experience · education · projects · ugc
│   │   ├── random/
│   │   │   ├── index.astro       hub: 5 tiles → sub-pages
│   │   │   ├── travel.astro      3D globe + pins (globe.gl)
│   │   │   ├── music.astro       now-playing + on-repeat + album mosaic
│   │   │   ├── wins.astro        flip-card trophy case
│   │   │   ├── lore.astro        FAQ accordion + typing game + guess game
│   │   │   └── toolbox.astro     live terminal (which / ls / help / whoami)
│   │   └── api/
│   │       └── now-playing.js    Vercel endpoint → Spotify API
│   ├── content/
│   │   ├── experience/*.md       career content collection
│   │   ├── education/*.md
│   │   ├── projects/*.md
│   │   ├── wins/*.md             trophy case
│   │   └── lore/*.md             FAQ answers
│   ├── content.config.ts
│   └── styles/
│       ├── tokens.css            design tokens (cream+ink)
│       └── globals.css           base + header + chips + pathbar
├── public/
│   └── assets/                   photos, logos, ugc covers
├── scripts/get-refresh-token.mjs one-time Spotify OAuth helper
├── legacy/                       previous single-page build (archived, not deployed)
├── astro.config.mjs
├── tsconfig.json
├── vercel.json
└── package.json
```

## Design tokens

Defined in `src/styles/tokens.css`:

```css
--bg:     #f3f1e7;   /* warm cream */
--ink:    #1a1a1a;   /* near-black */
--muted:  rgba(26,26,26,0.56);
--faint:  rgba(26,26,26,0.12);
--border: rgba(26,26,26,0.85);
```

Dark mode inverts via `[data-theme="dark"]`. Preference is persisted to
`localStorage["jotheme"]`; default is `dark`. A pre-render inline script
applies the theme before paint to avoid a flash.

## Fonts

- `Courier Prime` — name, pathbar, section legends, tech labels
- `Inter` — body text

## Adding content

Every `src/content/*` directory is a content collection — add a markdown file
and it shows up. Schemas live in `src/content.config.ts`.

- **experience**: frontmatter `company, role, place, dates, start, logo, order`
- **education**: `school, degree, place, dates, start, logo, order`
- **projects**: `title, url?, tag?, tier (hero/featured/sandbox), stack[], metrics[{value,label}], order`
- **wins**: `title, org, year, emblem, order`
- **lore**: `q, order` (body = the answer)

Higher `order` = shown first.

## Spotify "now playing"

The `/random/music` page polls `/api/now-playing` every 30s. The endpoint
refreshes an OAuth token server-side and returns the currently-playing or
most-recently-played track.

### One-time setup

1. **Create a Spotify app** at <https://developer.spotify.com/dashboard> →
   *Create app*.
   - Redirect URI: `http://127.0.0.1:8888/callback`
   - API: Web API
2. Copy the **Client ID** and **Client Secret**.
3. **Get a refresh token**:

   ```bash
   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy \
       node scripts/get-refresh-token.mjs
   ```

   A browser opens → approve → the terminal prints the refresh token.
4. **Add three env vars** to Vercel (*Settings → Environment Variables*):

   ```
   SPOTIFY_CLIENT_ID
   SPOTIFY_CLIENT_SECRET
   SPOTIFY_REFRESH_TOKEN
   ```

5. **Deploy** (or redeploy) — the card goes live.

Copy `.env.example` to `.env` to test the endpoint via `npm run dev`.

## Deploy

Push any branch → Vercel builds a preview URL. `main` deploys to the apex
domain. `@astrojs/vercel` handles the build output; `vercel.json` only sets
clean URLs.
