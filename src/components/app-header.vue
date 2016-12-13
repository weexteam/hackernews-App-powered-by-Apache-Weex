<template>
  <div class="app-header">
    <image class="app-logo" src="https://news.ycombinator.com/favicon.ico"></image>
    <text class="app-title">{{title}}</text>
  </div>
</template>

<style>
  .app-header {
    position: relative;
    height: 120px;
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FF6600;
  }
  .app-logo {
    position: relative;
    width: 50px;
    height: 50px;
    top: 35px;
    left: 35px;
    border-width: 3px;
    border-style: solid;
    border-color: #FFFFFF;
  }
  .app-title {
    position: absolute;
    left: 120px;
    top: 40px;
    font-size: 42px;
    line-height: 42px;
    font-weight: bold;
    color: #FFFFFF;
  }
</style>

<script>
  module.exports = {
    props: {
      title: {
        type: String,
        default: 'Hacker News'
      }
    }
  }
</script>
