# Tiny Tools for Big Impact

An interactive web application that demonstrates how different approaches to AI and automation can transform journalism workflows. This project presents real-world scenarios where journalists can explore multiple solution paths and compare the trade-offs between various tools and techniques.

**Created by:** Nick Hagar, Mandi Cai, and Jeremy Gilbert

## What This Project Does

This application provides journalists with interactive, choose-your-own-adventure style scenarios that explore common newsroom challenges and the various tools available to solve them. Each scenario presents decision points where users can compare different approaches - from manual processes to AI-assisted workflows.

### Available Scenarios

1. **📊 Data Analysis** - Explore, clean, and summarize large datasets quickly and accurately
2. **🔬 Investigative Research** - Extract and organize critical information from sensitive documents without compromising security
3. **📋 Project Planning** - Plan and organize big investigative projects from vague ideas to actionable plans
4. **⚙️ Workflow Prototyping** - Transform one-off scripts into robust, reusable workflows for newsroom use

### Key Features

- **Interactive Decision Trees**: Navigate through realistic journalism scenarios with multiple solution paths
- **Tool Recommendations**: Get suggestions for specific tools and techniques at each decision point
- **Trade-off Analysis**: Consider the implications of different approaches across three key dimensions:
  - **Control vs. Convenience**: Does this approach respect your autonomy?
  - **Privacy vs. Efficiency**: How does this choice impact data security?
  - **Quality vs. Time**: Where are faster outputs more desirable than slower quality checks?
- **Choice History Tracking**: See the path you've taken through each scenario
- **Resource Links**: Access curated tool repositories and additional learning materials

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the scenarios.

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **YAML** - Scenario content management
- **React** - Component-based UI

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── IntroPage.tsx   # Landing page with scenario selection
│   ├── StoryNode.tsx   # Interactive scenario navigation
│   └── ...
├── data/
│   ├── scenarios/      # YAML files defining each scenario
│   └── toolSuggestions.ts  # Tool recommendations database
└── lib/
    └── scenarios.ts    # Scenario loading and management
```

## Adding New Scenarios

Scenarios are defined in YAML files in `src/data/scenarios/`. Each scenario includes:

- Metadata (title, description, icon)
- A story setup
- Decision nodes with choices and branching paths
- Tool suggestions for each decision point

## Additional Resources

- **[Tool Repository](https://github.com/NHagar/awesome-tiny-tools)** - Curated list of tiny tools for journalism
- **[SRCCON 2025 Session](https://docs.google.com/document/d/1iDMcPJBMCAMUANaSWU-c1a3PeYmefbwAVC1l16S_YAc/)** - Original presentation of this work
- **Contact**: nicholas.hagar@northwestern.edu for questions or feedback

## Purpose

This project emerged from [SRCCON 2025](https://2025.srccon.org/) to help journalists understand the landscape of AI and automation tools available for newsroom work. Rather than prescribing specific solutions, it encourages exploration and critical thinking about the trade-offs inherent in different technological approaches to journalism challenges.
