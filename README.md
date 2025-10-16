# 🚀 Abish R – Professional Portfolio (GSAP + Vanilla JS)

Modern, responsive portfolio with polished animations, clean UI, and a working contact form (Google Apps Script). Built with semantic HTML, CSS custom properties, and GSAP.

## ✨ What’s Included

- **Sections**: `Hero`, `About`, `Projects`, `Experience`, `Skills`, `Contact`, `Footer`
- **Animations (GSAP)**: load-in transitions, scroll-triggered reveals, parallax, button ripple/click effects
- **Design**: gradients, glassmorphism, cards, icons (Font Awesome), Inter font
- **Responsive**: mobile viewport, touch-friendly, fixed-navbar offsets, mobile-safe backgrounds
- **Contact Form**: validation, loading state, success modal, optional Google Apps Script email delivery

## 🛠 Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- GSAP 3 (ScrollTrigger, ScrollTo, TextPlugin) via CDN
- Google Fonts (Inter), Font Awesome via CDN

## 📂 Structure

```
portfolio/
├─ index.html          # Markup and sections
├─ styles.css          # Design system, layout, responsive rules
├─ script.js           # GSAP animations and interactions
├─ image/Abish.jpg     # Profile image
├─ README.md           # This file
└─ package.json        # Dev scripts (serve, build, deploy)
```

## ▶️ Run Locally

Using Node (recommended):
```bash
npm install
npm run start           # serve on http://localhost:8000
# or
npm run dev             # live-reload on http://localhost:8000/index.html
```

Or open `index.html` directly in a modern browser.

## 🔧 Build, Audit, Deploy

From `package.json`:
- `npm run build` – minify CSS/JS into `dist/` and optimize images
- `npm run lighthouse` – generate Lighthouse report
- `npm run deploy` – build then deploy to Vercel (adjust as needed)
- `npm run lint` / `npm run format` – ESLint and Prettier

Note: the image optimization script expects `images/*`; this project uses `image/` for the profile photo.

## ✍️ Content to Update

- `index.html`
  - Name, role, about text, projects and their stacks
  - Contact info (email/phone/links)
- `styles.css`
  - Custom properties under `:root` for colors, spacing, typography
- `script.js`
  - Animations (durations/easing), and contact form email config

## 📱 Responsive Details

- Viewport meta added: `width=device-width, initial-scale=1, viewport-fit=cover`
- Images default to `max-width: 100%` and `height: auto`
- Fixed navbar spacing handled via `.main-content` top padding
- On small screens, hero background uses `background-attachment: scroll` to avoid mobile jank

## 📧 Contact Form Email (Google Apps Script)

Real email delivery is supported via Google Apps Script. See `GOOGLE_APPS_SCRIPT_SETUP.md`.

In `script.js`, update the config:
```javascript
this.appsScriptConfig = {
    webAppUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    enabled: true
};
```
Notes:
- The project currently has a sample `webAppUrl` enabled; replace it with your own.
- Requests use `GET` with `mode: 'no-cors'`; CORS warnings can be ignored (emails still send).

## 🔒 Accessibility & Performance

- Respects `prefers-reduced-motion`
- Keyboard focus enhancements and focus scaling
- Parallax and heavy effects reduced on mobile

## ✅ Browser Support

Modern Chromium, Firefox, Safari, and Edge. Mobile Safari/Chrome supported.

## 📄 License

MIT

## 👤 Author

Abish R – Full Stack Developer (React, Node.js, .NET)

