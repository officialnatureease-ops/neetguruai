// ============================================================
// Vercel Serverless Function — /api/questions
// Uses Google Gemini API with Google Search grounding
// FREE tier available at ai.google.dev
// ============================================================

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { subject, chapter, count = 20 } = req.body || {};
  if (!subject) return res.status(400).json({ error: "subject required" });

  // ── Gemini API Key (set in Vercel environment variables) ──
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not set in Vercel env" });

  try {
    // 3 parallel calls with different source hints = more unique questions
    const batchSize = Math.ceil(count / 3);

    const [r1, r2, r3] = await Promise.allSettled([
      callGemini(apiKey, subject, chapter, batchSize, "NEET PYQ 2018-2024 AIPMT previous year"),
      callGemini(apiKey, subject, chapter, batchSize, "Allen Kota DPP Motion Institute module"),
      callGemini(apiKey, subject, chapter, batchSize, "Physics Wallah Aakash module NCERT exemplar"),
    ]);

    let all = [];
    for (const r of [r1, r2, r3]) {
      if (r.status === "fulfilled") all.push(...r.value);
    }

    // Deduplicate
    const seen = new Set();
    const unique = all.filter(q => {
      const k = q.q.substring(0, 40).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    return res.status(200).json({ questions: unique, count: unique.length });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message });
  }
}

// ── Call Gemini with Google Search grounding ──
async function callGemini(apiKey, subject, chapter, count, sourceHint) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const prompt = buildPrompt(subject, chapter, count, sourceHint);

  const body = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    tools: [{
      google_search: {}  // Google Search grounding — pulls real data from web!
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    }
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Gemini error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  return extractQuestions(data, subject, chapter);
}

function buildPrompt(subject, chapter, count, sourceHint) {
  return `You are a NEET exam MCQ expert. Search Google for "${sourceHint}" questions on ${subject}${chapter ? ` chapter "${chapter}"` : ""} and generate ${count} unique high-quality MCQs for Indian NEET exam preparation.

Search for these specifically:
- NEET ${subject} ${chapter || ""} questions from ${sourceHint}
- NEET ${new Date().getFullYear()} ${subject} ${chapter || ""} MCQ

Generate EXACTLY ${count} questions about ${subject}${chapter ? ` — ONLY from chapter "${chapter}"` : ""}.

STRICT RULES:
1. Subject: ${subject} only${chapter ? `. Chapter: "${chapter}" ONLY — no other chapter.` : "."}
2. Return ONLY a raw JSON array — absolutely no extra text, no markdown backticks.
3. Mix difficulty: 30% Easy, 50% Medium, 20% Hard.
4. All 4 options must be scientifically plausible — no obviously wrong answers.
5. Explanation must include the formula or concept.
6. Every question must be UNIQUE.

Return ONLY this JSON array format, nothing else:
[
  {
    "q": "Complete question text ending with ?",
    "opts": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "ans": 0,
    "ch": "${chapter || subject}",
    "src": "NEET 2023",
    "diff": "Medium",
    "exp": "Explanation with concept/formula used."
  }
]`;
}

function extractQuestions(data, subject, chapter) {
  try {
    // Extract text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts
      ?.map(p => p.text || "")
      .join("\n") || "";

    // Find all JSON arrays in response
    const matches = text.match(/\[[\s\S]*?\]/g) || [];
    if (matches.length === 0) return [];

    // Use the longest match (most likely the questions array)
    const longest = matches.sort((a, b) => b.length - a.length)[0];
    const parsed = JSON.parse(longest);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(q => q && q.q && Array.isArray(q.opts) && q.opts.length === 4)
      .map(q => ({
        q:       String(q.q).trim(),
        opts:    q.opts.map(o => String(o).trim()),
        ans:     Math.min(Math.max(Number(q.ans) || 0, 0), 3),
        ch:      String(chapter || q.ch || subject),
        src:     String(q.src || "NEET PYQ"),
        diff:    ["Easy", "Medium", "Hard"].includes(q.diff) ? q.diff : "Medium",
        exp:     String(q.exp || "Refer NCERT."),
        subject
      }));
  } catch (e) {
    console.error("Parse error:", e.message);
    return [];
  }
}
