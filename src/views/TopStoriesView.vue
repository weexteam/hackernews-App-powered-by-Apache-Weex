<template>
  <story-list :stories="topStories" @loadmore="loadMoreStories"></story-list>
</template>

<script>
  const { fetchIdsByType, fetchItems } = require('../store/api')
  const INITIAL_STORY_COUNT = 10
  const FRAME_COUNT = 6

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
      appendStories (ids) {
        return fetchItems(ids).then(items => {
          this.topStories = this.topStories.concat(items)
        })
      },
      loadMoreStories () {
        console.log('will load more stories.')
        if (this._storiesIds) {
          const start = this.topStories.length
          this.appendStories(this._storiesIds.slice(start, start + FRAME_COUNT))
        }
      }
    },

    created () {
      // console.log('top-stories created')
      fetchIdsByType('top').then(ids => {
        this._storiesIds = ids
        this.appendStories(ids.slice(0, INITIAL_STORY_COUNT))
      })
    }
  }
</script>
