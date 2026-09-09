# PokéAtlas Deployment Guide

## Quick Deploy to Vercel (Recommended)

### 1. Connect GitHub to Vercel
- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "New Project"
- Select your `PokeAtlas` repository
- Click "Import"

### 2. Configure Build Settings
Vercel should auto-detect these settings:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Deploy
- Click "Deploy"
- Wait for the build to complete
- Your site will be live at `https://your-project-name.vercel.app`

---

## Deploy to Netlify

### 1. Connect GitHub to Netlify
- Go to [netlify.com](https://netlify.com)
- Click "New site from Git"
- Choose GitHub and authorize
- Select your `PokeAtlas` repository

### 2. Configure Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** (leave blank)

### 3. Deploy
- Click "Deploy site"
- Your site will be live at `https://your-site-name.netlify.app`

---

## Deploy to GitHub Pages

### 1. Update `vite.config.ts`
Add the base path to your config:

```typescript
export default defineConfig({
  base: '/PokeAtlas/',
  // ... rest of config
})
```

### 2. Create GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3. Enable GitHub Pages
- Go to your repository Settings
- Scroll to "Pages"
- Set source to `gh-pages` branch
- Your site will be live at `https://SumitNagesia123.github.io/PokeAtlas/`

---

## Deploy Locally (Docker)

### 1. Create `Dockerfile`
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=0 /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### 2. Build & Run
```bash
docker build -t pokeatlas .
docker run -p 3000:3000 pokeatlas
```

---

## Environment Variables (if needed in future)

Create a `.env` file:
```
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

Access in code:
```typescript
const apiBase = import.meta.env.VITE_API_BASE_URL
```

---

## Performance Tips

### 1. Enable Compression
Most hosting platforms compress assets automatically. Verify:
```bash
npm install -D compression-webpack-plugin
```

### 2. Use CDN
Vercel and Netlify automatically use CDNs. No additional config needed.

### 3. Monitor Bundle Size
```bash
npm install -D vite-plugin-visualizer
```

---

## Monitoring & Logs

### Vercel
- Dashboard shows deployment logs
- Real-time analytics under "Analytics" tab

### Netlify
- Build logs under "Deploys"
- Real-time analytics under "Analytics"

### GitHub Pages
- Deployment logs under "Actions" tab

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally
rm -rf node_modules dist
npm install
npm run build
```

### 404 on Refresh (GitHub Pages only)
Add `_redirects` file to `public/`:
```
/* /index.html 200
```

### API Errors in Production
- Check CORS headers from PokéAPI
- Verify API endpoints are reachable
- Use browser DevTools → Network tab

---

## Next Steps

1. ✅ Push code to GitHub
2. 🚀 Deploy to Vercel/Netlify (recommended)
3. 📊 Monitor performance with Vercel/Netlify analytics
4. 🎯 Share your live site!

**Enjoy your deployed PokéAtlas! 🎮**
