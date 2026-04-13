<script lang="ts">
	import { workspaceHealth, workspaceStore } from '$lib/stores/workspace';
	import { gsap } from 'gsap';
	import { animate } from '@motionone/dom';
	import { onMount } from 'svelte';

	let draftProblem = $state('');
	let draftOutcome = $state('');

	const workspace = workspaceStore;

	function updateProjectIntent() {
		workspace.updateIdea({
			problemStatement: draftProblem || undefined,
			coreOutcome: draftOutcome || undefined
		});
		workspace.recomputeReadiness();
	}

	onMount(() => {
		gsap.from('.panel', {
			opacity: 0,
			y: 16,
			duration: 0.45,
			stagger: 0.05,
			ease: 'power2.out'
		});
		animate(
			'.pill',
			{ transform: ['translateY(8px)', 'translateY(0px)'], opacity: [0.6, 1] },
			{ duration: 0.45, easing: 'ease-out' }
		);
	});
</script>

<section class="panel">
	<span class="pill">Command Deck</span>
	<h2>Structure your thinking before you start implementation</h2>
	<p>
		Capture project intent, generate a blueprint, and keep build sequencing tied to readiness
		quality.
	</p>
</section>

<section class="grid three">
	<div class="panel metric">
		<p>Overall readiness</p>
		<strong>{Math.round($workspaceHealth.overall * 100)}%</strong>
	</div>
	<div class="panel metric">
		<p>Blocked milestones</p>
		<strong>{$workspaceHealth.blockedMilestones}</strong>
	</div>
	<div class="panel metric">
		<p>Critical skill gaps</p>
		<strong>{$workspaceHealth.criticalGaps}</strong>
	</div>
</section>

<section class="panel grid two">
	<div>
		<h3>Idea Intake</h3>
		<p>Start from user outcome. The system will synthesize decomposition and readiness guidance.</p>
		<label for="problem">Problem statement</label>
		<textarea
			id="problem"
			rows={4}
			bind:value={draftProblem}
			placeholder="What user problem are you solving?"
		></textarea>
		<label for="outcome">Core user outcome</label>
		<textarea
			id="outcome"
			rows={3}
			bind:value={draftOutcome}
			placeholder="What success should users experience?"
		></textarea>
		<div class="actions">
			<button class="primary" type="button" onclick={updateProjectIntent}
				>Generate decomposition draft</button
			>
			<button class="ghost" type="button" onclick={() => workspace.recomputeReadiness()}>
				Assess readiness
			</button>
		</div>
	</div>

	<div>
		<h3>Immediate next actions</h3>
		<ul class="list">
			{#each $workspace.blueprint.immediateNextActions as action (action)}
				<li>{action}</li>
			{/each}
		</ul>
	</div>
</section>
