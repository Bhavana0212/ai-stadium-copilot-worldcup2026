# AI Stadium Copilot - FIFA World Cup 2026

## Project Overview
AI Stadium Copilot is a production-style Generative AI platform designed for FIFA World Cup 2026 stadium operations. It unifies fan guidance, accessibility assistance, live operational insights, sustainability monitoring, and transportation planning into one responsive experience.

## FIFA World Cup 2026 Challenge Alignment
The platform directly supports the hackathon challenge by demonstrating how AI can improve matchday experiences for fans, operators, and staff through multilingual assistance, contextual guidance, incident awareness, and data-driven recommendations.

## Architecture
- Frontend: Next.js 15 with TypeScript and Tailwind CSS
- UI components: responsive dashboard cards, charts, and navigation
- AI layer: Google Gemini API through a dedicated chat route
- Data layer: typed service and dashboard models
- Deployment-ready structure for future API and analytics integration

## AI Workflow
1. A fan or operator submits a natural-language request through the assistant UI.
2. The app validates the prompt and sends it to the Gemini-backed chat endpoint.
3. The AI returns a concise response tailored for accessibility, transportation, emergency, or operational guidance.
4. The response is rendered in the dashboard with clear next steps.

## Features
- AI Stadium Assistant for questions, transportation, emergency support, and accessibility help
- Fan dashboard with match, navigation, food, restroom, accessibility, and transportation modules
- Operations dashboard with crowd density, queue status, incident reports, and AI recommendations
- Accessibility center with wheelchair routes, voice assistance, text size controls, and language tools
- Sustainability dashboard for energy, waste, and carbon recommendations
- Transportation assistant with shuttle, parking, and public transport guidance

## Technology Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- lucide-react
- recharts
- Google Gemini API

## Installation
1. Navigate to the frontend folder.
2. Copy .env.example to .env.local and add your Gemini key.
3. Install dependencies with npm install.
4. Start the app with npm run dev.

## Deployment Instructions
- Deploy the frontend to Vercel or any Node-compatible host.
- Set the GEMINI_API_KEY and NEXT_PUBLIC_APP_URL environment variables in the deployment environment.
- Ensure the production build succeeds with npm run build before release.

## Screenshots
Screenshots can be added after local run screenshots are captured in the demo environment.

## Future Roadmap
- Add real-time websocket feeds for crowd analytics
- Introduce authentication and role-based dashboards
- Connect live event and map data
- Expand sustainability and emergency response modules



