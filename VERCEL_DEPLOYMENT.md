# Deploy InsightBox to Vercel (Free)

Vercel is the easiest way to deploy your React/Vite app. It's completely free for personal projects and takes just a few minutes to set up.

## Quick Deployment Steps

### 1. Sign Up for Vercel
- Go to [vercel.com](https://vercel.com)
- Click "Sign Up" and choose "Continue with GitHub"
- Authorize Vercel to access your GitHub account

### 2. Import Your Repository
- Click "Add New..." → "Project"
- Find and select `harslan/insightbox` repository
- Click "Import"

### 3. Configure Project Settings
Vercel will auto-detect your Vite setup, but verify these settings:

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 4. Deploy
- Click "Deploy"
- Wait 1-2 minutes for the build to complete
- Your app will be live! 🎉

## Your App URL

After deployment, Vercel will provide you with:
- **Production URL**: `https://insightbox-xxxxx.vercel.app` (or your custom domain)
- **Preview URLs**: Automatically created for every branch and pull request

## Automatic Deployments

- ✅ Every push to `main` branch = Automatic production deployment
- ✅ Every pull request = Preview deployment
- ✅ Zero configuration needed after initial setup

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `insightbox.yourdomain.com`)
4. Follow DNS configuration instructions
5. Vercel automatically handles SSL certificates

## Benefits of Vercel

- 🚀 **Fast**: Global CDN for instant loading worldwide
- 🔒 **Secure**: Automatic HTTPS/SSL certificates
- 📊 **Analytics**: Built-in performance analytics
- 🔄 **CI/CD**: Automatic deployments on every push
- 💰 **Free**: Generous free tier for personal projects
- 🎯 **Easy**: Zero configuration needed

## Troubleshooting

If you encounter any issues:

1. **Build fails**: Check the build logs in Vercel dashboard
2. **404 errors**: Ensure `vercel.json` is in your repository
3. **Assets not loading**: Verify `vite.config.ts` base path is correct

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: Available in the dashboard

---

**That's it!** Your app will be live in minutes with Vercel. Much easier than GitHub Pages! 🎉

