<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $primary;
    }
  }
}
</style>
