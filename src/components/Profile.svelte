<script>
  import { user } from '../stores'
  import { onMount } from 'svelte'
  import { getAllSchools, getAllSubjects, updateProfile } from '../firebase'

  let allSubjects = new Map()
  let schools = getAllSchools()

  /* Populate the Levels/Subjects checkboxes
   * This function uses the data from the user's document on the database to
   * create and populate the checkbox array. The array represensts whether the
   * student is keen to tutor in that subject at that level.
   */
  onMount(async () => {
    allSubjects = await getAllSubjects()

    // change each array item to the subject and a Boolean for tutoring opt-in
    let levelSubjects

    // check that the database returned something to work with
    if (allSubjects) {
      // working one level at a time
      levelSubjects = allSubjects.get('Junior')
      /* if the user's profile (loaded when they logged in) contains an array
       * for that level. This statement is to catch the case when users login
       * rather than sign up.
       */
      if ($user['Junior']) {
        // loop through that level's subjects
        levelSubjects.forEach((subject, index) => {
          // confirm whether the tutor has opted into this subject
          let tutoring = $user['Junior'].includes(subject)
          // either way, add the subject name and tutoring Boolean
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      // if the user didn't sign up their profile won't contain the array
      } else {
        // create an array of unchecked options
        levelSubjects.forEach((subject, index) => {
          let tutoring = false
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      }
      allSubjects.set('Junior', levelSubjects)

      // repeat the above for Level 1, 2, and 3

      levelSubjects = allSubjects.get('Level 1')
      if ($user['Level 1']) {
        levelSubjects.forEach((subject, index) => {
          let tutoring = $user['Level 1'].includes(subject)
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      } else {
        levelSubjects.forEach((subject, index) => {
          let tutoring = false
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      }
      allSubjects.set('Level 1', levelSubjects)

      levelSubjects = allSubjects.get('Level 2')
      if ($user['Level 2']) {
        levelSubjects.forEach((subject, index) => {
          let tutoring = $user['Level 2'].includes(subject)
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      } else {
        levelSubjects.forEach((subject, index) => {
          let tutoring = false
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      }
      allSubjects.set('Level 2', levelSubjects)

      levelSubjects = allSubjects.get('Level 3')
      if ($user['Level 3']) {
        levelSubjects.forEach((subject, index) => {
          let tutoring = $user['Level 3'].includes(subject)
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      } else {
        levelSubjects.forEach((subject, index) => {
          let tutoring = false
          levelSubjects[index] = { name: subject, tutoring: tutoring }
        })
      }
      allSubjects.set('Level 3', levelSubjects)

    } else {
      console.error('There was a problem retrieving the subjects.')
    }
    
    
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
      <label for="name" class="label">Name</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left has-icons-right">
          <input id="name" class="input" type="text" placeholder="First" bind:value={$user.firstName}>
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
      <label for="login-email" class="label">Login Email</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input id="login-email" class="input is-success" type="email" readonly bind:value={$user.email}>
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
      <label for="school-email" class="label">School Email</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          {#if $user.schoolEmail}
            <input id="school-email" class="input is-success" type="email" bind:value={$user.schoolEmail}>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          {:else}
            <input id="school-email" class="input is-success" type="email" placeholder="school email" bind:value={$user.schoolEmail}>
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
            <p class="help is-danger">Add your school email fo people to contact you</p>
          {/if}
        </p>
        <br>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label">
      <label for="school" class="label">School</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          {#if $user.school}
            <input id="school" class="input is-success" readonly bind:value={$user.school}>
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
        <span class="label">
          <span class="icon">
            <i class="fa fa-cog fa-spin"></i>
            <span class="sr-only">Subjects</span>
          </span>
        </span>
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
          <label for="{level}" class="label">{level}</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div id="{level}" class="control checkbox-group">
              <!-- unpack all the subjects at this level into checkboxes -->
              {#each allSubjects.get(level) as subject}
                <label for={level + subject.name} class="checkbox">
                  <input id={level + subject.name} type="checkbox" bind:checked={subject.tutoring}>
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