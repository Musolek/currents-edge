# Deployment Guide

## Quick Start

Your microsite is ready to deploy! Here are the most popular options:

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy" - that's it!

### Option 2: Netlify

1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com) and sign in
3. Drag and drop the `dist` folder to Netlify's deploy area
4. Your site is live!

For continuous deployment:
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Option 3: GitHub Pages

1. Install the gh-pages package: `npm install -D gh-pages`
2. Add this script to package.json:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

### Option 4: Static File Hosting

Build the project and upload the `dist` folder to any web hosting service:

```bash
npm run build
```

Then upload everything in the `dist` folder to your web host.

## Custom Domain

After deployment, you can add a custom domain through your hosting provider's dashboard.

## Environment Variables

If you need environment variables (for analytics, etc.), create a `.env` file:

```
VITE_ANALYTICS_ID=your_id_here
VITE_CONTACT_EMAIL=your_email_here
```

Access them in your code with `import.meta.env.VITE_ANALYTICS_ID`.

## Performance Tips

- Your site is already optimized with Vite's build process
- Images should be added to the `public` folder
- The site includes proper meta tags for SEO and social sharing
- All animations are GPU-accelerated with Framer Motion

## Monitoring

Consider adding:
- Google Analytics (add to index.html)
- Performance monitoring (Vercel Analytics, etc.)
- Error tracking (Sentry, etc.)