# 🚀 Deployment Guide

## GitHub Setup Commands

After creating your GitHub repository, run these commands:

```bash
# Add your GitHub repository (replace YOURUSERNAME with your actual username)
git remote add origin https://github.com/YOURUSERNAME/modern-portfolio.git

# Push to GitHub
git push -u origin main
```

## Vercel Deployment Steps

### Method 1: Vercel CLI (Recommended)
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `modern-portfolio` (or your preferred name)
   - Directory? `.` (current directory)

### Method 2: Vercel Website
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure settings:
   - Framework Preset: `Other`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: (leave empty)
6. Click "Deploy"

## Environment Variables (if needed)
If you add any environment variables later, you can set them in:
- Vercel Dashboard > Project > Settings > Environment Variables

## Custom Domain (Optional)
To add a custom domain:
1. Go to Vercel Dashboard > Project > Settings > Domains
2. Add your domain
3. Configure DNS settings as instructed

## Automatic Deployments
Once connected to GitHub, Vercel will automatically deploy:
- Every push to the main branch
- Pull request previews

## 📝 Post-Deployment Checklist
- [ ] Test the live website
- [ ] Update README.md with live URL
- [ ] Test all project links
- [ ] Verify responsive design on different devices
- [ ] Check loading performance
- [ ] Update social media links

Your portfolio will be available at: `https://your-project-name.vercel.app`
