'use strict';

// PreToolUse hook: steer the agent toward code_intel for structural code search.
// Input (stdin): { toolCall: { name, args }, stepIdx, conversationId, ... }
// Output (stdout): { decision, reason? }
//
// Decisions are chosen to never change permission behavior:
// - grep_search / find_by_name are read-only, so "allow" is a no-op grant.
// - run_command keeps the default permission flow via "ask" (respects Always Allow).

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

	const toolName = inputData.toolCall?.name || '';
	const neutral = toolName === 'run_command' ? 'ask' : 'allow';

	if (!process.env.CONSTELLATION_ACCESS_KEY?.startsWith('ak:')) return emit({ decision: neutral });

	if (toolName === 'grep_search' || toolName === 'find_by_name') {
		return emit({ decision: 'allow', reason: REMINDER });
	}

	if (toolName === 'run_command') {
		const command = inputData.toolCall?.args?.CommandLine || '';
		if (SHELL_SEARCH_REGEX.test(command)) return emit({ decision: 'ask', reason: REMINDER });
	}

	emit({ decision: neutral });
}

main();
