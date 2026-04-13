<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';

	const workspace = workspaceStore;
</script>

<section class="panel">
	<span class="pill">Insights</span>
	<h2>Long-term builder evolution</h2>
	<p>Track how planning quality and execution outcomes improve across projects.</p>
</section>

<section class="grid two">
	<div class="panel">
		<h3>Reflection summary</h3>
		<ul class="list">
			{#each $workspace.reflection.technicalLessons as lesson (lesson)}
				<li>{lesson}</li>
			{/each}
		</ul>
	</div>
	<div class="panel">
		<h3>Next project calibration</h3>
		<ul class="list">
			{#each $workspace.reflection.nextProjectCalibration as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</section>
