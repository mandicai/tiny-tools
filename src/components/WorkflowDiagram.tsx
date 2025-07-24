'use client';

import React, { useRef } from 'react';

type ChoiceHistory = {
  nodeId: string;
  choiceText: string;
  nodeText: string;
};

type Props = {
  choiceHistory: ChoiceHistory[];
  scenarioTitle: string;
};

export default function WorkflowDiagram({ choiceHistory, scenarioTitle }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const nodeWidth = 200;
  const nodeHeight = 80;
  const verticalSpacing = 120;
  const horizontalPadding = 50;

  const totalHeight = (choiceHistory.length + 2) * verticalSpacing + nodeHeight;
  const totalWidth = nodeWidth + 2 * horizontalPadding;

  const downloadDiagram = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${scenarioTitle.replace(/\s+/g, '-').toLowerCase()}-workflow.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  const copyDiagram = async () => {
    if (!svgRef.current) return;

    try {
      // Create a canvas to convert SVG to PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = async () => {
        canvas.width = totalWidth;
        canvas.height = totalHeight;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(async (blob) => {
          if (blob && navigator.clipboard) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
            } catch (err) {
              console.error('Failed to copy image:', err);
            }
          }
        });

        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      console.error('Failed to copy diagram:', err);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Your Workflow Path</h3>

      <div className="mb-4 overflow-x-auto">
        <svg
          ref={svgRef}
          width={totalWidth}
          height={totalHeight}
          className="border border-gray-300 bg-white rounded"
        >
          {/* Start Node */}
          <g>
            <rect
              x={horizontalPadding}
              y={20}
              width={nodeWidth}
              height={nodeHeight}
              fill="#e3f2fd"
              stroke="#1976d2"
              strokeWidth="2"
              rx="10"
            />
            <text
              x={horizontalPadding + nodeWidth / 2}
              y={60}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#1976d2"
            >
              START
            </text>
            <text
              x={horizontalPadding + nodeWidth / 2}
              y={80}
              textAnchor="middle"
              fontSize="12"
              fill="#1976d2"
            >
              {scenarioTitle}
            </text>
          </g>

          {/* Choice Nodes */}
          {choiceHistory.map((choice, index) => {
            const y = (index + 1) * verticalSpacing + 20;
            const prevY = index * verticalSpacing + 20 + nodeHeight;

            return (
              <g key={index}>
                {/* Arrow */}
                <line
                  x1={horizontalPadding + nodeWidth / 2}
                  y1={prevY}
                  x2={horizontalPadding + nodeWidth / 2}
                  y2={y}
                  stroke="#666"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />

                {/* Choice Node */}
                <rect
                  x={horizontalPadding}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill="#f3e5f5"
                  stroke="#7b1fa2"
                  strokeWidth="2"
                  rx="10"
                />
                <text
                  x={horizontalPadding + nodeWidth / 2}
                  y={y + 30}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#7b1fa2"
                >
                  Choice {index + 1}
                </text>
                <text
                  x={horizontalPadding + nodeWidth / 2}
                  y={y + 50}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#7b1fa2"
                >
                  {choice.choiceText.length > 25
                    ? choice.choiceText.substring(0, 25) + '...'
                    : choice.choiceText}
                </text>
              </g>
            );
          })}

          {/* End Node */}
          <g>
            {choiceHistory.length > 0 && (
              <line
                x1={horizontalPadding + nodeWidth / 2}
                y1={(choiceHistory.length) * verticalSpacing + 20 + nodeHeight}
                x2={horizontalPadding + nodeWidth / 2}
                y2={(choiceHistory.length + 1) * verticalSpacing + 20}
                stroke="#666"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            )}
            <rect
              x={horizontalPadding}
              y={(choiceHistory.length + 1) * verticalSpacing + 20}
              width={nodeWidth}
              height={nodeHeight}
              fill="#e8f5e8"
              stroke="#388e3c"
              strokeWidth="2"
              rx="10"
            />
            <text
              x={horizontalPadding + nodeWidth / 2}
              y={(choiceHistory.length + 1) * verticalSpacing + 50}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#388e3c"
            >
              OUTCOME
            </text>
            <text
              x={horizontalPadding + nodeWidth / 2}
              y={(choiceHistory.length + 1) * verticalSpacing + 70}
              textAnchor="middle"
              fontSize="10"
              fill="#388e3c"
            >
              Scenario Complete
            </text>
          </g>

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#666"
              />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="flex gap-2">
        <button
          onClick={downloadDiagram}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download Diagram
        </button>
        <button
          onClick={copyDiagram}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}