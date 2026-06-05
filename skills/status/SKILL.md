---
name: status
description: Checks Constellation API connectivity and authentication status. Use when asked to check Constellation status, connection health, or whether code intelligence is working.
---
Check the Constellation API connection status by calling the Constellation `code_intel` tool with `return await api.ping()`.

**If successful** (result.pong === true), report:
- Status: Connected
- Authentication valid, project access confirmed
- Note: Use the `diagnose` skill to check indexing status

**If error** (result.success is false), report based on error code:

| Error Code | Response |
|------------|----------|
| `AUTH_ERROR` | "Status: Auth Failed - Run `npx @constellationdev/cli auth` to configure credentials" |
| `PROJECT_NOT_REGISTERED` | "Status: Project Not Found - Verify project ID or check organization access" |
| `PROJECT_INACTIVE` | "Status: Project Inactive - Project has been deactivated" |
| `API_UNREACHABLE` | "Status: API Offline - Check network connectivity and API URL in constellation.json" |
| Other codes | Show error code, message, and guidance from result.error |

**If the tool call fails entirely**, report that the Constellation MCP server is not running or not configured.

Keep the response brief and actionable.
