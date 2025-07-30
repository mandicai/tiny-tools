'use client';

import React, { useState } from 'react';


type ToolSuggestion = {
  name: string;
  description: string;
  url: string;
  category: string;
};

type Props = {
  toolSuggestions: ToolSuggestion[];
  allSuggestedTools: ToolSuggestion[];
  selectedTools: ToolSuggestion[];
  onToolSelect: (tool: ToolSuggestion) => void;
  onToolRemove: (tool: ToolSuggestion) => void;
};

export default function ScenarioSidebar({
  toolSuggestions,
  allSuggestedTools,
  selectedTools,
  onToolSelect,
  onToolRemove
}: Props) {
  const [isToolkitDropdownOpen, setIsToolkitDropdownOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 h-fit">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Tools to Explore</h3>
        <div className="max-h-80 overflow-y-auto space-y-2">
          {toolSuggestions.length === 0 ? (
            allSuggestedTools.length === 0 ? (
              <p className="text-gray-500 text-sm italic">Tools will appear based on your choices</p>
            ) : (
              <p className="text-gray-500 text-sm italic">All suggested tools have been added to your toolkit</p>
            )
          ) : (
            toolSuggestions.slice().reverse().map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="border border-indigo-200 rounded p-3 hover:bg-indigo-50 transition-all duration-300 ease-in-out opacity-0 translate-y-2 animate-[fadeInSlide_0.3s_ease-out_forwards]"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => onToolSelect(tool)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-indigo-700">{tool.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mt-2">
                      {tool.category}
                    </span>
                  </div>
                  <button
                    onClick={() => onToolSelect(tool)}
                    className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1 rounded transition-colors"
                  >
                    Add
                  </button>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
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
          className="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
        >
          <h3 className="text-lg font-bold text-indigo-600">Your Toolkit</h3>
          <div className="flex items-center space-x-2">
            {selectedTools.length > 0 && (
              <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                {selectedTools.length}
              </span>
            )}
            <span className={`text-indigo-600 transition-transform ${isToolkitDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </button>
        {isToolkitDropdownOpen && (
          <div className="mt-3 bg-white border border-indigo-200 rounded-lg">
            <div className="max-h-60 overflow-y-auto space-y-2 p-3">
              {selectedTools.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No tools selected yet</p>
              ) : (
                selectedTools.map((tool, index) => (
                  <div key={index} className="bg-indigo-50 border border-indigo-200 rounded p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-indigo-700">{tool.name}</h4>
                        <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded mt-1">
                          {tool.category}
                        </span>
                      </div>
                      <button
                        onClick={() => onToolRemove(tool)}
                        className="ml-2 text-indigo-400 hover:text-indigo-600 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
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