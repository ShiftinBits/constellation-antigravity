---
name: deps
description: Analyzes dependencies of a file, or what depends on it (reverse). Use when asked about a file's imports, dependencies, dependents, coupling, or circular dependencies.
---
Analyze dependencies for a file the user names. **If no file path is provided**, ask the user what file they want to analyze.

If the user asks what depends on the file (reverse direction):
1. Use the Constellation `code_intel` tool with `getDependents({ filePath: "<file-path>", depth: 2 })`.
2. Present: Summary (count of files that depend on this one) and Dependents (each file and what it imports). Note: Suggest reviewing these files if planning changes.

Otherwise:
1. Use the Constellation `code_intel` tool with `getDependencies({ filePath: "<file-path>", depth: 2, includePackages: true })` and `findCircularDependencies({ filePath: "<file-path>", maxDepth: 5 })`.
2. Present: Summary (count of internal vs external), Internal Dependencies (each file and symbols imported), External Packages (npm list), and Circular Dependencies (cycles detected, severity, and path).

Highlight any circular dependencies as potential issues to address.
