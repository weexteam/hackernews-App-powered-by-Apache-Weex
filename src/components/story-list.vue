<template>
  <list class="story-list" @loadmore="$emit('loadmore')">
    <cell class="story-cell" v-for="story in stories">
      <story-item :story="story"></story-item>
    </cell>
  </list>
</template>

<style>
  .story-list {
    background-color: #F5F5F5;
  }
  .story-cell {
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FFFFFF;
  }
</style>

<script>
  module.exports = {
    components: {
      'story-item': require('./story-item.vue')
    },
    props: {
      stories: Array
    }
  }
</script>
