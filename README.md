# Timora — Aesthetic Pomodoro Timer & Worldwide Clock with Ambient Study Player

A beautifully crafted, browser-based focus workspace — no sign-up, no server, no data ever leaves your device.

🌐 **Live Demo**: [vidhyawalke.github.io/Pomodoro-Timer](https://vidhyawalke.github.io/Pomodoro-Timer/)

---

## What the Project Does

Staying focused while studying or working across different time zones often means juggling scattered notes, multiple browser tabs, and separate timer apps, which are hard to keep up with over time.

The goal was to build a simple web application where a person can track international time zones, run customizable Pomodoro focus intervals, manage daily tasks, and play ambient study music without relying on any external service or account.

The app was built using HTML5, CSS3, and JavaScript. It lets users monitor worldwide clocks with live weather, set Pomodoro work and break sessions, check off daily checklist tasks, and choose ambient lofi music or custom wallpapers. All data is saved in the browser itself using local storage.

Users get a clear view of their time, maintain uninterrupted focus during study and work sprints, and track task progress effortlessly, all without sharing any data with a server.

---

## Why It Is Useful

1. No account or sign-up is required to use it.
2. Your data stays only in your browser and is never shared with anyone.
3. You can track time across multiple timezones with live world clocks.
4. You can set Pomodoro focus sessions with presets or custom durations.
5. You can manage your daily tasks right inside the same workspace.
6. The app works without an internet connection after the page has loaded.

---

## Getting Started

### Prerequisites

A modern web browser (Chrome, Firefox, Edge, or Safari). No Node.js or build tools are required.

### Installation

```bash
git clone https://github.com/vidhyawalke/Pomodoro-Timer.git
cd Pomodoro-Timer
```

Then open `index.html` directly in your browser — or serve it with any static file server.

---

## Features

**Worldwide Clock Strip** — Add up to 4 live world clocks for any city with real-time weather badges

**Pomodoro Focus Timer** — Work, Study, Read, Code, Short Break, Long Break, and fully Custom presets

**Task Board** — Add, check off, and delete daily tasks; progress is saved automatically in the browser

**Ambient Study Player** — Choose Chill Beats, Rain Sounds, Cozy Cafe, or Deep Synth; paste any YouTube link

**Custom Wallpaper** — Pick from 8 curated Unsplash scenes, paste an image URL, or upload your own

**Dark / Light Mode** — One-click toggle with preference saved across sessions

**Privacy-First** — 100% client-side; no backend, no account, no data sent anywhere

---

## Project Structure

```
Pomodoro-Timer/
├── index.html          ◆ App shell, all layout and modals
├── css/
│   └── style.css       ◆ Design system and all component styles
├── js/
│   └── script.js       ◆ Full application logic (clocks, timer, tasks, player)
└── assets/
    ├── Timora_Logo_landing.png   ◆ Brand logo used on landing and navbar
    ├── og-preview.png            ◆ OpenGraph social preview image
    └── manifest.json             ◆ Web app manifest
```

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Structure | HTML5 semantic markup               |
| Styling   | Vanilla CSS3 with custom properties |
| Logic     | Vanilla JavaScript (ES2020+)        |
| Fonts     | Google Fonts — Poppins & JetBrains Mono |
| Clocks    | Intl.DateTimeFormat API             |
| Weather   | Open-Meteo (free, no key needed)    |
| Storage   | Browser LocalStorage                |

---

## Getting Help

If you run into issues or have questions, open a [GitHub Issue](https://github.com/vidhyawalke/Pomodoro-Timer/issues) in this repository.

---

## Maintainer

Built and maintained by [Vidhya Walke](https://github.com/vidhyawalke).

Contributions, bug reports, and suggestions are welcome via pull request or issue.
