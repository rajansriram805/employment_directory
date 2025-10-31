# GitHub Setup Guide - Step by Step

## Step 1: Check if Git is Installed

```bash
git --version
```

If not installed, download from: https://git-scm.com/downloads

## Step 2: Initialize Git Repository

```bash
# Navigate to your project directory
cd E:\Projects\shri

# Initialize git
git init
```

## Step 3: Add All Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

## Step 4: Create Initial Commit

```bash
git commit -m "Initial commit - Employment Directory Project"
```

## Step 5: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. Go to https://github.com
2. Sign in or create account
3. Click the **"+"** icon in top right → **"New repository"**
4. Fill in:
   - **Repository name:** `employment-directory`
   - **Description:** `Full-stack employment directory web application with Next.js, TypeScript, and MongoDB`
   - **Visibility:** Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create employment-directory --public --source=. --remote=origin --push
```

## Step 6: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see a page with instructions. Use these commands:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/employment-directory.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

## Step 7: Verify Upload

1. Go to your GitHub repository
2. Refresh the page
3. You should see all your files!

## Important: Update FINAL_SUBMISSION.md

After pushing, update the repository URL in `FINAL_SUBMISSION.md`:

```markdown
Repository URL: https://github.com/YOUR_USERNAME/employment-directory
```

## Troubleshooting

### If you get "repository not found" error:
- Check repository name matches
- Verify you have access (if private repo, you need to be logged in)

### If you get authentication error:
- GitHub no longer accepts passwords for HTTPS
- Use Personal Access Token or SSH instead

### Option: Use Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Use token as password when pushing

### Option: Use SSH (Recommended)
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add SSH key to GitHub
# Copy public key: cat ~/.ssh/id_ed25519.pub
# Add to GitHub → Settings → SSH and GPG keys

# Use SSH URL instead
git remote set-url origin git@github.com:YOUR_USERNAME/employment-directory.git
git push -u origin main
```

## Next Steps After GitHub Setup

1. ✅ Code is on GitHub
2. 📸 Take screenshots (see SCREENSHOTS_GUIDE.md)
3. 🌐 Deploy application (Vercel/Netlify)
4. 📝 Update FINAL_SUBMISSION.md with links

## Quick Reference Commands

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# View remote
git remote -v

# Pull latest changes
git pull
```

---

**Need Help?** Check GitHub documentation: https://docs.github.com

