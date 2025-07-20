export type ToolSuggestion = {
  name: string;
  description: string;
  url: string;
  category: string;
};

export const toolSuggestionsByChoice: Record<string, ToolSuggestion[]> = {
  // Researcher scenario - OCR choices
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
      category: "AI/ML"
    },
    {
      name: "LlamaIndex",
      description: "Data framework for LLM applications",
      url: "https://www.llamaindex.ai/",
      category: "AI/ML"
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
      category: "AI/ML"
    },
    {
      name: "Claude",
      description: "AI assistant with strong document analysis",
      url: "https://claude.ai/",
      category: "AI/ML"
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
      category: "AI/ML"
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
      category: "AI/ML"
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
      name: "LibreOffice Calc",
      description: "Free alternative to Excel with better large file handling",
      url: "https://www.libreoffice.org/discover/calc/",
      category: "Spreadsheet"
    }
  ],
  
  // Query execution choices
  query_llm: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "AI/ML"
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer for code generation",
      url: "https://github.com/features/copilot",
      category: "AI/ML"
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
      description: "AI assistant for data analysis",
      url: "https://chat.openai.com/",
      category: "AI/ML"
    },
    {
      name: "Claude",
      description: "AI assistant with strong analytical capabilities",
      url: "https://claude.ai/",
      category: "AI/ML"
    }
  ],
  
  // Summarization choices
  summarize_llm: [
    {
      name: "Ollama",
      description: "Run large language models locally",
      url: "https://ollama.ai/",
      category: "AI/ML"
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
  ]
};

export function getToolSuggestionsForChoice(choiceId: string): ToolSuggestion[] {
  return toolSuggestionsByChoice[choiceId] || [];
}