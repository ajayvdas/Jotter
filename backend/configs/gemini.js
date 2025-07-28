import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY, // Explicitly pass the API key
});

async function main(prompt) {
try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    //   console.log(response.text);
    return response.text;
} catch (error) {
  console.error("Error calling Gemini API:", error.message);
  throw new Error("Failed to generate content from AI.");
}
}

export default main;
