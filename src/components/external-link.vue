<template>
  <div @click="open"><slot></slot></div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: ''
      }
    },
    methods: {
      open () {
        if (this.$getConfig) {
          this.jump(`/article/${this.url}`)
        }
        else {
          window.open(this.url)
        }
      }
    }
  }
</script>
