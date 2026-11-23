# Pavanateja — Personal AI Lab Portfolio

> *"I build things that think. And things that make me think."*

A fast, accessible, 100% static personal portfolio built with **React + TypeScript + Vite + Tailwind CSS**, designed for **$0 free hosting** on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## Features

- **Hero & Portrait**: Asymmetric editorial layout anchored by the original monochrome portrait (`/public/images/pavanateja-portrait.png`) and an interactive `curiosity.exe --status` micro-terminal.
- **About / Whoami**: Personal narrative paired with a single concise verified `profile.json` metadata panel.
- **Builds / Projects**: Filterable showcase of verified repositories (`EcoAction AI`, `Parkinson's Disease ML Research`, `AI Neuro MRI & Leaf Buddy`, `IRCTC Voice Assistant & LectaVoice`, `ForecastIQ`, `Daily Job Aggregator Agent`, `R Statistical ML Suite`, and `VitalMind AI`) with full 9-part Case Study modals.
- **Arsenal**: Categorized technical skills without percentage bars; interactive tool inspection with direct jumps to related project case studies.
- **Journey.log**: Expandable chronological timeline of verified internships with direct repository links and one-click certificate previews.
- **Certificate Vault**: Live GitHub API enumeration (`Pavanateja2007-aiml/VemuriPavanateja2007` + `Pavanateja2007-aiml/Certifications`) with `sessionStorage` caching and automatic fallback to a curated local manifest. Includes uncropped thumbnails, zoomable Lightbox (`100%–200%`), keyboard navigation, and a filterable index of all 47 course PDFs.
- **Photography (`Outside the algorithm.`)**: Aspect-ratio-preserving masonry gallery of all 25 original photographs from `Certifications/Interests/Photo Graphs`, filterable by folder series (`Nature`, `City`, `Arunachalam`, `Tirupathi`) with a full-screen keyboard-accessible viewer.
- **Achievements & `currently.exe`**: Factual milestones alongside an easily editable status queue (`LEARNING`, `EXPLORING`, `EXPERIMENTING`, `BUILDING`, `IMPROVING`).
- **Connect & Footer**: Direct email copy, `mailto:`, verified GitHub/LinkedIn links, and an accessible contact form that works with zero backend (or optionally connects to a free Formspree/Web3Forms endpoint).

## Local Development

```bash
npm install
npm run dev
```

Build the production static bundle (`dist/`):

```bash
npm run build
npm run preview
```

## Deploy for Free ($0)

Because the app compiles to pure static HTML/JS/CSS in `dist/`, it requires **no paid server or database**:

### Option 1: Vercel (Recommended — 1 minute)
1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep the default Vite settings (`Build Command: npm run build`, `Output Directory: dist`). `vercel.json` is already included.
4. Click **Deploy**.

### Option 2: Netlify
1. Push to GitHub and open [app.netlify.com](https://app.netlify.com).
2. Select **Add new site → Import an existing project**.
3. Set Build Command to `npm run build` and Publish Directory to `dist`.

### Option 3: Cloudflare Pages
1. Connect your GitHub repo in Cloudflare Pages.
2. Choose the **Vite** framework preset (`npm run build`, output `dist`).

### Option 4: GitHub Pages
1. In `vite.config.ts`, set `base: '/<your-repo-name>/'` if deploying under a subpath (leave default `'/'` for `<username>.github.io`).
2. Deploy `dist/` using the official `actions/deploy-pages` workflow.

## Asset & Content Maintenance

All content is cleanly separated into data files under `src/data/`:

- **Hero Portrait**: `/public/images/pavanateja-portrait.png` (replace this file to update the hero image without touching code).
- **Bio, Achievements & `currently.exe`**: `src/data/profile.ts`
- **Projects & Case Studies**: `src/data/projects.ts`
- **Skills / Arsenal**: `src/data/skills.ts`
- **Experience / Journey.log**: `src/data/experience.ts`
- **Certificate & Photography Fallback Manifests**: `src/data/manifests.ts`

### GitHub API & Fallback Strategy (`src/lib/githubAssets.ts`)
- On load, the client queries GitHub's public recursive Git Trees API (`/git/trees/main?recursive=1`) and caches results in `sessionStorage` for 15 minutes so normal browsing stays well under GitHub's 60 req/hr unauthenticated limit.
- Whenever you push new images to `Certifications/Interests/Photo Graphs` or `Certifications/Professional Certificates`, they appear automatically.
- If a visitor is offline or hits a GitHub API rate limit, the loader falls back seamlessly to the curated manifest in `src/data/manifests.ts` with a quiet status note.

### Optional Free Contact Form Delivery
By default, submitting the contact form opens the visitor's email client with a pre-filled draft (plus a one-click Copy Draft button). To enable direct in-page delivery for free:
1. Create a free form endpoint on [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Add `VITE_CONTACT_FORM_ENDPOINT="https://formspree.io/f/your-id"` to your hosting provider's environment variables and redeploy.
