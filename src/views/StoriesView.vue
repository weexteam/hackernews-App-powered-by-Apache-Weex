<template>
  <div class="stories-view">
    <app-header></app-header>
    <list class="story-list" @loadmore="loadMoreStories">
      <cell class="story-cell" v-for="story in stories">
        <story-item :story="story"></story-item>
      </cell>
    </list>
    <div class="loading" v-if="loading">
      <text class="loading-text">loading ...</text>
    </div>
  </div>
</template>

<script>
  import AppHeader from '../components/app-header.vue'
  import StoryItem from '../components/story-item.vue'

  export default {
    components: { AppHeader, StoryItem },
    props: {
      type: {
        type: String,
        required: true,
        default: 'top'
      }
    },
    data () {
      return {
        loading: true
      }
    },

    computed: {
      stories () {
        return this.$store.getters.activeItems
      }
    },

    methods: {
      fetchListData () {
        this.loading = true
        this.$store.dispatch('FETCH_LIST_DATA', {
          type: this.type
        }).then(() => {
          this.loading = false
        })
      },
      loadMoreStories () {
        this.loading = true
        this.$store.dispatch('LOAD_MORE_ITEMS').then(() => {
          this.loading = false
        })
      }
    },

    created () {
      this.fetchListData()
    }
  }
</script>

<style scoped>
  .story-cell {
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FFFFFF;
  }
  .loading {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading-text {
    margin: auto;
    text-align: center;
    font-size: 40px;
    color: #BBB;
  }
</style>
