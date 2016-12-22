<template>
  <div class="commont-view">
    <header></header>
    <scroller>
      <div class="story-cell" v-if="story">
        <story class="comment-story" :story="story" no-comment="true"></story>
      </div>
      <div class="comments-box" v-if="story && story.kids">
        <text class="comment-count" v-if="story.kids.length">{{story.kids.length}} comments</text>
        <text class="comment-count" v-else>no comments</text>
        <div class="comment-list">
          <comment v-for="id in story.kids" :id="id"></comment>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Header from '../components/header.vue'
  import Story from '../components/story.vue'
  import Comment from '../components/comment.vue'

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
    components: { Header, Story, Comment },
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
      fetchItemAndComments(this.$store).then(() => {
        this.loading = false
      })
    }
  }
</script>

<style scoped>
  .commont-view {
    background-color: #F5F5F5;
  }
  .story-cell {
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FFFFFF;
  }
  .comments-box {
    margin-top: 20px;
    background-color: #FFFFFF;
    /*padding-top: 20px;*/
    padding-left: 35px;
    padding-right: 35px;
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
