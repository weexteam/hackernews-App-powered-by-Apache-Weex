<template>
  <!-- <div> -->
    <top-stories class="wrapper"></top-stories>
  <!-- </div> -->
</template>

<script>
  const TopStoriesView = require('./views/TopStoriesView.vue')
  const UserView = require('./views/UserView.vue')

  module.exports = {
    components: {
      'top-stories': TopStoriesView,
      'user-view': UserView
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
