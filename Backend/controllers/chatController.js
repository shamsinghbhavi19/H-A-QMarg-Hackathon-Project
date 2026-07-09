import { generateChatResponse } from "../services/geminiService.js";

/**
 * Controller to handle chat requests.
 * Uses generateChatResponse() to get an AI reply from Gemini.
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function handleChat(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    // Call service to get response from Gemini
    const aiResponse = await generateChatResponse(message);

    return res.json({
      success: true,
      reply: aiResponse
    });
  } catch (error) {
    console.error("Error in handleChat controller:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate chat response"
    });
  }
}
