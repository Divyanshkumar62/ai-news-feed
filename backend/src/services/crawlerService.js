const Parser = require('rss-parser');
const parser = new Parser();

// Function to fetch articles from RSS feed
const { summarizeWithOllama, summarizeWithApiFallback } = require('./summarizationService');
const databaseService = require('./databaseService');

exports.fetchArticlesFromRss = async (feedUrl) => {
  try {
    const feed = await parser.parseURL(feedUrl);
    const articles = [];

    for (const item of feed.items) {
      let summary = "";
      if (item.content) {
          summary = await summarizeWithOllama(item.content) || await summarizeWithApiFallback(item.content);
      } else if (item.description) {
          summary = await summarizeWithOllama(item.description) || await summarizeWithApiFallback(item.description);
      } else {
          summary = await summarizeWithOllama(item.title) || await summarizeWithApiFallback(item.title);
      }

      const article = {
        title: item.title,
        link: item.link,
        date: item.pubDate,
        summary: summary,
      };

      await new Promise((resolve, reject) => {
        databaseService.insertArticle(article, (err) => {
          if (err) {
            console.error("Error inserting article into database:", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
      articles.push(article);
    }
    return articles;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};

exports.fetchArticlesFromUrls = async (urls) => {
    const articles = [];

    for (const url of urls) {
        const scrapedArticles = await exports.scrapeArticlesFromHtml(url);
        articles.push(...scrapedArticles);
    }

    return articles;
};

const cheerio = require('cheerio');
const fetch = require('node-fetch');

exports.scrapeArticlesFromHtml = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Example: Extract title and content from a typical article structure
    const title = $('h1').text() || $('title').text();
    const content = $('article').text() || $('body').text(); // Adjust selectors as needed

    if (!title || !content) {
      console.warn(`Could not extract title or content from ${url}`);
      return [];
    }

    const summary = await summarizeWithOllama(content) || await summarizeWithApiFallback(content);

    const article = {
      title: title,
      link: url,
      date: new Date().toISOString(), // Current date
      summary: summary,
    };

    await new Promise((resolve, reject) => {
      databaseService.insertArticle(article, (err) => {
        if (err) {
          console.error("Error inserting article into database:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return [article];
  } catch (error) {
    console.error(`Error scraping HTML from ${url}:`, error);
    return [];
  }
};