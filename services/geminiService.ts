import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.ts";

export const fetchHoopLogicAnalysis = async () => {
  // 1. Get the key from Vite's environment
  const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!GOOGLE_API_KEY) {
    throw new Error("API Key missing! Please set VITE_GEMINI_API_KEY in Vercel.");
  }

  // 2. NEW 2025 SYNTAX: You MUST pass an object, not just the string
  const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

  try {
    // 3. The new SDK uses 'ai.models.generateContent' directly
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Quantify market sentiment and results for NBA/NCAAB for ${new Date().toLocaleDateString()}. Analyze r/sportsbook, r/algobetting, and Action Network. Return the results in JSON format.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    // ... rest of your parsing logic ...

    const rawText = response.text || "";
    
    // Robust extraction of JSON from the model's text response
    let jsonString = "";
    const codeBlockMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
    } else {
      const curlyMatch = rawText.match(/\{[\s\S]*\}/);
      if (curlyMatch) {
        jsonString = curlyMatch[0];
      }
    }

    if (!jsonString) {
      throw new Error("Intelligence stream returned an unparseable format.");
    }

    // Grounding citations like [1] or [2] can break JSON parsing if they appear inside values.
    // We strip them before parsing.
    const cleanJson = jsonString.replace(/\[\d+\]/g, "").trim();

    const rawData = JSON.parse(cleanJson);
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Betting Source',
      uri: chunk.web?.uri || '#'
    })) || [];

    return {
      ...rawData,
      timestamp: new Date().toISOString(),
      sources
    };
  } catch (error) {
    console.error("HoopLogic Sync Error:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Corrupted data packet received from quant stream.");
    }
    // Propagate original error message for debugging if it's a known API error
    throw error;
  }
};
