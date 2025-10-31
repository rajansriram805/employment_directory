# Screenshots Guide - Employment Directory

## How to Take Screenshots

### 1. Setup
1. Start the application: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Use browser developer tools (F12) for responsive views

### 2. Required Screenshots

Create a `screenshots/` folder and capture these screens:

---

### 📸 Screenshot List

#### 1. Home Page (Desktop)
- **File:** `1-home-desktop.png`
- **Description:** Landing page showing features and call-to-action buttons
- **Size:** 1920x1080 or similar
- **Steps:**
  1. Open http://localhost:3000
  2. Take full page screenshot

---

#### 2. Home Page (Mobile)
- **File:** `2-home-mobile.png`
- **Description:** Mobile view of landing page
- **Size:** 375x667 (iPhone) or similar
- **Steps:**
  1. Open browser DevTools (F12)
  2. Toggle device toolbar (Ctrl+Shift+M)
  3. Select mobile device
  4. Take screenshot

---

#### 3. Login Page
- **File:** `3-login.png`
- **Description:** User login form
- **Steps:**
  1. Navigate to /auth/login
  2. Capture the login form

---

#### 4. Register Page
- **File:** `4-register.png`
- **Description:** User registration form with role selection
- **Steps:**
  1. Navigate to /auth/register
  2. Show the form with all fields

---

#### 5. Job Listings (Desktop)
- **File:** `5-jobs-desktop.png`
- **Description:** Grid view of job listings
- **Steps:**
  1. Login as any user
  2. Navigate to /jobs
  3. Show multiple job cards in grid

---

#### 6. Job Listings (Mobile)
- **File:** `6-jobs-mobile.png`
- **Description:** Mobile view of job listings
- **Steps:**
  1. Switch to mobile view
  2. Navigate to /jobs

---

#### 7. Job Details Page
- **File:** `7-job-details.png`
- **Description:** Individual job page with application form
- **Steps:**
  1. Click on a job
  2. Show full job description
  3. Include application form (if logged in as job seeker)

---

#### 8. Job Seeker Dashboard
- **File:** `8-dashboard-seeker.png`
- **Description:** Dashboard showing applications
- **Steps:**
  1. Login as: jobseeker@test.com / password123
  2. Navigate to /dashboard
  3. Show applications list

---

#### 9. Employer Dashboard
- **File:** `9-dashboard-employer.png`
- **Description:** Employer dashboard
- **Steps:**
  1. Login as: employer@test.com / password123
  2. Navigate to /dashboard
  3. Show employer features

---

#### 10. Create Job Page
- **File:** `10-create-job.png`
- **Description:** Form for posting new job
- **Steps:**
  1. Login as employer
  2. Navigate to /jobs/create
  3. Show the job posting form

---

#### 11. Admin Panel
- **File:** `11-admin-panel.png`
- **Description:** Admin dashboard
- **Steps:**
  1. Login as: admin@test.com / admin123
  2. Navigate to /admin
  3. Show admin features

---

#### 12. Application Success
- **File:** `12-application-success.png`
- **Description:** Success message after applying
- **Steps:**
  1. Login as job seeker
  2. Apply for a job
  3. Capture success message

---

### 3. Browser Tools for Screenshots

#### Chrome/Edge:
1. **Full Page:** F12 → Ctrl+Shift+P → "Capture full size screenshot"
2. **Selected Area:** F12 → Ctrl+Shift+P → "Capture area screenshot"
3. **Device View:** F12 → Toggle device toolbar (Ctrl+Shift+M)

#### Firefox:
1. **Full Page:** F12 → Settings → "Take a screenshot"
2. **Device View:** F12 → Responsive Design Mode (Ctrl+Shift+M)

---

### 4. Recommended Tools

- **Browser DevTools** - Built-in screenshot tools
- **Lightshot** - Screenshot tool (Windows/Mac)
- **Snipping Tool** - Windows built-in
- **Greenshot** - Free screenshot tool

---

### 5. Screenshot Best Practices

✅ **Do:**
- Use high resolution (at least 1920x1080 for desktop)
- Capture full pages when possible
- Show actual content (not empty states)
- Use consistent browser/settings
- Name files descriptively

❌ **Don't:**
- Include personal information
- Show sensitive data
- Use low resolution
- Crop important elements
- Include browser extensions UI

---

### 6. Organization

Create folder structure:
```
screenshots/
├── desktop/
│   ├── 1-home.png
│   ├── 5-jobs.png
│   └── ...
├── mobile/
│   ├── 2-home-mobile.png
│   ├── 6-jobs-mobile.png
│   └── ...
└── README.txt (screenshot descriptions)
```

---

### 7. Screenshot Descriptions

Create a `SCREENSHOTS.txt` file:

```
Employment Directory - Screenshots

1. Home Page (Desktop)
   - Landing page with feature cards
   - Shows navigation and call-to-action

2. Home Page (Mobile)
   - Responsive mobile layout
   - Stacked feature cards

3. Login Page
   - User authentication form
   - Email and password fields

... (continue for all screenshots)
```

---

### 8. Alternative: Screen Recording

You can also create a screen recording:
- **File:** `demo-video.mp4`
- **Duration:** 2-3 minutes
- **Content:** Walkthrough of main features
- **Tools:** OBS Studio, Windows Game Bar, QuickTime

---

## Checklist

- [ ] Home page (desktop)
- [ ] Home page (mobile)
- [ ] Login page
- [ ] Register page
- [ ] Job listings (desktop)
- [ ] Job listings (mobile)
- [ ] Job details page
- [ ] Job seeker dashboard
- [ ] Employer dashboard
- [ ] Create job page
- [ ] Admin panel
- [ ] Application success message
- [ ] Screenshots organized in folder
- [ ] Descriptions documented

---

**Note:** Replace placeholder text and fill in actual data when taking screenshots for a professional presentation.

