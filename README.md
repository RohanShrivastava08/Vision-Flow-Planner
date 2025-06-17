# 🌟 VisionFlow – AI-Powered Life Planner & Infographic Generator

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/f19b9bd2-6222-42b4-b680-cea5c836164f" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/9344553b-f0a7-47ae-8668-cacc35029e7c" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/b994745f-2bac-438e-9a61-c44d7e31b157" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/4f6ee395-0803-45c2-86e8-b3209c404432" />


- A transformative AI-powered web application that converts your single-line life goals into actionable, structured, and visual life plans.

- VisionFlow generates personalized vision statements, daily or monthly action plans, motivational affirmations, and infographic visuals—helping you gain clarity and consistency in achieving your dreams.

- Built using Firebase Studio, Next.js 15, React 18, TypeScript, Tailwind CSS, ShadCN UI, and Genkit (powered by Google Gemini).


## 📋 Table of Contents
- Introduction
- Features
- Project Implementation Process
- File Structure
- Technology Stack
- Installation
- Usage
- Screenshots
- Contributing
- License
- Contact

## 📘 Introduction

- VisionFlow is a futuristic life-planning tool that turns your goals into structured, motivational roadmaps—backed by AI and wrapped in a beautiful UI.
- Whether it's a 3-month personal goal or a long-term dream, VisionFlow gives you a clear, creative blueprint to follow.


## ✨ Features

    🧠 AI-Powered Life Plan Generation
→ Generates a personalized vision statement, action steps, productivity tips, reflection prompts, and a daily affirmation based on your goal.

    🗓 Detailed Action Planning
→ Suggests daily habits (for short-term goals) or monthly breakdowns (for long-term goals).

    🚫 What to Avoid + Tips
→ Offers time-wasters to avoid, time management strategies, and useful tools.

    🖼 AI-Generated Infographic
→ Creates a visual summary of your life plan using Gemini-powered Genkit flows.

    📋 Plan Display with Rich UI
→ Showcases all sections of the generated plan in a clean, card-based layout.

    📤 Download & Copy
→ Download full plan as PNG image, infographic, or copy entire plan to clipboard.

    🔄 Start Over
→ Reset and generate a brand-new life plan.

    🌘 Elegant Landing Page
→ Includes About, Features, Testimonials, FAQs, and a live demo. Supports dark/light mode.

## 🛠 Project Implementation Process

#### 1. Life Plan Flow
- Form input → Genkit Gemini flow → structured plan (Vision, Actions, Tips, Affirmation).
- Optimized prompts for different goal timeframes (e.g., 3 months vs. 1 year).

#### 2. Infographic Image Flow
- Generated prompt from the life plan → Image creation via Gemini (2.0 Flash EXP).
- Image URI returned and rendered in frontend UI.

#### 3. UI & UX
- Sections are displayed as cards with icons and emojis.
- Dark/light mode with smooth transitions.
- html-to-image used to download the entire text plan as a PNG.


## 📁 File Structure

```bash
visionflow/
├── src/
│   ├── app/                 # Next.js App Router (layouts, pages, globals)
│   ├── components/
│   │   ├── forms/           # Input form
│   │   ├── landing/         # About, Demo, FAQ, etc.
│   │   ├── layout/          # Header, Footer, Loading Modal
│   │   ├── planner/         # Generated plan sections
│   │   └── ui/              # ShadCN UI components
│   ├── ai/
│   │   ├── flows/           # Genkit AI flows
│   │   ├── dev.ts           # Genkit dev entry point
│   │   └── genkit.ts        # Genkit configuration (Google AI)
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utility functions
│   ├── types/               # Type definitions
├── public/                  # Static assets
├── .env                     # Environment variables
├── apphosting.yaml          # Firebase hosting config
├── tailwind.config.ts       # Tailwind theme setup
├── next.config.ts           # Next.js config
└── README.md

```

## 💻 Technology Stack

Category	Tech Used

🧠 AI Engine	Genkit + Google Gemini (2.0 Flash EXP)

⚛️ Framework	Next.js 15 (App Router), React 18

💅 Styling	Tailwind CSS, ShadCN UI

🔠 Language	TypeScript

✅ Validation	Zod, React Hook Form

🧪 State Management	React Hooks

🖼 Image Generation	html-to-image, Genkit

🚀 Deployment	Vercel


## 🛠 Installation

Follow these steps to set up and run the Techny project locally:

#### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/visionflow.git
cd visionflow
```

#### 2. Install dependencies

```bash
npm install
# or
yarn install
```

#### 3. Set Up Environment Variables

- Create a .env.local file in the root:

```bash
GOOGLE_API_KEY=your_google_ai_api_key
```

Get your API key at: Google AI Studio

#### 4. Run Genkit (AI server)

```bash
npm run genkit:dev
# or for hot reload
npm run genkit:watch
```

### 5. Run the app

```bash
npm run dev
```
Visit: http://localhost:9002

## 🚀 Usage
- Enter a one-line life goal (e.g., “Get fit in 3 months”)
- Generate a detailed AI plan
- View structured plan + motivational content
- Get a beautiful AI-generated infographic
- Copy, download, or start again

🤖 AI Capabilities

Feature	AI Flow	Input	Output

Life Plan Generator	life-plan-generation.ts	Goal input	Full textual roadmap with tips

Infographic Generator	image-generation-flow.ts	Infographic prompt	Visual image (URI) summarizing plan


## 📸 Screenshots

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/f19b9bd2-6222-42b4-b680-cea5c836164f" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/9344553b-f0a7-47ae-8668-cacc35029e7c" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/fd75d597-424b-4466-8e92-f8a5fd97e70c" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/0c800775-3476-428b-a4d3-6881633f5648" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/60cadc0b-da1f-43dd-ae6c-ea579af1ea13" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/39218e9f-85d0-42db-95c7-d60d025c05f8" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/8c7f7000-ac3a-48e8-a6cd-93745c3116cd" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/9c6a2ce9-4a0b-4641-9603-196ecaad0f2c" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/8d8f9236-9fc0-4e14-8712-c034b0e3e970" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/b994745f-2bac-438e-9a61-c44d7e31b157" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/4f6ee395-0803-45c2-86e8-b3209c404432" />


## 🤝 Contributing
We welcome community contributions! Follow the steps below to contribute:

#### Fork the repository
- Create a new branch:
```bash
git checkout -b feature/YourFeature
```

- Commit your changes:
```bash
git commit -m 'Add your feature'
```

- Push to the branch:
```bash
git push origin feature/YourFeature
```

- Open a pull request with detailed explanations of your changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any questions or suggestions, feel free to reach out:

- Email: rohansh0808@gmail.com
- GitHub: Rohansh0808
