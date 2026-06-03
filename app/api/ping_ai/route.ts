import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant embedded in Pragadeeshwaran's personal portfolio website.
Answer questions about him in a friendly, professional tone.

About Pragadeeshwaran:
- Computer Science Engineering student
- Skills: C++, Java, Python, Next.js, Oracle, Git & GitHub
- Projects: Railway Reservation System, ShadowOps Digital Twin
- Email: pragadeeshwaran060@gmail.com
- Passionate about software development and building software systems that matter

Keep answers concise (2-4 sentences). If asked something you don't know, say you don't have that information.`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "No prompt provided" }, { status: 400 });
    }

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${SYSTEM_PROMPT}\n\nUser question: ${prompt}`,
    });

    const reply = res.text ?? "Sorry, I could not generate a response.";

    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    return Response.json({ error: "AI request failed" }, { status: 500 });
  }
}