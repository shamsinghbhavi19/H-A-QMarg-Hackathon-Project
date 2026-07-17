import { GoogleGenAI } from "@google/genai";

let aiClient = null;

const getGenAI = () => {
    if (!aiClient) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined in environment variables.");
        }
        aiClient = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
                headers: {
                    'User-Agent': 'aistudio-build',
                }
            }
        });
    }
    return aiClient;
};

const generatePetition = async ({ name, district, caseType, description, language }) => {
    const ai = getGenAI();
    
    const prompt = `You are an expert legal counsel. Draft a formal legal petition based on the following details:
- Petitioner Name: ${name || "Not Specified"}
- Jurisdiction/District Court: ${district || "Not Specified"}
- Type of Case: ${caseType || "Not Specified"}
- Case Description/Facts of the Matter: ${description || "Not Specified"}
- Preferred Language: ${language || "English"}

Please ensure the legal draft contains standard legal petition components, including:
1. Court Name and Title of the Petition
2. Memo of Parties (Petitioner vs. Respondent)
3. Brief Facts of the Case
4. Grounds for the Petition
5. Prayer/Relief Sought
6. Verification block

The entire draft should be drafted professionally in the requested language (${language || "English"}).`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
};

export { generatePetition };
export async function generateChatResponse(message) {
  try {
    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return response.text;
  } catch (error) {
    console.error("Error in generateChatResponse:", error);
    throw error;
  }
}
