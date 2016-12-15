<template>
  <!-- <div class="article-view"> -->
    <web class="webview" :src="url"></web>
  <!-- </div> -->
</template>

<script>
  module.exports = {
    props: {
      url: {
        type: String,
        required: true,
        default: 'http://www.alibaba.com/'
      }
    }
  }
</script>
