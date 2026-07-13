# Lukas26 — Birthday Dino Surprise

A single-page birthday web app inspired by Chrome's dinosaur game. The player jumps over obstacles, reaches a gift box, and unlocks a birthday greeting video.

## Live site

https://rayhanmawuntu-stack.github.io/Lukas26/

## Features

- Custom dinosaur PNG with its original colors and transparency preserved
- Monochrome game environment and birthday reveal
- Responsive controls for desktop and mobile
- Tuned for the iPhone 11 viewport and Safari safe areas
- A small **“tabrak kadonya ya sayang”** prompt appears as the gift approaches
- One-time reveal stored in the browser's `localStorage`
- Grayscale greeting video presentation with a direct-link fallback
- Automatic deployment through GitHub Pages

## Assets

- Dinosaur: `https://file.garden/ad-wGPVIV3ilAD_L/Lukas26/dino.png`
- Greeting video: `https://file.garden/ad-wGPVIV3ilAD_L/Lukas26/ucapandarirayhanganteng.3gp`

The assets are loaded from File Garden at runtime and are not stored in this repository.

## Run locally

Open `index.html` in a modern browser. For behavior closer to the deployed version, serve the folder with a simple local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Reset the one-time lock for testing

The reveal is locked per browser and device after the gift is opened. To reset it, open the browser console on the site and run:

```js
localStorage.removeItem("lukas26-birthday-surprise-opened-v1");
location.reload();
```

Clearing the site's browser data also resets the lock.

## Video compatibility

The greeting is provided as a `.3gp` file. Playback support depends on the codecs available in the browser and device. A direct video link is shown below the player as a fallback.

## Deployment

The workflow in `.github/workflows/pages.yml` deploys the repository to GitHub Pages whenever `main` is updated.
