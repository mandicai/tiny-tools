import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, model = 'phi3:mini' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  if (model === 'gpt-4o-mini') {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      }),
    });

    if (!openaiRes.body) {
      return res.status(500).json({ error: 'No stream from OpenAI' });
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const reader = openaiRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim().startsWith('data:'));

      for (const line of lines) {
        const data = line.replace(/^data:\s*/, '');
        if (data === '[DONE]') continue;
        
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;

          if (content) {
            res.write(`data: ${JSON.stringify({ response: content })}\n\n`);
            res.flushHeaders();
          }
        } catch (err) {
          console.error('Error parsing OpenAI chunk:', err);
        }
      }
    }

    res.write(`event: end\ndata: [DONE]\n\n`);
    res.end();
    return;
  }

  const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        model, 
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
