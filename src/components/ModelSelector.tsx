'use client'

import { useState } from 'react'

const models = ['phi3:mini', 'tinyllama', 'gpt-4o-mini']

export default function ModelSelector({ onModelChange }: { onModelChange: (model: string) => void }) {
  const [selectedModel, setSelectedModel] = useState('phi3:mini')

  const handleClick = (model: string) => {
    setSelectedModel(model)
    onModelChange(model)
  }

  return (
    <div className="font-mono grid grid-cols-2 gap-2 mb-4">
      {models.map((model) => (
        <button
          key={model}
          onClick={() => handleClick(model)}
          className={`px-4 py-2 rounded-full border text-sm transition
            ${selectedModel === model ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
          `}
        >
          {model}
        </button>
      ))}
    </div>
  )
}
