<template>
  <div class="user-view">
    <app-header></app-header>
    <div class="user-info">
      <text class="user-name">{{ userId }}</text>
      <div class="user-meta" v-if="user">
        <text class="meta-label">Created: {{ user.created | timeAgo }} ago</text>
        <text class="meta-label">Karma:   {{ user.karma }}</text>
        <text class="meta-label user-about" v-if="user.about">{{ user.about | unescape }}</text>
      </div>
      <div class="user-loading" v-else>
        loading...
      </div>
    </div>
  </div>
</template>

<script>

  function fetchUser (store) {
    return store.dispatch('FETCH_USER', {
      id: store.state.route.params.id
    })
  }

  module.exports = {
    components: {
      'app-header': require('../components/app-header.vue')
    },

    computed: {
      userId () {
        if (this.$route && this.$route.params) {
          return this.$route.params.id
        }
        return 'Hanks10100'
      },
      user () {
        return this.$store.state.users[this.$route.params.id]
      }
    },

    // preFetch: fetchUser,
    created () {
      fetchUser(this.$store)
    }
  }
</script>

<style>
  .user-view {}
  .user-info {
    padding-top: 60px;
    padding-left: 80px;
    padding-right: 60px;
  }
  .user-name {
    font-size: 72px;
    font-weight: bold;
    margin-bottom: 60px;
  }
  .user-loading {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 44px;
    color: #BBBBBB;
  }
  .meta-label {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 32px;
    margin-bottom: 15px;
    color: #333333;
  }
  .user-about {
    margin-top: 20px;
    font-size: 28px;
    color: #666666;
  }
</style>
