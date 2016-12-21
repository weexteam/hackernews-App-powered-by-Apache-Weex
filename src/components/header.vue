<template>
  <div class="header">
    <router-link class="logo" to="/" exact>
      <image class="image" src="https://news.ycombinator.com/favicon.ico"></image>
    </router-link>
    <div class="nav">
      <router-link class="link" to="/top">
        <text class="title">Top</text>
      </router-link>
      <router-link class="link" to="/new">
        <text class="title">New</text>
      </router-link>
      <router-link class="link" to="/show">
        <text class="title">Show</text>
      </router-link>
      <router-link class="link" to="/ask">
        <text class="title">Ask</text>
      </router-link>
      <router-link class="link" to="/job">
        <text class="title">Job</text>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .header {
    position: relative;
    height: 120px;
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FF6600;
  }
  .logo {
    position: relative;
    width: 50px;
    height: 50px;
    top: 35px;
    left: 35px;
    border-width: 3px;
    border-style: solid;
    border-color: #FFFFFF;
  }
  .image {
    width: 44px;
    height: 44px;
  }
  .nav {
    display: flex;
    position: absolute;
    left: 120px;
    top: 0;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .link {
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    height: 118px;
    flex-grow: 0;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-bottom-color: #FF6600;
  }
  .router-link-active {
    border-bottom-color: #FFC198;
  }
  .title {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 32px;
    line-height: 44px;
    color: #FFFFFF;
  }
</style>
