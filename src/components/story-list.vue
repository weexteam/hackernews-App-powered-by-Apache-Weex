<template>
  <list class="story-list">
    <cell class="story-cell" v-for="story in stories">
      <text class="story-score">{{story.score}}</text>
      <a class="story-link" :href="story.url">
        <text class="story-title">{{story.title}}</text>
      </a>
      <div class="story-meta">
        <text class="small-text story-by">{{story.by}}</text>
        <text class="small-text story-time">{{story.time}}</text>
        <text class="small-text story-comment">{{story.comment}}</text>
      </div>
    </cell>
  </list>
</template>

<style>
  .story-list {
    background-color: #F5F5F5;
  }
  .story-cell {
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 80px;
    padding-right: 40px;
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FFFFFF;
  }
  .story-score {
    position: absolute;
    width: 80px;
    text-align: center;
    left: 0;
    top: 40px;
    font-size: 32px;
    font-weight: bold;
    color: #FF6600;
  }
  .story-link {
    padding-bottom: 15px;
  }
  .story-title {
    font-size: 36px;
  }
  .story-meta {
    color: #BBB;
  }
  .small-text {
    color: #BBB;
    font-size: 24px;
  }
  .story-by {
  }
  .story-time {
  }
</style>

<script>
  module.exports = {
    props: {
      stories: Array
    }
  }
</script>
