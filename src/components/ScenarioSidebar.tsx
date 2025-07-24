'use client';

import React, { useState } from 'react';

type ChoiceHistory = {
  nodeId: string;
  choiceText: string;
  nodeText: string;
};

type ToolSuggestion = {
  name: string;
  description: string;
  url: string;
  category: string;
};

type Props = {
  choiceHistory: ChoiceHistory[];
  toolSuggestions: ToolSuggestion[];
  selectedTools: ToolSuggestion[];
  onToolSelect: (tool: ToolSuggestion) => void;
  onToolRemove: (tool: ToolSuggestion) => void;
};

export default function ScenarioSidebar({
  choiceHistory,
  toolSuggestions,
  selectedTools,
  onToolSelect,
  onToolRemove
}: Props) {
  const [isLMDropdownOpen, setIsLMDropdownOpen] = useState(false);
  const [isToolkitDropdownOpen, setIsToolkitDropdownOpen] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-6 h-fit">
      {/* Language Models Info */}
      <div className="mb-6">
        <button
          onClick={() => setIsLMDropdownOpen(!isLMDropdownOpen)}
          className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
        >
          <h3 className="text-lg font-bold text-blue-600">What can small language models do?</h3>
          <span className={`text-blue-600 transition-transform ${isLMDropdownOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {isLMDropdownOpen && (
          <div className="mt-3 bg-white border border-blue-200 rounded-lg p-4">
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-3">
                Small language models can run locally on your computer, giving you privacy and control.
                They're great for:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>• Simple coding assistance and debugging</li>
                <li>• Summarizing text</li>
                <li>• Brainstorming and planning</li>
                <li>• Offline AI without cloud dependency</li>
              </ul>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <h4 className="font-semibold text-gray-800 mb-2">Try them out:</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                    Google AI Studio
                  </a>
                  <span className="text-gray-600"> - Free access to Gemma, Google's small LM</span>
                </div>
                <div>
                  <a href="https://huggingface.co/spaces" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                    HuggingFace Spaces
                  </a>
                  <span className="text-gray-600"> - Try models online</span>
                </div>
                <div>
                  <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                    LM Studio
                  </a>
                  <span className="text-gray-600"> - GUI for local models</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Progress Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-indigo-600">Your Journey</h3>
        <div className="flex items-center justify-center space-x-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${choiceHistory.length >= step
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-gray-300 text-gray-400'
                }`}>
                {choiceHistory.length >= step ? '✓' : ''}
              </div>
              <div className="text-xs text-gray-500 mt-1">Choice {step}</div>
            </div>
          ))}
        </div>
      </div>


      {/* Tool Suggestions */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-green-600">Suggested Tools</h3>
        <div className="max-h-80 overflow-y-auto space-y-2">
          {toolSuggestions.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Tools will appear based on your choices</p>
          ) : (
            toolSuggestions.slice().reverse().map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="border border-green-200 rounded p-3 hover:bg-green-50 transition-all duration-300 ease-in-out opacity-0 translate-y-2 animate-[fadeInSlide_0.3s_ease-out_forwards]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-green-700">{tool.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mt-2">
                      {tool.category}
                    </span>
                  </div>
                  <button
                    onClick={() => onToolSelect(tool)}
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded transition-colors"
                  >
                    Add to Toolkit
                  </button>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 hover:text-green-800 mt-2 inline-block"
                >
                  View Tool →
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Selected Tools Cart */}
      <div>
        <button
          onClick={() => setIsToolkitDropdownOpen(!isToolkitDropdownOpen)}
          className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
        >
          <h3 className="text-lg font-bold text-purple-600">Your Toolkit</h3>
          <div className="flex items-center space-x-2">
            {selectedTools.length > 0 && (
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {selectedTools.length}
              </span>
            )}
            <span className={`text-purple-600 transition-transform ${isToolkitDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </button>
        {isToolkitDropdownOpen && (
          <div className="mt-3 bg-white border border-purple-200 rounded-lg">
            <div className="max-h-60 overflow-y-auto space-y-2 p-3">
              {selectedTools.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No tools selected yet</p>
              ) : (
                selectedTools.map((tool, index) => (
                  <div key={index} className="bg-purple-50 border border-purple-200 rounded p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-700">{tool.name}</h4>
                        <span className="inline-block bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded mt-1">
                          {tool.category}
                        </span>
                      </div>
                      <button
                        onClick={() => onToolRemove(tool)}
                        className="ml-2 text-purple-400 hover:text-purple-600 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 hover:text-purple-800 mt-2 inline-block"
                    >
                      Open Tool →
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}