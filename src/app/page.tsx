'use client';

import { useState, useEffect } from 'react';
import { getScenario, type Scenario } from '@/lib/scenarios';
import StoryNode from '@/components/StoryNode';
import IntroPage from '@/components/IntroPage';

export default function HomePage() {
  // id of the current story, used to fetch the entire scenario w/ decisions (stored in scenario)
  const [currentStory, setCurrentStory] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadScenario() {
      if (currentStory) {
        setLoading(true);
        try {
          const loadedScenario = await getScenario(currentStory);
          setScenario(loadedScenario);
        } catch (error) {
          console.error('Error loading scenario:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadScenario();
  }, [currentStory]);

  const handleStartScenario = (scenarioId: string) => {
    setCurrentStory(scenarioId);
    setShowIntro(false);
  };

  const handleBackToIntro = () => {
    setShowIntro(true);
    setCurrentStory(null);
    setScenario(null);
  };

  if (showIntro) {
    return <IntroPage onStartScenario={handleStartScenario} />;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading scenario...</div>
      </main>
    );
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
        <div className="w-full">
          {scenario && (
            <StoryNode
              story={scenario.story}
              decisions={scenario.decisions}
              scenarioTitle={scenario.title}
            />
          )}
        </div>
      </div>
    </main>
  );
}
