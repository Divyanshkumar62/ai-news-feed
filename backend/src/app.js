import express from 'express';
import cors from "cors";
import articleRoutes from "./routes/articleRoutes.js";
import { handleError } from "./utils/errorHandler.js";
import cron from "node-cron";
import { fetchArticlesFromRss, fetchArticlesFromUrls } from "./services/crawlerService.js";
import sources from "./config/sources.js";
import * as dotenv from 'dotenv';

dotenv.config();
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

export default app;