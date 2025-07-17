'use client'

import { useState } from 'react'

const stories = ['planner', 'analyst']

export default function StorySelector({ onStoryChange, restart }: { onStoryChange: (story: string) => void, restart: () => void; }) {
    const [selectedStory, setSelectedStory] = useState('planner')

    const handleClick = (story: string) => {
        setSelectedStory(story)
        onStoryChange(story)
        restart()
    }

    return (
        <div className="font-mono flex gap-2 mb-4">
            {stories.map((story) => (
                <button
                    key={story}
                    onClick={() => handleClick(story)}
                    className={`px-4 py-2 rounded-full border text-sm transition
            ${selectedStory === story ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
          `}
                >
                    {story}
                </button>
            ))}
        </div>
    )
}
