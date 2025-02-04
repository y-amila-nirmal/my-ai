import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GENAI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const genarateContent = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
};