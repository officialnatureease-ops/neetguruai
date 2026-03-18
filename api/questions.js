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
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured in Vercel env variables" });

  try {
    const batch = Math.ceil(count / 3);

    const [r1, r2, r3] = await Promise.allSettled([
      callGemini(apiKey, subject, chapter, batch, "NEET PYQ AIPMT previous year exam"),
      callGemini(apiKey, subject, chapter, batch, "Allen Kota DPP Motion Institute"),
      callGemini(apiKey, subject, chapter, batch, "Physics Wallah Aakash NCERT Exemplar"),
    ]);

    let all = [];
    for (const r of [r1, r2, r3]) {
      if (r.status === "fulfilled") all.push(...r.value);
      else console.error("Batch failed:", r.reason?.message);
    }

    // Deduplicate by first 50 chars of question
    const seen = new Set();
    const unique = all.filter(q => {
      const k = (q.q || "").substring(0, 50).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    console.log(`Generated ${unique.length} questions for ${subject} - ${chapter || "all chapters"}`);
    return res.status(200).json({ questions: unique, count: unique.length });

  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}

async function callGemini(apiKey, subject, chapter, count, sourceHint) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [{
      parts: [{ text: buildPrompt(subject, chapter, count, sourceHint) }]
    }],
    tools: [{ google_search: {} }],
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain"
    }
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini API error ${resp.status}: ${errText.substring(0, 200)}`);
  }

  const data = await resp.json();
  return extractQuestions(data, subject, chapter);
}

function buildPrompt(subject, chapter, count, sourceHint) {
  const chapterLine = chapter
    ? `CHAPTER: "${chapter}" — questions MUST be from this chapter ONLY`
    : `SCOPE: All chapters of ${subject}`;

  return `You are a NEET exam question generator for Indian medical entrance exam.

Search Google for: "${subject} ${chapter || ""} NEET MCQ ${sourceHint}"

TASK: Generate exactly ${count} multiple choice questions.

SUBJECT: ${subject}
${chapterLine}
COUNT: ${count}

ABSOLUTE RULES:
1. Every single question MUST be about ${subject}${chapter ? ` — chapter "${chapter}" ONLY. Do NOT include questions from any other chapter.` : "."}
2. Output ONLY a JSON array. Zero extra text. Zero markdown. Zero explanation outside JSON.
3. "ans" = 0-based index of correct option (0, 1, 2, or 3)
4. "subject" field MUST always be "${subject}"
5. "ch" field MUST always be "${chapter || subject}"
6. All 4 options must be scientifically accurate and plausible for NEET level
7. "diff" must be "Easy", "Medium", or "Hard" only
8. Include concept/formula in "exp" field

OUTPUT FORMAT (return ONLY this, nothing else before or after):
[{"q":"Full question text?","opts":["Option A","Option B","Option C","Option D"],"ans":0,"ch":"${chapter || subject}","subject":"${subject}","src":"NEET 2023","diff":"Medium","exp":"Concept: explanation with formula."}]`;
}

function extractQuestions(data, subject, chapter) {
  try {
    const text = (data?.candidates?.[0]?.content?.parts || [])
      .filter(p => p.text)
      .map(p => p.text)
      .join("\n");

    if (!text) {
      console.warn("Empty Gemini response");
      return [];
    }

    // Try to find JSON array in response
    let parsed = null;

    // Method 1: Find array starting with [{
    const idx = text.indexOf("[{");
    if (idx !== -1) {
      const end = text.lastIndexOf("}]");
      if (end !== -1) {
        try {
          parsed = JSON.parse(text.substring(idx, end + 2));
        } catch {}
      }
    }

    // Method 2: regex fallback
    if (!Array.isArray(parsed)) {
      const matches = text.match(/\[[\s\S]*?\]/g) || [];
      const longest = matches.sort((a, b) => b.length - a.length)[0];
      if (longest) {
        try { parsed = JSON.parse(longest); } catch {}
      }
    }

    if (!Array.isArray(parsed)) {
      console.warn("Could not parse JSON from Gemini response");
      return [];
    }

    return parsed
      .filter(q => q && typeof q.q === "string" && Array.isArray(q.opts) && q.opts.length === 4)
      .map(q => ({
        q:       q.q.trim(),
        opts:    q.opts.map(o => String(o).trim()),
        ans:     Math.min(Math.max(parseInt(q.ans) || 0, 0), 3),
        ch:      chapter || String(q.ch || subject),   // force correct chapter
        src:     String(q.src || "NEET PYQ"),
        diff:    ["Easy","Medium","Hard"].includes(q.diff) ? q.diff : "Medium",
        exp:     String(q.exp || "Refer NCERT."),
        subject: subject   // force correct subject always
      }));

  } catch (e) {
    console.error("Extract error:", e.message);
    return [];
  }
}
