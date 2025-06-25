# Google Cloud Console Security Configuration

Based on your Project Checkup screenshot, here are the security issues that need to be addressed for PrettyMail:

## 🔒 Required Security Fixes

### 1. Cross-Account Protection ⚠️
**Issue:** Your project is not configured for Cross-Account Protection.

**Solution:**
1. Go to Google Cloud Console > APIs & Services > Credentials
2. Click on your "PrettyMail" OAuth client
3. Under "Cross-Account Protection", enable this feature
4. This prevents unauthorized access from different Google accounts

### 2. Secure OAuth Flows ⚠️
**Issue:** Your app is not configured to use secure OAuth flows and may be vulnerable to impersonation.

**Solution:**
1. In your OAuth client settings, ensure you're using:
   - Authorization Code flow (not Implicit flow)
   - PKCE (Proof Key for Code Exchange) if available
   - Secure redirect URIs only (HTTPS)

### 3. Incremental Authorization ⚠️
**Issue:** One or more OAuth clients may not properly support incremental authorization.

**Solution:**
1. In your OAuth consent screen configuration:
   - Go to "OAuth consent screen" tab
   - Ensure scopes are properly configured
   - Only request necessary permissions
   - Configure incremental scope requests

### 4. Granular Permissions ⚠️
**Issue:** OAuth clients do not support granular permissions.

**Solution:**
1. Review your OAuth scopes in the consent screen
2. Only request the minimum necessary permissions:
   - `email` - for user identification
   - `profile` - for basic user info
   - Remove any unnecessary scopes

### 5. Billing Account Verification ⚠️
**Issue:** Your app does not have an associated Cloud billing account.

**Solution:**
1. Go to Google Cloud Console > Billing
2. Link a billing account to your project
3. This is required for production OAuth applications

### 6. Project Contacts ⚠️
**Issue:** Your app does not have the right number of project owners/editors.

**Solution:**
1. Go to IAM & Admin > IAM
2. Ensure you have appropriate project contacts
3. Add necessary team members with proper roles

## ✅ Already Configured Correctly

- **Send token securely** ✅ - Your app correctly receives OAuth tokens
- **WebViews usage** ✅ - Not using WebViews for authentication
- **Updated contact information** ✅ - Contact info is up to date
- **Modern platforms** ✅ - Running on modern operating systems and browsers

## 🚀 Implementation Priority

**High Priority (Fix First):**
1. Add billing account
2. Configure Cross-Account Protection
3. Enable secure OAuth flows

**Medium Priority:**
1. Fix granular permissions
2. Configure incremental authorization
3. Update project contacts

## 📋 Step-by-Step Fix Guide

### Step 1: Add Billing Account
1. Go to: https://console.cloud.google.com/billing
2. Create or link a billing account
3. Associate it with your PrettyMail project

### Step 2: Fix OAuth Security
1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit your "PrettyMail" OAuth client
3. Enable Cross-Account Protection
4. Verify redirect URIs use HTTPS only
5. Ensure Authorization Code flow is selected

### Step 3: Update OAuth Consent Screen
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Review and minimize requested scopes
3. Enable incremental authorization
4. Update app information and contacts

### Step 4: Test Configuration
1. Deploy any changes to Vercel
2. Test the OAuth flow: https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app
3. Verify no security warnings appear

Once these security issues are resolved, your PrettyMail application will be properly secured and ready for production use.
