// import Vue from 'vue'
import App from './App.vue'
import * as filters from './filters'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#root',
  render: h => h(App)
})
