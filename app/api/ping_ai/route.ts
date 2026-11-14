import { GoogleGenAI } from "@google/genai";

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
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const query = body.prompt || body.question;

    if (!query) {
      return Response.json({ error: "No prompt provided" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: query,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    const reply = res.text ?? "Sorry, I could not generate a response.";

    return Response.json({ reply, answer: reply });
  } catch (error: any) {
    console.error("Gemini error:", error);
    return Response.json(
      { error: error?.message || "AI request failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ status: "ok", message: "AI endpoint is active" });
}
