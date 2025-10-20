# Creative Journey Website Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Build a modern, professional static website for Creative Journey with bold blue gradients, showcasing services (apps, AI, consulting) and driving contact conversions.

**Architecture:** Astro static site with Tailwind CSS, single-page design with smooth scroll sections, deployed to GitHub Pages with Cloudflare DNS. Focus on performance, animations, and conversion optimization.

**Tech Stack:** Astro 4.x, Tailwind CSS 3.x, Alpine.js (lightweight interactions), GitHub Actions (deployment), Formspree (contact form)

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`

**Step 1: Initialize Node.js project**

Run: `npm init -y`
Expected: Creates package.json

**Step 2: Install Astro and dependencies**

Run:
```bash
npm install astro@latest
npm install -D tailwindcss@latest @astrojs/tailwind
npm install -D alpinejs @types/alpinejs
```

Expected: Dependencies installed, package-lock.json created

**Step 3: Create Astro config**

Create `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://creativejourney.com',
  base: '/',
});
```

**Step 4: Create Tailwind config**

Run: `npx tailwindcss init`

Then modify `tailwind.config.mjs`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1e40af',
        'primary-purple': '#7c3aed',
        'accent-cyan': '#06b6d4',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
      },
    },
  },
  plugins: [],
}
```

**Step 5: Create .gitignore**

Create `.gitignore`:
```
# Dependencies
node_modules/
package-lock.json

# Build output
dist/
.astro/

# Environment
.env
.env.*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

**Step 6: Update package.json scripts**

Modify `package.json` to add scripts:
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

**Step 7: Initialize git repository**

Run:
```bash
git init
git add .
git commit -m "feat: initialize Astro project with Tailwind"
```

Expected: Git repository initialized with initial commit

---

## Task 2: Basic Project Structure

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Hero.astro`
- Create: `public/favicon.svg`

**Step 1: Create base layout**

Create `src/layouts/BaseLayout.astro`:
```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Creative Journey - Apps, AI & Consulting",
  description = "Where software meets creativity. We build apps, implement AI solutions, and provide expert consulting."
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <title>{title}</title>
  </head>
  <body class="antialiased">
    <slot />
  </body>
</html>
```

**Step 2: Create basic Hero component**

Create `src/components/Hero.astro`:
```astro
---
// Hero component placeholder
---

<section id="hero" class="min-h-screen flex items-center justify-center bg-gradient-primary">
  <div class="container mx-auto px-6 text-center text-white">
    <h1 class="text-5xl md:text-7xl font-bold mb-6">
      Creative Journey
    </h1>
    <p class="text-xl md:text-2xl mb-8 text-blue-100">
      Where Software Meets Creativity
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#contact" class="px-8 py-4 bg-white text-primary-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">
        Start Your Project
      </a>
      <a href="#services" class="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-blue transition-colors">
        View Services
      </a>
    </div>
  </div>
</section>
```

**Step 3: Create index page**

Create `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout>
  <Hero />
</BaseLayout>
```

**Step 4: Create favicon**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="45" fill="url(#grad)" />
  <text x="50" y="65" font-size="50" font-weight="bold" fill="white" text-anchor="middle" font-family="sans-serif">CJ</text>
</svg>
```

**Step 5: Test dev server**

Run: `npm run dev`
Expected: Dev server starts on http://localhost:4321, shows hero section with gradient

**Step 6: Commit**

Run:
```bash
git add .
git commit -m "feat: add base layout and hero section"
```

---

## Task 3: Services Section Component

**Files:**
- Create: `src/components/Services.astro`
- Create: `src/components/ServiceCard.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create ServiceCard component**

Create `src/components/ServiceCard.astro`:
```astro
---
interface Props {
  icon: string;
  title: string;
  description: string;
}

const { icon, title, description } = Astro.props;
---

<div class="group relative bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
  <div class="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
  <div class="text-5xl mb-4">{icon}</div>
  <h3 class="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
  <p class="text-gray-600 leading-relaxed">{description}</p>
  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
</div>
```

**Step 2: Create Services component**

Create `src/components/Services.astro`:
```astro
---
import ServiceCard from './ServiceCard.astro';
---

<section id="services" class="py-24 bg-gray-50">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        What We Do
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        We bridge technical expertise with creative problem-solving to deliver exceptional results.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <ServiceCard
        icon="📱"
        title="App Development"
        description="Custom mobile and web applications built with modern technologies. From concept to deployment, we create intuitive experiences that users love."
      />
      <ServiceCard
        icon="🤖"
        title="AI Solutions"
        description="Intelligent systems that solve real problems. We implement cutting-edge AI and machine learning solutions tailored to your business needs."
      />
      <ServiceCard
        icon="💡"
        title="Consulting"
        description="Expert guidance for your technical challenges. Strategic planning, architecture reviews, and hands-on support to accelerate your projects."
      />
    </div>
  </div>
</section>
```

**Step 3: Add Services to index page**

Modify `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
---

<BaseLayout>
  <Hero />
  <Services />
</BaseLayout>
```

**Step 4: Test in browser**

Run: `npm run dev` (if not running)
Expected: Services section displays with three cards, hover effects work

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "feat: add services section with card components"
```

---

## Task 4: Contact Section with Form

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/scripts/contact-form.js`
- Modify: `src/pages/index.astro`

**Step 1: Create contact form script**

Create `src/scripts/contact-form.js`:
```javascript
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      // Using Formspree - replace with your form endpoint
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        showMessage('success', 'Thanks! We\'ll be in touch soon.');
      } else {
        showMessage('error', 'Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      showMessage('error', 'Oops! Something went wrong. Please try again.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

function showMessage(type, text) {
  const messageDiv = document.getElementById('form-message');
  messageDiv.textContent = text;
  messageDiv.className = type === 'success'
    ? 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg'
    : 'mt-4 p-4 bg-red-100 text-red-700 rounded-lg';
  messageDiv.classList.remove('hidden');

  setTimeout(() => {
    messageDiv.classList.add('hidden');
  }, 5000);
}
```

**Step 2: Create Contact component**

Create `src/components/Contact.astro`:
```astro
---
// Contact form component
---

<section id="contact" class="py-24 bg-gradient-primary">
  <div class="container mx-auto px-6 max-w-4xl">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
        Let's Start Your Journey
      </h2>
      <p class="text-xl text-blue-100">
        Have a project in mind? Let's talk about how we can help.
      </p>
    </div>

    <form id="contact-form" class="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label for="name" class="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div class="mb-6">
        <label for="project" class="block text-gray-700 font-semibold mb-2">Tell us about your project</label>
        <textarea
          id="project"
          name="project"
          required
          rows="6"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
          placeholder="What are you looking to build?"
        ></textarea>
      </div>

      <div class="mb-6">
        <label for="budget" class="block text-gray-700 font-semibold mb-2">Budget Range (Optional)</label>
        <select
          id="budget"
          name="budget"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          <option value="">Prefer not to say</option>
          <option value="under-5k">Under $5,000</option>
          <option value="5k-15k">$5,000 - $15,000</option>
          <option value="15k-50k">$15,000 - $50,000</option>
          <option value="50k-plus">$50,000+</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-gradient-primary text-white font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-opacity duration-200"
      >
        Start the Conversation
      </button>

      <div id="form-message" class="hidden mt-4"></div>
    </form>
  </div>
</section>

<script>
  import { initContactForm } from '../scripts/contact-form.js';
  initContactForm();
</script>
```

**Step 3: Add Contact to index page**

Modify `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Contact from '../components/Contact.astro';
---

<BaseLayout>
  <Hero />
  <Services />
  <Contact />
</BaseLayout>
```

**Step 4: Test form functionality**

Run: `npm run dev`
Expected: Contact form displays, validation works, submit shows "Sending..." state

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "feat: add contact form section with validation"
```

---

## Task 5: Footer Component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Footer component**

Create `src/components/Footer.astro`:
```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="bg-gray-900 text-gray-300 py-12">
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <p class="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Creative Journey
        </p>
        <p class="text-sm mt-2">Where software meets creativity</p>
      </div>

      <div class="flex gap-6">
        <a href="#hero" class="hover:text-white transition-colors">Home</a>
        <a href="#services" class="hover:text-white transition-colors">Services</a>
        <a href="#contact" class="hover:text-white transition-colors">Contact</a>
      </div>
    </div>

    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
      <p>&copy; {currentYear} Creative Journey. All rights reserved.</p>
    </div>
  </div>
</footer>
```

**Step 2: Add Footer to index page**

Modify `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <Hero />
  <Services />
  <Contact />
  <Footer />
</BaseLayout>
```

**Step 3: Test in browser**

Run: `npm run dev`
Expected: Footer displays at bottom with navigation links

**Step 4: Commit**

Run:
```bash
git add .
git commit -m "feat: add footer component with navigation"
```

---

## Task 6: Smooth Scroll and Animations

**Files:**
- Create: `src/scripts/animations.js`
- Create: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create global CSS with smooth scroll**

Create `src/styles/global.css`:
```css
html {
  scroll-behavior: smooth;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animated-gradient {
  background: linear-gradient(135deg, #1e40af, #7c3aed, #1e40af);
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.fade-in-up-delay-1 {
  opacity: 0;
  animation: fade-in-up 0.8s ease-out 0.2s forwards;
}

.fade-in-up-delay-2 {
  opacity: 0;
  animation: fade-in-up 0.8s ease-out 0.4s forwards;
}
```

**Step 2: Create animations script**

Create `src/scripts/animations.js`:
```javascript
export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections except hero
  document.querySelectorAll('section:not(#hero)').forEach(section => {
    observer.observe(section);
  });

  // Observe service cards individually
  document.querySelectorAll('.group').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

// Smooth scroll for anchor links
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
```

**Step 3: Update BaseLayout to include scripts and styles**

Modify `src/layouts/BaseLayout.astro`:
```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Creative Journey - Apps, AI & Consulting",
  description = "Where software meets creativity. We build apps, implement AI solutions, and provide expert consulting."
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <title>{title}</title>
  </head>
  <body class="antialiased">
    <slot />

    <script>
      import { initScrollAnimations, initSmoothScroll } from '../scripts/animations.js';

      document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initSmoothScroll();
      });
    </script>
  </body>
</html>
```

**Step 4: Update Hero component to use animated gradient**

Modify `src/components/Hero.astro`:
```astro
---
// Hero component with animations
---

<section id="hero" class="min-h-screen flex items-center justify-center animated-gradient">
  <div class="container mx-auto px-6 text-center text-white">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
      Creative Journey
    </h1>
    <p class="text-xl md:text-2xl mb-8 text-blue-100 fade-in-up-delay-1">
      Where Software Meets Creativity
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center fade-in-up-delay-2">
      <a href="#contact" class="px-8 py-4 bg-white text-primary-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">
        Start Your Project
      </a>
      <a href="#services" class="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-blue transition-colors">
        View Services
      </a>
    </div>
  </div>
</section>
```

**Step 5: Add Tailwind directives**

Note: If not already present, ensure Astro's Tailwind integration handles this automatically. No manual action needed if using @astrojs/tailwind.

**Step 6: Test animations**

Run: `npm run dev`
Expected:
- Hero gradient animates smoothly
- Sections fade in on scroll
- Anchor links scroll smoothly

**Step 7: Commit**

Run:
```bash
git add .
git commit -m "feat: add smooth scroll and fade-in animations"
```

---

## Task 7: GitHub Pages Deployment Setup

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Modify: `astro.config.mjs` (if needed for base path)

**Step 1: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Create README with setup instructions**

Create `README.md`:
```markdown
# Creative Journey Website

Modern, professional static website for Creative Journey - showcasing apps, AI solutions, and consulting services.

## Tech Stack

- **Astro 4.x** - Static site generator
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting
- **Cloudflare** - DNS and CDN

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### GitHub Pages Setup

1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Source: "GitHub Actions"
4. Push to main branch triggers automatic deployment

### Cloudflare DNS Setup

1. Log in to Cloudflare dashboard
2. Select your domain (creativejourney.com)
3. Go to DNS → Records
4. Add CNAME record:
   - Name: `@` (or `www`)
   - Target: `YOUR-USERNAME.github.io`
   - Proxy status: Proxied (orange cloud)
5. Go to SSL/TLS → Overview
   - Set SSL/TLS encryption mode to "Full"
6. Go to Speed → Optimization
   - Enable "Auto Minify" for JS, CSS, HTML
7. In GitHub repo settings → Pages:
   - Custom domain: `creativejourney.com`
   - Wait for DNS check to pass
   - Enable "Enforce HTTPS"

## Contact Form Setup

The contact form uses Formspree. To activate:

1. Sign up at https://formspree.io
2. Create a new form
3. Copy your form endpoint ID
4. Update `src/scripts/contact-form.js`:
   - Replace `YOUR_FORM_ID` with your actual form ID
5. Commit and deploy

## License

© 2025 Creative Journey. All rights reserved.
```

**Step 3: Verify astro.config.mjs for GitHub Pages**

Check `astro.config.mjs` - should already have:
```javascript
export default defineConfig({
  site: 'https://creativejourney.com',
  base: '/',
});
```

If deploying to `username.github.io/repo-name` instead, would need:
```javascript
base: '/repo-name/',
```

**Step 4: Test production build locally**

Run:
```bash
npm run build
npm run preview
```

Expected: Site builds successfully, preview shows production version

**Step 5: Commit deployment setup**

Run:
```bash
git add .
git commit -m "feat: add GitHub Pages deployment workflow and documentation"
```

---

## Task 8: Final Polish and Testing

**Files:**
- Modify: `src/components/Hero.astro` (add scroll indicator)
- Modify: `src/styles/global.css` (add scroll indicator animation)
- Create: `.nvmrc` (optional, for Node version)

**Step 1: Add scroll indicator to Hero**

Modify `src/components/Hero.astro` to add scroll indicator at bottom:
```astro
---
// Hero component with scroll indicator
---

<section id="hero" class="min-h-screen flex items-center justify-center animated-gradient relative">
  <div class="container mx-auto px-6 text-center text-white">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
      Creative Journey
    </h1>
    <p class="text-xl md:text-2xl mb-8 text-blue-100 fade-in-up-delay-1">
      Where Software Meets Creativity
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center fade-in-up-delay-2">
      <a href="#contact" class="px-8 py-4 bg-white text-primary-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">
        Start Your Project
      </a>
      <a href="#services" class="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-blue transition-colors">
        View Services
      </a>
    </div>
  </div>

  <a href="#services" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-75 hover:opacity-100 transition-opacity scroll-indicator">
    <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </a>
</section>
```

**Step 2: Add .nvmrc for Node version consistency**

Create `.nvmrc`:
```
20
```

**Step 3: Final build and verification**

Run:
```bash
npm run build
```

Expected: Build completes without errors

Run:
```bash
npm run preview
```

Expected:
- All sections render correctly
- Animations work smoothly
- Links scroll to correct sections
- Contact form shows validation
- Mobile responsive (test in browser dev tools)

**Step 4: Create final commit**

Run:
```bash
git add .
git commit -m "feat: add scroll indicator and final polish"
```

**Step 5: Tag release**

Run:
```bash
git tag -a v1.0.0 -m "Initial release - Creative Journey website"
```

---

## Deployment Checklist

After pushing to GitHub:

1. **GitHub Repository Setup:**
   - [ ] Create new repository on GitHub
   - [ ] Add remote: `git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git`
   - [ ] Push code: `git push -u origin main`
   - [ ] Push tags: `git push --tags`

2. **GitHub Pages Configuration:**
   - [ ] Go to Settings → Pages
   - [ ] Source: Select "GitHub Actions"
   - [ ] Wait for workflow to complete (Actions tab)
   - [ ] Verify site at `https://YOUR-USERNAME.github.io/REPO-NAME/`

3. **Formspree Setup:**
   - [ ] Sign up at formspree.io
   - [ ] Create new form
   - [ ] Update form ID in `src/scripts/contact-form.js`
   - [ ] Commit and push changes
   - [ ] Test form submission

4. **Cloudflare DNS:**
   - [ ] Add CNAME record pointing to `YOUR-USERNAME.github.io`
   - [ ] Set SSL/TLS mode to "Full"
   - [ ] Enable Auto Minify
   - [ ] Enable "Always Use HTTPS"
   - [ ] In GitHub: Settings → Pages → Custom domain: `creativejourney.com`
   - [ ] Wait for DNS propagation (5-30 minutes)
   - [ ] Enable "Enforce HTTPS" in GitHub

5. **Final Verification:**
   - [ ] Visit https://creativejourney.com
   - [ ] Test all navigation links
   - [ ] Test contact form submission
   - [ ] Test on mobile device
   - [ ] Check Lighthouse scores (target: 95+)

---

## Future Enhancements (Optional)

- Add testimonials section
- Add portfolio/work showcase with project cards
- Implement blog using Astro content collections
- Add dark mode toggle
- Integrate with Google Analytics
- Add more micro-interactions
- Add loading skeleton states
- Implement progressive image loading
