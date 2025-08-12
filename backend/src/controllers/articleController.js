// Implement logic to fetch articles with filters
const { getAllArticles, clearDatabase } = require('../services/databaseService');


exports.getArticles = async (req, res) => {
  try {
    getAllArticles((err, articles) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      res.status(200).json(articles);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Implement logic to trigger manual fetch
const { fetchArticlesFromRss } = require('../services/crawlerService');

exports.fetchNow = async (req, res) => {
  try {
    delete require.cache[require.resolve('../config/sources')];
    const sources = require('../config/sources');

    // Fetch articles from all RSS feeds defined in sources.js
    // console.log(sources)
    const sourcesCopy = [...sources];

    if (!Array.isArray(sourcesCopy)) {
      console.error("sourcesCopy is not an array!");
      return res.status(500).json({ message: "Server error: sources is not an array" });
    }

    // console.log(sourcesCopy)

    for (let i = 0; i < sourcesCopy.length; i++) {
      const source = sourcesCopy[i];

      if (!source || typeof source !== 'object') {
        console.error(`Invalid source object at index ${i}:`, source);
        continue; // Skip to the next source
      }

      const sourceCopy = { ...source }; // Create a copy of the source object

      await fetchArticlesFromRss(sourceCopy.url);
    }

    res.status(200).json({ message: "Fetch triggered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.clearDatabase = async (req, res) => {
  try {
    clearDatabase((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      res.status(200).json({ message: "Database cleared successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};