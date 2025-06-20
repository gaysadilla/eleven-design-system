# TinaCMS Cloud Visual Editing Troubleshooting

## The Real Issue

Visual editing with TinaCMS Cloud requires:
1. Accessing pages through the TinaCloud admin interface (https://app.tina.io)
2. NOT through your local admin route or Vercel admin route

## How to Access Visual Editing

### ✅ Correct Way:
1. Go to https://app.tina.io
2. Log in to your TinaCloud account
3. Select your project
4. Click "Open Editor"
5. Click on "Documentation Pages" collection
6. Click on any page (e.g., "Action")
7. The page opens in an iframe with the editing sidebar

### ❌ Wrong Ways:
- Going to https://eleven-design-system.vercel.app/admin
- Going to http://localhost:3000/admin
- Clicking pages directly from your site

## Critical Configuration Steps

### 1. Set Site URL in TinaCloud
1. Go to https://app.tina.io
2. Select your project
3. Go to Configuration → Project Configuration
4. Set "Site URL" to: `https://eleven-design-system.vercel.app`
5. Save changes

### 2. Verify Vercel Environment Variables
Required variables in Vercel:
```
NEXT_PUBLIC_TINA_CLIENT_ID=d34d54f8-0563-4bee-8bd1-ef3a6d3498d4
TINA_TOKEN=[Your read-only token from TinaCloud]
NEXT_PUBLIC_TINA_BRANCH=main
```

### 3. Ensure Proper Build Configuration
Your build command should be:
```
tinacms build && next build
```

## Why Visual Editing Might Not Work

### 1. Site URL Not Configured
- **Solution**: Set the Site URL in TinaCloud configuration

### 2. CORS Issues
- **Symptom**: Console errors about CORS
- **Solution**: Ensure Site URL matches exactly (including https://)

### 3. Authentication Issues
- **Symptom**: 401 or 403 errors
- **Solution**: Check TINA_TOKEN is set correctly in Vercel

### 4. Routing Issues
- **Symptom**: Page loads but no sidebar
- **Solution**: Verify ui.router returns correct paths

## Testing Visual Editing

1. **Deploy Latest Changes**:
   ```bash
   git add .
   git commit -m "Fix TinaCloud configuration"
   git push origin main
   ```

2. **Wait for Vercel Deployment**:
   - Check deployment status at https://vercel.com

3. **Test from TinaCloud**:
   - Go to https://app.tina.io
   - Open Editor
   - Click on a page
   - Verify sidebar appears

## Your Current Status

### ✅ Correctly Configured:
- TinaCMS schema and collections
- useTina hook implementation
- tinaField attributes
- Component structure

### ⚠️ Need to Verify:
- Site URL in TinaCloud settings
- Environment variables in Vercel
- Access through TinaCloud admin (not direct URLs)

## Quick Checklist

- [ ] Site URL set in TinaCloud to `https://eleven-design-system.vercel.app`
- [ ] All environment variables set in Vercel
- [ ] Latest code deployed to Vercel
- [ ] Accessing pages through https://app.tina.io
- [ ] Browser cache cleared
- [ ] Using correct TinaCloud project

## Summary

TinaCMS Cloud visual editing only works when:
1. Pages are accessed through the TinaCloud admin at https://app.tina.io
2. Site URL is properly configured in TinaCloud
3. Environment variables are set in Vercel
4. You're NOT trying to access visual editing through local URLs

The key insight: With TinaCloud, the admin interface is hosted by Tina, not your application. 