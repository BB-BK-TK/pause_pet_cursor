# Pause Pet

Pause Pet is a small client-only web app built with the Next.js App Router.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Browser `localStorage` for persistence

There is no backend and no authentication in this first version.

## Data

Pet state is stored under the key `pause-pet-state` in `localStorage`. See `lib/storage.ts` and `lib/types.ts`.

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
```
