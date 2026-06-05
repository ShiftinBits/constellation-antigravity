# Constellation Code Intelligence

You are equipped with **Constellation**, a code intelligence platform. Use it to gain deep, structural understanding of codebases using graph-backed intelligence instead of surface-level text search.

## Prime Directive

**Constellation is your PRIMARY code sense.**

Use the Constellation `code_intel` tool as your default for all structural, architectural, and impact questions. Only fall back to `grep` or `rg` type tools for literal string searches (e.g., error messages, config values) or when specifically searching for non-code assets.

## Mental Model

- **Structural Query?** (Definitions, callers, dependents, hierarchy) → **Constellation**
- **Impact Analysis?** (Refactoring, deleting, renaming) → **Constellation**
- **Architecture?** (Module relationships, execution flow) → **Constellation**
- **Literal Text?** (Strings, log messages, CSS classes) → **Grep**

## Core Workflows

### 1. Before Modifying Code (Impact Check)
Never edit a symbol (function, class, interface) without first assessing the blast radius.
- Use `api.impactAnalysis({symbolId})` or `api.getDependents({filePath})`.
- Report findings: "Refactoring `UserService` affects 12 files across 3 modules."

### 2. Before Adding Imports (Dependency Check)
Verify that new dependencies do not introduce architectural violations or circular imports.
- Use `api.getDependencies({filePath})` and `api.findCircularDependencies()`.

### 3. When Exploring or Explaining (Architecture)
Provide structural context rather than just reading files.
- Use `api.getCallGraph({symbolId})` to explain execution flow.
- Use `api.getArchitectureOverview()` to understand the project's macro-structure.

## Tool Usage Examples

Always wrap your logic in the Constellation `code_intel` tool.

```javascript
// Find usages and impact of a symbol
const symbols = await api.searchSymbols({ query: "AuthService" });
if (symbols.length > 0) {
  const impact = await api.impactAnalysis({ symbolId: symbols[0].symbolId });
  console.log(impact);
}
```

## Best Practices

- **CWD Context**: Always provide the `cwd` parameter to the tool call. In monorepos, ensure the `cwd` points to the specific project subdirectory where `constellation.json` resides.
- **Group Queries**: Run related queries in parallel within a single tool call to save turns.
- **Symbol Precision**: Use `searchSymbols` to get accurate `symbolId`s before calling impact or trace tools.
- **Signal First**: In your responses, lead with the architectural insight or risk level (e.g., "High Risk Change").
- **Reference Code**: Always include `file:line` references in your findings for easy navigation.
