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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">
      <div>
        <div className="bg-white shadow rounded-lg p-6 mb-4">
          <p className="text-xl font-bold mb-2">The Scenario</p>
          <p className="text-l font-serif">
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
            className="mt-4 w-full text-white font-bold py-2 rounded bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800"
          >
            Restart Adventure
          </button>
        </div>
      </div>
      <div>
        <ScenarioSidebar
          choiceHistory={choiceHistory}
          toolSuggestions={displayedToolSuggestions}
          selectedTools={selectedTools}
          onToolSelect={handleToolSelect}
          onToolRemove={handleToolRemove}
        />
      </div>
    </div>
  );
}
