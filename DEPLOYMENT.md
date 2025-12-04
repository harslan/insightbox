# Deployment Guide for GitHub Pages

## Quick Setup

1. **Create a GitHub repository** named `insightbox` (or update the base path in `vite.config.ts`)

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/insightbox.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on push to `main`

4. **Update base path** (if your repo name is different):
   - Edit `vite.config.ts`
   - Change `base: '/insightbox/'` to `base: '/YOUR_REPO_NAME/'`

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The dist folder contains the built files
# You can deploy this folder to any static hosting service
```

## Testing Locally

To test the production build locally:

```bash
npm run build
npm run preview
```

## Troubleshooting

- **404 errors**: Make sure the `base` path in `vite.config.ts` matches your repository name
- **Build fails**: Check Node.js version (requires 18+)
- **Assets not loading**: Verify the base path is correct and includes trailing slash
