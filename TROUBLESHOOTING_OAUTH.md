# Comprehensive OAuth Troubleshooting Guide

This guide provides a definitive checklist to resolve all common Google OAuth issues for the PrettyMail application, including the `invalid_client` error.

---

## Step 1: Verify Vercel Environment Variable

The `VITE_GOOGLE_CLIENT_ID` environment variable in Vercel **must exactly match** the Client ID from your Google Cloud Console. This is the most common point of failure.

1.  **Find Your Correct Google Client ID:**
    *   Open the [Google Cloud Credentials Page](https://console.cloud.google.com/apis/credentials).
    *   Select the correct Google Cloud project.
    *   In the "OAuth 2.0 Client IDs" list, find the client named **"PrettyMail"** (Type: **"Web application"**).
    *   **Copy the Client ID value.** This is your correct ID.

2.  **Check and Update Vercel:**
    *   In your terminal, run `vercel env ls` to see the current variables.
    *   Compare the `VITE_GOOGLE_CLIENT_ID` value with the ID you just copied.
    *   If they **do not match**, run these commands:
      ```bash
      # Remove the old, incorrect variable
      vercel env rm VITE_GOOGLE_CLIENT_ID

      # Add the correct one (paste the ID you copied from Google)
      vercel env add VITE_GOOGLE_CLIENT_ID <PASTE_YOUR_CORRECT_CLIENT_ID_HERE>
      ```

3.  **Redeploy:**
    *   For the new variable to take effect, you must create a new production deployment:
      ```bash
      vercel --prod
      ```

---

## Step 2: Confirm Google Cloud Console Configuration

After verifying the Client ID, ensure the authorized URLs are correct.

*   **Navigate to APIs & Services > Credentials** in the Google Cloud Console.
*   Select the **"PrettyMail"** (Web application) client.
*   Ensure the following URLs are present:

*   **Authorized JavaScript Origins:**
    *   `https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app`

*   **Authorized Redirect URIs:**
    *   `https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app`

**Note:** Changes in the Google Cloud Console can take a few minutes to propagate.

---

## Step 3: Final Test

Once you have completed the steps above, the `invalid_client` error should be resolved.

1.  **Open a new Incognito/Private browser window.**
2.  **Navigate to the application:** [https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app](https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app)
3.  **Test the "Sign in with Google" button.**

If the issue persists after following this guide, it indicates a configuration error within the Google Cloud project itself, beyond the application's control.
