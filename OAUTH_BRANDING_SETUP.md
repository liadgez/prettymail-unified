<!--
NOTE: The production deployment URL is managed in deployment_config.json.
Update that file to change the deployment URL everywhere.
-->

# OAuth Consent Screen Branding Configuration

Based on your screenshot, here are the fields you need to complete for your PrettyMail OAuth consent screen:

## ✅ Already Configured
- **App name:** PrettyMail ✓
- **User support email:** admin@terrific.co.il ✓

## 📝 Required Fields to Complete

### 1. **App Logo** (Recommended)
- **What to do:** Upload a logo for PrettyMail
- **Requirements:** 
  - Image format: JPG, PNG, or BMP
  - Maximum size: 1MB
  - Dimensions: Square image, 120px by 120px for best results
- **Why:** Helps users recognize your app and builds trust

### 2. **Application Home Page** (Required)
- **What to enter:** `<DEPLOYMENT_URL>`
- **Purpose:** Provides users a link to your home page

### 3. **Application Privacy Policy Link** (Required)
- **What to enter:** `<DEPLOYMENT_URL>/privacy`
- **Purpose:** Required for OAuth consent screen

### 4. **Application Terms of Service Link** (Required)
- **What to enter:** `<DEPLOYMENT_URL>/terms`
- **Purpose:** Required for OAuth consent screen

### 5. **Authorized Domains** (Required)
- **What to add:** `prettymail-production.vercel.app`
- **Purpose:** Tells Google which domains are authorized to use this OAuth client

---

## 🚀 Quick Actions Needed

### Step 1: Fill in the Required URLs
```
Application home page: https://prettymail-production.vercel.app
Application privacy policy: https://prettymail-production.vercel.app/privacy
Application terms of service: https://prettymail-production.vercel.app/terms
```

### Step 2: Add Authorized Domain
```
Authorized domains: prettymail-production.vercel.app
```

### Step 3: Create Privacy Policy and Terms Pages
I can help you create these pages for your PrettyMail application.

### Step 4: Upload Logo (Optional but Recommended)
- Create or find a PrettyMail logo
- Upload it in the App logo section

---

## ⚠️ Important Notes

1. **Privacy Policy & Terms are REQUIRED** - Google won't approve your OAuth consent screen without them
2. **Authorized domains must match your app domain** - Use the exact domain from your Vercel deployment
3. **All URLs must use HTTPS** - HTTP URLs will be rejected

Would you like me to create the Privacy Policy and Terms of Service pages for your PrettyMail application?
