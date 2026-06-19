# Mohamed Bayan Kmainasi — Academic Portfolio

Personal academic portfolio website for **Mohamed Bayan Kmainasi**, Research Assistant in
NLP & Multimodal AI at the Qatar Computing Research Institute (QCRI).

🌐 **Live site:** https://mohamedbayan.github.io

## Stack

Plain, dependency-free static site — **HTML + CSS + JavaScript**. No build step, no frameworks.

```
.
├── index.html              # Single-page site (About, Research, Publications, Projects, Contact)
├── assets/
│   ├── css/style.css       # Styles, light/dark theme, responsive layout
│   ├── js/main.js          # Theme toggle, mobile nav, footer year
│   └── img/profile.jpg     # Profile photo
├── Academic_CV.pdf         # CV (linked from the "Download CV" button)
├── .nojekyll               # Disable Jekyll processing on GitHub Pages
└── .github/workflows/deploy.yml   # Auto-deploy on push to main
```

## Features

- Clean, modern academic design with light/dark mode (remembers your choice)
- Fully mobile-responsive
- Sections: About, Research Interests, Publications, Projects, Contact
- CV download button
- Auto-deploy to GitHub Pages via GitHub Actions

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the site to GitHub Pages.

**One-time setup:** In the repository, go to **Settings → Pages → Build and deployment**
and set **Source** to **GitHub Actions**.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing content

- Text, publications, and links live in `index.html`.
- Colors and layout live in `assets/css/style.css` (CSS variables at the top).
- Replace `Academic_CV.pdf` to update the downloadable CV.
- Replace `assets/img/profile.jpg` to update the photo.
