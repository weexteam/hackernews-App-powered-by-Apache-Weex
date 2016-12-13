<template>
  <story-list :stories="topStories"></story-list>
</template>

<script>
  const { getStories } = require('../store/api')
  const STORY_COUNT = 10

  module.exports = {
    components: {
      'story-list': require('../components/story-list.vue')
    },

    data () {
      return {
        topStories: []
      }
    },

    methods: {
      formatStories (stories) {
        // TODO: pick and omit properties
        return stories
      }
    },

    created () {
      // console.log('top-stories created')
      getStories('top', STORY_COUNT).then(items => {
        // console.log(items)
        this.topStories = this.formatStories(items)
      })
    }
  }
</script>
