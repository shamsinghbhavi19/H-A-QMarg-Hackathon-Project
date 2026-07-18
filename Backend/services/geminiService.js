import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ---------------- CHATBOT ----------------
export async function generateChatResponse(message) {
  try {
    const response = await ai.models.generateContent({
      // We will adjust the model after the server starts successfully
      model: "gemini-2.5-flash",
      contents: message,
    });

    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
}

// ---------------- PETITION ----------------
export async function generatePetition(topic, target, description) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Draft a professional legal petition.

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