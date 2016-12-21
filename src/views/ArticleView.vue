<template>
  <web class="webview" :src="url"></web>
</template>

<script>
  export default {
    computed: {
      url () {
        if (this.$route && this.$route.params) {
          return this.$route.params.url
        }
        return 'http://www.alibaba.com/'
      }
    }
  }
</script>
