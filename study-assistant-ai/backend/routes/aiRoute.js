import express from "express";
import { generateStudySetController } from "../controllers/aiController.js";

const router = express.Router();

/**
 * POST
 * /api/ai/generate
 */
router.post("/ai/generate", generateStudySetController);

/**
 * GET
 * /api/health
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Study Assistant AI API is running.",
    timestamp: new Date().toISOString(),
  });
});

export default router;