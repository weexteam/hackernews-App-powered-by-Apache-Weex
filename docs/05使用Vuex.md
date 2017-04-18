# 【使用 Weex 和 Vue 开发原生应用】 4 使用 Vuex

> 系列文章的目录在 👉 [这里](https://segmentfault.com/a/1190000008342533)

## 什么是 Vuex ？

> [Vuex 官方文档](https://vuex.vuejs.org/zh-cn/)

Vuex 是一个专为 Vue.js 应用程序开发的 **状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex 的核心工作是状态管理，主要包含了 `State`, `View` `Actions` 这三部分，组成了一个简单的“单项数据流”，避免了管理多状态造成的数据不一致问题。

![Data Flow](https://vuex.vuejs.org/zh-cn/images/flow.png)

Vuex 是专门为 Vue.js 设计的状态管理库，贴合 Vue 本身的数据更新特性，能够利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。而且可以是以 插件（plugin）的形式提供，安装完成之后可以很方便的在 VueComponent 实例中获取到全局状态。模块之间的关系和操作如下图所示：

![Vuex Structure](https://vuex.vuejs.org/zh-cn/images/vuex.png)

+ `State`: 应用的[单一状态树](https://vuex.vuejs.org/zh-cn/state.html)。通常一个应用里只保存同一份状态（组件仍然可以保有局部状态），为的是便于多个组件之间的状态同步。状态的更新将会触发指定组件的重新渲染。
+ `Action`: 描述组件[触发的操作](https://vuex.vuejs.org/zh-cn/actions.html)。它可以通过 `commit` 产生 `mutation`，是对逻辑的封装，组件只需要派发 Action 而不用关心数据到底是如何更新的。
+ `Mutations`: 描述[状态应该如何更新](https://vuex.vuejs.org/zh-cn/mutations.html)。只有提交 `mutation` 才可以更新 Store 中的状态，它是对数据操作的封装，定义了如何更新状态数据。

> 以上只是对 Vuex 的概述，想要了解详细的原理和用法，还是得看官方文档。

## 怎么在 Weex 里用 Vuex

Vuex 是个状态管理的库，用的都是 javascript 本身的语法特性，是与平台无关的，所以它可以完全正常的用在 Weex 里。

不过因为 Vue.js 框架代码已经集成在 WeexSDK （0.9.5 以上）中，所以你不需要再引入一遍 Vue 。另外因为 Vuex [在浏览器环境下会自动注册](https://github.com/vuejs/vuex/blob/4e1e9b230e7c93885c69bc3edf789069df010e36/src/store.js#L426-L429)，只需要在非 Web 环境下注册 Vuex 插件即可，重复注册的话会抛出警告的。引入 Vuex 的代码如下：

```js
// import Vue from 'vue'
import Vuex from 'vuex'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}
```

注册成功之后，**所有 Vuex 的特性都能在 Weex 里使用！** 具体用法以[官方文档](https://vuex.vuejs.org/zh-cn/)为准。

## 使用 Vuex 的例子

### 创建 Store

首先要创建全局唯一的 Store 对象，包含了唯一的状态树和一些操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },

  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

除了 `state` 和 `mutations` 以外，还可以传入 `actions` 、`getters` 、`modules` 这些属性的关系和上边图中一一对应。参考其 [API 文档](https://vuex.vuejs.org/zh-cn/api.html#vuexstore-构造器选项)了解更详细的用法。在 [weex-hackernews](https://github.com/weexteam/weex-hackernews) 项目的 [src/store/index.js](https://github.com/weexteam/weex-hackernews/blob/master/src/store/index.js) 中也有一个更复杂的例子。

然后在创建实例的时候传入 `store` 对象，这样 Store 就和组件建立了联系，每个组件都可以通过 `this.$store` 的方式获取到 Store 中的状态和操作。

```js
import App from 'path/to/App.vue'
import store from 'path/to/store.js'

App.el = '#root'
App.store = store

new Vue(App)
```

### 添加 Actions 和 Mutations

光有数据是不行的，还得定义 *触发数据修改的行为*（Actions） 和 *对数据的操作*（Mutations）。以 weex-hackernews 里的加载用户数据为例，可以简化成下边的代码：

```js
// 引入网络操作的接口
import { fetchUser } from './fetch'

const store = new Vuex.Store({
  state: {
    users: {},
  },

  actions: {
    FETCH_USER ({ commit }, { id }) {
      // 获取新的用户数据，然后提交给 mutation
      return fetchUser(id).then(user => commit('SET_USER', { user }))
    }
  },

  mutations: {
    SET_USER (state, { user }) {
      // 修改 users 中的数据，并且触发界面更新
      Vue.set(state.users, user.id, user)
    }
  }
})
```

在上边的代码中，`state` 里有一个 `user` 对象，所有需要用户数据的地方都将从这个变量中获取，所有对用户数据的修改实际上也都是改的这个变量。这是全局唯一状态的意义。

然后代码里定义了 `FETCH_USER` 的 action，和 `SET_USER` 的 mutation ，注意两者的差别。真正修改 `user` 数据的是 SET_USER 这个 mutation，也只有 mutation 能修改 state 中的数据。FETCH_USER 负责获取新数据然后派发 mutation，它调用了 `fetchUser` 获取用户数据，然后通过把这个新数据“提交”给 SET_USER 这个 mutation；然后在 mutation 里执行数据更新的操作，`Vue.set` 这个方法会触发更新 `state.users` 里绑定的界面元素。

### 使用 Getters

> [Getters 官方文档](https://vuex.vuejs.org/zh-cn/getters.html)

Getters 类似于 Vue 组件里的 `computed` 属性，可以用来计算基础值，返回一个新的值。把取值过程写成 Getter 也是一种惰性计算，不需要创新新属性，也减少了状态同步的负担。

例如，假如想渲染一个列表中的一组数据，又想渲染这组数据的总和，如果再加一条“数据总和”的属性的话，在列表更新后还得手动更新“数据总和”这条属性，比较麻烦也容易出错。这种情况下就很适合写成一个 Getter。

```js
const store = new Vuex.Store({
  state: {
    lists: [
      { count: 4 },
      { count: 8 },
      { count: 3 },
      { count: 9 }
    ],
  },

  getters: {
    summary ({ lists }) {
      return lists.reduce((sum, curr) => sum + curr.count, 0)
    }
  }
})
```

上边代码中的 `summary` 就是一个对 `lists` 数组求和的 Getter。在实际使用中，组件里可以通过 `this.$store.state.lists` 获取 `lists` 列表数据，可以通过 `this.$store.getters.summary` 获取数据总和，更新列表的时候数据总和也会自动更新。

#### 在项目里的实际应用场景

在 weex-hackernews 的项目的 [src/store/index.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/store/index.js#L35-L48) 文件里定义了 `activeIds` 的 Getter，用来获取当前首屏 feed 列表中需要展示的数据 ID。然后还定义了 `activeItems`，在其中有调用了 `activeIds`，会根据活跃的 ID 获取相应的数据对象。

```js
{
  //...

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds (state) {
      const { activeType, lists, counts } = state
      return activeType ? lists[activeType].slice(0, counts[activeType]) : []
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems (state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    }
  }
}
```

然后在 [src/views/StoriesView.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/views/StoriesView.vue#L35-L37) 这个文件里定义了一个 `computed` 属性，从 Store 中获取列表需要展示的数据。

```js
{
  //...

  computed: {
    stories () {
      return this.$store.getters.activeItems
    }
  }
}
```

在 [StoriesView.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/views/StoriesView.vue#L5-L7) 的模板中根据 `stories` 这个数据循环创建 `<story>` 组件。

```html
<list>
  <cell v-for="story in stories" :key="story.id">
    <story :story="story"></story>
  </cell>
</list>
```

## 最佳实践 ？

Vuex 衍生自 [Flux](https://facebook.github.io/flux/docs/overview.html) 架构，借鉴了很多 [Redux](http://redux.js.org/) 的特性，用来管理应用的状态，强调单向数据流和全局唯一状态。对于一些数据状态复杂，而且又自上而下实现了组件化的应用里，能发挥很大作用。状态的更新大概能简化为 `nextState = f(state, action)`，有一种函数式的感觉，可以节约逻辑。

虽然 Vuex 与其他技术没有耦合关系，但是通常都是用在单页应用（SPA）里，一般还搭配着 vue-router 使用。不过我在[《【使用 Weex 和 Vue 开发原生应用】 2 编写独立页面》](https://segmentfault.com/a/1190000008366358) 这篇文章里说过，Weex 的实例在 Web 上是和“浏览器页签”的概念相对应的，通常一个 Weex 实例就是一个“页面”。也就是说，Weex 的设计是个“多页应用”，是多实例的。在 Weex 中使用 Vuex，它的作用域是实例级别的，不同页面（实例）之间是不能通过 Vuex 共享状态的。

Weex 毕竟渲染的是原生界面，虽然语法上贴近 Web，但是在一些基本概念上和 Native 也更近一些。“单页应用”、“单向数据流”这些概念主要是在前端里比较流行，Weex 只是一个 SDK，在开发原生应用的时候，页面跳转策略这类问题，我觉得还是应该以客户端自身的架构设计为主。

> weex-hackernews 这个项目是为了验证 Vuex 和 vue-router 接入的可能性，可能并不是最佳实践。

我个人觉得既然 Weex 是多实例的，就并不适合写单页应用。在 Weex 里使用基于单页应用的技术，可能就需要再评估一下方案是否真的适用。即使像 Vuex 这种不局限于单页应用的库，在 “不同页面是不同的 Weex 实例” 这种前提下，就需要根据 App 自身的特性，再考虑一下 Vuex 是不是最佳实践。

关于单页应用，会在[《使用 vue-router》]()里再讨论。
