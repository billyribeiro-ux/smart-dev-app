<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';

	const workspace = workspaceStore;
</script>

<section class="panel">
	<span class="pill">Roadmap</span>
	<h2>Dependency-aware implementation sequence</h2>
	<p>Build in milestone order with quality gates and explicit dependency links.</p>
</section>

<section class="grid two">
	<div class="panel">
		<h3>Roadmap phases</h3>
		<ul class="list">
			{#each $workspace.roadmap as phase (phase.id)}
				<li>
					<strong>Phase {phase.phase}</strong> - {phase.objective}
					<ul class="list">
						{#each phase.deliverables as deliverable (deliverable)}
							<li>{deliverable}</li>
						{/each}
						{#if $workspace.mode === 'advanced'}
							{#each phase.qualityGates as gate (gate)}
								<li>Quality gate: {gate}</li>
							{/each}
						{/if}
					</ul>
				</li>
			{/each}
		</ul>
	</div>

	<div class="panel">
		<h3>Milestones</h3>
		<ul class="list">
			{#each $workspace.milestones as milestone (milestone.id)}
				<li>
					<strong>{milestone.title}</strong> ({milestone.status})
					<ul class="list">
						{#each milestone.acceptanceCriteria as criterion (criterion)}
							<li>{criterion}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
</section>
