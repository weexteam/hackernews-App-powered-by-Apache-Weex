<template>
  <!-- <div> -->
    <top-stories class="wrapper"></top-stories>
    <!-- <article-view class="wrapper" url="http://www.alibaba.com/"></article-view> -->
    <!-- <comment-view class="wrapper" story-id="12922141"></comment-view> -->
    <!-- <user-view user-id="Hanks10100"></user-view> -->
  <!-- </div> -->
</template>

<script>
  const TopStoriesView = require('./views/TopStoriesView.vue')
  // const ArticleView = require('./views/ArticleView.vue')
  // const CommentView = require('./views/CommentView.vue')
  // const UserView = require('./views/UserView.vue')

  module.exports = {
    components: {
      'top-stories': TopStoriesView,
      // 'article-view': ArticleView,
      // 'comment-view': CommentView,
      // 'user-view': UserView
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
