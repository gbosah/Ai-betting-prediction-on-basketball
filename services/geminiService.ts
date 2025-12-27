import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.ts";

export const fetchHoopLogicAnalysis = async () => {
  // --- 1. CHECK THE CACHE FIRST ---
  const cachedData = sessionStorage.getItem('hooplogic_cache');
  if (cachedData) {
    console.log("Loading from browser memory...");
    return JSON.parse(cachedData);
  }

  const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GOOGLE_API_KEY) throw new Error("API Key missing in Vercel!");

  // Use the 2025 object-style initialization
  const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });
  
  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      tools: [{ googleSearch: {} }] 
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `NBA/NCAAB betting analysis for ${new Date().toLocaleDateString()}` }] }],
      generationConfig: { responseMimeType: "application/json" }
    });

    const rawData = JSON.parse(result.response.text());

    // --- 2. SAVE TO CACHE FOR NEXT TIME ---
    sessionStorage.setItem('hooplogic_cache', JSON.stringify(rawData));
    return rawData;

  } catch (error) {
    if (error.message?.includes("429")) {
      throw new Error("Quota Full: Please wait 60 seconds.");
    }
    throw error;
  }
};
