<script>
	import { user, page } from './stores'
	import { auth, googleProvider, db } from './firebase'
	import Nav from './components/Nav.svelte'
	import Profile from './components/Profile.svelte'

	async function signup() {
		// login
		let loginData = await auth.signInWithPopup(googleProvider)

		// update the user store
		user.set(
			{
				uid: loginData.user.uid,
				email: loginData.user.email
			}
		)

		// write user to database
		db.collection('users').doc(loginData.user.uid).set(
			{
				email: loginData.user.email
			}
		)

		// redirect to the profile page
		page.set(Profile)
	}

	async function login() {
		// get the user's data from the login information
		let loginData = await auth.signInWithPopup(googleProvider)
		let userRef = await db.collection('users').doc(loginData.user.uid).get()
		let userData = userRef.data()
		
		// get the school name from the reference in the user data
		if (userData.school) {
			let schoolRef = await userRef.school.get()
			let schoolData = schoolRef.data()
			userData.school = schoolData.name
		}
		
		// update the user store
		user.set(
			{
				uid: loginData.user.uid,
				...userData
			}
		)

		// redirect to the profile page
		page.set(Profile)
	}

	function logout() {
		auth.signOut()
		page.set(undefined)
		user.set(undefined)
	}
</script>

<svelte:head>
	<title>Ako: Home</title>
</svelte:head>

<Nav on:signup={signup} on:login={login} on:logout={logout} />

{#if $page}
	<svelte:component this={$page} />
{:else}
	<section class="section content has-text-centered">
		<h1 class="title">Welcome to Ako Tutor</h1>
		<p>Get help with a tricky subject! Find another student that's willing to help you out.</p>
	</section>
{/if}
