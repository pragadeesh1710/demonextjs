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

    const preferredModel = process.env.GEMINI_MODEL;
    const candidateModels = [
      preferredModel,
      "gemini-3.8-flash",
      "gemini-3.8-flash-lite",
      "gemini-2.5-flash",
      "gemini-1.5-flash",
    ].filter((m, i, arr): m is string => Boolean(m) && arr.indexOf(m) === i);

    let res: any = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        res = await ai.models.generateContent({
          model,
          contents: query,
          config: {
            systemInstruction: SYSTEM_PROMPT,
          },
        });
        if (res?.text) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} failed, attempting fallback:`, err?.message || err);
      }
    }

    if (!res && lastError) {
      throw lastError;
    }

    const reply = res?.text ?? "Sorry, I could not generate a response.";

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
