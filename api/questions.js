export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { subject, chapter, count = 20 } = req.body || {};
  if (!subject) return res.status(400).json({ error: "subject required" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not set in Vercel env" });

  try {
    const batch = Math.ceil(count / 3) + 5;

    // 3 parallel calls — each searches different coaching institute
    const [r1, r2, r3] = await Promise.allSettled([
      callGemini(apiKey, subject, chapter, batch, "NEET PYQ 2019 2020 2021 2022 2023 2024 AIPMT previous year questions"),
      callGemini(apiKey, subject, chapter, batch, "Allen Kota DPP Motion Institute Resonance study material"),
      callGemini(apiKey, subject, chapter, batch, "Physics Wallah PW Arjuna Aakash NCERT Exemplar solutions"),
    ]);

    let all = [];
    for (const r of [r1, r2, r3]) {
      if (r.status === "fulfilled") all.push(...r.value);
      else console.warn("Batch failed:", r.reason?.message);
    }

    // Strict filter — correct subject AND chapter
    all = all.filter(q => {
      if (!q?.q) return false;
      if (q.subject.toLowerCase() !== subject.toLowerCase()) return false;
      if (chapter) {
        const qch = (q.ch || "").toLowerCase();
        const ch  = chapter.toLowerCase();
        if (!qch.includes(ch) && !ch.includes(qch)) return false;
      }
      return true;
    });

    // Deduplicate by first 50 chars of question
    const seen = new Set();
    const unique = all.filter(q => {
      const k = q.q.substring(0, 50).toLowerCase().replace(/\s+/g, " ");
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    console.log(`✅ ${unique.length} questions for ${subject} - ${chapter || "all chapters"}`);
    return res.status(200).json({ questions: unique, count: unique.length });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message });
  }
}

async function callGemini(apiKey, subject, chapter, count, source) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(subject, chapter, count, source) }] }],
      tools: [{ google_search: {} }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain"
      }
    })
  });

  if (!resp.ok) throw new Error(`Gemini ${resp.status}: ${await resp.text().then(t => t.substring(0, 200))}`);

  const data = await resp.json();
  return extractQuestions(data, subject, chapter);
}

function buildPrompt(subject, chapter, count, source) {
  return `Search Google for: "${source} ${subject} ${chapter || ""} MCQ questions"

You are a NEET exam expert. Using search results, generate EXACTLY ${count} MCQ questions.

MANDATORY CONSTRAINTS:
- Subject: ${subject} (ONLY this subject — no Physics if asked Chemistry, no Biology if asked Physics)
${chapter ? `- Chapter: "${chapter}" ONLY — every single question must be from this chapter` : `- Cover all chapters of ${subject}`}
- For NEET India exam (Class 11-12 level)
- Based on NCERT syllabus

OUTPUT: Return ONLY a JSON array. No text before [. No text after ]. No markdown. No explanation.

[
  {
    "q": "Full question text here?",
    "opts": ["Option A", "Option B", "Option C", "Option D"],
    "ans": 0,
    "ch": "${chapter || subject}",
    "subject": "${subject}",
    "src": "NEET 2023",
    "diff": "Medium",
    "exp": "Explanation with formula or concept."
  }
]

Start the JSON array immediately with [ and end with ]. Generate all ${count} questions now.`;
}

function extractQuestions(data, subject, chapter) {
  try {
    const text = (data?.candidates?.[0]?.content?.parts || [])
      .map(p => p.text || "").join("\n");

    // Remove markdown if present
    const clean = text.replace(/```json|```/g, "").trim();

    // Find JSON array
    const start = clean.indexOf("[");
    const end   = clean.lastIndexOf("]");
    if (start === -1 || end === -1 || end <= start) return [];

    const jsonStr = clean.substring(start, end + 1);
    const parsed  = JSON.parse(jsonStr);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(q => q?.q && Array.isArray(q.opts) && q.opts.length === 4)
      .map(q => ({
        q:       String(q.q).trim(),
        opts:    q.opts.map(o => String(o).trim()),
        ans:     Math.min(Math.max(Number(q.ans) || 0, 0), 3),
        ch:      String(chapter || q.ch || subject),
        src:     String(q.src || "NEET PYQ"),
        diff:    ["Easy","Medium","Hard"].includes(q.diff) ? q.diff : "Medium",
        exp:     String(q.exp || "Refer NCERT."),
        subject: subject
      }));
  } catch (e) {
    console.error("Parse error:", e.message, "| Raw:", (data?.candidates?.[0]?.content?.parts?.[0]?.text || "").substring(0, 300));
    return [];
  }
}
