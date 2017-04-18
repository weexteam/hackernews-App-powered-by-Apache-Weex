# 【使用 Weex 和 Vue 开发原生应用】 4 使用 vue-router

> 系列文章的目录在 👉 [这里](https://segmentfault.com/a/1190000008342533)

（由于 ~~我比较懒~~ 最近一段时间在忙其他事，系列文章拖了好久终于又更新了。。。）

## 什么是 vue-router ？

> [vue-router 官方文档](http://router.vuejs.org/zh-cn/)

vue-router 是针对 Vue.js 开发的前端路由工具，可以很方便的开发单页应用。

### 单页应用

单页应用的概念其实很早就出现了，它是指在同一个页面内包含了应用的所有功能，一个页面就是一个应用，整个应用只有一个页面。单页应用的特性在文末讨论，这里先说用法。

## 怎么在 Weex 里引入 vue-router

vue-router 是以 Vue.js 插件的形式存在的，使用前必须要引入 Vue.js。因为 WeexSDK （>= 0.9.5）中已经包含了 Vue.js Runtime，所以不需要再引入一遍 Vue.js ，只需引入 vue-router 并注册即可：

```js
// import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

## 使用 vue-router 的例子

### 定义根视图

通过在模板中添加 `<router-view>` 的方式定义路由出口，路由匹配到的组件将会替换这个标签。

```html
<!-- App.vue -->

<template>
  <router-view></router-view>
</template>
```

在模板中也可以包含其他标签， `<router-view>` 也可以是其他标签的子标签，和其他标签的用法是一样的；在 vue-router 的内部实现中，[router-view 的实现](https://github.com/vuejs/vue-router/blob/v2.4.0/src/components/view.js#L5)就是一个普通的函数式组件。

### 配置路由规则

在向应用中注册 router 之前，需要先创建路由实例，并且配置路由规则。

```js
// router.js

import VueRouter from 'vue-router'
import HomeView from 'path/to/HomeView.vue'
import AboutView from 'path/to/AboutView.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/home',  component: HomeView  },
    { path: '/about', component: AboutView }
  ]
})
```

上述代码中创建了 VueRouter 的实例，并且传入了 `routes` 配置，当路径是 `home` 时，页面就会跳转到 `HomeView` 组件，HomeView.vue 就会渲染到 App.vue 中 `<router-view>` 标签的位置。同理，当路径是 `about` 时，页面就会跳转到 `AboutView` 组件。

### 给应用注入路由功能

想要在应用中注入路由功能，还有给入口组件添加 router 属性，使应用和路由建立联系。

```js
import App from 'path/to/App.vue'
import router from 'path/to/router.js'

App.el = '#root'
App.router = router

new Vue(App)
```

### 注意事项

前边提到过，单页应用是在 Web 场景下提出的一种开发方式，它的具体实现依赖了 Web 平台的功能，如 Histroy API 和 URL Hash 等特性。然而 Weex 的运行环境不只是浏览器，通常是以移动端原生环境为主，这些特性在 Weex 中并不完全适用，参考[《Weex 和 Web 平台的差异》](http://weex-project.io/cn/references/platform-difference.html)。

针对这些平台差异，有以下两点需要注意：

#### 路由模式

在 vue-router 的配置项中，有一个 [mode](https://router.vuejs.org/zh-cn/api/options.html#mode) 参数可以用来指定 vue-router 的运行模式。

+ `hash`: 使用 URL hash 值来作路由。默认模式。
+ `history`: 依赖 HTML5 History API 和服务器配置。查看 [HTML5 History 模式](https://router.vuejs.org/zh-cn/essentials/history-mode.html)。
+ `abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。

根据平台差异可以看出，**在 Weex 环境中只支持使用 abstract 模式。** 不过，vue-router 自身会对环境做校验，如果发现没有浏览器的 API，vue-router 会自动强制进入 abstract 模式，所以 **在使用 vue-router 时只要不写 mode 配置即可，默认会在浏览器环境中使用 hash 模式，在移动端原生环境中使用 abstract 模式。** （当然，你也可以明确指定在所有情况下都使用 `abstract` 模式）

#### 编程式导航

vue-router 支持使用 `<router-link>` 创建导航链接，不过在其中使用了基于 DOM 事件的一些特性，这些特性在 Weex 原生环境中并不能很好的工作。所以 **在 Weex 中，你必须使用[编程式导航](https://router.vuejs.org/zh-cn/essentials/navigation.html)来编写页面跳转逻辑。** 用法参考 [Weex 官方文档](http://weex-project.io/cn/references/vue/difference-of-vuex.html#编程式导航)。

### 更多功能

除了上述最基本的特性以外，vue-router 还有很多很强大的功能，具体使用方法建议参考其[官方文档](http://router.vuejs.org/zh-cn/)，这里不再赘述。

+ [动态路由匹配](https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html)
+ [嵌套路由](https://router.vuejs.org/zh-cn/essentials/nested-routes.html)
+ [编程式导航](https://router.vuejs.org/zh-cn/essentials/navigation.html)
+ [重定向和别名](https://router.vuejs.org/zh-cn/essentials/redirect-and-alias.html)
+ [导航钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)
+ [过渡动效](https://router.vuejs.org/zh-cn/advanced/transitions.html)

## 实际项目中的 vue-router

在 [weex-hackernews](https://github.com/weexteam/weex-hackernews) 项目中使用了 vue-router 做路由管理。

![]()

### 路由配置

其中表头的五个一级菜单（Top 、New 、Show 、Ask 、Job），就对应了五个不同的路由路径，也对应了五个列表组件。除此之外，还有列表页、评论页、用户信息页也都对应了单独的路由路径。具体配置在 [src/router.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/router.js#L22-L32) 中，如下所示：

```js
export default new Router({
  routes: [
    { path: '/top', component: createStoriesView('top') },
    { path: '/new', component: createStoriesView('new') },
    { path: '/show', component: createStoriesView('show') },
    { path: '/ask', component: createStoriesView('ask') },
    { path: '/job', component: createStoriesView('job') },
    { path: '/article/:url(.*)?', component: ArticleView },
    { path: '/item/:id(\\d+)', component: CommentView },
    { path: '/user/:id', component: UserView },
    { path: '/', redirect: '/top' }
  ]
})
```

其中 article 、item 和 user 三个配置项中用到了[动态路由匹配](https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html)，把所有同类路由都映射到了同一个组件上，组件结构相同，但是参数是不同的（url 不同或者 id 不同）。

在最后还配置了[路由重定向](https://router.vuejs.org/zh-cn/essentials/redirect-and-alias.html)，将默认根路由 `/` 重定向到了 `/top`，默认加载“最热”文章列表。

### 在应用中注册路由

若要应用组件和路由之间建立联系，需要给入口组件注入 `router` 属性。代码在 [src/entry.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/entry.js#L21-L26) 中。

```js
new Vue(Vue.util.extend({ router }, App))

router.push('/')
```

代码在创建 Vue 实例前在 App 上添加了 `router` 属性，使得应用组件中都能通过 `this.$router` 获取到路由数据。在创建实例后，手动调用 `router.push('/')` 跳转到根视图。

### 同步 Vuex 和 vue-router 的状态

使用 [vuex-router-sync](https://github.com/vuejs/vuex-router-sync) 可以很方便地同步 Vuex 和 vue-router 的状态，这个步骤并不是必须的，但是可以简化代码的使用。实际代码在 [src/entry.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/entry.js#L9-L11) 中，如下所示：

```js
sync(store, router)
```

代码的效果就是注册了 `store.state.route` 这个变量，使得在 Vuex 的 Store 中可以获取到 `route` 对象，这在一些比较复杂的大型应用中可能会用到。

> 由于在根组件中已经注入了 `router` 属性，在所有组件中也都可以通过 `this.$router` 获取到当前的路由状态。

## Weex 适合写单页应用吗 ？

> **以下是我个人的观点，不代表任何人，也不代表 Weex。**

不考虑技术细节，从实际应用的角度聊一下我对“单页应用”的看法。

单页应用也有不少的优势和缺陷：

+ 优势：页面无需刷新；可以实现更好的过渡效果；组件复用；状态共享。
+ 缺陷：初次加载白屏时间长；不利于 SEO；有大量全局状态；技术方法相对复杂，有学习成本。

大部分特性都已经有共识，我也不再展开对比，这里着重讨论一下在 **移动端** 和 **Weex 平台** 中使用单页应用的情况。

### 页面间状态的共享与隔离

单页应用运行在同一个 javascript runtime 里，也就是说页面的状态都是共享的，环境变量也是相同的，这一点其实是有很多隐患。在移动应用中，单页应用不仅耗费内存，也很容易发生内存泄露。

所有的 Weex 页面，无论是基于 Vue 还是 Rax，都共用一个 Weex Runtime，其中的 js 引擎也只初始化一次，除非重新初始化 Weex SDK（应用重启），所有页面对环境的操作痕迹都将保留。在这种情景下，页面间状态的隔离就尤为重要，共享的全局状态很可能会成为内存泄露的元凶。

换句话说，如果某个页面创建了一个临时的全局变量，但是在页面退出后没有清除，这个变量将一直保留在内存中；如果某个页面在全局状态上挂载了某个属性，但是页面退出后没有断开连接，这个属性也会一直保留在全局状态中。

原生应用本身就是多页的场景，页面间状态的隔离比共享更重要一些。

### 资源加载和缓存

单页应用要把所有页面用到资源（至少是脚本）提前打包在一起，一次性全部发到客户端，首次打开的网络耗时会比较久，容易导致长时间白屏，很难递进的加载资源，无法做到“先加载有用的”。如果有多个单页应用都需要用到某些页面或者某个组件，是很难复用的，也很难加缓存，难不成整个移动应用都写成一个大“单页”的吗？ Web 上或许可以考虑，但是原生应用里十分不建议这样做。应用都规模越大，这些缺陷就越明显。

更何况现在 HTTP/2 逐渐普及，有了多路复用，把资源粒度划分的细一些更有利于浏览器的加载。还有 prefetch 和 preload 这种特性可以提升资源加载的效率，Weex 也在考虑支持。浏览器也逐渐开始支持 ES6 module，可以直接通过 `<script type="module">` 的方式引入 ES6 模块，代码的管理和加载可能会以 *模块* 为单元，而不是页面。

从一系列技术趋势来看，现在有很多技术方案都讲究将资源细分，恨不得使用 code split 把代码细分到组件级别（“打包”是一个暂时性的让人又爱又恨的工作）。

### Histroy API 和 hash

单页应用在技术上基本上都是基于 Histroy API 或 hash 链接实现，即使不直接依赖，也会模拟这方面的行为（polyfill）。前边也提到过 [Weex 和 Web 平台有差异](http://weex-project.io/cn/references/platform-difference.html)， Histroy API 和 hash 这些都是浏览器中的概念，和 Weex 里不完全对应。

使用 Weex 开发的是原生应用，页面栈的管理使用的也是原生的特性，没有 Histroy API 但是有 [navigator 模块](http://weex-project.io/cn/references/modules/navigator.html) 可以实现页面的“前进”和“后退”等操作。其实我觉得原生开发中 Navigator 的概念比 web 上 History API 设计的更完善一些（由于多端行为有差异，Weex 只暴露了部分通用功能），可操作性也更强。至于 hash，移动端不会轻易暴露页面 url，更不用说 hash 了。

一句话总结： Weex 是跨平台的，Histroy API 是针对 Web 平台设计的，未必适合原生开发。

## 小结

技术本身是客观的，有各自的适用场景。weex-hackernews 项目本身的页面也不多，多个页面之间的确会共用一些数据；而且本来这就是一个范例项目，为了展示能力和用法的，所以我用了 vue-router。在你的应用中是否应该引入 vue-router，需要结合应用自身的特性和需求具体分析。
