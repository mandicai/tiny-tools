'use client';

import { useState } from 'react';
import { streamResponse } from '../../hooks/useStream';
import ModelSelector from './ModelSelector';

export default function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [model, setModel] = useState('phi3:mini');

  const handleSubmit = async () => {
    setOutput('');
    await streamResponse(prompt, model, (chunk) => {
      setOutput((prev) => prev + chunk);
    });
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <ModelSelector onModelChange={handleModelChange} />

      <p className="text-xl font-bold mb-2">AI Sandbox</p>
      <textarea
        className="w-full border p-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleSubmit} className="mt-4 w-full text-white font-bold py-2 rounded bg-blue-500">
        Send
      </button>
      <p className="font-mono mt-4 p-4">{output}</p>
    </div>
  );
}
