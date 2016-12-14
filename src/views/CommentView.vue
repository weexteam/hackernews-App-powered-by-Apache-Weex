<template>
  <div class="story-commonts">
    <app-header></app-header>
    <div class="story-cell" v-if="story">
      <story-item class="comment-story" :story="story"></story-item>
    </div>
    <div class="comments-box" v-if="comments">
      <text class="comments-count">{{comments.length}} comments</text>
      <list class="comment-list">
        <cell class="comment-cell" v-for="comment in comments">
          <comment-item :comment="comment"></comment-item>
        </cell>
      </list>
    </div>
  </div>
</template>

<script>
  const { fetchItems, fetchItem } = require('../store/api')

  module.exports = {
    components: {
      'app-header': require('../components/app-header.vue'),
      'story-item': require('../components/story-item.vue'),
      'comment-item': require('../components/comment-item.vue')
    },
    props: {
      storyId: {
        type: String,
        required: true,
        default: '12922141'
      }
    },

    data () {
      return {
        story: null,
        comments: null
      }
    },

    methods: {
      getStory (id) {
        // console.log('will get story:', id)
        return fetchItem(id).then(story => {
          // console.log(story)
          this.story = story
          this.getComments(story.kids)
        })
      },

      getComments (ids) {
        return fetchItems(ids).then(comments => {
          console.log(comments)
          this.comments = comments
        })
      }
    },

    created () {
      this.getStory(this.storyId)
    }
  }
</script>
