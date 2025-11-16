// Netlify Function: Automated Media Crawler
// This function searches for new coverage about Logan Federico across multiple platforms
// Run on a schedule (daily) using Netlify Scheduled Functions

export const handler = async (event, context) => {
  const searchTerms = process.env.CRAWLER_SEARCH_TERMS
    ? process.env.CRAWLER_SEARCH_TERMS.split(',')
    : [
        'Logan Federico',
        'Justice for Logan',
        'Stephen Federico testimony',
        'Alexander Dickey Columbia murder',
        'Waxhaw woman killed Columbia SC',
        'Logan Federico bail reform'
      ];

  const results = [];
  const seenLinks = new Set();

  try {
    console.log('Starting multi-platform media crawler...');
    console.log(`Searching ${searchTerms.length} terms across multiple platforms...`);

    for (const term of searchTerms) {
      console.log(`\n=== Searching for: "${term}" ===`);

      // 1. Google News RSS
      await searchGoogleNews(term, results, seenLinks);

      // 2. YouTube RSS (no API key needed)
      await searchYouTube(term, results, seenLinks);

      // 3. Major News Outlets RSS
      await searchMajorOutlets(term, results, seenLinks);

      // Rate limiting between terms
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n=== TOTAL RESULTS: ${results.length} new articles ===`);

    // Sort by date (newest first)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    // If articles found, send notification email
    if (results.length > 0 && process.env.CRAWLER_EMAIL_RECIPIENT) {
      await sendNotificationEmail(results);
    }

    // Return results
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: `Found ${results.length} new articles`,
        count: results.length,
        breakdown: {
          news: results.filter(r => r.type === 'news').length,
          video: results.filter(r => r.type === 'video').length,
          interview: results.filter(r => r.type === 'interview').length,
          social: results.filter(r => r.type === 'social').length,
          press: results.filter(r => r.type === 'press').length
        },
        articles: results,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Crawler error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

// 1. Google News RSS Search
async function searchGoogleNews(term, results, seenLinks) {
  const encodedTerm = encodeURIComponent(term.trim());
  const googleNewsUrl = `https://news.google.com/rss/search?q=${encodedTerm}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(googleNewsUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JusticeForLoganBot/1.0)' }
    });

    if (!response.ok) {
      console.error(`Google News failed for "${term}": ${response.status}`);
      return;
    }

    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    console.log(`  → Google News: ${items.length} items found`);

    for (const item of items.slice(0, 15)) {
      const article = parseRSSItem(item, term, 'Google News');
      if (article && !seenLinks.has(article.link)) {
        seenLinks.add(article.link);
        results.push(article);
      }
    }
  } catch (error) {
    console.error(`Google News error for "${term}":`, error.message);
  }
}

// 2. YouTube RSS Search
async function searchYouTube(term, results, seenLinks) {
  // YouTube RSS feed by search (uses YouTube's search RSS)
  const encodedTerm = encodeURIComponent(term.trim());

  // YouTube doesn't have a direct search RSS, but we can search their channel feeds
  // Alternative: Use YouTube's search URL which sometimes has RSS
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodedTerm}&sp=CAI%253D`;

  try {
    // Note: YouTube's RSS is limited. For better results, you'd need YouTube Data API v3
    // For now, we'll log that YouTube search would happen here
    console.log(`  → YouTube: Search would be performed (requires API key for full functionality)`);

    // If you have a YouTube API key, set YOUTUBE_API_KEY in environment
    if (process.env.YOUTUBE_API_KEY) {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedTerm}&type=video&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error(`YouTube API failed: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log(`  → YouTube API: ${data.items?.length || 0} videos found`);

      for (const item of data.items || []) {
        const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;

        if (!seenLinks.has(videoUrl)) {
          seenLinks.add(videoUrl);
          results.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            headline: item.snippet.title,
            link: videoUrl,
            outlet: item.snippet.channelTitle,
            date: new Date(item.snippet.publishedAt).toISOString().split('T')[0],
            description: item.snippet.description.substring(0, 200),
            type: 'video',
            approved: false,
            submittedBy: 'auto-crawler',
            submittedAt: new Date().toISOString(),
            searchTerm: term,
            platform: 'YouTube'
          });
        }
      }
    }
  } catch (error) {
    console.error(`YouTube error for "${term}":`, error.message);
  }
}

// 3. Major News Outlets RSS Feeds
async function searchMajorOutlets(term, results, seenLinks) {
  const outlets = [
    // South Carolina Local News
    { name: 'The State (SC)', url: 'https://www.thestate.com/news/?widgetName=rssfeed&widgetContentId=712015&getXmlFeed=true' },
    { name: 'Charlotte Observer', url: 'https://www.charlotteobserver.com/news/?widgetName=rssfeed&widgetContentId=712015&getXmlFeed=true' },
    { name: 'WBTV Charlotte', url: 'https://www.wbtv.com/news/?outputType=rss' },
    { name: 'WIS News 10', url: 'https://www.wistv.com/news/?outputType=rss' },

    // National outlets
    { name: 'CNN', url: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
    { name: 'ABC News', url: 'https://abcnews.go.com/abcnews/topstories' },
    { name: 'NBC News', url: 'https://feeds.nbcnews.com/nbcnews/public/news' },
    { name: 'CBS News', url: 'https://www.cbsnews.com/latest/rss/main' },
    { name: 'Fox News', url: 'https://moxie.foxnews.com/google-publisher/latest.xml' },

    // Crime/Justice focused
    { name: 'Crime Online', url: 'https://www.crimeonline.com/feed/' },
    { name: 'Law & Crime', url: 'https://lawandcrime.com/feed/' }
  ];

  console.log(`  → Searching ${outlets.length} major news outlets...`);

  const termLower = term.toLowerCase();
  let outletMatches = 0;

  for (const outlet of outlets) {
    try {
      const response = await fetch(outlet.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JusticeForLoganBot/1.0)' },
        timeout: 5000
      });

      if (!response.ok) continue;

      const xml = await response.text();
      const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

      // Filter items that match our search term
      for (const item of items) {
        const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
        const title = titleMatch?.[1] || '';

        // Check if title or description contains search term
        if (title.toLowerCase().includes(termLower) || item.toLowerCase().includes(termLower)) {
          const article = parseRSSItem(item, term, outlet.name);
          if (article && !seenLinks.has(article.link)) {
            seenLinks.add(article.link);
            results.push(article);
            outletMatches++;
          }
        }
      }

      // Rate limit between outlets
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      // Silently skip failed outlets
      continue;
    }
  }

  console.log(`  → Major outlets: ${outletMatches} relevant articles found`);
}

// Helper: Parse RSS item into article object
function parseRSSItem(item, searchTerm, sourceName) {
  try {
    const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
    const descMatch = item.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/);
    const sourceMatch = item.match(/<source[^>]*>([^<]+)<\/source>/);

    const title = titleMatch?.[1] || '';
    const link = linkMatch?.[1] || '';
    const pubDate = pubDateMatch?.[1] || '';
    const description = descMatch?.[1] || '';
    const source = sourceMatch?.[1] || sourceName;

    if (!link || !title) return null;

    // Determine article type
    let type = 'news';
    const lowerTitle = title.toLowerCase();
    const lowerLink = link.toLowerCase();

    if (lowerLink.includes('youtube.com') || lowerLink.includes('youtu.be') || lowerTitle.includes('video') || lowerTitle.includes('watch')) {
      type = 'video';
    } else if (lowerLink.includes('facebook.com') || lowerLink.includes('twitter.com') || lowerLink.includes('instagram.com') || lowerLink.includes('tiktok.com')) {
      type = 'social';
    } else if (lowerTitle.includes('interview') || lowerTitle.includes('speaks out') || lowerTitle.includes('testimony')) {
      type = 'interview';
    } else if (lowerTitle.includes('press release') || lowerTitle.includes('statement')) {
      type = 'press';
    }

    return {
      id: Date.now() + Math.floor(Math.random() * 10000),
      headline: title.trim(),
      link: link.trim(),
      outlet: source.trim(),
      date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      description: description.replace(/<[^>]*>/g, '').trim().substring(0, 200),
      type: type,
      approved: false,
      submittedBy: 'auto-crawler',
      submittedAt: new Date().toISOString(),
      searchTerm: searchTerm
    };
  } catch (error) {
    return null;
  }
}

// Helper function to send email notification
async function sendNotificationEmail(articles) {
  if (!process.env.CRAWLER_EMAIL_RECIPIENT) {
    console.log('Email notification skipped: missing CRAWLER_EMAIL_RECIPIENT');
    return;
  }

  try {
    // Group articles by type
    const byType = {
      video: articles.filter(a => a.type === 'video'),
      interview: articles.filter(a => a.type === 'interview'),
      news: articles.filter(a => a.type === 'news'),
      social: articles.filter(a => a.type === 'social'),
      press: articles.filter(a => a.type === 'press')
    };

    // Format articles for email
    let articleList = '';

    for (const [type, items] of Object.entries(byType)) {
      if (items.length > 0) {
        articleList += `\n${type.toUpperCase()} (${items.length}):\n`;
        items.forEach(article => {
          articleList += `  • ${article.headline}\n    Source: ${article.outlet}\n    Link: ${article.link}\n    Date: ${article.date}\n\n`;
        });
      }
    }

    const emailBody = `
New Media Coverage Found for Justice for Logan
================================================

The automated crawler has found ${articles.length} new item(s) across multiple platforms:

${articleList}

BREAKDOWN:
- Videos: ${byType.video.length}
- Interviews: ${byType.interview.length}
- News Articles: ${byType.news.length}
- Social Media: ${byType.social.length}
- Press Releases: ${byType.press.length}

TO PUBLISH THESE ARTICLES:
1. Go to Netlify Functions logs: https://app.netlify.com
2. View the full crawler response JSON
3. Copy approved articles to src/data/mediaArticles.json
4. Commit and push to deploy

---
This is an automated message from the Justice for Logan media crawler.
Timestamp: ${new Date().toISOString()}
    `.trim();

    console.log('Email notification would be sent to:', process.env.CRAWLER_EMAIL_RECIPIENT);
    console.log('\n=== EMAIL PREVIEW ===');
    console.log(emailBody);
    console.log('===================\n');

    // Note: To actually send email, integrate with:
    // - SendGrid: https://www.npmjs.com/package/@sendgrid/mail
    // - Mailgun: https://www.npmjs.com/package/mailgun-js
    // - AWS SES: https://www.npmjs.com/package/@aws-sdk/client-ses
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: process.env.CRAWLER_EMAIL_RECIPIENT,
      from: 'crawler@justiceforlogan.com',
      subject: `[Justice for Logan] ${articles.length} new media items found`,
      text: emailBody
    });
    */

  } catch (emailError) {
    console.error('Error sending notification email:', emailError);
  }
}

// Schedule this function to run daily at 9 AM UTC
export const config = {
  schedule: '0 9 * * *' // Cron format: At 09:00 every day
};
