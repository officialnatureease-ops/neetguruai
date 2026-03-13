# NEETGuru 🎓

**AI-powered NEET exam preparation app** with 27 years of PYQs (1999–2025), instant topic analysis, student profiles, and three test modes.

---

## ✨ Features

- **27 Years of PYQs** — NEET & AIPMT questions from 1999 to 2025
- **AI Question Generation** — Claude AI generates fresh questions in PYQ style (Allen, Aakash, Physics Wallah, NCERT Exemplar)
- **3 Test Modes** — Full Mock (180Q/200min), Subject-wise, Chapter-wise
- **Instant Feedback & Exam Mode** — Choose how answers are revealed
- **Topic-wise Analysis** — See your strong and weak chapters after every test
- **Student Profile** — Name, DOB, mobile, email, class, photo upload
- **Test History** — Tracks all past tests with scores
- **Eye-Friendly Design** — Warm off-white theme with Inter & Merriweather fonts
- **NEET Marking Scheme** — +4 correct / −1 wrong / 0 skipped

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/neetguru.git
cd neetguru
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

> Get your free API key at [console.anthropic.com](https://console.anthropic.com/)

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Project Structure

```
neetguru/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← Main application (all screens + logic)
│   └── main.jsx       ← React entry point
├── .env.example       ← API key template
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Anthropic Claude API | AI question generation |
| localStorage | Profile & history persistence |

---

## 📚 Question Sources

| Source | Coverage |
|--------|---------|
| NEET PYQs | 2013–2025 |
| AIPMT PYQs | 1999–2012 |
| NCERT Exemplar | All chapters |
| Allen Module | Physics, Chemistry, Biology |
| Aakash Module | Physics, Chemistry, Biology |
| Physics Wallah | Physics, Chemistry, Biology |
| Resonance DPP | Physics, Chemistry, Biology |

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — deploy to Vercel, Netlify, or any static host.

### Deploy to Vercel (free)

```bash
npm install -g vercel
vercel
```

Set `VITE_ANTHROPIC_API_KEY` in your Vercel project's Environment Variables.

---

## ⚠️ Important Notes

- **Never commit your `.env` file** — it's in `.gitignore` for safety
- The app works without an API key using the built-in local question bank (25 curated PYQs per subject)
- AI question generation requires a valid Anthropic API key
- All student data is stored **locally** in the browser — nothing is sent to any server

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

---

## 📄 License

MIT — free to use and modify.
