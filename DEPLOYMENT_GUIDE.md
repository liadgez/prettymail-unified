# PrettyMail Unified - Deployment Guide

## 🎯 Pre-Deployment Checklist

### ✅ Code Quality
- [x] All TypeScript errors resolved
- [x] Production build completes successfully (`npm run build`)
- [x] No console errors in development
- [x] All components render correctly
- [x] Responsive design works on mobile/tablet/desktop

### ✅ Environment Setup
- [x] `.env.local.example` created with all required variables
- [x] `.gitignore` configured properly
- [x] `vercel.json` configuration added
- [x] README.md documentation complete

### 🔄 Required for Production
- [ ] Google Cloud Console project setup
- [ ] Google OAuth credentials obtained
- [ ] Gmail API enabled
- [ ] Production environment variables configured

## 🚀 Deployment Steps

### 1. Google Cloud Console Setup

1. **Create/Select Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Name: "PrettyMail Production"

2. **Enable APIs**:
   ```
   - Gmail API
   - Google OAuth 2.0 API
   ```

3. **Create OAuth Credentials**:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "PrettyMail Web Client"
   - Authorized redirect URIs:
     - `http://localhost:8080` (development)
     - `https://your-vercel-app.vercel.app` (production)

4. **Get Credentials**:
   - Copy Client ID and Client Secret
   - These will be used in environment variables

### 2. Vercel Deployment

#### Option A: Deploy via Vercel Dashboard

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Import Project"
   - Connect your GitHub repository
   - Select the `prettymail-unified` directory

2. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**:
   ```
   VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
   VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Get your deployment URL

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   cd /path/to/prettymail-unified
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add VITE_GOOGLE_CLIENT_ID
   vercel env add VITE_GOOGLE_CLIENT_SECRET
   ```

### 3. Post-Deployment

1. **Update OAuth Settings**:
   - Add your Vercel URL to Google Cloud Console redirect URIs
   - Example: `https://prettymail-unified.vercel.app`

2. **Test Production Build**:
   - Visit your deployed URL
   - Test Google OAuth login
   - Test email composition features
   - Verify Gmail integration works

3. **Monitor & Debug**:
   - Check Vercel Function logs
   - Monitor browser console for errors
   - Test on different devices/browsers

## 🔧 Environment Variables Reference

### Required Variables
```env
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=xxx
```

### Optional Variables
```env
VITE_API_BASE_URL=https://www.googleapis.com
VITE_GMAIL_API_VERSION=v1
VITE_ENV=production
VITE_DEBUG=false
```

## 🎉 Success Criteria

Your deployment is successful when:

- [ ] App loads without errors at production URL
- [ ] Google OAuth login works correctly
- [ ] Gmail integration functions properly
- [ ] UI is responsive and beautiful
- [ ] No console errors or warnings
- [ ] Performance is acceptable (< 3s load time)

## 🐛 Common Issues & Solutions

### Issue: OAuth Redirect Mismatch
**Solution**: Ensure Vercel URL is added to Google Cloud Console redirect URIs

### Issue: Environment Variables Not Loading
**Solution**: Prefix all variables with `VITE_` and redeploy

### Issue: Build Fails on Vercel
**Solution**: Check build logs, ensure all dependencies are in `package.json`

### Issue: Gmail API 403 Errors
**Solution**: Verify Gmail API is enabled in Google Cloud Console

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify Google Cloud Console configuration
3. Test locally with production environment variables
4. Review browser console for errors

---

**Ready to deploy?** Follow the steps above and launch your PrettyMail MVP! 🚀
