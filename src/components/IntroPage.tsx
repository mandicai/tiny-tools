'use client';

interface IntroPageProps {
  onStartScenario: (scenarioId: string) => void;
}

export default function IntroPage({ onStartScenario }: IntroPageProps) {
  const scenarios = [
    {
      id: 'planner',
      title: 'Project Planning',
      description: 'Navigate the complexities of investigative journalism project planning. Explore different approaches to brainstorming, structuring, and organizing your next big story.',
      icon: '📋'
    },
    {
      id: 'analyst',
      title: 'Data Analysis',
      description: 'Dive into data analysis workflows for journalists. Learn how to efficiently inspect, query, and summarize large datasets to uncover compelling stories.',
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/beaver.svg" alt="Beaver" className="w-16 h-auto" />
            <h1 className="text-5xl font-bold font-serif">Tiny Tools for Big Impact</h1>
          </div>
          <p className="text-xl font-serif text-gray-700 mb-2">By Nick Hagar, Mandi Cai, and Jeremy Gilbert</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore interactive scenarios that demonstrate how different approaches to AI and automation 
            can transform journalism workflows. Each scenario presents real-world challenges with 
            multiple solution paths to compare and contrast.
          </p>
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

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold font-serif mb-4">About This Project</h2>
          <p className="text-gray-700 mb-4">
            This interactive exploration examines how journalists can leverage different levels of AI 
            integration in their workflows. From manual processes to local AI tools to cloud-based 
            services, each approach offers unique trade-offs in terms of control, privacy, efficiency, 
            and output quality.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <h3 className="font-bold mb-2">🛠️ Methodology</h3>
              <p className="text-sm text-gray-600">Compare manual, local AI, and cloud AI approaches</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">🔒 Privacy</h3>
              <p className="text-sm text-gray-600">Understand data security implications of each choice</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">⚡ Efficiency</h3>
              <p className="text-sm text-gray-600">Measure time investment vs. output quality</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-bold font-serif mb-4">Additional Resources</h3>
          <div className="flex justify-center space-x-6 text-indigo-600">
            <a href="#" className="hover:underline">📖 Research Paper</a>
            <a href="#" className="hover:underline">🛠️ Tool Repository</a>
            <a href="#" className="hover:underline">📧 Contact Authors</a>
          </div>
        </div>
      </div>
    </div>
  );
}