---
name: unused
description: Finds orphaned/dead code that is exported but never imported. Use when asked about unused code, dead code, orphaned exports, or cleanup candidates.
---
Find exported code that is never imported or used anywhere in the codebase using the Constellation `code_intel` tool with `findOrphanedCode({})`. If the user names a symbol kind (e.g. function, class), pass it as `findOrphanedCode({ filterByKind: ["<kind>"] })`.

**If orphaned code is found**, present:
1. **Summary**: Total count of orphaned exports, broken down by kind.
2. **Files with Most Orphans**: Group results by file, sorted by count (show top 20).
3. **For Each File**: List the orphaned symbol names, kinds, and line numbers.

**Recommendations to include:**
- Review each orphaned export to confirm it's truly unused.
- Some may be entry points or dynamically imported.
- Consider removing confirmed dead code.
- Focus on files with multiple orphans first.

**If no orphans found**, congratulate the user on a clean codebase.
