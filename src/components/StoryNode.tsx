'use client';

import { useState } from 'react';
import React from 'react';
import StoryChoices from './StoryChoices';
import StorySelector from './StorySelector';

type Choice = { text: string; next: string };
type Decision = {
  id: string;
  text: string;
  choices?: Choice[];
}
type Props = {
  story: string;
  decisions?: Decision[];
  setCurrentStory: (story: string) => void;
};

export default function StoryNode({ story, decisions = [], setCurrentStory }: Props) {
  const [currentId, setCurrentId] = useState('start');
  const node = decisions.find((n) => n.id === currentId);

  if (!node) return <p>Something went wrong. Story node not found.</p>;

  const restart = () => {
    setCurrentId('start');
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <StorySelector onStoryChange={setCurrentStory} restart={restart} />

        <p className="text-xl font-bold mb-2">The Scenario</p>
        <p className="text-l font-serif">
          {story}
        </p>
        <StoryChoices
          text={node.text}
          choices={node.choices}
          onChoose={setCurrentId}
        />

        <button
          onClick={restart}
          className="mt-4 w-full text-white font-bold py-2 rounded bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800"
        >
          Restart Adventure
        </button>
      </div>
    </div>
  );
}
