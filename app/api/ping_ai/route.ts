import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are an AI assistant embedded in Pragadeeshwaran P's personal portfolio website, built especially for placement recruiters, interviewers, and visitors.
Answer questions about him accurately, politely, and professionally.

About Pragadeeshwaran P:
- Education: B.E. in Computer Science and Engineering (2024–2028) at Coimbatore Institute of Technology (CIT), Coimbatore. Current CGPA: 7.88.
- Higher Secondary (HSC): Bharathi Matriculation Higher Secondary School (2024) - 88%.
- Secondary School (SSLC): Bharathi Matriculation Higher Secondary School (2022) - 83%.
- Resume / CV: His official resume is available directly on this website at /resume.pdf. Recruiters can view or download it via the "Resume" button or link.
- Contact Details:
  * Email: pragadeeshwaran060@gmail.com
  * Phone: +91 7538873217
  * LinkedIn: https://linkedin.com/in/pragadeeshwaran-p
  * GitHub: https://github.com/pragadeesh1710
- Technical Skills:
  * Languages: C++, Java, Python
  * Core CS: Data Structures & Algorithms, Operating Systems, Computer Architecture, OOPs, DBMS, Computer Networks
  * Database: MySQL, SQLite
  * Web Development: Next.js, React, JavaScript, HTML, CSS
  * Tools & Frameworks: Git, FastAPI, Flask, VS Code, Vercel
- Key Projects:
  1. LearnHub – Personalized Learning Platform (Next.js, JavaScript, Vercel): Full-stack platform with course browsing, category filters, and an activity-driven recommendation feed based on searches, enrollments, ratings, and learning time.
  2. Personal Portfolio Website (Next.js, JavaScript, CSS, Vercel): Modern responsive portfolio featuring interactive "Ask AI About Me" assistant.
  3. Secure Question Paper Management System (Python, Flask, HTML, CSS, SQLite): Examination security platform for controlled paper distribution and confidentiality protection.
- Internship: Completed software design and development internship on Software Design Intent at Coimbatore Institute of Technology.

Keep answers concise (2-4 sentences), factual, and welcoming to recruiters. If asked for his resume or contact, provide the /resume.pdf link and contact info. If asked something unknown, state that you do not have that information.`;

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
