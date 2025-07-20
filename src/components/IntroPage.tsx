'use client';

import { useState, useEffect } from 'react';
import { getScenarioMeta, type ScenarioMeta } from '@/lib/scenarios';

interface IntroPageProps {
  onStartScenario: (scenarioId: string) => void;
}

export default function IntroPage({ onStartScenario }: IntroPageProps) {
  const [scenarios, setScenarios] = useState<ScenarioMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScenarios() {
      try {
        const scenarioMeta = await getScenarioMeta();
        setScenarios(scenarioMeta);
      } catch (error) {
        console.error('Error loading scenarios:', error);
      } finally {
        setLoading(false);
      }
    }
    loadScenarios();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading scenarios...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/beaver.svg" alt="Tiny Tools for Big Impact logo" className="w-16 h-auto" />
            <h1 className="text-5xl font-bold font-serif">Tiny Tools for Big Impact</h1>
          </div>
          <p className="text-xl font-serif text-gray-700 mb-8">By Nick Hagar, Mandi Cai, and Jeremy Gilbert</p>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-gray-600">
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
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold font-serif text-center mb-8">Choose Your Adventure</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-indigo-200"
                onClick={() => onStartScenario(scenario.id)}
              >
                <div className="text-4xl mb-4">{scenario.icon}</div>
                <h3 className="text-2xl font-bold font-serif mb-3">{scenario.title}</h3>
                <p className="text-gray-600 mb-4">{scenario.description}</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors">
                  Start Scenario →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold font-serif mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://github.com/NHagar/awesome-tiny-tools"
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-indigo-600 hover:text-indigo-700"
            >
              <span className="text-3xl mb-2">🛠️</span>
              <span className="font-medium">Tool Repository</span>
              <span className="text-sm text-gray-500 mt-1">Curated list of tiny tools for journalists</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1iDMcPJBMCAMUANaSWU-c1a3PeYmefbwAVC1l16S_YAc/"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-indigo-600 hover:text-indigo-700"
            >
              <span className="text-3xl mb-2">📖</span>
              <span className="font-medium">SRCCON 2025 Session</span>
              <span className="text-sm text-gray-500 mt-1">Full research and methodology</span>
            </a>
            <a
              href="mailto:nicholas.hagar@northwestern.edu"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-indigo-600 hover:text-indigo-700"
            >
              <span className="text-3xl mb-2">📧</span>
              <span className="font-medium">Contact Authors</span>
              <span className="text-sm text-gray-500 mt-1">Questions or feedback welcome</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}