<script>
	import { fly } from 'svelte/transition'
	import { page } from './stores'
	import { getAllSchools, getAllSubjects, findTutor } from './firebase'
	import Nav from './components/Nav.svelte'
	
	let school
	let level
	let subject
	let tutor
	let found = false

	let schools = getAllSchools()
	let subjects = getAllSubjects()

	function find() {
		tutor = findTutor(school, level, subject)
		found = true
	}
</script>

<style>
	@media screen and (min-width: 1200px) {
    form {
      width: 60%;
      margin: 0 auto;
    }
  }

	form {
		margin-bottom: 2em;
	}
</style>

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

		<form on:submit|preventDefault={find}>
			<div class="field has-addons has-addons-centered">

				<div class="control is-expanded">
					<div class="select is-fullwidth is-medium">
						<select bind:value={school}>
							<option value="" disabled selected>Choose your school</option>
							{#await schools}
								<option value="loading">Loading schools...</option>
							{:then schools}
								{#each schools as school}
									<option value={school}>{school}</option>
								{/each}
							{:catch error}
								<option class="is-warning">{error.message}</option>
							{/await}		
						</select>
					</div>
				</div>
			</div>

			<div class="field has-addons">
				<div class="control is-expanded">
					<div class="select is-fullwidth is-medium">
						<select bind:value={level}>
							<option value="" disabled selected>Choose your level</option>
							{#await subjects}
								<option value="loading">Loading levels...</option>
							{:then subjects}
								{#each [ ...subjects.keys() ] as level}
									<option value={level}>{level}</option>
								{/each}
							{:catch error}
								<option class="is-warning">{error.message}</option>
							{/await}
						</select>
					</div>
				</div>

				<div class="control is-expanded">
					<div class="select is-fullwidth is-medium">
						<select bind:value={subject}>
							<option value="" disabled selected>Choose your subject</option>
							{#await subjects}
								<option value="loading">Loading subjects...</option>
							{:then subjects}
								{#each subjects.get('Level 1') as subject}
									<option value={subject}>{subject}</option>
								{/each}
							{:catch error}
								<option class="is-warning">{error.message}</option>
							{/await}
						</select>
					</div>
				</div>
				
			</div>

			<div class="field">
				<div class="control">
					<button class="button is-primary is-medium" type="submit">
						Find tutor
					</button>
				</div>
			</div>

		</form>
		
		{#if found}
			{#await tutor}
				<div></div>
			{:then tutor}
					<div
						in:fly="{{ y: 150, duration: 1000 }}">
						{#if tutor}
							Your recommended tutor is...
							<strong>{tutor.firstName} {tutor.lastName}</strong>
						{:else}
							Sorry! No one has signed up to tutor that yet.
						{/if}
					</div>
			{/await}	
		{/if}
	</section>
{/if}
