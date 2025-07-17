'use client';

import { useState } from 'react';
import story from '@/data/story.json';
import StoryNode from '@/components/StoryNode';
import LLMSandbox from '@/components/LLMSandbox';

export default function HomePage() {
  const [currentStory, setCurrentStory] = useState('planner');
  const nodeStory = story.find((n) => n.scenario_id === currentStory);

  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="mb-6">
        <img src="/beaver.svg" alt="Beaver" className="w-40 h-auto"/>
        <p className="text-4xl font-bold font-serif">Tiny Tools for Big Impact</p>
      </div>
      <div className="grid grid-cols-[60%_40%] gap-2">
        <div className="max-w-2xl mx-auto space-y-6">
          <StoryNode
            scenario={nodeStory.scenario}
            decisions={nodeStory.decisions}
          />
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          <LLMSandbox/>
        </div>
      </div>
    </main>
  );
}
