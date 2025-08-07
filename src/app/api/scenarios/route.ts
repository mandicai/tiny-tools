import { NextResponse } from 'next/server';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { Scenario } from '@/lib/scenarios';

export async function GET() {
  try {
    const scenarios: Array<{id: string, title: string, description: string, icon: string}> = [];
    
    // Dynamically discover all YAML files in the scenarios directory
    const scenariosDir = path.join(process.cwd(), 'src/data/scenarios');
    const files = fs.readdirSync(scenariosDir);
    const yamlFiles = files.filter(file => file.endsWith('.yaml'));
    
    for (const file of yamlFiles) {
      try {
        const scenarioPath = path.join(scenariosDir, file);
        const fileContents = fs.readFileSync(scenarioPath, 'utf8');
        const scenario = yaml.load(fileContents) as Scenario;
        
        scenarios.push({
          id: scenario.id,
          title: scenario.title,
          description: scenario.description,
          icon: scenario.icon
        });
      } catch (error) {
        console.error(`Error loading scenario ${file}:`, error);
      }
    }
    
    return NextResponse.json(scenarios);
  } catch (error) {
    console.error('Error loading scenarios:', error);
    return NextResponse.json({ error: 'Failed to load scenarios' }, { status: 500 });
  }
}