'use client';

import { useState } from 'react';
import { getScenario, type Scenario } from '@/lib/scenarios';
import StoryNode from '@/components/StoryNode';
import IntroPage from '@/components/IntroPage';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);


  const handleStartScenario = async (scenarioId: string) => {
    setLoading(true);
    try {
      const loadedScenario = await getScenario(scenarioId);
      setScenario(loadedScenario);
      setShowIntro(false);
    } catch (error) {
      console.error('Error loading scenario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToIntro = () => {
    setShowIntro(true);
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
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-ibm)' }}>
      <div className="w-full max-w-4xl mx-auto text-center px-4 py-8">
        <div className="flex items-center justify-center gap-4">
          <img src="/beaver.svg" alt="Tiny Tools for Big Impact logo featuring a beaver" className="w-25 h-auto" />
          <h1 className="text-5xl"><span className="font-bold text-4xl font-mono">tiny tools</span> <span className="text-3xl">for</span> <span className="text-blue-400" style={{ fontFamily: 'var(--font-bowlby)' }}>Big</span> Impact</h1>
          <button
            onClick={handleBackToIntro}
            className="bg-indigo-400 hover:bg-indigo-500 font-bold text-white text-sm py-2 px-4 rounded transition-colors" 
          >
            ← Intro
          </button>
        </div>
        <p className="text-lg text-gray-700 mb-6">By Nick Hagar, Mandi Cai, and Jeremy Gilbert</p>

        <div className="text-base max-w-3xl mx-auto mb-8 space-y-6">
          <p className="text-gray-600 text-left">
            Explore interactive scenarios that demonstrate how different approaches to AI and automation
            can transform journalism workflows. Each scenario presents real-world challenges with
            multiple solution paths to compare and contrast. As you navigate these scenarios, consider the following trade-offs:
          </p>

          <div className="bg-white/80 rounded-lg p-6 text-left">
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="font-semibold text-indigo-600 mr-2">•</span>
                <span><strong>Control vs. Convenience</strong>: Does this approach respect your autonomy?</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-indigo-600 mr-2">•</span>
                <span><strong>Privacy vs. Efficiency</strong>: How does this choice impact your data security?</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-indigo-600 mr-2">•</span>
                <span><strong>Quality vs. Time</strong>: Where are faster outputs more desirable than slower quality checks?</span>
              </li>
            </ul>
          </div>
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
    </div>
  );
}
