'use strict';

// PreToolUse hook: steer the agent toward code_intel for structural code search.
// Input (stdin): { toolCall: { name, args }, stepIdx, conversationId, ... }
// Output (stdout): { decision, reason? }
//
// Every path returns decision "ask", which defers to the host's normal
// permission flow (it respects Always Allow and the default policy for
// read-only tools). This hook never grants ("allow") or blocks ("deny");
// it only attaches a steering reason when a text-search tool is used.

const SHELL_SEARCH_REGEX = /\b(?:grep|rg|glob|awk|findstr)\b/i;

const REMINDER = 'Use the Constellation code_intel tool before other tools for searching or navigating the codebase. Other search tools (e.g. grep, glob, awk, rg) should be used for literal text search or as a fallback.';

function emit(output) {
	process.stdout.write(JSON.stringify(output));
}

async function main() {
	let input = '';
	for await (const chunk of process.stdin) input += chunk;

	let inputData;
	try { inputData = JSON.parse(input); } catch (e) { inputData = {}; }

	if (!process.env.CONSTELLATION_ACCESS_KEY?.startsWith('ak:')) return emit({ decision: 'ask' });

	const toolName = inputData.toolCall?.name || '';

	if (toolName === 'grep_search' || toolName === 'find_by_name') {
		return emit({ decision: 'ask', reason: REMINDER });
	}

	if (toolName === 'run_command') {
		const command = inputData.toolCall?.args?.CommandLine || '';
		if (SHELL_SEARCH_REGEX.test(command)) return emit({ decision: 'ask', reason: REMINDER });
	}

	emit({ decision: 'ask' });
}

main();
