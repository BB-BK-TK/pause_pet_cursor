# Pause Pet visual assets

Place PNG files here. Paths are wired in `lib/zodiacAssets.ts` and loaded via `PausePetAssetImage` / `ZodiacCompanionImage`.

## Intro

| File | Used on |
|------|---------|
| `intro/pause-pet-intro-screen.png` | First-launch intro (`IntroScreen`) |

## Zodiac cards (selection grid + reveal)

`zodiac/cards/{sign}_card.png` — e.g. `gemini_card.png`

Signs: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces

## Zodiac icons (intervention, timer, summary)

`zodiac/icons/{sign}_icon.png` — e.g. `gemini_icon.png`

Same sign names as above.

## Fallback

If a file is missing, the app shows the SVG `ZodiacPet` mascot automatically.
