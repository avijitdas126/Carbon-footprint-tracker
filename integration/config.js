import { GoogleGenAI } from "@google/genai";
import { GEMINI_API } from "../export.js";
import { getProductAndQuanity } from "./system.js";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API,
});

export async function getProductList(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction: getProductAndQuanity,
      temperature: 0.5,
      topP: 0.8,
      topK: 40,
      responseMimeType:'application/json'
    },
  });

  return response.text;
}

