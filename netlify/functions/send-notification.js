// Email notification function for crawler results
// This is a helper that can be triggered by the crawler or manually

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { articles, recipient } = JSON.parse(event.body);

    if (!articles || !Array.isArray(articles)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid articles data' })
      };
    }

    const emailRecipient = recipient || process.env.CRAWLER_EMAIL_RECIPIENT;

    if (!emailRecipient) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No recipient email configured' })
      };
    }

    // Format articles for email
    const articleList = articles.map((article, index) =>
      `${index + 1}. ${article.headline}
   Source: ${article.outlet}
   Link: ${article.link}
   Type: ${article.type}
   Date: ${article.date}
`
    ).join('\n');

    const emailBody = `
New Media Coverage Found for Justice for Logan
==============================================

The automated crawler has found ${articles.length} new article(s):

${articleList}

To approve these articles:
1. Review each article link above
2. For approved articles, add them to src/data/mediaArticles.json
3. Set "approved": true for each one
4. Commit and push to GitHub to deploy

Full JSON data:
${JSON.stringify(articles, null, 2)}

---
This is an automated message from the Justice for Logan media crawler.
Timestamp: ${new Date().toISOString()}
    `.trim();

    console.log('Notification prepared for:', emailRecipient);
    console.log('Articles count:', articles.length);

    // TODO: Integrate with your email service
    // Example with SendGrid (install @sendgrid/mail):
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: emailRecipient,
      from: 'noreply@justiceforlogan.com',
      subject: `🔔 ${articles.length} New Media Coverage Found`,
      text: emailBody
    });
    */

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Notification logged (email integration pending)',
        recipient: emailRecipient,
        articleCount: articles.length
      })
    };

  } catch (error) {
    console.error('Notification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
