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
                        <p className="text-gray-600">You've successfully navigated through the scenario.</p>
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
                <div className="space-y-3">
                    {choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => onChoose(choice.next, choice.text)}
                            className="group block w-full text-left p-5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            <div className="flex items-start space-x-3">

                                <div className="flex-1">
                                    <p className="text-gray-800 font-mono font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                                        {choice.text}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
