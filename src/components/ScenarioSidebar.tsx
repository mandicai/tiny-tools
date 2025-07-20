'use client';

import React from 'react';

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
  currentNodeId: string;
  toolSuggestions: ToolSuggestion[];
  selectedTools: ToolSuggestion[];
  onToolSelect: (tool: ToolSuggestion) => void;
  onToolRemove: (tool: ToolSuggestion) => void;
};

export default function ScenarioSidebar({ 
  choiceHistory, 
  currentNodeId, 
  toolSuggestions, 
  selectedTools,
  onToolSelect,
  onToolRemove 
}: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6 h-fit">
      {/* Progress Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-indigo-600">Your Journey</h3>
        <div className="space-y-3">
          {choiceHistory.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Start making choices to see your progress</p>
          ) : (
            choiceHistory.map((choice, index) => (
              <div key={index} className="border-l-2 border-indigo-200 pl-3">
                <div className="text-xs text-gray-500 mb-1">Step {index + 1}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{choice.nodeText}</div>
                <div className="text-sm text-indigo-600 bg-indigo-50 p-2 rounded">
                  ✓ {choice.choiceText}
                </div>
              </div>
            ))
          )}
          {currentNodeId !== 'end' && (
            <div className="border-l-2 border-indigo-400 pl-3">
              <div className="text-xs text-indigo-500 mb-1">Current Step</div>
              <div className="text-sm font-medium text-indigo-600">Making your next choice...</div>
            </div>
          )}
        </div>
      </div>

      {/* Tool Suggestions */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-green-600">Suggested Tools</h3>
        <div className="space-y-2">
          {toolSuggestions.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Tools will appear based on your choices</p>
          ) : (
            toolSuggestions.map((tool, index) => (
              <div key={index} className="border border-green-200 rounded p-3 hover:bg-green-50 transition-colors">
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
                    Add
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
        <h3 className="text-lg font-bold mb-3 text-purple-600">Your Toolkit</h3>
        <div className="space-y-2">
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
        {selectedTools.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="text-sm font-medium text-gray-700">
              Total Tools: {selectedTools.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Set(selectedTools.map(t => t.category)).size} categories
            </div>
          </div>
        )}
      </div>
    </div>
  );
}