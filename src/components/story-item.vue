<template>
  <div class="cell-item">
    <text class="story-score">{{story.score}}</text>
    <router-link :to="`/article/${story.url}`" class="story-link">
      <text class="story-title">{{story.title}}</text>
      <text class="small-text">({{ story.url | host }})</text>
    </router-link>
    <router-link :to="`/item/${story.id}`" class="story-link">
      <text class="small-text">by {{story.by}} | {{ story.time | timeAgo }} ago | {{ story.descendants }} comments</text>
    </router-link>
  </div>
</template>

<style>
  .cell-item {
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 100px;
    padding-right: 40px;
  }
  .story-score {
    position: absolute;
    width: 100px;
    text-align: center;
    left: 0;
    top: 20px;
    font-size: 32px;
    font-weight: bold;
    color: #FF6600;
  }
  .story-link {
    margin-bottom: 15px;
  }
  .story-title {
    font-size: 33px;
    color: #404040;
  }
  .small-text {
    color: #BBB;
    font-size: 22px;
    font-family: Verdana, Geneva, sans-serif;
  }
</style>

<script>
  module.exports = {
    props: {
      story: {
        type: Object,
        // required: true
      }
    }
  }
</script>
