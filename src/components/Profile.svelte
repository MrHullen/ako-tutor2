<script>
  import { user } from '../stores'
  import { db } from '../firebase'

  // temp dev data
  let jnrSubjects = 'English Maths Science'.split(' ')
  let lvl1Subjects = 'English Maths Science'.split(' ')
  let lvl2Subjects = 'English Maths Science'.split(' ')
  let lvl3Subjects = 'English Maths Science'.split(' ')

  let subjects = new Map()

  async function getAllSubjects() {
    // get all the subject documents from the database
    let allSubjectsRef = await db.collection('subjects').get()
    
    // create a map with level as the key and array of subjects as value
    allSubjectsRef.forEach(subjectRef => {
      let subjectData = subjectRef.data()
      if (!subjects.has(subjectData.level)) {
        subjects.set(subjectData.level, [])
      }
      subjects.get(subjectData.level).push(subjectData.name)
    })
  }

  function getSubjects() {
    db.collection('')
  }

  function updateProfile() {
    db.collection('users').doc(user.uid).update(
			{
        firstName: user.firstName,
        lastName: user.lastName,
			}
		)
  }
</script>

<style>
@media screen and (min-device-width: 1200px) {
  form {
    width: 60%;
    margin: 0 auto;
  }
}

.checkbox-group {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, auto); 
}
</style>

<h1 class="title has-text-centered">Profile</h1>

<form class="section" on:submit|preventDefault={updateProfile}>
  <h2 class="subtitle">About</h2>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Name</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="First" readonly bind:value={$user.firstName}>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          {#if $user.firstName}
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          {:else}
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          {/if}
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-right">
          <input class="input" type="text" placeholder="Last" readonly bind:value={$user.lastName}>
          {#if $user.lastName}
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          {:else}
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          {/if}
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">Email</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input is-success" type="email" readonly bind:value={$user.email}>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
    </div>
  </div>

  <h2 class="subtitle">Subjects</h2>

  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">Junior</label>
    </div>
    <div class="field-body">
      <div class="field is-grouped">
        <div class="control checkbox-group">
          {#each jnrSubjects as subject}
            <label class="checkbox">
              <input type="checkbox" bind:value={subject}>
              {subject}
            </label>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">Level 1</label>
    </div>
    <div class="field-body">
      <div class="field is-grouped">
        <div class="control checkbox-group">
          {#each lvl1Subjects as subject}
            <label class="checkbox">
              <input type="checkbox" bind:value={subject}>
              {subject}
            </label>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">Level 2</label>
    </div>
    <div class="field-body">
      <div class="field is-grouped">
        <div class="control checkbox-group">
          <label class="checkbox">
            {#each lvl2Subjects as subject}
            <label class="checkbox">
              <input type="checkbox" bind:value={subject}>
              {subject}
            </label>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">Level 3</label>
    </div>
    <div class="field-body">
      <div class="field is-grouped">
        <div class="control checkbox-group">
          {#each lvl3Subjects as subject}
            <label class="checkbox">
              <input type="checkbox" bind:value={subject}>
              {subject}
            </label>
          {/each}
        </div>
      </div>
    </div>
  </div>

  {#each subjects as subject}
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label"></label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <div class="control checkbox-group">
            {#each lvl3Subjects as subject}
              <label class="checkbox">
                <input type="checkbox" bind:value={subject}>
                {subject}
              </label>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/each}
</form>