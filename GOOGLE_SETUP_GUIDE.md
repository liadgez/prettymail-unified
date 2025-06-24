# Google OAuth Setup Guide for PrettyMail

## 🚧 **Current Status: Deployment Resolution in Progress**

We are currently resolving Vercel deployment issues. Once deployment is successful, follow these steps to enable Google OAuth.

## 📋 **Prerequisites**
- [ ] Successful Vercel deployment (in progress)
- [ ] Google Cloud Console access
- [ ] Domain/URL for OAuth redirect

## 🔧 **Step 1: Google Cloud Setup**

### Create a New Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "PrettyMail MVP" or similar

### Enable Gmail API
1. Navigate to **APIs & Services > Library**
2. Search for "Gmail API"
3. Click **Enable**

### Configure OAuth Consent Screen
1. Go to **APIs & Services > OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - App name: `PrettyMail`
   - User support email: Your email
   - Developer contact: Your email
4. Add scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`

### Create OAuth Credentials
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client IDs**
3. Application type: **Web application**
4. Name: `PrettyMail Web Client`
5. Authorized JavaScript origins:
   - `https://your-deployment-url.vercel.app`
   - `http://localhost:8080` (for development)
6. Authorized redirect URIs:
   - `https://your-deployment-url.vercel.app`
   - `http://localhost:8080` (for development)

## ⚙️ **Step 2: Vercel Environment Variables**

Once you have the OAuth credentials:

```bash
# Add to Vercel environment variables
vercel env add VITE_GOOGLE_CLIENT_ID production
# Paste your Google Client ID

vercel env add VITE_GOOGLE_CLIENT_SECRET production  
# Paste your Google Client Secret (if needed)
```

## 🧪 **Step 3: Test Integration**

1. Deploy with environment variables
2. Visit your deployed app
3. Click "Sign in with Google"
4. Verify OAuth flow works
5. Test Gmail integration features

## 🔧 **Development Setup**

For local development:

```bash
# Create .env.local (never commit this file)
echo "VITE_GOOGLE_CLIENT_ID=your_client_id_here" >> .env.local
```

## 📚 **API Documentation**

- [Gmail API Reference](https://developers.google.com/gmail/api)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)

---

**⚡ Note:** This guide will be updated once deployment issues are resolved and we have a stable URL for OAuth configuration.