// ============================================================
// Vercel Serverless Function — /api/questions
// Pulls NEET questions using Anthropic API + web search
// No CORS issues — runs on server side
// ============================================================

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  // CORS headers — allow requests from your Vercel domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { subject, chapter, count = 20 } = req.body || {};
  if (!subject) return res.status(400).json({ error: "subject is required" });

  const apiKey = process.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  try {
    // ── Step 1: Call Anthropic with web_search tool ──
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{
          role: "user",
          content: buildPrompt(subject, chapter, count)
        }]
      })
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      console.error("Anthropic error:", data);
      return res.status(500).json({ error: "Anthropic API failed", detail: data });
    }

    // ── Step 2: Extract JSON from response ──
    const questions = extractQuestions(data, subject, chapter);

    if (questions.length === 0) {
      return res.status(200).json({ questions: [], message: "No questions generated" });
    }

    return res.status(200).json({ questions, count: questions.length });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
}

// ── Build prompt for question generation ──
function buildPrompt(subject, chapter, count) {
  const scope = chapter
    ? `chapter "${chapter}" of ${subject}`
    : `subject ${subject} (all chapters)`;

  return `You are a NEET/AIPMT question generator. Search the web for real questions from Indian coaching institutes, then generate ${count} high-quality NEET MCQs.

SUBJECT: ${subject}
${chapter ? `CHAPTER: ${chapter}` : `SCOPE: All chapters of ${subject}`}
COUNT NEEDED: ${count}

STEP 1 — Search these on web:
- "NEET ${subject} ${chapter || ""} MCQ Allen Kota 2024"
- "NEET ${subject} ${chapter || ""} questions Physics Wallah"
- "NEET ${subject} ${chapter || ""} Motion Institute DPP"
- "AIPMT ${subject} ${chapter || ""} previous year questions"
- "NEET ${subject} ${chapter || ""} Aakash module questions"

STEP 2 — Generate exactly ${count} MCQs for ${scope}.

STRICT RULES:
1. Every question MUST be about ${subject}${chapter ? ` — chapter "${chapter}" ONLY` : ""}.
2. Return ONLY a raw JSON array. No markdown, no backticks, no extra text.
3. Mix difficulty: ~30% Easy, ~50% Medium, ~20% Hard.
4. All 4 options must be scientifically plausible.
5. Explanation must include concept/formula.
6. Use real NEET years for src: NEET 2024, NEET 2023, Allen Module, Motion DPP, PW Arjuna, Aakash Module, NCERT Exemplar.

JSON format (return ONLY this array):
[
  {
    "q": "Question text ending with ?",
    "opts": ["Option A", "Option B", "Option C", "Option D"],
    "ans": 0,
    "ch": "${chapter || subject}",
    "src": "NEET 2023",
    "diff": "Medium",
    "exp": "Explanation with concept/formula."
  }
]`;
}

// ── Extract and validate questions from Anthropic response ──
function extractQuestions(data, subject, chapter) {
  try {
    // Collect all text blocks (may be mixed with tool_use blocks)
    const textBlocks = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n");

    // Find JSON array in response
    const jsonMatch = textBlocks.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) return [];

    // Validate and clean each question
    return parsed
      .filter(q => q && q.q && Array.isArray(q.opts) && q.opts.length === 4)
      .map(q => ({
        q:       String(q.q).trim(),
        opts:    q.opts.map(o => String(o).trim()),
        ans:     Math.min(Math.max(Number(q.ans) || 0, 0), 3),
        ch:      String(chapter || q.ch || subject),
        src:     String(q.src || "NCERT Exemplar"),
        diff:    ["Easy", "Medium", "Hard"].includes(q.diff) ? q.diff : "Medium",
        exp:     String(q.exp || "Refer NCERT for explanation."),
        subject: subject
      }));
  } catch (e) {
    console.error("Parse error:", e);
    return [];
  }
}
