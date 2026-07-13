# Lukas26 — Birthday Dino Surprise

A single-page birthday web app inspired by Chrome's dinosaur game. The player jumps over obstacles, crashes into a gift box, blows out a birthday candle, and then watches a greeting video.

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
- Candle scene titled **“Happy Birthday Lukas <3”**
- Tap the cake or the candle button to blow out the flame
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

## Video compatibility

The greeting is a `.3gp` file. Playback depends on the codecs supported by the browser and device. The page includes a direct-link fallback below the video player. An H.264/AAC `.mp4` version would provide the broadest browser compatibility.

## Deployment

The workflow in `.github/workflows/pages.yml` deploys the repository to GitHub Pages whenever `main` is updated.
