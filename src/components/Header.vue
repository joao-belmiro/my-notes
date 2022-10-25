<template>
  <header>
    <img src="@/assets/edit_calendar.svg" alt="" />
    <router-link to="/">
      <h1>My <span>Notes</span></h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
header {
  height: 10vh;
  width: 100%;
  background-color: $dark;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  a {
    text-decoration: none;
    h1 {
      color: $background;
      letter-spacing: 5px;
      span {
        background: linear-gradient(to right, $text-dark, $primary);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
    }
  }

  img {
    padding-left: 32px;
  }
}
</style>
