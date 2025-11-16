# Netlify Forms Email Notification Setup

## Overview
The Justice for Logan website has 5 contact forms that collect submissions via Netlify Forms. All submissions should be emailed to **steve@justiceforlogan.com**.

## Forms on the Website

1. **guestbook** - Guestbook page where visitors can leave messages
2. **memory-wall** - Memory Wall where people share memories of Logan
3. **media-booking** - Media booking requests for interviews/appearances
4. **media-submission** - Submit media coverage or articles about Logan's case
5. **newsletter** - Newsletter signup form

## How to Configure Email Notifications

Netlify Forms handles all form submissions automatically. To receive email notifications:

### Step 1: Access Netlify Dashboard
1. Log in to [Netlify](https://app.netlify.com/)
2. Select the "justice-for-logan" site
3. Go to **Site Settings** (in the left sidebar)

### Step 2: Configure Form Notifications
1. Click on **Forms** in the left sidebar
2. Click on **Form notifications**
3. Click **Add notification** button
4. Select **Email notification**

### Step 3: Set Up Each Form Notification
For each of the 5 forms, create a notification:

- **Event to listen for**: New form submission
- **Form**: Select the form name (guestbook, memory-wall, media-booking, etc.)
- **Email to notify**: `steve@justiceforlogan.com`
- **Email subject** (optional): Customize, e.g., "New Guestbook Entry - Justice for Logan"

### Step 4: Verify Setup
1. After configuring, test each form by submitting a test entry
2. Check that steve@justiceforlogan.com receives the notification
3. Form submissions will also be visible in the Netlify dashboard under **Forms**

## Viewing Form Submissions

All form submissions are stored in the Netlify dashboard:
1. Go to **Forms** in the sidebar
2. Click on any form name to see all submissions
3. You can export submissions as CSV
4. Submissions include spam filtering by Netlify

## No Mail Server Required

Netlify Forms handles everything:
- ✅ No mail server setup needed
- ✅ No SMTP configuration required
- ✅ Built-in spam protection
- ✅ Free on all Netlify plans (with limits)
- ✅ Automatic email notifications
- ✅ Secure form handling

## Form Submission Limits

Netlify's free tier includes:
- 100 form submissions per month
- After that, $19/month per 100 additional submissions

If you exceed the limit, you may need to upgrade or implement a custom backend solution.

## Approving Submissions (Fully Automated Workflow)

### Using the Admin Dashboard

**Steve's Simple 4-Step Process:**

1. **Get email notification**: "New Memory Wall submission from John Doe"

2. **Go to admin page**: Visit `https://yoursite.netlify.app/admin`

3. **Login** with your admin password

4. **See all submissions automatically**:
   - All pending submissions appear as cards
   - Organized by type (Memory Wall, Guestbook, etc.)
   - Each shows: Name, Relationship, Message, Submission Time
   - Two buttons: **"✓ Approve & Publish"** and **"✕ Deny"**

5. **Click "Approve & Publish"**:
   - One click approval
   - Automatically adds to website
   - Site redeploys in ~1 minute
   - Submission appears live!

### How It Works

The admin dashboard:
1. **Automatically fetches** all pending submissions from Netlify Forms
2. **Displays them as cards** with all details visible
3. **One-click approval** button on each card
4. **GitHub API updates** the JSON file automatically
5. **Netlify redeploys** the site with new content

**Zero copy-pasting. Zero manual editing. Just click "Approve"!**

### Manual Method (Fallback)

If the automated system isn't working, you can still manually add entries:

1. Edit `/src/data/memories.json` or `/src/data/guestbook.json`
2. Add new entry following this format:

```json
{
  "id": 5,
  "name": "Submitter Name",
  "type": "story|photo|tribute|message",
  "relationship": "Friend|Family|Community Member",
  "date": "2025-11-16",
  "message": "The memory text here",
  "approved": true,
  "featured": false
}
```

3. Commit and push to GitHub
4. Netlify will auto-deploy with the new memory

## Required Environment Variables

To enable the admin dashboard approval system, add these to Netlify:

1. Go to **Site Settings → Environment Variables**
2. Add the following:

```
ADMIN_PASSWORD=your-secure-password-here
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_OWNER=your-github-username
GITHUB_REPO=justice-for-logan
NETLIFY_API_TOKEN=your-netlify-api-token
```

### Creating a GitHub Personal Access Token

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name it "Netlify Admin Approvals"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. Copy the token and add it to Netlify as `GITHUB_TOKEN`

### Creating a Netlify API Token

1. Go to Netlify → User Settings → Applications
2. Click "New access token"
3. Name it "Admin Dashboard"
4. Click "Generate token"
5. Copy the token and add it to Netlify as `NETLIFY_API_TOKEN`

**Important**: Keep these tokens secure. Never commit them to your repository.

## Support

- Netlify Forms documentation: https://docs.netlify.com/forms/setup/
- GitHub API documentation: https://docs.github.com/en/rest
- For issues: Contact Netlify Support through the dashboard
