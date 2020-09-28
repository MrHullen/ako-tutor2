<script>
  import { user, page } from '../stores'
  import { signup, login, logout } from '../firebase'

  import About from './About.svelte'
  import Find from './Find.svelte'
  import Profile from './Profile.svelte'

  // Boolean value for burger menu on mobile
  // toggled off whenever $page changes
  let active = false
  function toggle() {
    active = !active
  }

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a
    class="navbar-item has-text-primary is-family-secondary is-size-3"
    class:is-active={page === Find}
    aria-current={page === Find ? 'page' : undefined}
    on:click={() => { $page = Find; active = false; }}>
      Ako Tutor
    </a>

    <a
      on:click={toggle}
      role="button"
      class="navbar-burger burger"
      class:is-active={active}
      aria-label="menu"
      aria-expanded="false">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div
    class="navbar-menu"
    class:is-active={active}>
    <div class="navbar-start">

      <a
        class="navbar-item"
        class:is-active={$page === About}
        aria-current={$page === About ? 'page' : undefined}
        on:click={() => { $page = About; active = false; }}>
        About
      </a>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if $user}
            <a
              class="button is-primary"
              class:is-active={$page === Profile}
              aria-current={$page === Profile ? 'page' : undefined}
              on:click={() => { $page = Profile; active = false; }}>
              Profile
            </a>

            <a
              class="button is-light"
              on:click={logout}>
              Log out
            </a>
          {:else}
            <a
              class="button is-primary"
              on:click={() => { active = false; signup(Profile) }}>
              Sign up
            </a>

            <a
              class="button is-light"
              on:click={() => { active = false; login(Profile) }}>
              Log in
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>
