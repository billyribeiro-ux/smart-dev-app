<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';

	const workspace = workspaceStore;
</script>

<section class="panel">
	<span class="pill">Blueprint Studio</span>
	<h2>Canonical project blueprint</h2>
	<p>
		Artifact quality is measured by entity/action/rule completeness and architecture rationale
		traceability.
	</p>
</section>

<section class="grid three">
	<div class="panel">
		<h3>Entities</h3>
		<ul class="list">
			{#each $workspace.blueprint.entities as entity (entity.id)}
				<li>
					<strong>{entity.name}</strong>: {entity.description}
				</li>
			{/each}
		</ul>
	</div>
	<div class="panel">
		<h3>Actions</h3>
		<ul class="list">
			{#each $workspace.blueprint.actions as action (action.id)}
				<li>
					<strong>{action.actor}</strong>: {action.intent}
				</li>
			{/each}
		</ul>
	</div>
	<div class="panel">
		<h3>Rules</h3>
		<ul class="list">
			{#each $workspace.blueprint.rules as rule (rule.id)}
				<li>
					<strong>{rule.ruleType}</strong>: {rule.description}
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="panel grid two">
	<div>
		<h3>Architecture direction</h3>
		<ul class="list">
			<li>Shape: {$workspace.blueprint.architectureDirection.appShape}</li>
			<li>Data: {$workspace.blueprint.architectureDirection.dataStrategy}</li>
			<li>Auth: {$workspace.blueprint.architectureDirection.authStrategy}</li>
		</ul>
	</div>
	<div>
		<h3>Risk register</h3>
		<ul class="list">
			{#each $workspace.blueprint.risks as risk (risk)}
				<li>{risk}</li>
			{/each}
		</ul>
	</div>
</section>

{#if $workspace.mode === 'advanced'}
	<section class="panel">
		<h3>Flow map</h3>
		<ul class="list">
			{#each $workspace.blueprint.flows as flow (flow.id)}
				<li>
					<strong>{flow.name}</strong> - {flow.entryCondition}
				</li>
			{/each}
		</ul>
	</section>
{/if}
