# TinaCMS Cloud Deployment Guide for Vercel

## Prerequisites

✅ You already have:
- TinaCMS Cloud account with Client ID: `d34d54f8-0563-4bee-8bd1-ef3a6d3498d4`
- Vercel deployment at: https://eleven-design-system.vercel.app
- GitHub repository connected to Vercel

## Environment Variables in Vercel

You need to ensure these environment variables are set in your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add/verify these variables:

```
NEXT_PUBLIC_TINA_CLIENT_ID=d34d54f8-0563-4bee-8bd1-ef3a6d3498d4
TINA_TOKEN=[Your content token from TinaCloud]
NEXT_PUBLIC_TINA_BRANCH=main
```

## How Visual Editing Works with TinaCMS Cloud

With TinaCMS Cloud, visual editing works differently than local development:

1. **Access the TinaCloud Admin**: 
   - Go to https://app.tina.io
   - Select your project
   - Click "Open Editor"

2. **Visual Editing Flow**:
   - From TinaCloud admin, click on any page
   - TinaCloud opens your Vercel site in an iframe
   - The sidebar appears automatically
   - Changes are saved to your GitHub repository

## Troubleshooting Visual Editing

### If the sidebar doesn't appear:

1. **Check Site URL in TinaCloud**:
   - Go to https://app.tina.io
   - Project Settings → Configuration
   - Ensure "Site URL" is set to: `https://eleven-design-system.vercel.app`

2. **Verify Environment Variables**:
   - In Vercel, check all environment variables are set
   - Redeploy after adding/changing variables

3. **Clear Browser Cache**:
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Try incognito/private browsing mode

4. **Check Console Errors**:
   - Open browser DevTools (F12)
   - Look for any CORS or authentication errors

## Build Configuration

Your `package.json` scripts are correctly configured:

```json
"build": "tinacms build && next build"
```

This ensures TinaCMS generates necessary files before Next.js builds.

## Deployment Workflow

1. **Local Development** (optional):
   ```bash
   npm run dev
   ```
   Note: Visual editing in local dev requires TinaCloud connection

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

3. **Automatic Vercel Deployment**:
   - Vercel automatically builds and deploys on push
   - Build command: `npm run build`
   - No additional configuration needed

## Verifying Your Setup

1. **Check TinaCloud Connection**:
   - Visit: https://eleven-design-system.vercel.app/admin
   - You should be redirected to TinaCloud login
   - After login, you see your content collections

2. **Test Visual Editing**:
   - From TinaCloud admin, click on "Documentation Pages"
   - Click on any page (e.g., "Action")
   - Page should open with editing sidebar
   - Make a change and verify it saves

## Important Notes

- **No Local TinaCMS Server**: With TinaCloud, you don't need to run `tinacms dev`
- **Admin Route**: The `/admin` route redirects to TinaCloud
- **Authentication**: Handled by TinaCloud, not your application
- **Content API**: Served by TinaCloud's infrastructure

## Next Steps

1. Ensure all environment variables are set in Vercel
2. Verify Site URL is configured in TinaCloud
3. Test visual editing from https://app.tina.io
4. Monitor deployments in Vercel dashboard

## Support

- TinaCMS Documentation: https://tina.io/docs
- TinaCloud Dashboard: https://app.tina.io
- Vercel Dashboard: https://vercel.com/dashboard 