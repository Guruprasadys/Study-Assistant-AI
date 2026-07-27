/**
 * Extracts the first valid JSON object from an AI response.
 */

export function extractJson(text) {
  if (!text) {
    throw new Error("The AI returned an empty response.");
  }

  if (typeof text !== "string") {
    throw new Error("Invalid AI response.");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {}

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in the AI response.");
  }

  const jsonString = cleaned.substring(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(error);

    throw new Error("Unable to parse AI JSON response.");
  }
}