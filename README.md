# EcoQuest

A gamified environmental education platform for schools and colleges, built for Smart India Hackathon 2025 (Problem Statement ID: SIH25009).

Students learn about the environment by playing: they complete real-life eco challenges, take quizzes, sort waste in a mini-game, earn points and badges, and compete on a class leaderboard.

This repository contains the **frontend prototype**. It runs entirely in the browser with no backend.

## Features

- **Login (demo):** enter any name or continue as a guest. There is no password and no server.
- **Home dashboard:** level (Seed, Sapling, Tree, Forest), eco points, day streak, progress bar, and badges.
- **Daily eco challenge:** "Go plastic-free for one day". Students confirm a five-point checklist and can add a photo as proof for bonus points.
- **Eco quests:** real-life tasks such as planting a sapling or switching off unused lights, each worth points.
- **Quiz zone:** five environment questions with instant feedback. Points are awarded for beating your best score.
- **Sort the waste game:** classify items into wet, dry, or recyclable bins.
- **Leaderboard and badges:** class ranking with medals, and badges that unlock as you progress.
- **Light and dark theme:** toggle button on the login screen and in the header. The choice is saved.

## How the challenge is verified

No app can fully prove that someone stayed plastic-free for a day, so EcoQuest uses layered trust. Higher-trust proof earns more points, which makes false claims less rewarding.

| Level | Method | Points |
| --- | --- | --- |
| 1 | Self-declared checklist | 10 |
| 2 | Checklist plus photo proof | 25 |
| 3 | Teacher or peer approval (planned) | Highest |

A streak counter rewards consistency. The goal is to encourage behaviour change, not to police students.

## Tech stack

- HTML, CSS, and vanilla JavaScript. No framework and no build step.
- Progress is stored in the browser with `localStorage`.
- Fonts: Baloo 2 and Nunito from Google Fonts.

## Project structure

```
index.html   Page structure, links the CSS and JS
style.css    All styling: colors, spacing, themes, background
script.js    All logic: login, challenge, quiz, game, leaderboard, theme
```

## How to run

1. Put `index.html`, `style.css`, and `script.js` in the same folder. Keep the file names unchanged.
2. Open `index.html` in any modern browser.

An internet connection is only needed to load the fonts. Without it, the app falls back to system fonts.

To host it online, upload the three files to GitHub Pages or Netlify.

## Customising

- **Quiz questions:** edit the `QZ` array in `script.js`. Each entry is `[question, [options], correctIndex]`.
- **Waste game items:** edit the `IT` array in `script.js`. Each entry is `[name, bin, emoji]`, where bin is `w` (wet), `d` (dry), or `r` (recyclable).
- **Eco quests:** edit the `QS` array in `script.js`.
- **Colors and spacing:** change the CSS variables at the top of `style.css`.

## Current limitations

- The login is a demo. Anyone can enter any name, and data stays on that device only.
- Leaderboard names other than your own are sample data.
- Photo verification is simulated. The photo is previewed but not uploaded or analysed.
- There is no teacher view yet.
- Clearing browser data resets all progress.

## Future scope

- Real authentication and a backend database for multi-user classes.
- Teacher dashboard to approve challenges and track class progress.
- AI-based photo checking for plastic-free proof.
- Drag-and-drop for the waste sorting game.
- School-level and city-level leaderboards, plus regional language support.
- Impact tracking, such as estimated plastic, water, and CO2 saved.

## Team

- Team name: _add here_
- Members: _add here_
- College: _add here_
