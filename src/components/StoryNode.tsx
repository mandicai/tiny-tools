'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import StoryChoices from './StoryChoices';
import ScenarioSidebar from './ScenarioSidebar';
import { getToolSuggestionsForChoice, type ToolSuggestion } from '@/data/toolSuggestions';

type Choice = { text: string; next: string };
type Decision = {
  id: string;
  text: string;
  choices?: Choice[];
}
type ChoiceHistory = {
  nodeId: string;
  choiceText: string;
  nodeText: string;
};
type Props = {
  story: string;
  decisions?: Decision[];
  scenarioTitle?: string;
};

export default function StoryNode({ story, decisions = [], scenarioTitle = '' }: Props) {
  const [currentId, setCurrentId] = useState('start');
  const [choiceHistory, setChoiceHistory] = useState<ChoiceHistory[]>([]);
  const [selectedTools, setSelectedTools] = useState<ToolSuggestion[]>([]);
  const [allSuggestedTools, setAllSuggestedTools] = useState<ToolSuggestion[]>([]);

  // Initialize suggestions for the current step when it changes
  useEffect(() => {
    const currentStepSuggestions = getToolSuggestionsForChoice(currentId);
    if (currentStepSuggestions.length > 0) {
      setAllSuggestedTools(prev => {
        const existingNames = new Set(prev.map(tool => tool.name));
        const uniqueNewSuggestions = currentStepSuggestions.filter(tool => !existingNames.has(tool.name));
        return [...prev, ...uniqueNewSuggestions];
      });
    }
  }, [currentId]);

  const node = decisions.find((n) => n.id === currentId);

  if (!node) return <p>Something went wrong. Story node not found.</p>;

  const handleChoiceSelect = (nextId: string, choiceText: string) => {
    const currentNode = decisions.find((n) => n.id === currentId);
    if (currentNode) {
      setChoiceHistory(prev => [...prev, {
        nodeId: currentId,
        choiceText: choiceText,
        nodeText: currentNode.text
      }]);
    }

    setCurrentId(nextId);
  };

  const restart = () => {
    setCurrentId('start');
    setChoiceHistory([]);
    setSelectedTools([]);
    setAllSuggestedTools([]);
  };

  const handleToolSelect = (tool: ToolSuggestion) => {
    if (!selectedTools.find(t => t.name === tool.name)) {
      setSelectedTools(prev => [...prev, tool]);
    }
  };

  const handleToolRemove = (tool: ToolSuggestion) => {
    setSelectedTools(prev => prev.filter(t => t.name !== tool.name));
  };

  // Filter out tools that are already in the toolkit from suggestions
  const selectedToolNames = new Set(selectedTools.map(tool => tool.name));
  const displayedToolSuggestions = allSuggestedTools.filter(tool => !selectedToolNames.has(tool.name));

  const isCompleted = !node.choices || node.choices.length === 0;

  if (isCompleted) {
    // Completion view - no sidebar, artifacts side by side
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8 mb-6">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-blue-400 mb-4" style={{ fontFamily: 'var(--font-bowlby)' }}>🎉 Scenario Complete! 🎉</p>
            <p className="text-base text-gray-700">{node.text}</p>
          </div>
          
          <button
            onClick={restart}
            className="w-full bg-indigo-400 hover:bg-indigo-500 font-bold text-white text-sm py-2 px-4 rounded transition-colors" 
          >
            Restart Adventure
          </button>
        </div>
        
        <StoryChoices
          text=""
          choices={[]}
          onChoose={handleChoiceSelect}
          choiceHistory={choiceHistory}
          selectedTools={selectedTools}
          scenarioTitle={scenarioTitle}
        />
      </div>
    );
  }

  // Normal view with sidebar
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">
      <div>
        <div className="bg-white rounded-lg p-6 mb-4">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-500">{choiceHistory.length} / 3 choices</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="flex h-full rounded-full overflow-hidden">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 ${step <= choiceHistory.length
                      ? 'bg-indigo-600'
                      : 'bg-gray-200'
                    } ${step < 3 ? 'border-r border-white' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-xl font-bold mb-2">The Scenario</p>
          <p className="text-l">
            {story}
          </p>
          <StoryChoices
            text={node.text}
            choices={node.choices}
            onChoose={handleChoiceSelect}
            choiceHistory={choiceHistory}
            selectedTools={selectedTools}
            scenarioTitle={scenarioTitle}
          />

          <button
            onClick={restart}
            className="w-full mt-4 bg-indigo-400 hover:bg-indigo-500 font-bold text-white text-sm py-2 px-4 rounded transition-colors" 
          > 
            Restart Adventure
          </button>
        </div>
      </div>
      <div>
        <ScenarioSidebar
          toolSuggestions={displayedToolSuggestions}
          allSuggestedTools={allSuggestedTools}
          selectedTools={selectedTools}
          onToolSelect={handleToolSelect}
          onToolRemove={handleToolRemove}
        />
      </div>
    </div>
  );
}
