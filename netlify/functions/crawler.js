// Netlify Function: Automated Media Crawler
// Searches for media coverage and returns links to articles, videos, and social media

export const handler = async (event, context) => {
  const searchTerms = process.env.CRAWLER_SEARCH_TERMS
    ? process.env.CRAWLER_SEARCH_TERMS.split(',').map(t => t.trim())
    : [
        'Logan Federico',
        'Justice for Logan',
        'Stephen Federico',
        'Alexander Dickey murder'
      ];

  const results = [];
  const seenLinks = new Set();
  const startTime = Date.now();

  try {
    console.log('Starting media crawler...');
    console.log(`Searching for: ${searchTerms.join(', ')}`);

    // Search Google News for each term (finds articles, videos, social media)
    const searchPromises = searchTerms.map(term =>
      searchGoogleNews(term, results, seenLinks).catch(err => {
        console.error(`Search error for "${term}":`, err.message);
      })
    );

    await Promise.all(searchPromises);

    console.log(`Found ${results.length} links in ${Date.now() - startTime}ms`);

    // Sort by date (newest first)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: `Found ${results.length} media links`,
        count: results.length,
        breakdown: {
          news: results.filter(r => r.type === 'news').length,
          video: results.filter(r => r.type === 'video').length,
          interview: results.filter(r => r.type === 'interview').length,
          social: results.filter(r => r.type === 'social').length,
          press: results.filter(r => r.type === 'press').length
        },
        executionTime: `${Date.now() - startTime}ms`,
        links: results,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Crawler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Search Google News RSS - finds everything (news, YouTube, social media)
async function searchGoogleNews(term, results, seenLinks) {
  const encodedTerm = encodeURIComponent(term);
  const url = `https://news.google.com/rss/search?q=${encodedTerm}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JusticeForLoganBot/1.0)' },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Google News returned ${response.status} for "${term}"`);
      return;
    }

    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    console.log(`"${term}": found ${items.length} items`);

    let added = 0;
    for (const item of items.slice(0, 15)) {
      const link = extractLink(item, term);
      if (link && !seenLinks.has(link.url)) {
        seenLinks.add(link.url);
        results.push(link);
        added++;
      }
    }

    console.log(`  → Added ${added} unique links`);

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`Timeout searching for "${term}"`);
    } else {
      console.error(`Error searching for "${term}":`, error.message);
    }
  }
}

// Extract link data from RSS item
function extractLink(item, searchTerm) {
  try {
    const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
    const descMatch = item.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/);
    const sourceMatch = item.match(/<source[^>]*>([^<]+)<\/source>/);

    const title = titleMatch?.[1] || '';
    const url = linkMatch?.[1] || '';
    const pubDate = pubDateMatch?.[1] || '';
    const description = descMatch?.[1] || '';
    const source = sourceMatch?.[1] || 'Unknown';

    if (!url || !title) return null;

    // Clean up description (remove HTML tags)
    const cleanDesc = description.replace(/<[^>]*>/g, '').trim().substring(0, 200);

    // Determine type based on URL and title
    let type = 'news';
    const lowerTitle = title.toLowerCase();
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') ||
        lowerTitle.includes('video') || lowerTitle.includes('watch')) {
      type = 'video';
    } else if (lowerUrl.includes('facebook.com') || lowerUrl.includes('twitter.com') ||
               lowerUrl.includes('instagram.com') || lowerUrl.includes('tiktok.com') ||
               lowerUrl.includes('x.com')) {
      type = 'social';
    } else if (lowerTitle.includes('interview') || lowerTitle.includes('speaks out') ||
               lowerTitle.includes('testimony') || lowerTitle.includes('exclusive')) {
      type = 'interview';
    } else if (lowerTitle.includes('press release') || lowerTitle.includes('statement')) {
      type = 'press';
    }

    return {
      id: Date.now() + Math.floor(Math.random() * 10000),
      title: title.trim(),
      url: url.trim(),
      source: source.trim(),
      date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      description: cleanDesc,
      type: type,
      searchTerm: searchTerm,
      foundAt: new Date().toISOString()
    };
  } catch (error) {
    return null;
  }
}

// Schedule: Daily at 9 AM UTC (4 AM EST / 5 AM EDT)
export const config = {
  schedule: '0 9 * * *'
};
