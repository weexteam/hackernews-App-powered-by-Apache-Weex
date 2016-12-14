<template>
  <div class="comment-item" :style="{ marginLeft: indent }">
    <text class="small-text comment-btn" @click.native="toggle(false)" v-if="collapsed">[+]</text>
    <text class="small-text comment-btn" @click.native="toggle(true)" v-else>[-]</text>
    <!-- <text class="comment-score">{{comment.score}}</text> -->
    <text class="small-text">by {{comment.by}} | {{ comment.time | timeAgo }} ago{{collapsed ? '  (collapsed)' : ''}}</text>
    <div class="comment-inner" v-if="!collapsed">
      <text class="comment-title">{{comment.text | unescape }}</text>
      <!-- <div class="comment-inner" v-if="comment.replys">
        <comment-item :comment="reply" v-for="reply in comment.replys"></comment-item>
      </div> -->
    </div>
  </div>
</template>

<style>
  .comment-item {
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    margin-bottom: 35px;
    position: relative;
  }
  .small-text {
    color: #BBB;
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 10px;
    font-family: Verdana, Geneva, sans-serif;
  }
  .comment-btn {
    position: absolute;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    left: -50px;
  }
  .comment-title {
    font-size: 26px;
    color: #404040;
  }
</style>

<script>
  const { fetchItems } = require('../store/api')

  module.exports = {
    name: 'comment-item',
    props: {
      comment: {
        type: Object,
        required: true
      },
      depth: {
        type: [Number, String],
        default: 1
      }
    },
    data: function () {
      return {
        collapsed: false
      }
    },
    computed: {
      indent () {
        return Math.min(Number(this.depth) * 50, 200) + 'px'
      }
    },
    methods: {
      toggle (state) {
        this.collapsed = (state === undefined) ? !this.collapsed : state
      }
    },
    created () {
      // console.log('comment item created')
    }
  }
</script>
