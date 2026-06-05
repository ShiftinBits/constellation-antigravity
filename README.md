# <img src="https://constellationdev.io/gemini-icon.svg" height="30"> Constellation Plugin for Google Antigravity

[![MCP Server](https://img.shields.io/badge/MCP-@constellationdev/mcp-black.svg?logo=modelcontextprotocol)](https://github.com/ShiftinBits/constellation-mcp) [![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-3DA639?logo=opensourceinitiative&logoColor=white)](LICENSE)

While Constellation's MCP server provides raw code intelligence capabilities, this plugin enhances your Antigravity experience with:

| Feature | Benefit |
|---------|---------|
| **Skills** | Antigravity automatically loads relevant code intelligence workflows, also invocable as slash commands |
| **Rules** | Always-on guidance steering the agent toward graph-backed code understanding |
| **Hooks** | Transparent steering toward `code_intel` for structural code queries |
| **MCP Server** | Bundled `code_intel` server connection, no separate setup |

## Features

### Skills

Antigravity activates these automatically based on your questions, or invoke them by name:

| Skill | Triggers When You Ask About... |
|-------|-------------------------------|
| **status** | Constellation connection or auth status |
| **diagnose** | Health check for MCP server, API auth, and indexing |
| **impact-analysis** | "Impact of changing X", "what would break if I modify X", "blast radius", "risk of renaming X", "safe to delete X" |
| **deps** | A file's dependencies, dependents, or circular dependencies |
| **unused** | Orphaned exports, dead code, cleanup candidates |
| **architecture** | High-level codebase structure and composition |
| **constellation-troubleshooting** | Error codes, connectivity issues, debugging problems |

### Rules

`rules/constellation.md` establishes Constellation as the agent's primary code sense: structural queries, impact analysis, and architecture questions go to `code_intel`; literal text search falls back to grep.

### Hooks

Event hooks transparently steer Antigravity toward `code_intel` for structural code questions. All hooks are gated on `CONSTELLATION_ACCESS_KEY` being set (prefix `ak:`) and never block execution:

| Hook | Event | Matcher | Behavior |
|------|-------|---------|----------|
| **constellation-context** | `PreInvocation` | — | Injects `code_intel` awareness as an ephemeral message on the first model invocation of each conversation |
| **constellation-tool-steering** | `PreToolUse` | `grep_search\|find_by_name\|run_command` | Reminds Antigravity to prefer `code_intel` when it reaches for text search, file search, or shell commands containing `grep`, `rg`, `glob`, `awk`, or `findstr` |

The `PreToolUse` hook always returns a non-blocking decision: `allow` for the read-only search tools, `ask` for `run_command` (preserving the default permission flow).

## Installation

### Prerequisites

1. **Constellation Account** (see [Constellation](https://app.constellationdev.io))
2. **Project indexed** in Constellation
3. **Access key** configured (`CONSTELLATION_ACCESS_KEY` environment variable)

### Antigravity CLI

```bash
agy plugin install https://github.com/ShiftinBits/constellation-antigravity
```

### Manual install

Clone (or copy) this repository into one of Antigravity's plugin locations:

| Scope | Location |
|-------|----------|
| Workspace | `<workspace-root>/.agents/plugins/constellation/` |
| Global | `~/.gemini/config/plugins/constellation/` |

Antigravity scans these directories automatically and loads the plugin's skills, rules, hooks, and MCP server.

## Usage Examples

### Check Your Setup

```
> Use the status skill to check Constellation

Status: Connected
Project: my-awesome-app
Files Indexed: 1,247
Symbols: 8,932
Languages: TypeScript, JavaScript
```

### Analyze Before Refactoring

```
> What's the impact of changing validateUser in src/auth/validator.ts?

Symbol: validateUser (function)
Risk Level: MEDIUM
Files Affected: 12
Symbols Affected: 34
Test Coverage: 67%

Recommendations:
- Update unit tests in auth.spec.ts
- Check integration with UserController
```

### Find Dead Code

```
> Find unused functions in this codebase

Found 7 orphaned functions:
├── src/utils/legacy.ts
│   ├── formatLegacyDate (line 23)
│   └── parseLegacyConfig (line 45)
├── src/helpers/deprecated.ts
│   └── oldValidation (line 12)
...
```

### Understand Dependencies

```
> What does src/services/payment.service.ts depend on?

Dependencies (12):
├── Internal (8)
│   ├── src/models/payment.model.ts
│   ├── src/utils/currency.ts
│   └── ...
└── External (4)
    ├── stripe
    ├── lodash
    └── ...

No circular dependencies detected.
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `AUTH_ERROR` | Check `CONSTELLATION_ACCESS_KEY` is set correctly, use `npx @constellationdev/cli auth` to set |
| `PROJECT_NOT_INDEXED` | Run `constellation index --full` in your project |
| Skills not appearing | Restart Antigravity, check the plugin path, or browse `/skills` |
| MCP server not connecting | Check `/mcp` in the Antigravity CLI for server status and logs |

## Documentation

- [Constellation Documentation](https://docs.constellationdev.io) — Full platform documentation
- [MCP Server](https://github.com/shiftinbits/constellation-mcp) — Underlying MCP server
- [Antigravity Plugins](https://antigravity.google/docs/plugins) — Plugin structure reference
- [Antigravity CLI Plugins & Skills](https://antigravity.google/docs/cli-plugins) — CLI plugin guide

## License

GNU Affero General Public License v3.0 (AGPL-3.0)

Copyright © 2026 ShiftinBits Inc.

See [LICENSE](LICENSE) file for details.
