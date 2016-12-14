<template>
  <div class="top-stories">
    <app-header></app-header>
    <story-list :stories="topStories" @loadmore="loadMoreStories"></story-list>
  </div>
</template>

<script>
  const { fetchIdsByType, fetchItems } = require('../store/mock/api')
  const INITIAL_STORY_COUNT = 10
  const FRAME_COUNT = 6

  module.exports = {
    components: {
      'story-list': require('../components/story-list.vue'),
      'app-header': require('../components/app-header.vue')
    },

    data () {
      return {
        topStories: []
      }
    },

    methods: {
      appendStories (ids) {
        return fetchItems(ids).then(items => {
          // console.log(items[0].kids)
          this.topStories = this.topStories.concat(items)
        })
      },
      loadMoreStories () {
        // console.log('will load more stories.')
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
        // console.log(ids)
        this.appendStories(ids.slice(0, INITIAL_STORY_COUNT))
      })
    }
  }
</script>

<style>
  .top-stories {
    /**/
  }
</style>
