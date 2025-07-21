'use client';

import React, { useRef } from 'react';

type ToolSuggestion = {
  name: string;
  description: string;
  url: string;
  category: string;
};

type Props = {
  selectedTools: ToolSuggestion[];
  scenarioTitle: string;
};

export default function ToolPlacemat({ selectedTools, scenarioTitle }: Props) {
  const placematRef = useRef<HTMLDivElement>(null);

  const downloadPlacemat = () => {
    if (!placematRef.current) return;

    // Create a formatted text version for download
    const content = generatePlacematText();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${scenarioTitle.replace(/\s+/g, '-').toLowerCase()}-toolkit.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  const copyPlacemat = async () => {
    const content = generatePlacematText();

    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const generatePlacematText = () => {
    const date = new Date().toLocaleDateString();
    const categories = [...new Set(selectedTools.map(tool => tool.category))];

    let content = `=================================\n`;
    content += `        TOOLKIT\n`;
    content += `=================================\n\n`;
    content += `Scenario: ${scenarioTitle}\n`;
    content += `Date: ${date}\n`;
    content += `Tools Selected: ${selectedTools.length}\n\n`;

    if (selectedTools.length === 0) {
      content += `No tools were added to your toolkit during this scenario.\n`;
      return content;
    }

    categories.forEach(category => {
      const categoryTools = selectedTools.filter(tool => tool.category === category);
      if (categoryTools.length > 0) {
        content += `\n📁 ${category.toUpperCase()}\n`;
        content += `${'='.repeat(category.length + 4)}\n\n`;

        categoryTools.forEach((tool, index) => {
          content += `${index + 1}. ${tool.name}\n`;
          content += `   ${tool.description}\n`;
          content += `   🔗 ${tool.url}\n\n`;
        });
      }
    });

    content += `\n=================================\n`;
    content += `End of Toolkit\n`;
    content += `=================================\n`;

    return content;
  };

  // Group tools by category
  const toolsByCategory = selectedTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, ToolSuggestion[]>);

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Your Toolkit</h3>

      <div
        ref={placematRef}
        className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4"
        style={{ fontFamily: 'monospace' }}
      >
        <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
          <h2 className="text-xl font-bold">🧰 TOOLKIT</h2>
          <p className="text-sm text-gray-600 mt-2">Scenario: {scenarioTitle}</p>
          <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">Tools: {selectedTools.length}</p>
        </div>

        {selectedTools.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No tools were added to your toolkit during this scenario.</p>
            <p className="text-sm mt-2">Next time, try exploring the tool suggestions in the sidebar!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category}>
                <h4 className="text-md font-bold text-blue-700 border-b border-blue-200 pb-1 mb-3">
                  📁 {category.toUpperCase()}
                </h4>
                <div className="grid gap-3">
                  {tools.map((tool, index) => (
                    <div key={tool.name} className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{index + 1}. {tool.name}</h5>
                          <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 break-all"
                          >
                            🔗 {tool.url}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center border-t-2 border-gray-300 pt-4 mt-6">
          <p className="text-xs text-gray-500">
            Keep this reference handy for future use!
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={downloadPlacemat}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Download Toolkit
        </button>
        <button
          onClick={copyPlacemat}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}