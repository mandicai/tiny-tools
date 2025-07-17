'use client';

import React from 'react';

type Choice = { text: string; next: string };
type Props = {
    text: string;
    choices?: Choice[];
    onChoose: (id: string) => void;
};

export default function StoryChoices({ text, choices = [], onChoose }: Props) {
    const isEnding = choices.length === 0;

    return (
        <div className="mt-4">
            <p className="text-xl font-bold mb-2">Decision</p>
            <p className="text-l font-serif mb-4">{text}</p>


            {isEnding ? (
                <p className="text-center font-mono">— The End —</p>
            ) : (
                choices.map((choice, idx) => (
                    <button
                        key={idx}
                        onClick={() => onChoose(choice.next)}
                        className="font-mono block w-full text-left p-4 rounded my-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                        {choice.text}
                    </button>
                ))
            )}
        </div>
    );
}
