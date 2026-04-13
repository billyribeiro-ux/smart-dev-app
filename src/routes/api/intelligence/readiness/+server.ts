import { json } from '@sveltejs/kit';
import { blueprintSchema, skillRecordSchema } from '$lib/domain/ontology';
import { runHybridReasoning } from '$lib/intelligence/engine';

export async function POST({ request }) {
	const payload = await request.json();

	const parsedBlueprint = blueprintSchema.safeParse(payload.blueprint);
	const parsedSkills = skillRecordSchema.array().safeParse(payload.skills);

	if (!parsedBlueprint.success || !parsedSkills.success) {
		return json(
			{
				error: 'Invalid payload',
				blueprintIssues: parsedBlueprint.success ? [] : parsedBlueprint.error.issues,
				skillIssues: parsedSkills.success ? [] : parsedSkills.error.issues
			},
			{ status: 400 }
		);
	}

	const result = runHybridReasoning(
		parsedBlueprint.data.projectId,
		parsedBlueprint.data,
		parsedSkills.data
	);

	return json(result);
}
