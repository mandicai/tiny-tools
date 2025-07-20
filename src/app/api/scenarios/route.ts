import { NextResponse } from 'next/server';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  story: string;
  decisions: any[];
}

const scenarioIds = ['planner', 'analyst'];

export async function GET() {
  try {
    const scenarios: Array<{id: string, title: string, description: string, icon: string}> = [];
    
    for (const id of scenarioIds) {
      try {
        const scenarioPath = path.join(process.cwd(), 'src/data/scenarios', `${id}.yaml`);
        const fileContents = fs.readFileSync(scenarioPath, 'utf8');
        const scenario = yaml.load(fileContents) as Scenario;
        
        scenarios.push({
          id: scenario.id,
          title: scenario.title,
          description: scenario.description,
          icon: scenario.icon
        });
      } catch (error) {
        console.error(`Error loading scenario ${id}:`, error);
      }
    }
    
    return NextResponse.json(scenarios);
  } catch (error) {
    console.error('Error loading scenarios:', error);
    return NextResponse.json({ error: 'Failed to load scenarios' }, { status: 500 });
  }
}