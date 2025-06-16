
# VisionFlow ✨

VisionFlow is a Next.js web application that leverages AI to transform a user's single-line goal into a detailed, actionable life plan and a visually appealing infographic. It aims to provide users with clarity, motivation, and a structured approach to achieving their aspirations.

## Core Features

-   **AI-Powered Life Plan Generation**:
    -   **Vision Statement**: Generates a personalized vision statement for a specified or default timeframe (e.g., 3 months).
    -   **Action Plan**: Creates a list of daily habits (for short-term goals) or a month-by-month breakdown (for long-term goals).
    -   **Guidance**: Provides lists of what to avoid, time management tips, and optional helpful tools.
    -   **Reflection**: Suggests reflection prompts tailored to the goal's timeframe.
    -   **Motivation**: Includes a customized daily affirmation.
-   **AI Infographic Generation**:
    -   Generates a detailed prompt for an AI image model (Gemini).
    -   Produces a visual infographic summarizing the key aspects of the life plan (Vision, Action Plan, Reflection).
-   **Interactive Plan Display**:
    -   Presents the generated text plan and infographic in a clean, user-friendly card-based UI.
    -   Uses icons and emojis for better readability and engagement.
-   **Plan Management**:
    -   **Copy to Clipboard**: Allows users to easily copy the full text of their generated plan.
    -   **Download Plan as Image**: Enables users to download the entire textual plan section as a PNG image.
    -   **Download Infographic**: Allows users to download the AI-generated infographic image.
    -   **Start Over**: Clears the current input and results, allowing users to generate a new plan.
-   **Engaging Landing Page**:
    -   Includes sections like "Demo," "About," "How It Works," "Features," "Testimonials," and "FAQ" to inform and engage users.
    -   Dark/Light mode toggle.

## Tech Stack

-   **Frontend**:
    -   **Next.js 15+**: React framework (App Router, Server Components, TypeScript).
    -   **React 18+**: UI library.
    -   **ShadCN UI**: Re-usable UI components.
    -   **Tailwind CSS**: Utility-first CSS framework for styling.
    -   **Lucide React**: Icon library.
    -   **React Hook Form**: For managing form state and validation.
    -   **Zod**: Schema declaration and validation.
    -   **html-to-image**: For converting HTML (the plan) to a downloadable PNG.
-   **Generative AI**:
    -   **Genkit (v1.x)**: Firebase's framework for building AI-powered features.
    -   **Google AI (Gemini)**: Used via the `@genkit-ai/googleai` plugin for:
        -   Generating the detailed life plan text.
        -   Generating the infographic image (`gemini-2.0-flash-exp` model).
-   **Deployment/Hosting**:
    -   Configured for Firebase App Hosting (see `apphosting.yaml`).

## How It Works

1.  **User Input**: The user enters a one-line goal into the input form on the homepage.
2.  **Text Plan Generation**:
    -   The frontend calls the `generateLifePlan` Genkit flow (`src/ai/flows/life-plan-generation.ts`).
    -   This flow uses the Gemini model via Genkit to process the goal and generate:
        -   A detailed textual life plan (vision statement, action plan, what to avoid, time management tips, reflection prompts, daily affirmation).
        -   A specific prompt designed for an AI image generator to create an infographic.
3.  **Infographic Generation**:
    -   Once the text plan and infographic prompt are received, the frontend calls the `generateImage` Genkit flow (`src/ai/flows/image-generation-flow.ts`) with the generated prompt.
    -   This flow uses the Gemini model (specifically `gemini-2.0-flash-exp` with image generation capabilities) to create a visual infographic as a data URI.
4.  **Display**:
    -   The application displays the structured text plan in a series of cards.
    -   The generated infographic image is also displayed.
    -   The user can then use the "Copy Plan," "Download Full Plan Image," "Download Infographic," or "Start Over" buttons.
5.  **Loading State**: A modal loading indicator is shown while the AI processes requests, ensuring the user is aware of the background activity.

## Project Structure

Key directories and files:

-   `README.md`: This file.
-   `src/app/page.tsx`: The main page component containing the primary UI and logic for form submission and plan display.
-   `src/app/layout.tsx`: Root layout, includes font setup and Toaster.
-   `src/app/globals.css`: Global styles, Tailwind CSS base/components/utilities, and ShadCN UI theme variables.
-   `src/components/`: Contains various UI components:
    -   `forms/`: Goal input form.
    -   `landing/`: Sections for the landing page (About, Demo, FAQ, Features, HowItWorks, Testimonials).
    -   `layout/`: Header, Footer, LoadingModal.
    -   `planner/`: Components for displaying the generated plan (PlanDisplay, PlanSection).
    -   `ui/`: ShadCN UI components.
    -   `ThemeToggle.tsx`: Dark/Light mode switcher.
-   `src/ai/`: Genkit related files.
    -   `genkit.ts`: Genkit global instance initialization and configuration (uses Google AI plugin).
    -   `dev.ts`: Genkit development server entry point (imports flows).
    -   `flows/`:
        -   `life-plan-generation.ts`: Genkit flow for generating the textual life plan and infographic prompt.
        -   `image-generation-flow.ts`: Genkit flow for generating the infographic image from a prompt.
-   `src/hooks/`: Custom React hooks.
    -   `use-toast.ts`: Toast notification system.
    -   `use-mobile.ts`: Hook to detect mobile viewport.
-   `src/lib/`: Utility functions.
    -   `utils.ts`: General utility functions like `cn` for class names.
-   `src/types/index.ts`: TypeScript type definitions for the application (e.g., `LifePlan`).
-   `public/`: Static assets (though not extensively used in this project for primary content).
-   `package.json`: Project dependencies and scripts.
-   `next.config.ts`: Next.js configuration, including image remote patterns.
-   `tailwind.config.ts`: Tailwind CSS theme and plugin configuration.
-   `components.json`: ShadCN UI configuration.
-   `apphosting.yaml`: Firebase App Hosting configuration.
-   `.env`: For environment variables. **Note**: Ensure you have your Google AI API key set up if required by the Genkit Google AI plugin (e.g., `GOOGLE_API_KEY=your_api_key_here`).

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn

### Environment Variables

Create a `.env` file in the root of the project. You may need to add your Google AI API key if not configured elsewhere for Genkit:

```env
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
```

Replace `YOUR_GEMINI_API_KEY` with your actual API key for Google AI Studio / Vertex AI.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd visionflow
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To run the Next.js development server (usually on `http://localhost:9002` as per `package.json`):

```bash
npm run dev
```

### Running the Genkit Development Server (Optional)

To start the Genkit development server (for inspecting flows, usually on `http://localhost:4000`):

```bash
npm run genkit:dev
```

Or with watching for changes:

```bash
npm run genkit:watch
```
This allows you to view and test your Genkit flows independently.

### Building for Production

```bash
npm run build
```

### Starting the Production Server

```bash
npm run start
```

## Styling Guidelines

-   **Primary Color**: Deep blue (`#3F51B5` - HSL: `231 56% 50%`) for trust, focus, and clarity.
-   **Background Color**: Light gray (`#F0F0F5` - HSL: `220 17% 95%`) for a clean, distraction-free environment.
-   **Accent Color**: Soft lavender (`#C5CAE9` - HSL: `233 49% 88%`) for calmness and creativity.
-   **Headline Font**: 'Space Grotesk' (sans-serif).
-   **Body Font**: 'Inter' (sans-serif).
-   **UI Components**: Primarily ShadCN UI components, styled with Tailwind CSS.
-   **Icons**: Lucide React.

The theme colors are configured in `src/app/globals.css` using HSL CSS variables for easy customization for both light and dark modes.

---

This README provides a comprehensive overview of the VisionFlow application.
