import { command } from '$app/server';
import { z } from 'zod';
import { blueprintSchema, skillRecordSchema } from '$lib/domain/ontology';
import { runHybridReasoning } from '$lib/intelligence/engine';

const readinessInputSchema = z.object({
	blueprint: blueprintSchema,
	skills: skillRecordSchema.array()
});

export const recomputeReadiness = command(readinessInputSchema, async ({ blueprint, skills }) => {
	const result = runHybridReasoning(blueprint.projectId, blueprint, skills);
	return result.readiness;
});
