import express from 'express';
import { getArticles, fetchNow, getMostPopularArticles, getMostSharedArticles } from "./../controllers/articleController.js";
import databaseService from "../services/databaseService.js";

const router = express.Router();

router.get("/articles", getArticles);
router.post("/fetch-now", fetchNow);
router.post("/clear-database", databaseService.clearDatabase);
router.post("/articles/:id/view", databaseService.incrementViewCount);
router.get("/articles/most-popular", getMostPopularArticles);
router.get("/articles/most-shared", getMostSharedArticles);
router.get("/articles/most-recent", getArticles);
router.post("/articles/:id/share", databaseService.incrementShareCount);


export default router;
