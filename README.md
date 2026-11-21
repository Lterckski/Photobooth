# Photobooth demo

A browser demo of the photobooth kiosk for the client. It covers the full customer flow and produces print-ready files at 300 DPI. Payment and the kiosk shell (Electron, silent printing) come after the client reviews this.

## Run it on your Mac

You need Node.js 20 or newer (`node -v` to check; install from nodejs.org if missing).

```bash
cd ~/Desktop/projects/Commissions/photobooth_harold
npm install
npm run dev
```

Open http://localhost:5173 in Chrome and allow camera access. Use Chrome full screen (View > Enter Full Screen) for the kiosk feel.

To show the client on a phone or tablet on the same Wi-Fi, use the "Network" address that `npm run dev` prints. Note that browsers only allow the camera on `localhost` or `https`, so on another device the camera screen offers sample photos instead.

## Animations

Built with the `motion` library: screen transitions, staggered tile entrances, hover lift and tap squash on every button and tile, pop-in selection checks, countdown and flash, a REC indicator while shooting, and a printer animation on the thank-you screen. They switch off automatically if the computer has "Reduce motion" turned on.

## The flow

The booth makes one product: a personalised trading card.

1. Welcome: price and sample cards. Tap anywhere to start.
2. Pick a theme, with a live preview of the card.
3. Your details: Name (max 20) and Description (max 30). Pokémon cards also ask for your type and two abilities (max 15 each) with a move type each.
4. Camera: 6 shots with a 3-2-1 countdown and flash. Retake all if needed.
5. Pick the best shot.
6. Preview of exactly what prints, then Print or Save PNG.
7. Thank-you screen, then back to Welcome. The booth also resets after 60 s of no touch.

## Print output (300 DPI)

| Product | Size | Pixels |
| --- | --- | --- |
| Trading card | 2.5 x 3.5 in, 0.125 in corner radius | 750 x 1050 |

Card layouts:
- Pokémon: name + type icon, photo, description, two abilities with move types, KD.STUDIO footer.
- Standard (other themes): name + theme logo, photo, description, KD.STUDIO footer.

"Print" opens the browser print dialog with the page size already set and no margins. In the kiosk version this becomes silent printing to the right printer.

## Where to change things

- `src/config.ts`: booth name, outlet name, price, number of shots, timers, character limits.
- `src/themes.ts`: theme colours, fonts and card titles.
- `public/themes/<theme>/logo.png`: each theme's logo (transparent PNG). Replace a file to change a logo; delete it and the theme shows its name in text instead. These are third-party brands: the business needs permission to use them on paid prints.
- `src/print/TradingCard.tsx`: the card layout.
- `src/components/TypeIcon.tsx`: the type icons and colours.
- `src/screens/`: one file per screen.

## Not in the demo yet

- Payment (on hold)
- Electron kiosk shell with silent printing and kiosk lock
- Sales log and owner dashboard
- On-screen keyboard for the details form
