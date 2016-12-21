<template>
  <div :class="className" :style="{ marginLeft: indent }" v-if="comment">
    <text class="small-text comment-btn" @click="toggle(false)" v-if="collapsed">[+]</text>
    <text class="small-text comment-btn" @click="toggle(true)" v-else>[-]</text>
    <!-- <text class="comment-score">{{comment.score}}</text> -->

    <div class="text-group">
      <text class="text-cell small-text">by </text>
      <router-link class="text-cell" :to="`/user/${comment.by}`">
        <text class="small-text link">{{comment.by}}</text>
      </router-link>
      <text class="text-cell small-text"> | {{ comment.time | timeAgo }} ago</text>
      <text class="text-cell small-text">{{ collapsed ? '  (collapsed)' : '' }}</text>
    </div>

    <div class="comment-inner" v-if="!collapsed">
      <text class="comment-title">{{comment.text | unescape }}</text>
      <div class="comment-list">
        <comment v-for="id in comment.kids" :id="id" :depth="depth + 1"></comment>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    name: 'comment',
    props: {
      id: {
        type: [Number, String],
        required: true,
        default: '13230551'
      },
      depth: {
        type: [Number, String],
        default: 1
      }
    },

    data () {
      return {
        collapsed: false
      }
    },

    computed: {
      className () {
        return Number(this.depth) > 1 ? 'deep-comment' : 'comment'
      },
      indent () {
        return Math.min(Number(this.depth) * 25, 200) + 'px'
      },
      comment () {
        return store.state.items[this.id]
      }
    },

    methods: {
      toggle (state) {
        this.collapsed = (state === undefined) ? !this.collapsed : state
      }
    }
  }
</script>

<style scoped>
  .comment {
    padding-bottom: 25px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    margin-bottom: 35px;
    position: relative;
  }
  .deep-comment {
    margin-top: 25px;
    position: relative;
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
  .small-text {
    color: #BBB;
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 10px;
    font-family: Verdana, Geneva, sans-serif;
  }
  .link {
    text-decoration: underline;
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
