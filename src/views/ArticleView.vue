<template>
  <div>
    <web class="webview" :src="url"></web>
    <text class="fixed-button" @click="jump(`/`)">back</text>
  </div>
</template>

<style scoped>
  .webview {
    flex: 1;
  }
  .fixed-button {
    position: absolute;
    bottom: 50px;
    right: 50px;
    background-color: #FC6621;
    border-radius: 10px;
    width: 120px;
    padding: 15px;
    color: white;
    text-align: center;
  }
</style>

<script>
  export default {
    computed: {
      url () {
        let url
        if (this.$route && this.$route.params) {
          url = this.$route.params.url
          if (typeof url === 'string') {
            url = url.replace(/^http\:/, 'https:')
          }
          return url
        }
        return 'https://www.alibaba.com/'
      }
    }
  }
</script>
