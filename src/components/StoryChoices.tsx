'use client';

import React from 'react';
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
            {!isEnding && (
                <>
                    <p className="text-xl font-bold mb-2">Decision</p>
                    <p className="text-l font-serif mb-4">{text}</p>
                </>
            )}

            {isEnding ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Your Journey</h3>
                            <div className="space-y-4">
                                {choiceHistory.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic">No choices were made</p>
                                ) : (
                                    choiceHistory.map((choice, index) => (
                                        <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-indigo-400 shadow-sm">
                                            <div className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">{index + 1}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-800 mb-2">{choice.nodeText}</div>
                                                    <div className="text-sm text-indigo-700 bg-indigo-50 p-3 rounded-lg font-mono">
                                                        ✓ {choice.choiceText}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <ToolPlacemat
                            selectedTools={selectedTools}
                            scenarioTitle={scenarioTitle}
                        />
                    </div>
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
