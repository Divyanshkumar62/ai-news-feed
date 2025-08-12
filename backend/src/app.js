const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");
const { handleError } = require("./utils/errorHandler");
const cron = require("node-cron");
const { fetchArticlesFromRss, fetchArticlesFromUrls } = require("./services/crawlerService");
const { sources } = require("./config/sources");
const dotenv = require('dotenv')

dotenv.config() 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", articleRoutes);

// Error handling
app.use(handleError);

// Schedule news fetching and summarization
cron.schedule("0 */6 * * *", async () => {
  console.log("Running cron job...");
  try {
    const sourcesCopy = [...sources];
    for (const source of sourcesCopy) {
      if (source.type === "rss") {
        const articles = await fetchArticlesFromRss(source.url);
        console.log(`Fetched ${articles.length} articles from ${source.name}`);
      } else if (source.type === "html") {
        const articles = await fetchArticlesFromUrls([source.url]);
        console.log(`Scraped ${articles.length} articles from ${source.name}`);
      }
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});

module.exports = app;