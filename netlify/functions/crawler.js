// Netlify Function: Automated Media Crawler
// This function searches for new coverage about Logan Federico across multiple platforms
// Optimized for Netlify's 10-second function timeout

export const handler = async (event, context) => {
  const searchTerms = process.env.CRAWLER_SEARCH_TERMS
    ? process.env.CRAWLER_SEARCH_TERMS.split(',').map(t => t.trim())
    : [
        'Logan Federico',
        'Justice for Logan',
        'Stephen Federico'
      ];

  const results = [];
  const seenLinks = new Set();
  const startTime = Date.now();
  const MAX_EXECUTION_TIME = 8000; // 8 seconds max (leave 2s buffer)

  try {
    console.log('Starting multi-platform media crawler...');
    console.log(`Searching ${searchTerms.length} terms...`);

    // Run searches in parallel for speed
    const searchPromises = [];

    for (const term of searchTerms) {
      // Check if we're running out of time
      if (Date.now() - startTime > MAX_EXECUTION_TIME) {
        console.log('Timeout approaching, stopping searches');
        break;
      }

      console.log(`Searching for: "${term}"`);

      // Search Google News (fast, reliable)
      searchPromises.push(
        searchGoogleNews(term, results, seenLinks).catch(err => {
          console.error(`Google News error for "${term}":`, err.message);
        })
      );

      // Search YouTube if API key is available
      if (process.env.YOUTUBE_API_KEY) {
        searchPromises.push(
          searchYouTube(term, results, seenLinks).catch(err => {
            console.error(`YouTube error for "${term}":`, err.message);
          })
        );
      }
    }

    // Wait for all searches to complete (or timeout)
    await Promise.race([
      Promise.all(searchPromises),
      new Promise(resolve => setTimeout(resolve, MAX_EXECUTION_TIME))
    ]);

    console.log(`\nTotal results: ${results.length} articles`);
    console.log(`Execution time: ${Date.now() - startTime}ms`);

    // Sort by date (newest first)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return results immediately (don't wait for email)
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
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
        executionTime: `${Date.now() - startTime}ms`,
        articles: results,
        timestamp: new Date().toISOString()
      })
    };

    // Log email notification asynchronously (don't block response)
    if (results.length > 0 && process.env.CRAWLER_EMAIL_RECIPIENT) {
      sendNotificationEmail(results).catch(err =>
        console.error('Email notification failed:', err)
      );
    }

    return response;

  } catch (error) {
    console.error('Crawler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message,
        executionTime: `${Date.now() - startTime}ms`,
        timestamp: new Date().toISOString()
      })
    };
  }
};

// 1. Google News RSS Search (Fast & Reliable)
async function searchGoogleNews(term, results, seenLinks) {
  const encodedTerm = encodeURIComponent(term);
  const url = `https://news.google.com/rss/search?q=${encodedTerm}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JusticeForLoganBot/1.0)' },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Google News HTTP ${response.status} for "${term}"`);
      return;
    }

    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    console.log(`  → Google News: ${items.length} items`);

    let added = 0;
    for (const item of items.slice(0, 10)) {
      const article = parseRSSItem(item, term, 'Google News');
      if (article && !seenLinks.has(article.link)) {
        seenLinks.add(article.link);
        results.push(article);
        added++;
      }
    }

    console.log(`  → Added ${added} unique articles`);

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`Google News timeout for "${term}"`);
    } else {
      console.error(`Google News error for "${term}":`, error.message);
    }
  }
}

// 2. YouTube API Search (Requires API Key)
async function searchYouTube(term, results, seenLinks) {
  if (!process.env.YOUTUBE_API_KEY) {
    console.log('  → YouTube: Skipped (no API key)');
    return;
  }

  const encodedTerm = encodeURIComponent(term);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedTerm}&type=video&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`YouTube API HTTP ${response.status}`);
      return;
    }

    const data = await response.json();
    const items = data.items || [];

    console.log(`  → YouTube: ${items.length} videos`);

    let added = 0;
    for (const item of items) {
      const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;

      if (!seenLinks.has(videoUrl)) {
        seenLinks.add(videoUrl);
        results.push({
          id: Date.now() + Math.floor(Math.random() * 10000),
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
        added++;
      }
    }

    console.log(`  → Added ${added} unique videos`);

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('YouTube timeout');
    } else {
      console.error('YouTube error:', error.message);
    }
  }
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

    if (lowerLink.includes('youtube.com') || lowerLink.includes('youtu.be') ||
        lowerTitle.includes('video') || lowerTitle.includes('watch')) {
      type = 'video';
    } else if (lowerLink.includes('facebook.com') || lowerLink.includes('twitter.com') ||
               lowerLink.includes('instagram.com') || lowerLink.includes('tiktok.com')) {
      type = 'social';
    } else if (lowerTitle.includes('interview') || lowerTitle.includes('speaks out') ||
               lowerTitle.includes('testimony')) {
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

// Helper: Send email notification (async, non-blocking)
async function sendNotificationEmail(articles) {
  if (!process.env.CRAWLER_EMAIL_RECIPIENT) {
    console.log('Email skipped: no recipient configured');
    return;
  }

  try {
    // Group by type
    const byType = {
      video: articles.filter(a => a.type === 'video'),
      interview: articles.filter(a => a.type === 'interview'),
      news: articles.filter(a => a.type === 'news'),
      social: articles.filter(a => a.type === 'social'),
      press: articles.filter(a => a.type === 'press')
    };

    // Format for email
    let articleList = '';
    for (const [type, items] of Object.entries(byType)) {
      if (items.length > 0) {
        articleList += `\n${type.toUpperCase()} (${items.length}):\n`;
        items.slice(0, 5).forEach(article => {
          articleList += `  • ${article.headline}\n    ${article.outlet} - ${article.date}\n    ${article.link}\n\n`;
        });
        if (items.length > 5) {
          articleList += `  ... and ${items.length - 5} more\n\n`;
        }
      }
    }

    const emailBody = `
Justice for Logan - New Media Coverage Found
=============================================

Found ${articles.length} new item(s):

${articleList}

BREAKDOWN:
- Videos: ${byType.video.length}
- Interviews: ${byType.interview.length}
- News: ${byType.news.length}
- Social: ${byType.social.length}
- Press: ${byType.press.length}

View full results in Netlify Functions logs:
https://app.netlify.com

---
${new Date().toISOString()}
    `.trim();

    console.log('\n=== EMAIL NOTIFICATION ===');
    console.log(`To: ${process.env.CRAWLER_EMAIL_RECIPIENT}`);
    console.log(emailBody);
    console.log('========================\n');

    // TODO: Integrate with SendGrid, Mailgun, or AWS SES
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: process.env.CRAWLER_EMAIL_RECIPIENT,
    //   from: 'crawler@justiceforlogan.com',
    //   subject: `[Justice for Logan] ${articles.length} new media items`,
    //   text: emailBody
    // });

  } catch (error) {
    console.error('Email error:', error.message);
  }
}

// Schedule: Daily at 9 AM UTC (4 AM EST / 5 AM EDT)
export const config = {
  schedule: '0 9 * * *'
};
