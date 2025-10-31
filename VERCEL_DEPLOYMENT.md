# Vercel Deployment Guide

## ✅ Build Status
Your project builds successfully! All routes are configured correctly.

## 🔧 Vercel Configuration Steps

### Step 1: Environment Variables in Vercel

**Critical:** You MUST add these in Vercel Dashboard:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
MONGODB_URI = mongodb+srv://nowzana93:W2jx23HW2XBVgYyu@cluster0.pw5ia8b.mongodb.net/employment_directory

JWT_SECRET = 7f8a9b2c4d6e1f3a5b7c9d2e4f6a8b0c1d3e5f7a9b2c4d6e8f0a1c3e5f7a9b2c
```

4. Select **Production**, **Preview**, and **Development** environments
5. Click **Save**
6. **Redeploy** your project after adding variables

### Step 2: MongoDB Atlas Configuration

1. Go to MongoDB Atlas Dashboard
2. **Network Access** → Add IP Address
3. Click **"Allow Access from Anywhere"** or add `0.0.0.0/0`
4. Save and wait 1-2 minutes

### Step 3: Test Your Deployment

After redeploying, test these URLs:

```
1. Homepage:
https://employment-directory-42l1.vercel.app/

2. API Health Check:
https://employment-directory-42l1.vercel.app/api/health

3. API Test Endpoint (shows env vars):
https://employment-directory-42l1.vercel.app/api/test

4. Login Page:
https://employment-directory-42l1.vercel.app/auth/login
```

### Step 4: Check Deployment Logs

1. Go to Vercel Dashboard → Your Project
2. Click on latest deployment
3. Check **Build Logs** for errors
4. Check **Function Logs** for runtime errors

## 🔍 Troubleshooting 404 Errors

### If Homepage Returns 404:
- Check build logs for errors
- Ensure `app/page.tsx` exists
- Try redeploying

### If API Routes Return 404:
- Check that environment variables are set
- Check function logs in Vercel
- Test `/api/test` endpoint to verify env vars

### If You See "MongoDB connection failed":
- Verify `MONGODB_URI` is set in Vercel
- Check MongoDB Atlas IP whitelist
- Check MongoDB Atlas connection string format

## 📝 Quick Checklist

Before deploying:
- [ ] Environment variables added to Vercel
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Build succeeds locally (`npm run build`)
- [ ] All routes compile without errors
- [ ] Code pushed to GitHub

After deploying:
- [ ] Test homepage loads
- [ ] Test `/api/health` endpoint
- [ ] Test `/api/test` endpoint
- [ ] Check function logs for errors
- [ ] Verify environment variables are loaded

## 🚀 Redeploy Instructions

**Option 1: Via Dashboard**
1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Click **"..."** on latest deployment
5. Click **"Redeploy"**

**Option 2: Via Git Push**
```bash
git add .
git commit -m "Fix Vercel deployment"
git push
```
Vercel will auto-deploy

## 🧪 Test Endpoints

After deployment, test these in order:

1. **Health Check:**
   ```
   GET https://your-app.vercel.app/api/health
   ```
   Should return: `{"status":"OK",...}`

2. **Test Endpoint:**
   ```
   GET https://your-app.vercel.app/api/test
   ```
   Should show if env vars are set

3. **Get Jobs:**
   ```
   GET https://your-app.vercel.app/api/jobs
   ```
   Should return jobs array

## ⚠️ Common Issues

**Issue:** "MongoDB connection failed"
- **Fix:** Set `MONGODB_URI` in Vercel environment variables

**Issue:** "JWT_SECRET is not defined"
- **Fix:** Set `JWT_SECRET` in Vercel environment variables

**Issue:** "404 Not Found" on all routes
- **Fix:** Check build logs, ensure deployment succeeded

**Issue:** API returns 500 error
- **Fix:** Check function logs, likely MongoDB connection issue

---

**Your Deployment URL:** https://employment-directory-42l1.vercel.app

**Next Steps:**
1. Add environment variables in Vercel
2. Redeploy
3. Test the endpoints above

