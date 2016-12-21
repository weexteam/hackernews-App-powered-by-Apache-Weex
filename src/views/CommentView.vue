<template>
  <div class="story-commonts">
    <app-header></app-header>
    <scroller>
      <div class="story-cell" v-if="story">
        <story-item class="comment-story" :story="story"></story-item>
      </div>
      <div class="comments-box" v-if="story && story.kids">
        <text class="comment-count">{{story.kids.length}} story.kids</text>
        <list class="comment-list">
          <cell class="comment-cell" v-for="id in story.kids">
            <comment-item :id="id"></comment-item>
          </cell>
        </list>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
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
  import AppHeader from '../components/app-header.vue'
  import StoryItem from '../components/story-item.vue'
  import CommentItem from '../components/comment-item.vue'

  function fetchItem (store) {
    return store.dispatch('FETCH_ITEMS', {
      ids: [store.state.route.params.id]
    })
  }
  function fetchComments (store, item) {
    if (item.kids) {
      return store.dispatch('FETCH_ITEMS', {
        ids: item.kids
      }).then(() => Promise.all(item.kids.map(id => {
        return fetchComments(store, store.state.items[id])
      })))
    }
  }

  function fetchItemAndComments (store) {
    return fetchItem(store).then(() => {
      const { items, route } = store.state
      return fetchComments(store, items[route.params.id])
    })
  }

  export default {
    components: { AppHeader, StoryItem, CommentItem },
    data () {
      return {
        loading: true
      }
    },

    computed: {
      id () {
        if (this.$route && this.$route.params) {
          return this.$route.params.id
        }
        return '12922141'
      },
      story () {
        return this.$store.state.items[this.id]
      }
    },

    created () {
      // console.log(this.$store)
      // console.log(this.$route.params)
      fetchItemAndComments(this.$store).then(() => {
        this.loading = false
      })
    }
  }
</script>
