'use client';

import { useState } from 'react';
import story from '@/data/story.json';
import StoryNode from '@/components/StoryNode';
import LLMSandbox from '@/components/LLMSandbox';

export default function HomePage() {
  const [currentStory, setCurrentStory] = useState('planner');
  const nodeStory = story.find((n) => n.scenario_id === currentStory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 py-6">
          <div>
            <p className="text-4xl font-bold font-serif">Tiny Tools for Big Impact</p>
            <p className="text-l font-serif pt-2">By Nick Hagar, Mandi Cai, and Jeremy Gilbert</p>
          </div>
          <img src="/beaver.svg" alt="Beaver" className="w-30 h-auto"/>
        </div>
        <div className="grid grid-cols-[60%_40%] gap-4">
          <div className="w-full">
            <StoryNode
              scenario={nodeStory.scenario}
              decisions={nodeStory.decisions}
            />
          </div>
          <div className="w-full">
            <LLMSandbox/>
          </div>
        </div>
      </div>
    </main>
  );
}
