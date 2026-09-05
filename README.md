# Birthday Surprise Website

A premium interactive birthday surprise website.

## How to Customize

All content for this website is driven by a single file: `src/data/content.js`. You do not need to edit any React components to change the text, images, or music.

### 1. Update Text Content
Open `src/data/content.js` and change the text strings (like `brotherName`, `heroTitle`, `wishes`, etc.) to match your preferences.

### 2. Add Images
You need to provide your own images in the `public/images/` folder. The app expects the following images (but you can change their names in `content.js`):
- `public/images/hero.jpg`: The main image shown in the Hero section.
- `public/images/letter.jpg`: The scanned image of your handwritten letter.
- `public/images/photo1.jpg` to `photo7.jpg`: The photos for the Memory Gallery.

### 3. Add Background Music
Place your background music file in the `public/music/` folder and name it `birthday.mp3` (or update the filename in `content.js`).

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production (Vercel, Netlify):
   ```bash
   npm run build
   ```

The `dist` folder will contain the production-ready static files.
