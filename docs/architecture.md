# Architecture

## Overview
AI Stadium Copilot uses a modern full-stack architecture centered on a responsive Next.js application and a Gemini-powered chat API route.

## Frontend
The frontend delivers:
- Fan dashboard
- Operations dashboard
- Accessibility center
- Sustainability and transportation modules
- A conversational AI assistant

## Backend API
The application uses Next.js route handlers to keep the experience self-contained and deployment-friendly. The chat endpoint validates input and forwards the request to the Gemini API.

## AI Layer
Google Gemini provides natural-language support for:
- Stadium information
- Accessibility recommendations
- Emergency guidance
- Transportation help
- Multilingual responses

## Security Controls
- Environment-based API key handling
- Request validation
- No secrets in source control
- Error-safe response handling

## Future Scale Path
The design can evolve into a microservice-based architecture with live analytics, authentication, and event data sources.
