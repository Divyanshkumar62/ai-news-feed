const express = require("express");
const articleController = require("./../controllers/articleController");

const router = express.Router();

router.get("/articles", articleController.getArticles);
router.post("/fetch-now", articleController.fetchNow);
router.post("/clear-database", articleController.clearDatabase);

module.exports = router;
