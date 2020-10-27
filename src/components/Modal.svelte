<script>
  import { user } from '../stores'
  import { login, signup } from '../firebase'
  import Find from './Find.svelte'

  export let tutor

  let modalActive = false

  function toggleModal() {
    modalActive = !modalActive
  }
</script>

<style>
  #modal-trigger {
    display: block;
    width: fit-content;
    margin: 0.5em auto;
  }

</style>

<button id="modal-trigger" class="button is-primary" on:click={toggleModal}>Set up a tutorial</button>

  <div class="modal" class:is-active={modalActive}>
    <div class="modal-background" on:click={toggleModal}></div>
    <div class="modal-content">
      <div class="box">
        {#if !$user}
          <p>In order to organise a tutorial you must be signed in.</p>
          <button class="button is-primary" on:click={ () => { signup(Find)} }>Sign up</button>
          <button class="button is-light" on:click={ () => { login(Find)} }>Log in</button>
        {:else}
          {#if tutor.schoolEmail}
            <p>Email <strong>{tutor.schoolEmail}</strong> to arrange a tutoring session.</p>
          {:else}
            <p>Email <strong>{tutor.email}</strong> to arrange a tutoring session.</p>
          {/if}
        {/if}
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={toggleModal}></button>
  </div>
