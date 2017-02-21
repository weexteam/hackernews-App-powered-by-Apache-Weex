<template>
  <div @click="open">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['url'],
    methods: {
      open () {
        // get the environment variables
        const env = weex.config.env || WXEnvironment

        // open a new window (tab) on the web
        if (env.platform === 'Web') {
          window.open(this.url)
          return
        }

        // change router path on native (Android & iOS)
        this.jump(`/article/${this.url}`)
      }
    }
  }
</script>
