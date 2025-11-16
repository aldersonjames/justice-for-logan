// Netlify Function: Automated Media Crawler
// This function searches for new coverage about Logan Federico
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
    console.log('Starting media crawler...');

    // Google News RSS (no API key needed)
    for (const term of searchTerms) {
      const encodedTerm = encodeURIComponent(term.trim());
      const googleNewsUrl = `https://news.google.com/rss/search?q=${encodedTerm}&hl=en-US&gl=US&ceid=US:en`;

      console.log(`Searching for: ${term}`);

      try {
        const response = await fetch(googleNewsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; JusticeForLoganBot/1.0)'
          }
        });

        if (!response.ok) {
          console.error(`Failed to fetch for term "${term}": ${response.status}`);
          continue;
        }

        const xml = await response.text();

        // Parse RSS feed using regex (simple but works for Google News RSS)
        const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

        for (const item of items.slice(0, 10)) { // Limit to 10 per term
          try {
            // Extract fields using regex
            const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
            const linkMatch = item.match(/<link>(.*?)<\/link>/);
            const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
            const descMatch = item.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/);
            const sourceMatch = item.match(/<source[^>]*>([^<]+)<\/source>/);

            const title = titleMatch?.[1] || '';
            const link = linkMatch?.[1] || '';
            const pubDate = pubDateMatch?.[1] || '';
            const description = descMatch?.[1] || '';
            const source = sourceMatch?.[1] || 'Unknown Source';

            // Skip if we've already seen this link or if essential fields are missing
            if (!link || !title || seenLinks.has(link)) {
              continue;
            }

            seenLinks.add(link);

            // Determine article type based on URL and title
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

            const article = {
              id: Date.now() + Math.floor(Math.random() * 1000),
              headline: title.trim(),
              link: link.trim(),
              outlet: source.trim(),
              date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              description: description.replace(/<[^>]*>/g, '').trim().substring(0, 200),
              type: type,
              approved: false,
              submittedBy: 'auto-crawler',
              submittedAt: new Date().toISOString(),
              searchTerm: term
            };

            results.push(article);
          } catch (itemError) {
            console.error('Error processing item:', itemError);
          }
        }
      } catch (fetchError) {
        console.error(`Error fetching news for "${term}":`, fetchError.message);
      }

      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`Found ${results.length} new articles`);

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

// Helper function to send email notification
async function sendNotificationEmail(articles) {
  if (!process.env.CRAWLER_EMAIL_RECIPIENT) {
    console.log('Email notification skipped: missing CRAWLER_EMAIL_RECIPIENT');
    return;
  }

  try {
    // Format articles for email
    const articleList = articles.map(article =>
      `• ${article.headline}\n  Source: ${article.outlet}\n  Link: ${article.link}\n  Type: ${article.type}\n`
    ).join('\n');

    const emailBody = `
New Media Coverage Found for Justice for Logan

The automated crawler has found ${articles.length} new article(s):

${articleList}

To approve these articles:
1. Go to Netlify Functions logs: https://app.netlify.com
2. View the full crawler response JSON
3. Copy approved articles and add to src/data/mediaArticles.json
4. Commit and push to deploy

---
This is an automated message from the Justice for Logan media crawler.
Timestamp: ${new Date().toISOString()}
    `.trim();

    console.log('Email notification would be sent to:', process.env.CRAWLER_EMAIL_RECIPIENT);
    console.log('Email body:', emailBody);

    // Note: Netlify doesn't have built-in email. You would need to integrate with:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // For now, we just log it. Configure your email service here.

  } catch (emailError) {
    console.error('Error sending notification email:', emailError);
  }
}

// Schedule this function to run daily at 9 AM UTC
export const config = {
  schedule: '0 9 * * *' // Cron format: At 09:00 every day
};


