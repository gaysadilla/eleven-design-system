# TinaCMS Cloud + Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. TinaCloud Configuration
- [ ] Log in to https://app.tina.io
- [ ] Go to Project Settings → Configuration
- [ ] Set "Site URL" to: `https://eleven-design-system.vercel.app`
- [ ] Save changes

### 2. Vercel Environment Variables
- [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- [ ] Add/verify these variables:
  ```
  NEXT_PUBLIC_TINA_CLIENT_ID=d34d54f8-0563-4bee-8bd1-ef3a6d3498d4
  TINA_TOKEN=[Your read-only token from TinaCloud]
  NEXT_PUBLIC_TINA_BRANCH=main
  ```

### 3. Deploy Changes
Run these commands to deploy the fixes:

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Fix TinaCMS Cloud configuration for visual editing"

# Push to trigger Vercel deployment
git push origin main
```

## 🧪 Post-Deployment Testing

### 1. Wait for Deployment
- Check deployment status at https://vercel.com
- Wait for "Ready" status

### 2. Test Visual Editing
1. Go to https://app.tina.io
2. Select your project
3. Click "Open Editor"
4. Click on "Documentation Pages"
5. Click on any page (e.g., "Action")
6. **Expected Result**: Page opens with editing sidebar on the right

### 3. Verify Functionality
- [ ] Can see the editing sidebar
- [ ] Can edit content in real-time
- [ ] Changes save to GitHub
- [ ] No console errors

## 🚨 If Visual Editing Still Doesn't Work

1. **Clear Everything**:
   - Clear browser cache (Cmd+Shift+R)
   - Try incognito mode
   - Log out and back into TinaCloud

2. **Double-Check Site URL**:
   - Must be exactly: `https://eleven-design-system.vercel.app`
   - No trailing slash
   - Must include `https://`

3. **Verify Token**:
   - Get a new read-only token from TinaCloud
   - Update in Vercel environment variables
   - Redeploy

4. **Check Browser Console**:
   - Look for CORS errors
   - Look for 401/403 authentication errors
   - Look for network failures

## 📝 Important Notes

- Visual editing ONLY works through https://app.tina.io
- The `/admin` route on your site just redirects to TinaCloud
- All authentication is handled by TinaCloud
- Content API is served by TinaCloud infrastructure

## 🎉 Success Indicators

When everything is working correctly:
- Clicking a page in TinaCloud opens it with a sidebar
- Content updates in real-time as you type
- Changes save to your GitHub repository
- No errors in the browser console 