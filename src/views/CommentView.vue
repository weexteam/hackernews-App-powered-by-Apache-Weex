<template>
  <div class="commont-view">
    <app-header></app-header>
    <scroller>
      <div class="story-cell" v-if="story">
        <story class="comment-story" :story="story" no-comment="true"></story>
      </div>
      <div class="comments-box" v-if="story && story.kids">
        <text class="comment-count" v-if="story.descendants">{{story.descendants}} comments</text>
        <text class="comment-count" v-else>no comments</text>
        <div class="comment-list">
          <comment v-for="id in story.kids" :id="id" :key="id"></comment>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import AppHeader from '../components/app-header.vue'
  import Story from '../components/story.vue'
  import Comment from '../components/comment.vue'

  export default {
    components: { AppHeader, Story, Comment },
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

    methods: {
      fetchItem () {
        return this.$store.dispatch('FETCH_ITEMS', {
          ids: [this.id]
        })
      },
      fetchComments (item) {
        if (item.kids) {
          return this.$store.dispatch('FETCH_ITEMS', {
            ids: item.kids
          }).then(() => Promise.all(item.kids.map(id => {
            return this.fetchComments(this.$store.state.items[id])
          })))
        }
      },

      fetchItemAndComments () {
        return this.fetchItem().then(() => {
          const { items, route } = this.$store.state
          return this.fetchComments(items[this.id])
        })
      }
    },

    created () {
      this.fetchItemAndComments().then(() => {
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
    padding-left: 35px;
    padding-right: 35px;
  }
  .comment-count {
    font-size: 36px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #EEEEEE;
    margin-bottom: 30px;
  }
</style>
