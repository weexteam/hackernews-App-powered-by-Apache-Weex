<template>
  <div class="comment-item">
    <!-- <text class="comment-score">{{comment.score}}</text> -->
    <text class="comment-title">{{comment.text | unescape }}</text>
    <text class="small-text">by {{comment.by}} | {{ comment.time | timeAgo }} ago</text>
  </div>
</template>

<style>
  .comment-score {
    position: absolute;
    width: 100px;
    text-align: center;
    left: 0;
    top: 20px;
    font-size: 32px;
    font-weight: bold;
    color: #FF6600;
  }
  .comment-title {
    font-size: 26px;
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
      comment: {
        type: Object,
        // required: true
      }
    }
  }
</script>
