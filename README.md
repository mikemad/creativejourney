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
