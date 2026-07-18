import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generate Petition
 */
export async function generatePetition(topic, target, description) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Draft a professional petition.

Topic: ${topic}
Target: ${target}
Description: ${description}`,
    });

    return response.text;
  } catch (error) {
    console.error("Petition Error:", error);
    throw error;
  }
}

/**
 * AI Chatbot
 */
export async function generateChatResponse(message) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: message,
    });

    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
}