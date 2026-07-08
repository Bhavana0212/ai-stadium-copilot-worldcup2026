import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return NextResponse.json({ error: 'A valid prompt is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            'Gemini is not configured yet. The UI is ready, and the assistant will respond once GEMINI_API_KEY is set in your environment.',
        },
        { status: 200 },
      );
    }

    const model = 'gemini-1.5-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `You are the AI Stadium Copilot for FIFA World Cup 2026. Answer the fan's request clearly, warmly, and with practical guidance. Keep responses concise and useful. User request: ${prompt}` }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Gemini request failed');
    }

    const payload = await response.json();
    const reply = payload.candidates?.[0]?.content?.parts?.[0]?.text || 'I am ready to help with stadium guidance.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        reply: 'The assistant could not process that request. Please try a shorter question or check the API configuration.',
      },
      { status: 200 },
    );
  }
}
