'use client';

import React from 'react';
import WorkflowDiagram from './WorkflowDiagram';
import ToolPlacemat from './ToolPlacemat';

type Choice = { text: string; next: string };
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
    text: string;
    choices?: Choice[];
    onChoose: (id: string, choiceText: string) => void;
    choiceHistory?: ChoiceHistory[];
    selectedTools?: ToolSuggestion[];
    scenarioTitle?: string;
};

export default function StoryChoices({ 
    text, 
    choices = [], 
    onChoose, 
    choiceHistory = [], 
    selectedTools = [], 
    scenarioTitle = '' 
}: Props) {
    const isEnding = choices.length === 0;

    return (
        <div className="mt-4">
            <p className="text-xl font-bold mb-2">Decision</p>
            <p className="text-l font-serif mb-4">{text}</p>

            {isEnding ? (
                <div>
                    <div className="text-center mb-6">
                        <p className="text-2xl font-bold text-green-600 mb-2">🎉 Scenario Complete! 🎉</p>
                        <p className="text-gray-600">You&rsquo;ve successfully navigated through the scenario.</p>
                        <p className="text-gray-600">Here are your personalized artifacts:</p>
                    </div>
                    
                    <WorkflowDiagram 
                        choiceHistory={choiceHistory}
                        scenarioTitle={scenarioTitle}
                    />
                    
                    <ToolPlacemat 
                        selectedTools={selectedTools}
                        scenarioTitle={scenarioTitle}
                    />
                </div>
            ) : (
                choices.map((choice, idx) => (
                    <button
                        key={idx}
                        onClick={() => onChoose(choice.next, choice.text)}
                        className="font-mono block w-full text-left p-4 rounded my-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                        {choice.text}
                    </button>
                ))
            )}
        </div>
    );
}
