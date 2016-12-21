<template>
  <div class="cell-item">
    <text class="story-score">{{story.score}}</text>
    <router-link :to="`/article/${story.url}`" class="story-link">
      <text class="story-title">{{story.title}}</text>
      <text class="small-text" v-if="story.url">({{ story.url | host }})</text>
    </router-link>
    <div class="text-group">
      <text class="small-text text-cell">by </text>
      <router-link class="text-cell" :to="`/user/${story.by}`">
        <text class="small-text link-text">{{story.by}}</text>
      </router-link>
      <text class="small-text text-cell"> | {{ story.time | timeAgo }} ago | </text>
      <router-link class="text-cell" :to="`/item/${story.id}`">
        <text class="small-text link-text">{{ story.descendants }} comments</text>
      </router-link>
    </div>
  </div>
</template>

<style>
  .cell-item {
    position: relative;
    padding-top: 20px;
    padding-bottom: 25px;
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
    margin-bottom: 25px;
  }
  .story-title {
    font-size: 33px;
    color: #404040;
  }
  .small-text {
    color: #BBB;
    font-size: 22px;
    margin-bottom: 0;
    font-family: Verdana, Geneva, sans-serif;
  }
  .link-text {
    /*color: red;*/
    text-decoration: underline;
  }
  .text-group {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .text-cell {
    flex-grow: 0;
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
