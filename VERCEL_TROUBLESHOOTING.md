# Vercel Deployment Troubleshooting

## 404 Error on Vercel

If you're getting 404 errors, check the following:

### 1. Check What's Returning 404

**Test these URLs:**
- Homepage: `https://your-app.vercel.app/`
- API Health: `https://your-app.vercel.app/api/health`
- API Jobs: `https://your-app.vercel.app/api/jobs`
- Login Page: `https://your-app.vercel.app/auth/login`

### 2. Common Causes

**A. Environment Variables Not Set**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add:
  - `MONGODB_URI` = your MongoDB Atlas connection string
  - `JWT_SECRET` = any secure random string
- **Redeploy** after adding environment variables

**B. MongoDB Atlas IP Whitelist**
- Go to MongoDB Atlas → Network Access
- Add `0.0.0.0/0` (allow all IPs) OR add Vercel's IP ranges
- Wait 1-2 minutes for changes to apply

**C. Build Configuration**
- Check Vercel build logs
- Ensure build command is: `npm run build`
- Ensure output directory is: `.next` (default)

### 3. Test API Endpoints

Use browser or curl:
```bash
# Test health endpoint
curl https://your-app.vercel.app/api/health

# Should return:
{"status":"OK","message":"Employment Directory API is running","timestamp":"..."}
```

### 4. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Click "Functions" tab
4. Check for errors in API routes

### 5. Quick Fixes

**Option 1: Redeploy**
- In Vercel Dashboard, click "Redeploy" on latest deployment
- Or push a new commit to trigger redeploy

**Option 2: Check Build Logs**
- Go to Deployment → Build Logs
- Look for errors or warnings
- Common issues:
  - Missing environment variables
  - TypeScript errors (should be fixed now)
  - Build timeouts

**Option 3: Verify Routes**
- Check that all route files exist
- Ensure file structure matches Next.js App Router requirements

