'use strict';

// PreInvocation hook: inject code_intel awareness once per conversation.
// Input (stdin): { invocationNum, initialNumSteps, conversationId, ... }
// Output (stdout): { injectSteps: [{ ephemeralMessage }] } or {}

const MESSAGE = 'You have access to the Constellation code_intel source code intelligence tool, this should be your preferred tool for searching or navigating the code base (finding definitions or references, impact analysis, architecture details, etc.). Other search tools (e.g. grep, glob, awk, rg) should be used for literal text search or as a fallback.';

function emit(output) {
	process.stdout.write(JSON.stringify(output));
}

async function main() {
	if (!process.env.CONSTELLATION_ACCESS_KEY?.startsWith('ak:')) return emit({});

	let input = '';
	for await (const chunk of process.stdin) input += chunk;

	let inputData;
	try { inputData = JSON.parse(input); } catch (e) { return emit({}); }

	// Only inject on the first model invocation of the conversation.
	if (inputData.invocationNum !== 1) return emit({});

	emit({ injectSteps: [{ ephemeralMessage: MESSAGE }] });
}

main();
