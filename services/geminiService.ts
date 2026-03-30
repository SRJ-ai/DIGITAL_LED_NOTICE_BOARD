import { GoogleGenAI } from "@google/genai";

export const generateMatrixContent = async (prompt: string, displayType: string = 'scrolling', apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key not provided");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';
    
    let systemInstruction = `You are an assistant for an IoT LED Matrix display. 
    Your goal is to take a user's vague idea (e.g., "tell someone I love them", "happy birthday") 
    and convert it into a short, scrolling-friendly text string.
    Keep the response extremely concise. Max 50 characters.
    Do not add quotes or markdown. Just the raw text payload.`;

    if (displayType === 'static') {
      systemInstruction = `You are an assistant for a large static IoT display. 
      Your goal is to take a user's vague idea and convert it into a clear, readable static text string.
      Keep the response concise and formatted for a larger screen. Max 100 characters.
      Do not add quotes or markdown. Just the raw text payload.`;
    } else if (displayType === 'scrolling') {
      systemInstruction = `You are an assistant for an IoT LED Matrix display. 
      Your goal is to take a user's vague idea and convert it into a short, scrolling-friendly text string.
      Keep the response extremely concise. Max 50 characters.
      Do not add quotes or markdown. Just the raw text payload.`;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        maxOutputTokens: 60,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 },
      }
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};