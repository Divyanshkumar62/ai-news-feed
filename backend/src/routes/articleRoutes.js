const express = require("express");
const articleController = require("./../controllers/articleController");

const router = express.Router();

router.get("/articles", articleController.getArticles);
router.post("/fetch-now", articleController.fetchNow);
router.post("/clear-database", articleController.clearDatabase);
router.post("/articles/:id/view", articleController.incrementViewCount);
router.get("/articles/most-popular", articleController.getMostPopularArticles);
router.get("/articles/most-shared", articleController.getMostSharedArticles);
router.get("/articles/most-recent", articleController.getArticles);
router.post("/articles/:id/share", articleController.incrementShareCount);

module.exports = router;
