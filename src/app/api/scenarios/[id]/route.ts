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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const scenarioPath = path.join(process.cwd(), 'src/data/scenarios', `${id}.yaml`);
    
    if (!fs.existsSync(scenarioPath)) {
      return NextResponse.json({ error: 'Scenario not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(scenarioPath, 'utf8');
    const scenario = yaml.load(fileContents) as Scenario;
    
    return NextResponse.json(scenario);
  } catch (error) {
    console.error(`Error loading scenario:`, error);
    return NextResponse.json({ error: 'Failed to load scenario' }, { status: 500 });
  }
}