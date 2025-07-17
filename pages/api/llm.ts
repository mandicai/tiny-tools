import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        model: 'phi3:mini', 
        prompt, 
        stream: true 
    }),
  });

  if (!ollamaResponse.body) {
    return res.status(500).json({ error: 'No stream from Ollama' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const reader = ollamaResponse.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const text = decoder.decode(value, { stream: true });
    
    res.write(`data: ${text}\n\n`);
    res.flushHeaders()
  }

  res.write(`event: end\ndata: [DONE]\n\n`);
  res.end();
}
