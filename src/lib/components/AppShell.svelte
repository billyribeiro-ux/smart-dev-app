<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { navItems } from '$lib/navigation';
	import { workspaceStore } from '$lib/stores/workspace';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	const workspace = workspaceStore;
</script>

<div class="shell">
	<aside class="sidebar">
		<div class="sidebar-header">
			<p class="label">Architect</p>
			<h1>Developer Thinking OS</h1>
		</div>

		<nav class="nav">
			{#each navItems as item (item.href)}
				<a href={resolve(item.href)} class:active={page.url.pathname === item.href}>
					<item.icon size={18} />
					<div>
						<p>{item.label}</p>
						<span>{item.description}</span>
					</div>
				</a>
			{/each}
		</nav>

		<div class="mode">
			<p>Reasoning Mode</p>
			<div class="mode-toggle">
				<button
					class:selected={$workspace.mode === 'essential'}
					type="button"
					onclick={() => workspace.setMode('essential')}
				>
					Essential
				</button>
				<button
					class:selected={$workspace.mode === 'advanced'}
					type="button"
					onclick={() => workspace.setMode('advanced')}
				>
					Advanced
				</button>
			</div>
		</div>
	</aside>

	<main class="content">
		{@render children()}
	</main>
</div>
