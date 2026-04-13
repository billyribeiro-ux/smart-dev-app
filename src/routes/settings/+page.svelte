<script lang="ts">
	import { workspaceStore } from '$lib/stores/workspace';

	const workspace = workspaceStore;

	let targetWindow = $state('8-12 weeks');
</script>

<section class="panel">
	<span class="pill">Settings</span>
	<h2>Workspace preferences and profile calibration</h2>
	<p>Configure planning depth, focus horizon, and data ownership defaults.</p>
</section>

<section class="grid two">
	<div class="panel">
		<h3>Planning depth</h3>
		<p>Switch between essential and advanced mode from the left rail.</p>
		<div class="actions">
			<button class="ghost" type="button" onclick={() => workspace.setMode('essential')}>
				Use Essential
			</button>
			<button class="ghost" type="button" onclick={() => workspace.setMode('advanced')}>
				Use Advanced
			</button>
		</div>
	</div>
	<div class="panel">
		<h3>Execution horizon</h3>
		<label for="window">Preferred milestone window</label>
		<input id="window" bind:value={targetWindow} />
		<p>Current: {targetWindow}</p>
	</div>
</section>
