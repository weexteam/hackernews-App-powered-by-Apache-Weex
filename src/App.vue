<template>
  <top-stories class="wrapper">
    <text class="title">Hello Weex</text>
  </top-stories>
</template>

<script>
  const UserView = require('./views/UserView.vue')

  module.exports = {
    components: {
      'top-stories': UserView
    }
  }
</script>

<style>
  .wrapper {
    background-color: #F5F5F5;
    height: 100%;
  }
  .title {
    font-size: 80px;
    color: #41B883;
    text-align: center;
    margin-top: 200px;
  }
</style>
