'use client';

import { useState } from 'react';
import story from '@/data/story.json';
import StoryNode from '@/components/StoryNode';
import LLMSandbox from '@/components/LLMSandbox';
// import ChatWithLLM from '@/components/ChatWithLLM';

export default function HomePage() {
  const [currentId, setCurrentId] = useState('start');
  const node = story.find((n) => n.id === currentId);

  if (!node) return <p>Something went wrong. Story node not found.</p>;

  const restart = () => {
    setCurrentId('start');
  };

  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="mb-6">
        <img src="/beaver.svg" alt="Beaver" className="w-40 h-auto"/>
        <p className="text-4xl font-bold font-serif">Tiny Tools for Big Impact</p>
      </div>
      <div className="grid grid-cols-[60%_40%] gap-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <StoryNode
            text={node.text}
            choices={node.choices}
            onChoose={setCurrentId}
          />

          <button
            onClick={restart}
            className="mt-4 w-full text-white font-bold py-2 rounded bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800"
          >
            Restart Adventure
          </button>

          {/* <ChatWithLLM /> */}
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          <LLMSandbox/>
        </div>
      </div>
    </main>
  );
}
