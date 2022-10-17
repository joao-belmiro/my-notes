<template>
  <div>
    <div class="h-note--wrapper">
        {{title}}
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
    .h-note--wrapper {
        font-size: 2rem;
        letter-spacing: 3px;
        height: 40px;
        margin-bottom: 10px;
        color: $text-dark;
    }
    hr {
        color: $text-dark;
    }
</style>
