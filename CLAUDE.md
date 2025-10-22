# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Creative Journey is a static marketing website built with Astro, showcasing apps (currently Archetypia), AI solutions, and consulting services. The site is hosted on GitHub Pages with Cloudflare handling DNS/CDN, and uses Formspree for contact form submissions.

## Development Commands

```bash
# Start development server (runs on http://localhost:4321)
npm run dev

# Build for production (outputs to ./dist)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **Astro 5.x** - Static site generator with component-based architecture
- **Tailwind CSS 3.x** - Utility-first styling with custom theme extensions
- **Alpine.js** - Minimal JavaScript for interactive components (available but not heavily used)
- **Formspree** - Third-party contact form handling

### Directory Structure

```
src/
├── layouts/
│   └── BaseLayout.astro         # Main layout wrapper with meta tags, scripts
├── pages/
│   ├── index.astro              # Homepage (composes Hero, Services, Contact, Footer)
│   └── products/
│       └── archetypia/
│           ├── index.astro      # Product landing page
│           ├── privacy.astro    # Privacy policy
│           └── support.astro    # Support/FAQ page
├── components/
│   ├── Hero.astro              # Landing page hero section
│   ├── Services.astro          # Services section with cards
│   ├── ServiceCard.astro       # Individual service card component
│   ├── Contact.astro           # Contact form section
│   └── Footer.astro            # Site footer with navigation
├── scripts/
│   ├── animations.js           # Scroll animations and smooth scrolling
│   └── contact-form.js         # Form validation and Formspree integration
└── styles/
    └── global.css              # Global styles and Tailwind imports
```

### Key Design Patterns

**Component Composition**: The homepage (index.astro) is composed of section components (Hero, Services, Contact, Footer) wrapped in BaseLayout. Product pages follow a similar pattern but have inline sections rather than separate components.

**Animation System**: Client-side animations are initialized in BaseLayout.astro via script imports. The animations.js module provides scroll-triggered fade-ins and smooth scrolling.

**Styling Approach**: Custom Tailwind theme defined in tailwind.config.mjs with brand colors:
- `primary-blue`: #1e40af
- `primary-purple`: #7c3aed
- `accent-cyan`: #06b6d4
- `gradient-primary`: blue-to-purple gradient used in hero sections

### Deployment

**Automated via GitHub Actions**: .github/workflows/deploy.yml triggers on push to main, builds the site with `npm run build`, and deploys ./dist to GitHub Pages.

**Site Configuration**: astro.config.mjs configures the site URL as https://creativejourney.com with base path `/` (custom domain, not GitHub subdirectory).

**Contact Form**: Uses Formspree endpoint in src/scripts/contact-form.js (line 17). Endpoint ID is environment-specific.

## Product Pages

Product pages (e.g., /products/archetypia) are standalone landing pages with their own navigation and footer links. They are NOT linked from the main navigation - they serve as App Store submission requirements or direct-access pages.

Current product: **Archetypia** - iPhone app for AI-powered Jungian dream analysis with subscription model ($3.99/month, $39.99/year).

## Important Notes

- This is a **static site** - no server-side rendering, no API routes in the Astro codebase
- External dependencies: Formspree (contact forms), Cloudflare (CDN/DNS)
- The site uses custom domain configuration, not GitHub Pages subdirectory deployment
- Product pages are intentionally isolated from main site navigation
