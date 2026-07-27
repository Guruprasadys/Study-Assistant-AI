import type { ApiResponse } from "../types/flashcard";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * Generate Study Set using Azure OpenAI Backend
 */
export async function generateStudySet(
  prompt: string
): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  let data: any = {};

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response received from the server.");
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        "Failed to generate the study set."
    );
  }

  if (!data.success) {
    throw new Error(
      data.error || "Study set generation failed."
    );
  }

  return data as ApiResponse;
}

/**
 * Check Backend Status
 */
export async function checkBackendHealth() {
  const response = await fetch(
    `${API_BASE_URL.replace("/api", "")}/health`
  );

  if (!response.ok) {
    throw new Error("Backend server is not running.");
  }

  return response.json();
}