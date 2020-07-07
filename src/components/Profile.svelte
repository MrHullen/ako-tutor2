<script>
  import { user } from '../stores'
  import { onMount } from 'svelte'
  import { getAllSchools, getAllSubjects, updateProfile } from '../firebase'

  let allSubjects = new Map()
  let schools = getAllSchools()

  onMount(async () => {
    allSubjects = await getAllSubjects()

    // change each array item to the subject and a Boolean for tutoring opt-in
    let levelSubjects
    
    levelSubjects = allSubjects.get('Junior')
    levelSubjects.forEach((subject, index) => {
      let tutoring = $user.Junior.includes(subject)
      levelSubjects[index] = { name: subject, tutoring: tutoring }
    })
    allSubjects.set('Junior', levelSubjects)

    levelSubjects = allSubjects.get('Level 1')
    levelSubjects.forEach((subject, index) => {
      let tutoring = $user['Level 1'].includes(subject)
      levelSubjects[index] = { name: subject, tutoring: tutoring }
    })
    allSubjects.set('Level 1', levelSubjects)

    levelSubjects = allSubjects.get('Level 2')
    levelSubjects.forEach((subject, index) => {
      let tutoring = $user['Level 2'].includes(subject)
      levelSubjects[index] = { name: subject, tutoring: tutoring }
    })
    allSubjects.set('Level 2', levelSubjects)

    levelSubjects = allSubjects.get('Level 3')
    levelSubjects.forEach((subject, index) => {
      let tutoring = $user['Level 3'].includes(subject)
      levelSubjects[index] = { name: subject, tutoring: tutoring }
    })
    allSubjects.set('Level 3', levelSubjects)
  })

  function saveChanges() {
    let pageSubjects
    let saveSubjects = []
    
    pageSubjects = allSubjects.get('Junior')
    pageSubjects.forEach((subject) => {
      if (subject.tutoring) {
        saveSubjects.push(subject.name)
      }
    })
    $user.Junior = saveSubjects
    saveSubjects = []

    pageSubjects = allSubjects.get('Level 1')
    pageSubjects.forEach((subject) => {
      if (subject.tutoring) {
        saveSubjects.push(subject.name)
      }
    })
    $user['Level 1'] = saveSubjects
    saveSubjects = []

    pageSubjects = allSubjects.get('Level 2')
    pageSubjects.forEach((subject) => {
      if (subject.tutoring) {
        saveSubjects.push(subject.name)
      }
    })
    $user['Level 2'] = saveSubjects
    saveSubjects = []

    pageSubjects = allSubjects.get('Level 3')
    pageSubjects.forEach((subject) => {
      if (subject.tutoring) {
        saveSubjects.push(subject.name)
      }
    })
    $user['Level 3'] = saveSubjects
    saveSubjects = []

    updateProfile()
  }
</script>

<style>
  @media screen and (min-width: 1200px) {
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

<form class="section" on:submit|preventDefault={saveChanges}>
  
  <h2 class="subtitle">About</h2>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Name</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="First" bind:value={$user.firstName}>
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
        {#if !$user.firstName || !$user.lastName}
          <p class="help is-danger">Add your name so people know what to call you</p>
        {:else}
          <br>
        {/if}
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-right">
          <input class="input" type="text" placeholder="Last" bind:value={$user.lastName}>
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
        <br>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">School</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          {#if $user.school}
            <input class="input is-success" readonly bind:value={$user.school}>
          {:else}
            <div class="select is-fullwidth is-medium">
              <select bind:value={$user.school}>
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
          {/if}
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          {#if $user.school}
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          {/if}
        </p>
        {#if !$user.school}
          <p class="help is-danger">Add your school to help your fellow students</p>
        {:else}
          <br>
        {/if}
      </div>
    </div>
  </div>

  <h2 class="subtitle">Subjects</h2>

  <!-- wait for the promise from the database to resolve -->
  {#await allSubjects}
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">
          <span class="icon">
            <i class="fa fa-cog fa-spin"></i>
            <span class="sr-only">Loading...</span>
          </span>
        </label>
      </div>
      <div class="field-body">
        <span class="icon">
          <i class="fa fa-ellipsis-h"></i>
          <span class="sr-only">Loading...</span>
        </span>
      </div>
    </div>
  {:then allSubjects}
    <!-- spread all the keys (levels) into an array so they can be iterated -->
    {#each [ ...allSubjects.keys() ] as level}
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">{level}</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div class="control checkbox-group">
              <!-- unpack all the subjects at this level into checkboxes -->
              {#each allSubjects.get(level) as subject}
                <label class="checkbox">
                  <input type="checkbox" bind:checked={subject.tutoring}>
                  {subject.name}
                </label>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}
  {/await}

  <button
    class="button is-success"
    type="submit">
    Save changes
  </button>
</form>