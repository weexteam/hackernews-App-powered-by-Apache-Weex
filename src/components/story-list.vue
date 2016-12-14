<template>
  <list class="story-list" @loadmore="$emit('loadmore')">
    <cell class="story-cell" v-for="story in stories">
      <text class="story-score">{{story.score}}</text>
      <a class="story-link" :href="story.url">
        <text class="story-title">{{story.title}}</text>
        <text class="small-text">({{ story.url | host }})</text>
      </a>
      <text class="small-text">by {{story.by}} | {{ story.time | timeAgo }} ago | {{ story.descendants }} comments</text>
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
    padding-left: 100px;
    padding-right: 40px;
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FFFFFF;
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
      stories: Array
    }
  }
</script>
