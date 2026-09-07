# Learn by Reels

A React Native (Expo) app for micro-learning through a full-screen, vertically
swipeable feed — Instagram Reels/TikTok-style, but each "reel" is a short
lesson card instead of a video.

Content is currently seeded with **Technical Leadership** material (56 cards
across 8 categories: Communication & Feedback, Delegation & Trust,
Decision-Making, Conflict Resolution, Hiring & Team Building, Career Growth &
Coaching, Strategic Thinking, and Managing Up & Across). Each category holds a
mix of tips, quotes, quick-check questions, short scenarios, and daily
challenges.

## Features

- **Reel feed** — one card per screen, snap-scroll vertically, auto-advances
  progress as each card is viewed.
- **Topics** — browse by category or a mixed "For You" feed.
- **Daily goal** — a built-in goal of 10 reels/day, tracked with a progress
  bar and streak counter (persisted locally via AsyncStorage).
- **Progress tab** — current streak, best streak, all-time reel count, and a
  7-day history chart.
- **Quiz cards** — tap an answer to see it marked correct/incorrect with a
  short explanation.

## Content is swappable

All screens read through `src/data/contentSource.ts`. To plug in a CMS, API,
or a larger Technical Leadership content set later, that's the only file that
needs to change — the rest of the app just consumes `Category[]`/`Reel[]`
shapes defined in `src/types/content.ts`.

## Running the app

```
npm install
npm run start   # then press i / a / w, or scan the QR code with Expo Go
```

## Project structure

```
App.tsx                     # tab navigation shell
src/
  types/content.ts          # Category / Reel data shapes
  data/
    categories.ts           # category definitions
    reels.ts                # seed lesson content
    contentSource.ts         # single seam for where content comes from
  state/progress.tsx        # daily goal + streak, persisted via AsyncStorage
  components/
    ReelCard.tsx             # full-screen lesson card (tip/quote/quiz/story/challenge)
    DailyProgressBar.tsx      # top overlay: today's count + streak
    TabBar.tsx                 # custom bottom tab bar
  screens/
    FeedScreen.tsx             # vertical paging feed
    CategoriesScreen.tsx       # topic picker
    ProgressScreen.tsx         # streak + history
  utils/
    date.ts, shuffle.ts        # date-key helpers, seeded daily shuffle
```
