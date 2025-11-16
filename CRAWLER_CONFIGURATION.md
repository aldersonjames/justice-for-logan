# Web Crawler Configuration - Logan Federico Case Media Coverage

## Overview

This document explains how the automated web crawler is configured to find new media coverage about Logan Federico's case while preventing duplicate entries.

## How It Works

### 1. Automatic Daily Crawling
- **Schedule**: Runs daily at 9 AM UTC (4 AM EST / 5 AM EDT)
- **Function**: `netlify/functions/crawler.js`
- **Search Sources**: Google News RSS feeds
- **Duplicate Prevention**: ✅ **ENABLED** - Checks against existing `mediaArticles.json` before adding

### 2. Duplicate Detection System

The crawler implements intelligent duplicate detection:

```javascript
// Step 1: Load existing articles from GitHub
const existingArticles = await fetchExistingMediaArticles();
const existingUrls = new Set(existingArticles.map(article => normalizeUrl(article.link)));

// Step 2: Normalize URLs (removes query params, trailing slashes, etc)
function normalizeUrl(url) {
  // Converts: https://example.com/article?utm_source=twitter
  // To:       https://example.com/article
}

// Step 3: Check each new article
if (existingUrls.has(normalizedUrl)) {
  skipped++; // Skip duplicate
  continue;
}
```

**Result**: The crawler will **ONLY ADD NEW CONTENT** and **NEVER DUPLICATE** existing articles.

### 3. Search Terms Configuration

**Primary Search Terms** (configured in environment variables):
- "Logan Federico"
- "Justice for Logan"
- "Stephen Federico"
- "Alexander Dickey murder"

**To add more search terms**, update the `CRAWLER_SEARCH_TERMS` environment variable in Netlify:
```
CRAWLER_SEARCH_TERMS=Logan Federico,Justice for Logan,Stephen Federico,Alexander Dickey murder,Logan Federico Columbia SC
```

### 4. Target News Outlets

The crawler focuses on **conservative/right-leaning news outlets** and regional South Carolina/North Carolina news:

#### Conservative/Alternative Media:
- Fox News (all variants)
- Fox News Digital
- Fox True Crime Podcast
- The Gateway Pundit
- PJ Media
- LifeZette
- The Post Millennial
- Daily Signal
- FITSNews
- SC Daily Gazette
- Your News
- The American Spectator
- Complex
- Newsmax
- One America News Network (OAN)

#### Regional News (SC/NC):
- Post and Courier
- WIS-TV
- WLTX News19
- WCNC Charlotte
- WBTV
- ABC News 4 (Charleston)

#### Explicitly Excluded:
- CNN (all variants)
- MSNBC
- NPR
- New York Times
- Washington Post
- Other mainstream media with left-leaning editorial stance

### 5. Content Types Captured

The crawler identifies and categorizes:
- **news**: Standard news articles
- **video**: YouTube videos, TV segments
- **interview**: Exclusive interviews, testimonies
- **social**: Social media posts (Facebook, Twitter/X, Instagram)
- **press**: Press releases and official statements
- **podcast**: Audio podcast episodes

### 6. Social Media Search Strategy

**TikTok**:
- "Logan Federico murder Columbia SC"
- "Alexander Dickey arrest crime spree"
- Crime and Cask (CC News Network) content
- Prioritize: 100K+ views

**YouTube**:
- House Judiciary Subcommittee hearing (Sep 29, 2025)
- Stephen Federico congressional testimony
- Fox News interviews
- Nancy Grace coverage
- True crime channels

**X/Twitter**:
- "Logan Federico"
- "Alexander Dickey"
- "Stephen Federico"
- "You pissed off the wrong daddy"
- Nancy Mace posts
- Ralph Norman posts

**Instagram/Facebook**:
- True crime pages
- Victim advocacy content
- News outlet shares

### 7. Coverage Timeline Focus

- **May 3-5, 2025**: Initial crime discovery and reporting
- **May 6-31, 2025**: Early investigation and memorial coverage
- **June 1-30, 2025**: Indictment and legal proceedings
- **July 1-31, 2025**: Legal developments and investigative pieces
- **August-September 2025**: Congressional hearing preparation
- **September 29-30, 2025**: Congressional hearing and immediate aftermath
- **October 1-6, 2025**: Political responses and legal developments
- **October 7-31, 2025**: Ongoing coverage and case updates
- **November 2025-present**: Current case status

### 8. Content Categories

1. **Initial Crime Coverage** (May 2025)
   - Discovery of body
   - Police press conference
   - Suspect apprehension
   - Charges filed

2. **Criminal History/System Failures** (May-June 2025)
   - Alexander Dickey's 39 prior arrests
   - 25 felony charges
   - Fingerprint errors
   - CATCH database issues
   - Plea deal controversies

3. **Legal Developments** (June-October 2025)
   - Arraignment coverage
   - Indictment announcements
   - Bond hearing decisions
   - Death penalty discussions
   - Solicitor vs. Attorney General disputes

4. **Congressional Activity** (September-October 2025)
   - House Judiciary Subcommittee hearing
   - Stephen Federico testimony
   - Political responses
   - Nancy Mace DOJ intervention call
   - Ralph Norman impeachment call

5. **Political Commentary** (September-October 2025)
   - Soft-on-crime policy criticism
   - Criminal justice reform proposals
   - Death penalty advocacy
   - System accountability calls

### 9. Priority System

**HIGH PRIORITY**:
- Congressional testimony video (September 29, 2025)
- Fox News interviews with Stephen Federico
- Crime and Cask TikTok content (1.5M+ likes)
- Official House Judiciary hearing materials
- Congressional office official statements
- Attorney General letters/statements
- Fox News original investigations

**MEDIUM PRIORITY**:
- Regional news coverage (SC/NC)
- National news mentions
- Podcast episodes
- Opinion pieces from conservative outlets
- Social media engagement (100K+ interactions)

**LOWER PRIORITY**:
- General true crime coverage mentioning case
- Social media retweets/shares
- Duplicate coverage of same story
- Low-traffic content

### 10. Output Format

Each discovered article is formatted as:

```json
{
  "id": 30,
  "headline": "Article title from crawler",
  "outlet": "Fox News",
  "date": "2025-11-16",
  "link": "https://example.com/article",
  "description": "Brief summary of content",
  "type": "video",
  "approved": false
}
```

**Note**: New articles from crawler are set to `"approved": false` by default and will appear in the admin dashboard for manual approval before being published to the website.

### 11. Manual Trigger

To manually trigger the crawler (without waiting for daily schedule):

```bash
# Via Netlify Functions endpoint
curl https://justiceforlogan.com/.netlify/functions/crawler

# Returns JSON with discovered articles
{
  "success": true,
  "message": "Found 5 new media links",
  "count": 5,
  "breakdown": {
    "news": 3,
    "video": 2,
    "interview": 0,
    "social": 0,
    "press": 0
  },
  "links": [...],
  "existingCount": 29
}
```

### 12. Environment Variables Required

Add these to Netlify environment variables:

```
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_OWNER=your-github-username
GITHUB_REPO=justice-for-logan
CRAWLER_SEARCH_TERMS=Logan Federico,Justice for Logan,Stephen Federico,Alexander Dickey murder
```

### 13. Monitoring Crawler Results

**View Crawler Logs**:
1. Go to Netlify Dashboard
2. Navigate to **Functions** tab
3. Click on **crawler** function
4. View execution logs to see:
   - How many articles were found
   - How many were skipped as duplicates
   - Any errors encountered

**Example Log Output**:
```
Starting media crawler...
Searching for: Logan Federico, Justice for Logan, Stephen Federico, Alexander Dickey murder
Loaded 29 existing articles for duplicate detection
"Logan Federico": found 12 items
  → Added 2 unique links, skipped 10 duplicates
"Justice for Logan": found 8 items
  → Added 0 unique links, skipped 8 duplicates
Found 2 NEW links (duplicates filtered) in 1847ms
```

### 14. Adding New Media Manually

If you find media coverage that the crawler missed:

**Option A: Use Admin Dashboard** (Recommended)
1. Go to `/admin`
2. Use the media submission form
3. Approve via admin interface

**Option B: Edit JSON Directly**
1. Edit `src/data/mediaArticles.json`
2. Add new entry following this format:
```json
{
  "id": 30,
  "headline": "New article title",
  "outlet": "Fox News",
  "date": "2025-11-16",
  "link": "https://example.com/article",
  "description": "Brief description",
  "type": "video",
  "approved": true
}
```
3. Commit and push to GitHub
4. Netlify auto-deploys

### 15. Preventing Duplicates - Technical Details

**URL Normalization Process**:
```javascript
// Input URLs (all treated as duplicates):
https://example.com/article?utm_source=twitter
https://example.com/article?utm_source=facebook
https://example.com/article/
https://example.com/article
HTTPS://EXAMPLE.COM/ARTICLE

// All normalized to:
https://example.com/article
```

**Duplicate Check Logic**:
1. Fetch all existing articles from GitHub
2. Extract URLs and normalize them
3. Store in Set for O(1) lookup
4. For each new article:
   - Normalize the URL
   - Check if normalized URL exists in Set
   - If exists: Skip (log as duplicate)
   - If new: Add to results

**Result**: Zero duplicate articles, even if:
- URL has different query parameters
- URL has trailing slash vs no trailing slash
- URL has different capitalization
- Same article shared from different social media sources

### 16. Troubleshooting

**Crawler Not Finding New Articles**:
- Check if search terms are too narrow
- Add more search terms to `CRAWLER_SEARCH_TERMS`
- Verify Google News has indexed new coverage
- Run manual trigger to test

**Duplicates Still Appearing**:
- Check that `GITHUB_TOKEN` is set correctly
- Verify crawler logs show "Loaded X existing articles"
- Ensure URLs in `mediaArticles.json` are valid

**Crawler Timing Out**:
- Default timeout is 3 seconds per search
- Check Netlify function logs for timeout errors
- May need to reduce number of search terms

### 17. Future Enhancements

Potential improvements to crawler:

- [ ] Add TikTok API integration for direct video search
- [ ] Add YouTube API integration for video metadata
- [ ] Add Twitter/X API integration for trending topics
- [ ] Implement sentiment analysis on found articles
- [ ] Add email notifications when new high-priority content is found
- [ ] Create webhook integration for real-time media alerts
- [ ] Add automatic approval for trusted sources (Fox News, etc.)
- [ ] Implement engagement metrics tracking (views, likes, shares)

---

## Quick Reference

**Crawler Function**: `netlify/functions/crawler.js`
**Data File**: `src/data/mediaArticles.json`
**Schedule**: Daily at 9 AM UTC (4 AM EST)
**Duplicate Detection**: ✅ Enabled via URL normalization
**Manual Trigger**: `/.netlify/functions/crawler`
**Admin Approval**: `/admin` dashboard

**Built with care for Logan and her family** 💜
