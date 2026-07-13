# Lukas26 — Birthday Dino Surprise

A single-page birthday web app inspired by Chrome's dinosaur game. The player collects hidden messages, crashes into a gift box, blows out number candles, sends a birthday wish, watches a greeting video, and opens a final letter.

## Live site

https://rayhanmawuntu-stack.github.io/Lukas26/

## Features

- Custom dinosaur PNG displayed as a real image element
- Original dinosaur colors and transparency are preserved
- Monochrome game environment and cake scene
- Full-color birthday greeting video
- Responsive desktop and mobile controls
- Tuned for the iPhone 11 viewport and Safari safe areas
- **“tabrak kadonya ya sayang”** appears as the gift approaches
- Four collectible hearts reveal hidden personal messages during the run
- Heart counter in the game header
- Candle scene titled **“Happy Birthday Lukas <3”**
- Separate number-shaped **2** and **6** birthday candles with warm yellow-orange flames
- Synthesized **Happy Birthday** music-box melody during the cake scene
- Music on/off control; the melody stops before the greeting video starts
- Tap the cake or the candle button to blow out the flames
- A private wish form appears after the candles are blown out
- The typed wish becomes a floating paper-star animation and is not stored
- An animated envelope and personal letter appear after the video
- Replayable; there is no one-time browser lock
- Automatic deployment through GitHub Pages

## Assets

- Dinosaur: `https://file.garden/ad-wGPVIV3ilAD_L/Lukas26/dino.png`
- Greeting video: `https://file.garden/ad-wGPVIV3ilAD_L/Lukas26/ucapandarirayhanganteng.3gp`

The assets are loaded from File Garden at runtime.

## Run locally

Open `index.html` in a modern browser. For behavior closer to GitHub Pages, serve the folder locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Audio behavior

The music-box melody is generated in the browser as a looping WAV audio track. Mobile browsers may require the first tap or key press before audio playback is allowed; the music control also provides a manual playback fallback.

## Privacy

The birthday wish is only displayed for the animation. It is not saved to local storage, sent to a server, or added to the URL.

## Video compatibility

The greeting is a `.3gp` file. Playback depends on the codecs supported by the browser and device. The page includes a direct-link fallback below the video player. An H.264/AAC `.mp4` version would provide the broadest browser compatibility.

## Deployment

GitHub Pages publishes updates from the repository's `main` branch.
