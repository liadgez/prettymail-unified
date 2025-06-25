# Legal Pages Added

This document confirms the creation and integration of the Privacy Policy and Terms of Service pages into the PrettyMail application.

## Files Created

- `src/pages/PrivacyPolicy.tsx`: A placeholder privacy policy page.
- `src/pages/TermsOfService.tsx`: A placeholder terms of service page.

## Routing

- The following routes have been added to `src/App.tsx`:
  - `/privacy`: Displays the Privacy Policy page.
  - `/terms`: Displays the Terms of Service page.

## Next Steps

1.  Review and update the content of the new pages with your actual legal text.
2.  Deploy the changes to Vercel:
    ```bash
    git add .
    git commit -m "feat: add privacy policy and terms of service pages"
    git push
    vercel --prod
    ```
3.  Update the Google Cloud Console with the new URLs:
    -   **Application privacy policy link:** `https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app/privacy`
    -   **Application terms of service link:** `https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app/terms`
