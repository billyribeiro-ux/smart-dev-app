<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';

	const workspace = workspaceStore;
</script>

<section class="panel">
	<span class="pill">Projects</span>
	<h2>{$workspace.project.intent.title}</h2>
	<p>{$workspace.project.intent.problemStatement}</p>
</section>

<section class="grid two">
	<div class="panel">
		<h3>Lifecycle state</h3>
		<ul class="list">
			<li>Status: {$workspace.project.status}</li>
			<li>Scope variant: {$workspace.blueprint.scopeVariant}</li>
			<li>Updated: {new Date($workspace.project.updatedAt).toLocaleString()}</li>
		</ul>
	</div>
	<div class="panel">
		<h3>Constraints</h3>
		<ul class="list">
			{#each $workspace.project.intent.constraints as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</section>
