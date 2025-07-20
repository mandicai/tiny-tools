'use client';

import { useState } from 'react';
import story from '@/data/story.json';
import StoryNode from '@/components/StoryNode';
import LLMSandbox from '@/components/LLMSandbox';
import IntroPage from '@/components/IntroPage';

export default function HomePage() {
  const [currentStory, setCurrentStory] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  
  const nodeStory = currentStory ? story.find((n) => n.story_id === currentStory) : null;

  const handleStartScenario = (scenarioId: string) => {
    setCurrentStory(scenarioId);
    setShowIntro(false);
  };

  const handleBackToIntro = () => {
    setShowIntro(true);
    setCurrentStory(null);
  };

  if (showIntro) {
    return <IntroPage onStartScenario={handleStartScenario} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-4xl font-bold font-serif">Tiny Tools for Big Impact</p>
              <p className="text-l font-serif pt-2">By Nick Hagar, Mandi Cai, and Jeremy Gilbert</p>
            </div>
            <img src="/beaver.svg" alt="Tiny Tools for Big Impact logo featuring a beaver" className="w-30 h-auto" />
          </div>
          <button
            onClick={handleBackToIntro}
            className="bg-white hover:bg-gray-50 text-indigo-600 font-medium py-2 px-4 rounded border border-indigo-200 transition-colors"
          >
            ← Back to Intro
          </button>
        </div>
        <div className="grid grid-cols-[60%_40%] gap-4">
          <div className="w-full">
            {nodeStory && (
              <StoryNode
                story={nodeStory.story}
                decisions={nodeStory.decisions}
                setCurrentStory={setCurrentStory}
              />
            )}
          </div>
          <div className="w-full">
            <LLMSandbox />
          </div>
        </div>
      </div>
    </main>
  );
}
