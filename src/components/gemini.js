import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Replace with the appropriate way to access environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7,  // Adjusted for less randomness
  topP: 0.9,         // Reduced token probability sampling
  topK: 20,          // Fewer top tokens considered
  maxOutputTokens: 1024, // Limited output tokens
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export async function safeSendMessage(chatPayload) {
    try {
        return await chatSession.sendMessage(chatPayload);
    } catch (error) {
        if (error.message.includes("RATE_LIMIT_EXCEEDED")) {
            console.error("Rate limit exceeded. Retrying...");
            await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 60s
            return await safeSendMessage(chatPayload); // Retry
        }
        throw error; // For other errors
    }
}
