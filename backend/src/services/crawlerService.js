import Parser from 'rss-parser';
const parser = new Parser();
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

// Function to fetch articles from RSS feed
import { summarizeWithApiFallback } from './summarizationService.js';
import databaseService from './databaseService.js';

export const fetchArticlesFromRss = async (feedUrl) => {
    const articles = [];
    try {
        const feed = await parser.parseURL(feedUrl);

        const limit = 1; // changed to 1 for testing purposes, change back later
        const items = feed.items.slice(0, limit);

        for (const item of items) {
            try {
                // Check if the article already exists in the database
                const existingArticle = await databaseService.getArticleByLink(item.link);
                if (existingArticle) {
                    console.log(`Article already exists: skipping insertion`);
                    continue; // Skip to the next article
                }

                let newsContent;
                if (item.content) {
                    newsContent = item.content;
                } else if (item.description) {
                    newsContent = item.description;
                } else {
                    newsContent = item.title;
                }

                let summary = "";
                summary = await summarizeWithApiFallback(newsContent);

                if (!summary) {
                    console.log("No summary generated at all.");
                    continue; // Skip to the next article
                }

                const article = {
                    title: item.title,
                    link: item.link,
                    date: item.pubDate,
                    summary: summary,
                };

                try {
                    await databaseService.insertArticle(article);
                    articles.push(article);
                } catch (error) {
                    console.error("Error inserting article into database:", error);
                }

            } catch (error) {
                console.error("Error processing article:", error);
            }
        }
        return articles;
    } catch (error) {
        if (error instanceof Error && error.message.includes('Status code 404')) {
            console.warn(`RSS feed not found: ${feedUrl}`);
        } else {
            console.error("Error fetching RSS feed:", error);
        }
        return [];
    }
};

export const fetchArticlesFromUrls = async (urls) => {
    const articles = [];

    for (const url of urls) {
        const scrapedArticles = await exports.scrapeArticlesFromHtml(url);
        articles.push(...scrapedArticles);
    }

    return articles;
};


export const scrapeArticlesFromHtml = async (url) => {
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

        const summary = await summarizeWithApiFallback(content);

        const article = {
            title: title,
            link: url,
            date: new Date().toISOString(), // Current date
            summary: summary,
        };

        try {
            await databaseService.insertArticle(article);
        } catch (error) {
            console.error("Error inserting article into database:", error);
        }

        return [article];
    } catch (error) {
        console.error(`Error scraping HTML from ${url}:`, error);
        return [];
    }
};
