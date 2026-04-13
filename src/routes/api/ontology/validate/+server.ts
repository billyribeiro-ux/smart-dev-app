import { json } from '@sveltejs/kit';
import { ontologyBundleSchema } from '$lib/domain/ontology';

export async function POST({ request }) {
	const payload = await request.json();
	const parsed = ontologyBundleSchema.safeParse(payload);

	if (!parsed.success) {
		return json(
			{
				ok: false,
				issues: parsed.error.issues
			},
			{ status: 400 }
		);
	}

	return json({ ok: true });
}
