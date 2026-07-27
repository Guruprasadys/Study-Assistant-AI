import { generateStudySet } from "../services/azureOpenAI.js";
import { extractJson } from "../utils/extractJson.js";
import { validateStudySet } from "../validators/schema.js";

/**
 * POST /api/ai/generate
 */
export async function generateStudySetController(req, res) {
  try {
    console.log("--------------------------------------");
    console.log("Generating Study Set...");

    const prompt =
      typeof req.body?.prompt === "string"
        ? req.body.prompt.trim()
        : typeof req.body?.notes === "string"
        ? req.body.notes.trim()
        : "";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Please enter a topic or study notes.",
      });
    }

    console.log("Prompt:", prompt);

    // --------------------------------------
    // Generate using Azure OpenAI
    // --------------------------------------

    const rawResponse = await generateStudySet(prompt);

    // --------------------------------------
    // Parse JSON
    // --------------------------------------

    const studySet = extractJson(rawResponse);

    // --------------------------------------
    // Validate Schema
    // --------------------------------------

    const validationError = validateStudySet(studySet);

    if (validationError) {
      return res.status(500).json({
        success: false,
        error: validationError,
      });
    }

    console.log("Study Set Generated Successfully");
    console.log("--------------------------------------");

    return res.status(200).json({
      success: true,
      data: studySet,
    });
  } catch (error) {
    console.log("====================================");
    console.log("Study Set Generation Failed");
    console.error(error);
    console.log("====================================");

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to generate study set.",
    });
  }
}