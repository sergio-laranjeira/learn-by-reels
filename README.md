# Learn by Reels

A React Native (Expo) app for micro-learning through a full-screen, vertically
swipeable feed — Instagram Reels/TikTok-style, but each "reel" is a short
lesson card instead of a video.

Content is organized into **collections** — one per topic, format, or source
— and framed as a card collection: each collection targets 100 cards, you
collect a card the first time you view it, and a Collection tab tracks how
many you've found. Collections currently seeded with content live under
`src/data/collections/*.json`; empty ones are marked "Coming soon" in the UI
until content is added.

**By topic** (Technical Leadership, 15 cards each today): Communication &
Feedback, Delegation & Trust, Decision-Making, Conflict Resolution, Hiring &
Team Building, Career Growth & Coaching, Strategic Thinking, Managing Up &
Across.

**By format** (empty, ready for content): Books, Conferences & Talks,
Courses, Forums & Communities, Daily News.

**From Doctolib**: Doctolib Leadership (empty, content added separately).

Each card is a tip, quote, quick-check question, short scenario, or daily
challenge.

## Features

- **Reel feed** — one card per screen, snap-scroll vertically, auto-advances
  progress and collects the card as it's viewed.
- **Topics** — browse by collection (grouped by topic/format/source) or a
  mixed "For You" feed across everything.
- **Daily goal** — a built-in goal of 10 reels/day, tracked with a progress
  bar and streak counter (persisted locally via AsyncStorage).
- **Collection tab** — cards collected per set (X/100) and overall, with a
  100-slot grid per collection (collected / discoverable / not yet written),
  rarity tiers by card kind, and a "Download JSON" export per collection.
- **Progress tab** — current streak, best streak, all-time reel count, and a
  7-day history chart.
- **Quiz cards** — tap an answer to see it marked correct/incorrect with a
  short explanation.

## Content is swappable

All screens read through `src/data/contentSource.ts`, which loads each
collection from its own JSON file under `src/data/collections/`. Adding a new
collection's content means dropping cards into (or replacing) its JSON file —
no changes needed in the screens/components that call these functions. Each
collection's JSON is also what the "Download JSON" button exports, so it
doubles as a human-editable, portable format for content review.

At the current and foreseeable content volume (a few hundred short cards per
collection) this stays bundled with the app rather than fetched remotely —
that's a deliberate choice, not a limitation: a few hundred KB of JSON is not
worth the complexity of lazy/remote loading yet. If any one collection grows
large enough for that to matter, `contentSource.ts` is the only place that
would need to change to fetch it instead of importing it.

## Running the app

```
npm install
npm run start   # then press i / a / w, or scan the QR code with Expo Go
```

## Web build & GitHub Pages

The app also exports to a static website via `react-native-web`, deployed by
`.github/workflows/deploy-pages.yml` on every push to `main`.

One-time setup: in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**. After that, pushing to `main` builds and publishes
automatically to `https://<user>.github.io/learn-by-reels/`.

Since a GitHub Pages project site is served from a `/learn-by-reels/`
subpath rather than the domain root, the web export needs a base path baked
in — that's what `GH_PAGES_BASE_PATH` does in `app.config.js` (only applied
when the env var is set, so local dev and native builds are unaffected). To
reproduce the production build locally:

```
GH_PAGES_BASE_PATH=/learn-by-reels npx expo export --platform web --output-dir dist
```

Note: the reel-swipe feed uses native paging (`FlatList` + `pagingEnabled`),
which `react-native-web` maps to CSS scroll-snap — full-screen cards still
snap cleanly on mouse-wheel/trackpad scroll, just without the touch-swipe
feel of the native app.

## Downloading a collection

Each collection can be exported as a standalone JSON file from its detail
view in the Collection tab (the "JSON" button). On web this triggers a normal
browser download; on native it writes the file to a temp directory and opens
the system share sheet (`expo-file-system` + `expo-sharing`). The platform
split lives in `src/utils/downloadCollection.ts` (native) and
`src/utils/downloadCollection.web.ts` (web) — Metro picks the right one per
platform automatically, so the web bundle never pulls in the native-only
file-system/sharing modules.

## Project structure

```
App.tsx                     # tab navigation shell
src/
  types/content.ts          # Category / Reel shapes, rarity derivation
  data/
    categories.ts           # collection definitions (topic/format/internal)
    collections/*.json      # one JSON file per collection — the actual content
    contentSource.ts        # single seam for where content comes from
  state/progress.tsx        # daily goal + streak + lifetime card collection,
                             # persisted via AsyncStorage
  components/
    ReelCard.tsx             # full-screen lesson card (tip/quote/quiz/story/challenge)
    DailyProgressBar.tsx      # top overlay: today's count + streak
    TabBar.tsx                 # custom bottom tab bar
  screens/
    FeedScreen.tsx             # vertical paging feed (+ empty-collection state)
    CategoriesScreen.tsx       # collection picker, grouped by topic/format/source
    CollectionScreen.tsx       # collected-card tracker + per-collection grid + export
    ProgressScreen.tsx         # streak + history
  utils/
    date.ts, shuffle.ts        # date-key helpers, seeded daily shuffle
    collectionExport.ts         # shared JSON export payload shape
    downloadCollection(.web).ts # platform-specific download/share
```
