<template>
  <div class="story-commonts">
    <app-header></app-header>
    <scroller>
      <div class="story-cell" v-if="story">
        <story-item class="comment-story" :story="story"></story-item>
      </div>
      <div class="comments-box" v-if="comments">
        <text class="comment-count">{{comments.length}} comments</text>
        <list class="comment-list">
          <cell class="comment-cell" v-for="comment in comments">
            <comment-item :comment="comment"></comment-item>
          </cell>
        </list>
      </div>
    </scroller>
  </div>
</template>

<style>
  .comments-box {
    margin-top: 20px;
    background-color: #FFFFFF;
    /*padding-top: 20px;*/
    padding-left: 50px;
    padding-right: 50px;
  }
  .comment-count {
    font-size: 36px;
    padding-top: 30px;
    padding-bottom: 30px;
    /* padding-left: 20px; */
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #EEEEEE;
    margin-bottom: 30px;
  }
</style>

<script>
  const { fetchItems, fetchItem } = require('../store/api')

  // function fetchComments (comment) {
  //   // console.log(comment.kids)
  //   if (comment && comment.kids) {
  //     return fetchItems(comment.kids).then(items => {
  //       // console.log(items)
  //       comment.replys = items
  //       fetchComments(comment.replys)
  //     })
  //   }
  // }

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
          // console.log(comments)
          this.comments = comments
          // comments.forEach(fetchComments)
        })
      }
    },

    created () {
      this.getStory(this.storyId)
    }
  }
</script>
