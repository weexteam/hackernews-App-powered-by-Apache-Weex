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
  const { fetchUser } = require('../store/api')

  module.exports = {
    components: {
      'app-header': require('../components/app-header.vue')
    },

    props: {
      userId: {
        type: String,
        required: true,
        default: 'Hanks10100'
      }
    },
    data () {
      return {
        user: null
      }
    },

    created () {
      if (this.userId) {
        // console.log('will fetchUser:', this.userId)
        fetchUser(this.userId).then(user => {
          // console.log(user)
          this.user = user
        })
      }
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
    font-size: 80px;
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
    color: #555555;
  }
</style>
