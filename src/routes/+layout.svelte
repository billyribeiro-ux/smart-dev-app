<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import AppShell from '$lib/components/AppShell.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from '$lib/query-client';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Architect - Developer Thinking OS</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<AppShell>
		{@render children()}
	</AppShell>
</QueryClientProvider>
