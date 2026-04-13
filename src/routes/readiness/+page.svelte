<script lang="ts">
	import { createMutation } from '@tanstack/svelte-query';
	import type { ReadinessAssessment } from '$lib/domain/ontology';
	import { workspaceStore } from '$lib/stores/workspace';

	const workspace = workspaceStore;
	const recalculateMutation = createMutation(() => ({
		mutationFn: async () => {
			const payload = {
				blueprint: $workspace.blueprint,
				skills: $workspace.skills
			};
			const response = await fetch('/api/intelligence/readiness', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error('Failed to recompute readiness');
			}

			const data = (await response.json()) as { readiness: ReadinessAssessment };
			return data.readiness;
		},
		onSuccess: (readiness) => {
			workspace.setReadiness(readiness);
		}
	}));

	function tone(score: number) {
		if (score >= 0.75) return 'Ready';
		if (score >= 0.55) return 'Needs Reinforcement';
		return 'High-Risk Gap';
	}
</script>

<section class="panel">
	<span class="pill">Readiness</span>
	<h2>Capability-to-project fit</h2>
	<p>
		Hybrid reasoning combines deterministic checks, archetype pattern matching, and explainable
		recommendations.
	</p>
	<div class="actions">
		<button class="primary" type="button" onclick={() => recalculateMutation.mutate()}>
			{recalculateMutation.isPending ? 'Recomputing...' : 'Recompute readiness'}
		</button>
	</div>
</section>

<section class="grid two">
	<div class="panel">
		<h3>Domain readiness</h3>
		<ul class="list">
			{#each Object.entries($workspace.readiness.readinessByDomain) as [domain, score] (domain)}
				<li>
					<strong>{domain}</strong>: {Math.round(score * 100)}% - {tone(score)}
				</li>
			{/each}
		</ul>
	</div>
	<div class="panel">
		<h3>Recommendation</h3>
		<p><strong>{$workspace.readiness.goNoGoRecommendation}</strong></p>
		<ul class="list">
			{#each $workspace.readiness.scopeAdjustmentProposal as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</section>

{#if $workspace.mode === 'advanced'}
	<section class="panel">
		<h3>Explainability trace</h3>
		<ul class="list">
			{#each $workspace.readiness.explainabilityTrace as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</section>
{/if}
