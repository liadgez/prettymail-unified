# 🔧 OAuth Troubleshooting Guide

## ❌ **Current Error**
```
Access blocked: Authorization Error
admin@terrific.co.il  
The OAuth client was not found.
Error 401: invalid_client
```

## 🎯 **Root Cause**
The Google Client ID is set in Vercel but **NOT properly configured in Google Cloud Console**.

## 🔧 **Step-by-Step Fix**

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with admin@terrific.co.il
3. Create a new project or select existing one

### Step 2: Enable Required APIs
1. Go to **APIs & Services > Library**
2. Search and enable:
   - **Gmail API**
   - **Google+ API** (for user info)
   - **People API** (for profile data)

### Step 3: Configure OAuth Consent Screen
1. Go to **APIs & Services > OAuth consent screen**
2. Choose **External** user type
3. Fill in **REQUIRED** fields:
   - **App name:** `PrettyMail`
   - **User support email:** `admin@terrific.co.il`
   - **Developer contact:** `admin@terrific.co.il`
   - **App domain:** `https://prettymail-7w61n9ccp-liad-gezs-projects.vercel.app`

4. **Add Scopes** (click "ADD OR REMOVE SCOPES"):
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`

### Step 4: Create OAuth 2.0 Credentials
1. Go to **APIs & Services > Credentials**
2. Click **+ CREATE CREDENTIALS > OAuth 2.0 Client IDs**
3. **Application type:** Web application
4. **Name:** `PrettyMail Web Client`

5. **Authorized JavaScript origins:**
   ```
   https://prettymail-7w61n9ccp-liad-gezs-projects.vercel.app
   http://localhost:8080
   ```

6. **Authorized redirect URIs:**
   ```
   https://prettymail-7w61n9ccp-liad-gezs-projects.vercel.app
   http://localhost:8080
   ```

7. **SAVE** - You'll get a Client ID and Client Secret

### Step 5: Update Vercel Environment Variables
```bash
# Remove old client ID
vercel env rm VITE_GOOGLE_CLIENT_ID

# Add the NEW client ID from Google Cloud Console
vercel env add VITE_GOOGLE_CLIENT_ID production
# Paste the NEW client ID when prompted

# Redeploy
vercel --prod
```

## ⚠️ **Common Issues**

### Issue 1: Wrong Domain
- **Error:** `redirect_uri_mismatch`
- **Fix:** Ensure URL in Google Cloud exactly matches: `https://prettymail-7w61n9ccp-liad-gezs-projects.vercel.app`

### Issue 2: Missing APIs
- **Error:** `invalid_client`
- **Fix:** Enable Gmail API, Google+ API, and People API

### Issue 3: Consent Screen Not Published
- **Error:** `access_blocked`
- **Fix:** Save and potentially publish the OAuth consent screen

## 🧪 **Test After Setup**
1. Deploy with new credentials
2. Visit: https://prettymail-7w61n9ccp-liad-gezs-projects.vercel.app
3. Click "Sign in with Google"
4. Should redirect to Google OAuth flow

## 📞 **Need Help?**
If you're still getting errors, share:
1. The exact error message
2. Your Google Cloud Console project URL
3. The Client ID you're using

---

**🎯 The key is creating the OAuth credentials in Google Cloud Console with the exact URL!**
