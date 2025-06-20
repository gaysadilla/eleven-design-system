# Manual Schema Sync for TinaCloud

## Option 1: Force Schema Update via TinaCloud Dashboard

1. Go to https://app.tina.io
2. Select your project: "eleven-design-system"
3. Look for one of these options:
   - **"Sync Schema"** button
   - **"Refresh Schema"** option
   - **"Indexing"** section with a manual trigger

## Option 2: Trigger Re-indexing via Git

1. Create a dummy commit to force re-indexing:
   ```bash
   git commit --allow-empty -m "Trigger TinaCloud re-index"
   git push origin main
   ```

2. Wait 2-3 minutes for TinaCloud to process

## Option 3: Check TinaCloud Webhook

1. In GitHub, go to Settings → Webhooks
2. Find the TinaCloud webhook
3. Click on it and check "Recent Deliveries"
4. If there are failures, click "Redeliver" on the latest one

## Option 4: Manual Build Without Schema Check

In your Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add a new variable:
   ```
   TINA_SKIP_CLOUD_CHECK=true
   ```
3. Trigger a new deployment

## Why This Happens

The error occurs when:
- Local schema changes haven't been synced to TinaCloud
- TinaCloud indexing is delayed or failed
- Webhook from GitHub to TinaCloud didn't fire properly 