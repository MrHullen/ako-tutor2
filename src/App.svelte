<script>
	import { page } from './stores'
	import Nav from './components/Nav.svelte'
	import Find from "./components/Find.svelte"

	if ($page == undefined) {
		$page = Find
	}
</script>

<svelte:head>
	<title>Ako: Home</title>
</svelte:head>

<Nav />

<main>
	{#if $page}
		<svelte:component this={$page} />
	{:else}
		<p>An error ocurred. I don't know why.</p>
	{/if}
</main>
