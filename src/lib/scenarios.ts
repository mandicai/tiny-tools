export interface Choice {
  text: string;
  next: string;
}

export interface Decision {
  id: string;
  text: string;
  choices?: Choice[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  story: string;
  decisions: Decision[];
}

export interface ScenarioMeta {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export async function getScenarioMeta(): Promise<ScenarioMeta[]> {
  try {
    const response = await fetch('/api/scenarios');
    if (!response.ok) {
      throw new Error('Failed to fetch scenario metadata');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading scenario metadata:', error);
    return [];
  }
}

export async function getScenario(id: string): Promise<Scenario | null> {
  try {
    const response = await fetch(`/api/scenarios/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Scenario ${id} not found`);
        return null;
      }
      throw new Error('Failed to fetch scenario');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading scenario ${id}:`, error);
    return null;
  }
}

export async function getAllScenarios(): Promise<Scenario[]> {
  try {
    const scenarioMeta = await getScenarioMeta();
    const scenarios: Scenario[] = [];
    
    for (const meta of scenarioMeta) {
      const scenario = await getScenario(meta.id);
      if (scenario) {
        scenarios.push(scenario);
      }
    }
    
    return scenarios;
  } catch (error) {
    console.error('Error loading all scenarios:', error);
    return [];
  }
}