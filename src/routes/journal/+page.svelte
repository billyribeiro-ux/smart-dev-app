<script lang="ts">
	import { nanoid } from 'nanoid';
	import { workspaceStore } from '$lib/stores/workspace';

	const workspace = workspaceStore;

	let decision = $state('');
	let rationale = $state('');

	function addDecision() {
		if (!decision || !rationale) return;
		workspace.addDecision({
			id: nanoid(8),
			decision,
			alternatives: ['TBD'],
			rationale,
			expectedOutcome: 'Reduced architectural ambiguity',
			timestamp: new Date().toISOString()
		});
		decision = '';
		rationale = '';
	}
</script>

<section class="panel">
	<span class="pill">Decision Journal</span>
	<h2>Capture rationale as a reusable reasoning asset</h2>
	<p>High-quality decisions become part of your long-term engineering judgment graph.</p>
</section>

<section class="grid two">
	<div class="panel">
		<h3>Record decision</h3>
		<label for="decision">Decision</label>
		<input id="decision" bind:value={decision} placeholder="What decision are you making?" />
		<label for="rationale">Rationale</label>
		<textarea id="rationale" rows={4} bind:value={rationale}></textarea>
		<div class="actions">
			<button class="primary" type="button" onclick={addDecision}>Record decision</button>
		</div>
	</div>
	<div class="panel">
		<h3>Recent decisions</h3>
		<ul class="list">
			{#each $workspace.decisions as item (item.id)}
				<li>
					<strong>{item.decision}</strong><br />
					{item.rationale}
				</li>
			{/each}
		</ul>
	</div>
</section>
