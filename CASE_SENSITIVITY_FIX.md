# Fix for Component Page 500 Error

## The Issue
The page `/components/Action` is returning a 500 error, likely due to case sensitivity issues with Next.js dynamic routing.

## Quick Fix
The URL is trying to access `/components/Action` (capital A) but Next.js might be expecting lowercase. Try accessing:
- https://eleven-design-system.vercel.app/components/action (lowercase)

## Permanent Fix
If the issue is case sensitivity, we need to update the ui.router configuration in TinaCMS to ensure consistent lowercase URLs.

## Checking Vercel Logs
To see the exact error:
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Look for recent errors on the `/components/[slug]` route
5. Check the error details

## Temporary Workaround
While we investigate, you can:
1. Use lowercase URLs: `/components/action` instead of `/components/Action`
2. Access pages through TinaCMS visual editor which handles the routing correctly 