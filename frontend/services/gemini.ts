type GeminiResponse = {
  reply: string;
};

export async function getGeminiReply(prompt: string): Promise<string> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Unable to reach the stadium assistant.');
  }

  const data = (await response.json()) as GeminiResponse;
  return data.reply;
}
