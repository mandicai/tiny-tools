export type ToolSuggestion = {
  name: string;
  description: string;
  url: string;
  category: string;
};

export const toolSuggestionsByChoice: Record<string, ToolSuggestion[]> = {
  // Researcher scenario - OCR choices
  ocr_manual: [
    {
      name: "Microsoft Word",
      description: "Word processing software",
      url: "https://www.microsoft.com/en-us/microsoft-365/word",
      category: "Document Editing"
    },
    {
      name: "LibreOffice Writer",
      description: "Free alternative to Microsoft Word",
      url: "https://www.libreoffice.org/discover/writer/",
      category: "Document Editing"
    },
    {
      name: "Google Docs",
      description: "Cloud-based word processing application",
      url: "https://docs.google.com/",
      category: "Document Editing"
    }
  ],
  ocr_local: [
    {
      name: "Tesseract OCR",
      description: "Open source optical character recognition engine",
      url: "https://github.com/tesseract-ocr/tesseract",
      category: "OCR"
    },
    {
      name: "Adobe Acrobat Pro",
      description: "Professional PDF editor with OCR capabilities",
      url: "https://www.adobe.com/acrobat/acrobat-pro.html",
      category: "PDF Tools"
    },
    {
      name: "ABBYY FineReader",
      description: "Professional OCR and PDF conversion software",
      url: "https://www.abbyy.com/finereader/",
      category: "OCR"
    }
  ],
  ocr_cloud: [
    {
      name: "Google Drive",
      description: "Cloud storage with built-in OCR",
      url: "https://drive.google.com/",
      category: "Cloud Storage"
    },
    {
      name: "Microsoft OneDrive",
      description: "Cloud storage with OCR capabilities",
      url: "https://onedrive.live.com/",
      category: "Cloud Storage"
    }
  ],

  // Research finding choices
  find_rag: [
    {
      name: "PrivateGPT",
      description: "Local RAG system for private documents",
      url: "https://github.com/imartinez/privateGPT",
      category: "LLM"
    },
    {
      name: "LlamaIndex",
      description: "Data framework for LLM applications",
      url: "https://www.llamaindex.ai/",
      category: "LLM"
    },
    {
      name: "Chroma",
      description: "Open-source embedding database",
      url: "https://www.trychroma.com/",
      category: "Database"
    }
  ],
  find_manual: [
    {
      name: "Sublime Text",
      description: "Text editor with powerful search capabilities",
      url: "https://www.sublimetext.com/",
      category: "Text Editor"
    },
    {
      name: "VS Code",
      description: "Code editor with advanced search and regex",
      url: "https://code.visualstudio.com/",
      category: "Text Editor"
    },
    {
      name: "grep",
      description: "Command-line text search utility",
      url: "https://www.gnu.org/software/grep/manual/grep.html",
      category: "Command Line"
    }
  ],
  find_cloud: [
    {
      name: "ChatGPT",
      description: "AI assistant for document analysis",
      url: "https://chat.openai.com/",
      category: "LLM"
    },
    {
      name: "Claude",
      description: "AI assistant with strong document analysis",
      url: "https://claude.ai/",
      category: "LLM"
    }
  ],

  // Entity extraction choices
  extract_ner: [
    {
      name: "spaCy",
      description: "Industrial-strength natural language processing",
      url: "https://spacy.io/",
      category: "AI/ML"
    },
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "LLM"
    },
    {
      name: "NLTK",
      description: "Natural language toolkit for Python",
      url: "https://www.nltk.org/",
      category: "AI/ML"
    }
  ],
  extract_manual: [
    {
      name: "Excel",
      description: "Spreadsheet software for data organization",
      url: "https://www.microsoft.com/en-us/microsoft-365/excel",
      category: "Spreadsheet"
    },
    {
      name: "LibreOffice Calc",
      description: "Free alternative to Excel",
      url: "https://www.libreoffice.org/discover/calc/",
      category: "Spreadsheet"
    },
    {
      name: "Notion",
      description: "All-in-one workspace for notes and databases",
      url: "https://www.notion.so/",
      category: "Productivity"
    }
  ],
  extract_cloud: [
    {
      name: "ChatGPT",
      description: "AI assistant for structured data extraction",
      url: "https://chat.openai.com/",
      category: "AI/ML"
    },
    {
      name: "Claude",
      description: "AI assistant with strong data extraction",
      url: "https://claude.ai/",
      category: "AI/ML"
    }
  ],

  // Data analysis scenario - Data inspection choices
  inspect_tiny_tool: [
    {
      name: "csvkit",
      description: "Command-line tools for working with CSV files",
      url: "https://csvkit.readthedocs.io/",
      category: "Data Processing"
    },
    {
      name: "OpenRefine",
      description: "Power tool for working with messy data",
      url: "https://openrefine.org/",
      category: "Data Cleaning"
    },
    {
      name: "DuckDB",
      description: "Fast in-process analytical database",
      url: "https://duckdb.org/",
      category: "Database"
    }
  ],
  inspect_llm: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "LLM"
    },
    {
      name: "DuckDB",
      description: "Fast in-process analytical database",
      url: "https://duckdb.org/",
      category: "Database"
    },
    {
      name: "Jupyter",
      description: "Interactive computing notebooks",
      url: "https://jupyter.org/",
      category: "Analysis"
    }
  ],
  inspect_brute_force: [
    {
      name: "Microsoft Excel",
      description: "Spreadsheet software with advanced data analysis features",
      url: "https://www.microsoft.com/en-us/microsoft-365/excel",
      category: "Spreadsheet"
    },
    {
      name: "LibreOffice Calc",
      description: "Free alternative to Excel with similar features",
      url: "https://www.libreoffice.org/discover/calc/",
      category: "Spreadsheet"
    },
    {
      name: "Google Sheets",
      description: "Cloud-based spreadsheet application",
      url: "https://www.google.com/sheets/about/",
      category: "Spreadsheet"
    }
  ],

  // Query execution choices
  query_llm: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "LLM"
    },
    {
      name: "Cline",
      description: "AI pair programmer (supports Ollama)",
      url: "https://cline.bot/",
      category: "LLM"
    },
    {
      name: "DuckDB",
      description: "Fast in-process analytical database",
      url: "https://duckdb.org/",
      category: "Database"
    }
  ],
  query_manual: [
    {
      name: "SQLite",
      description: "Lightweight, file-based SQL database",
      url: "https://sqlite.org/",
      category: "Database"
    },
    {
      name: "PostgreSQL",
      description: "Advanced open source relational database",
      url: "https://postgresql.org/",
      category: "Database"
    }
  ],
  query_cloud: [
    {
      name: "ChatGPT",
      description: "AI assistant with data analysis capabilities",
      url: "https://chat.openai.com/",
      category: "LLM"
    },
    {
      name: "Google Gemini",
      description: "AI assistant with strong analytical capabilities",
      url: "https://gemini.google.com/",
      category: "LLM"
    }
  ],

  // Summarization choices
  summarize_manual: [
    {
      name: "Microsoft Word",
      description: "Word processing software with summarization features",
      url: "https://www.microsoft.com/en-us/microsoft-365/word",
      category: "Word Processing"
    },
    {
      name: "LibreOffice Writer",
      description: "Free alternative to Microsoft Word",
      url: "https://www.libreoffice.org/discover/writer/",
      category: "Word Processing"
    },
    {
      name: "Google Docs",
      description: "Cloud-based word processing application",
      url: "https://docs.google.com/",
      category: "Word Processing"
    }
  ],
  summarize_llm: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "LLM"
    },
    {
      name: "Pandoc",
      description: "Universal document converter",
      url: "https://pandoc.org/",
      category: "Documentation"
    }
  ],
  summarize_cloud: [
    {
      name: "ChatGPT",
      description: "AI assistant for writing and summarization",
      url: "https://chat.openai.com/",
      category: "AI/ML"
    },
    {
      name: "Claude",
      description: "AI assistant with strong writing capabilities",
      url: "https://claude.ai/",
      category: "AI/ML"
    },
    {
      name: "Notion AI",
      description: "AI writing assistant integrated with Notion",
      url: "https://www.notion.so/product/ai",
      category: "AI/ML"
    }
  ],
  brainstorm_manual: [
    {
      name: "Miro",
      description: "Collaborative online whiteboard platform",
      url: "https://miro.com/",
      category: "Collaboration"
    },
    {
      name: "Mural",
      description: "Digital workspace for visual collaboration",
      url: "https://www.mural.co/",
      category: "Collaboration"
    },
    {
      name: "Lucidchart",
      description: "Diagramming application for visualizing ideas",
      url: "https://www.lucidchart.com/",
      category: "Diagramming"
    }
  ],
  brainstorm_localai: [
    {
      "name": "Ollama",
      "description": "Run large language models locally",
      "url": "https://ollama.ai/",
      "category": "LLM"
    },
    {
      "name": "OpenWebUI",
      "description": "Local web UI for running AI models",
      "url": "https://openwebui.com/",
      "category": "LLM"
    },
  ],
  brainstorm_cloudai: [
    {
      name: "ChatGPT",
      description: "AI assistant for brainstorming and idea generation",
      url: "https://chat.openai.com/",
      category: "LLM"
    },
    {
      name: "Perplexity",
      description: "AI-powered search and Q&A platform",
      url: "https://perplexity.ai/",
      category: "LLM"
    }
  ],
  synthesize_manual: [
    {
      name: "Microsoft Word",
      description: "Word processing software with advanced editing features",
      url: "https://www.microsoft.com/en-us/microsoft-365/word",
      category: "Word Processing"
    },
    {
      name: "LibreOffice Writer",
      description: "Free alternative to Microsoft Word with similar features",
      url: "https://www.libreoffice.org/discover/writer/",
      category: "Word Processing"
    },
    {
      name: "Google Docs",
      description: "Cloud-based word processing application for collaborative writing",
      url: "https://docs.google.com/",
      category: "Word Processing"
    }
  ],
  synthesize_localai: [
    {
      name: "OpenWebUI",
      description: "Local web UI for running AI models",
      url: "https://openwebui.com/",
      category: "LLM"
    },
    {
      name: "LMStudio",
      description: "Local AI model management and execution",
      url: "https://lmstudio.ai/",
      category: "LLM"
    },
  ],
  taskbreak_manual: [
    {
      name: "Trello",
      description: "Visual project management with boards and cards",
      url: "https://trello.com/",
      category: "Project Management"
    },
    {
      name: "Asana",
      description: "Team collaboration and project tracking platform",
      url: "https://asana.com/",
      category: "Project Management"
    },
    {
      name: "Notion",
      description: "All-in-one workspace for notes, tasks, and databases",
      url: "https://www.notion.so/",
      category: "Productivity"
    }
  ],
  taskbreak_localai: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "LLM"
    },
    {
      name: "OpenWebUI",
      description: "Local web UI for running AI models with task management",
      url: "https://openwebui.com/",
      category: "LLM"
    }
  ],
  taskbreak_aitools: [
    {
      name: "Motion",
      description: "AI-powered project management and scheduling",
      url: "https://www.usemotion.com/",
      category: "AI Project Management"
    },
    {
      name: "Asana",
      description: "Project management with AI goal and task suggestions",
      url: "https://asana.com/",
      category: "Project Management"
    }
  ],
  connect_manual: [
    {
      name: "Flask",
      description: "Micro web framework for Python",
      url: "https://flask.palletsprojects.com/",
      category: "Web Framework"
    },
    {
      name: "FastAPI",
      description: "Modern web framework for building APIs with Python",
      url: "https://fastapi.tiangolo.com/",
      category: "Web Framework"
    },
  ],
  connect_llm: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "LLM"
    },
    {
      name: "Cline",
      description: "AI pair programmer (supports Ollama)",
      url: "https://cline.bot/",
      category: "LLM"
    }
  ],
  connect_nocode: [
    {
      name: "Zapier",
      description: "Automation platform for connecting apps and services",
      url: "https://zapier.com/",
      category: "Automation"
    },
    {
      name: "make.com",
      description: "Visual automation platform for workflows",
      url: "https://www.make.com/",
      category: "Automation"
    }
  ],
  doc_manual: [
    {
      name: "Sublime Text",
      description: "Text editor with powerful search capabilities",
      url: "https://www.sublimetext.com/",
      category: "Text Editor"
    },
    {
      name: "VS Code",
      description: "Code editor with robust plugin ecosystem",
      url: "https://code.visualstudio.com/",
      category: "Text Editor"
    },
  ],
  doc_generator: [
    {
      name: "Pandoc",
      description: "Universal document converter",
      url: "https://pandoc.org/",
      category: "Document Conversion"
    },
    {
      name: "Sphinx",
      description: "Documentation generator for Python projects",
      url: "https://www.sphinx-doc.org/",
      category: "Documentation"
    },
    {
      name: "MkDocs",
      description: "Static site generator for project documentation",
      url: "https://www.mkdocs.org/",
      category: "Documentation"
    }
  ],
  structure_manual: [
    {
      name: "Trello",
      description: "Visual project management with boards and cards",
      url: "https://trello.com/",
      category: "Project Management"
    },
    {
      name: "Slack",
      description: "Team communication and collaboration platform",
      url: "https://slack.com/",
      category: "Communication"
    }
  ],
  structure_llm: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "LLM"
    },
    {
      name: "Cline",
      description: "AI pair programmer (supports Ollama)",
      url: "https://cline.bot/",
      category: "LLM"
    },
    {
      name: "cron",
      description: "Time-based job scheduler in Unix-like operating systems",
      url: "https://en.wikipedia.org/wiki/Cron",
      category: "Scheduling"
    }
  ],
  structure_engine: [
    {
      name: "Snakemake",
      description: "Workflow management system for reproducible data analysis",
      url: "https://snakemake.readthedocs.io/",
      category: "Workflow Management"
    },
    {
      name: "Nextflow",
      description: "Data-driven workflow management system",
      url: "https://www.nextflow.io/",
      category: "Workflow Management"
    },
    {
      name: "Apache Airflow",
      description: "Platform to programmatically author, schedule and monitor workflows",
      url: "https://airflow.apache.org/",
      category: "Workflow Management"
    }
  ]
};

export function getToolSuggestionsForChoice(choiceId: string): ToolSuggestion[] {
  return toolSuggestionsByChoice[choiceId] || [];
}