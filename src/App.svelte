<script>
	import { page } from './stores'
	import Nav from './components/Nav.svelte'
</script>

<svelte:head>
	<title>Ako: Home</title>
</svelte:head>

<Nav />

{#if $page}
	<svelte:component this={$page} />
{:else}
	<section class="section content has-text-centered">
		<h1 class="title">Welcome to Ako Tutor</h1>
		<p>Get help with a tricky subject! Find another student that's willing to help you out.</p>
	</section>
{/if}
