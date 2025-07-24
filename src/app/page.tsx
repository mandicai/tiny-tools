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

        <div className="max-w-3xl mx-auto mb-8 space-y-6">
          <p className="text-lg text-gray-600 text-left">
            Explore interactive scenarios that demonstrate how different approaches to AI and automation
            can transform journalism workflows. Each scenario presents real-world challenges with
            multiple solution paths to compare and contrast.
          </p>

          <div className="bg-white/50 rounded-lg p-6 text-left">
            <p className="text-lg text-gray-700 mb-4 font-medium">
              As you navigate these scenarios, consider the following trade-offs:
            </p>
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
    </main>
  );
}
