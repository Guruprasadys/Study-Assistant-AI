import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// ========================================
// Environment Variables
// ========================================

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-10-21";

if (!endpoint) {
  throw new Error("AZURE_OPENAI_ENDPOINT is missing.");
}

if (!apiKey) {
  throw new Error("AZURE_OPENAI_API_KEY is missing.");
}

if (!deployment) {
  throw new Error("AZURE_OPENAI_DEPLOYMENT is missing.");
}

console.log("====================================");
console.log("Azure OpenAI Configuration");
console.log("Endpoint :", endpoint);
console.log("Deployment :", deployment);
console.log("API Version :", apiVersion);
console.log("====================================");

// ========================================
// Azure OpenAI Client
// ========================================

const client = new OpenAI({
  apiKey,
  baseURL: `${endpoint}/openai/deployments/${deployment}`,
  defaultQuery: {
    "api-version": apiVersion,
  },
  defaultHeaders: {
    "api-key": apiKey,
  },
});

// ========================================
// Delay
// ========================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========================================
// Generate Study Set
// ========================================

export async function generateStudySet(prompt) {
  if (!prompt?.trim()) {
    throw new Error("Prompt cannot be empty.");
  }

  const systemPrompt = `
You are Study Assistant AI.

Return ONLY valid JSON.

{
  "title":"",
  "flashcards":[
    {
      "question":"",
      "answer":""
    }
  ],
  "quiz":[
    {
      "question":"",
      "options":["","","",""],
      "correctAnswer":""
    }
  ]
}

Rules

- Minimum 10 flashcards
- Minimum 10 quiz questions
- Exactly 4 options
- One correct answer
- No markdown
- No explanation
`;

  let lastError = "Unknown Error";

  for (let retry = 1; retry <= 3; retry++) {
    try {
      console.log(`\n========== Attempt ${retry} ==========`);

      const response = await client.chat.completions.create({
        model: deployment,

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
        max_tokens: 4000,

        response_format: {
          type: "json_object",
        },
      });

      console.log("\n========== RAW RESPONSE ==========");
      console.dir(response, { depth: null });

      if (!response) {
        throw new Error("Azure returned null response.");
      }

      if (!response.choices) {
        throw new Error("No choices property found.");
      }

      if (response.choices.length === 0) {
        throw new Error("Choices array is empty.");
      }

      const message = response.choices[0].message;

      console.log("\nFinish Reason:");
      console.log(response.choices[0].finish_reason);

      console.log("\nMessage:");
      console.dir(message, { depth: null });

      const content = message?.content;

      if (!content || content.trim() === "") {
        throw new Error(
          "Message content is empty.\n" +
            JSON.stringify(response, null, 2)
        );
      }

      console.log("\n========== SUCCESS ==========\n");

      return content;
    } catch (error) {
      console.log("\n========== AZURE ERROR ==========");

      console.dir(error, {
        depth: null,
      });

      if (error.status) {
        console.log("Status:", error.status);
      }

      if (error.code) {
        console.log("Code:", error.code);
      }

      if (error.type) {
        console.log("Type:", error.type);
      }

      if (error.response) {
        console.dir(error.response, {
          depth: null,
        });
      }

      console.log("=================================\n");

      lastError = error.message || "Unknown Azure Error";

      if (retry < 3) {
        console.log("Retrying in 2 seconds...");
        await sleep(2000);
      }
    }
  }

  throw new Error(lastError);
}