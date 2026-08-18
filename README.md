# ⚖️ JUDGE ME AI

> **"Give us something. We'll judge it."**

**JUDGE ME AI** is a bold, dramatic, and funny AI-powered entertainment platform. It combines **AI Roasting**, **Courtroom Drama**, **Internet Culture**, and **Interactive Public Opinion Polling** into a unified web experience.

---

## 🌟 Key Features

### 1. ⚖️ Courtroom Judging Experience (`/judge`)
Submit photos, bios, outfits, dating profiles, resumes, or questionable life choices. Choose your harshness level (*Merciful 😇*, *Brutally Honest ⚖*, or *Destroy My Spirit 🔥*) to receive official rubber-stamped verdicts, aura rating adjustments, and delusion index scores.

### 2. 🗳️ THE PEOPLE DECIDE (`/people-decide`)
An anonymous public-opinion polling system where users put questions **ON TRIAL** (e.g., *"Should I text my ex?"*). 
- **100% Anonymous Jury Voting**: Voter and creator identities are strictly hidden from the public.
- **One Person = One Vote**: Authenticated via Google Sign-In with backend `poll_id + user_id` uniqueness enforcement.
- **Animated Result Reveal**: Pre-vote percentages remain hidden. After casting a verdict, results reveal with smooth percentage progress animations (*THE PEOPLE HAVE SPOKEN*), coupled with **⚖️ COURT ANALYSIS** and final verdict stamps.

### 3. 👥 Judge a Friend (`/friends`)
Issue an official anonymous **Subpoena** to a friend, or submit group chat screenshots to determine who holds the lowest aura score in the friend group.

### 4. 🎲 Verdict Roulette (`/roulette`)
Spin the wheel of internet destiny to browse community verdicts and test your luck.

### 5. 🔒 Simple Start Onboarding
A non-intrusive introduction screen (*"What should we call you?"*) that personalizes the user's courtroom experience without requiring email, password, or account registration.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom dark courtroom visual identity (near-black background `#08080a`, crimson red accents `#ef4444`, and courtroom gold highlights `#eab308`)
- **Icons**: [Lucide React](https://lucide-react.dev/)
- **Typography**: Google Fonts via `next/font/google` (*Plus Jakarta Sans*, *JetBrains Mono*, and *Permanent Marker*)

---

## 📁 Application Structure

```
src/
├── app/
│   ├── api/             # Backend Route Handlers (/api/users/start, /api/polls, /api/polls/[id]/vote)
│   ├── friends/         # Judge-a-Friend Subpoena hub
│   ├── how-it-works/    # Courtroom rules & FAQ accordion
│   ├── judge/           # Main AI Judging workbench
│   ├── my-polls/        # Authenticated juror dashboard
│   ├── people-decide/   # Public opinion polling platform & poll creation
│   ├── roulette/        # Verdict Roulette spin wheel
│   ├── globals.css      # Custom dark theme, rubber stamp styles & grid background
│   └── layout.tsx       # Root layout wrapped in User & Auth Context Providers
├── components/
│   ├── home/            # Hero, CaseFileWidget, HowItWorks, CategoryGrid, SampleVerdicts, CTASection
│   ├── layout/          # Responsive Navbar & Footer
│   ├── polls/           # PollCard, CreatePollForm, RandomPollWidget
│   └── ui/              # Button, VerdictStamp, OnboardingModal, AuthModal
├── context/
│   ├── AuthContext.tsx  # Google Auth session provider & voting triggers
│   └── UserContext.tsx  # Onboarding state & username persistence
└── lib/
    └── pollsStore.ts    # Data models, unique vote constraints, and poll management
```

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yogesh-15s/Judge_me_AI.git
   cd Judge_me_AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📜 Disclaimer
*JUDGE ME AI is designed strictly for entertainment and emotional damage. Proceed into the courtroom at your own risk!*
