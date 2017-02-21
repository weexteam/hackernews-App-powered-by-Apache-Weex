# 使用 Vue 框架的其他特性

> 系列文章的目录在 👉 [这里](https://segmentfault.com/a/1190000008342533)

除了[ Vue.js 在 Weex 和 Web 中的差异](http://weex.apache.org/cn/references/vue/difference-with-web.html)以外，Vue.js 自身的各种特性都是可以正常使用的。所以，这篇文章其实和 Weex 并没多大关系，我就给大家简单罗列几个在 [weex-hackernews](https://github.com/weexteam/weex-hackernews) 项目里用到的特性（这几个特性越来越高阶）：

## 混合（mixin）

> [Vue mixin 文档](https://cn.vuejs.org/v2/guide/mixins.html)

mixin 是一种复用代码的技巧，可以将多个组件共同的逻辑抽象成 mixin，官方文档中写的很详细。它会将 mixin 中定义的方法合并到组件上，如果包含生命周期函数，则先调用 mixin 中的方法再执行组件自身的；如果属性有冲突，组件自身的方法会覆盖掉 mixin 中定义的。

### 定义 mixin

在 weex-hackernews 中的 [src/mixin/index.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/mixins/index.js) 里定义了一个简单的 mixin：

```js
export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    }
  }
}
```

它只包含了一个方法，就是 `jump` ，它通过调用路由的 `push` 方法来实现页面跳转。

### 注册 mixin

然后，在 [src/entry.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/entry.js) 中全局注册了这个 `mixin`。

```js
import Vue from 'vue'
import mixins from './mixins'

// register global mixins.
Vue.mixin(mixins)
```

> 在实际应用中应该谨慎地注册全局 mixin，如果不是全局通用的操作，建议还是只给用到的组件添加 mixin。

### 使用 mixin

如此一来，所有组件都能调用到 `jump` 方法，例如 [src/components/app-header.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/app-header.vue#L3-L5) 这个组件，它自身没有 `<script>` 标签，但是能够在模板中给点击事件绑定 `jump` 函数。在 weex-hackernews 里，点击左上角的 logo 可以返回首页。

```html
<div class="logo" @click="jump('/')">
    <image class="image" src="https://news.ycombinator.com/favicon.ico"></image>
</div>
```

> 一般来说大家都倾向认为组合要优于继承，在 Vue 里使用 mixin 实现“组合”，比用 `ParentComponent.extend({})` 模拟继承要好一些。而且在 `.vue` 文件里，要想继承其他组件也挺麻烦的。从另外一个角度上来讲，如果真的是有一些逻辑能抽离出来，也优先考虑写成独立的模块，`export` 可用的接口，要用的时候直接 `import` 进来即可。依赖框架本身的特性越少，代码就越容易复用。

## 过滤器（filter）

> [Vue filter 文档](https://cn.vuejs.org/v2/guide/syntax.html#过滤器)

在使用 `v-bind` 指令的时候，支持使用过滤器 (filter) 对绑定的值再进行处理；接收变量中的原始值作为参数，返回处理后的值，支持将多个过滤器串联在一起使用，类似 shell 命令中“管道”的写法。

### 注册过滤器

过滤器的使用方法和 `mixin` 类似，现在 [src/filter/index.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/filters/index.js) 中写好要注册的方法，在 [src/entry.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/entry.js#L13-L16) 中全局注册了这些 `filters`。

```js
import Vue from 'vue'
import * as filters from './filters'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
```

### 使用过滤器

在 weex-hackernews 的 [src/components/story.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/story.vue#L6) 文件中第六行用到了 `host` 过滤器，用来获取 url 中的网站地址。

```html
<text class="small-text" v-if="story.url">({{ story.url | host }})</text>
```

在[第十三行](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/story.vue#L13)用到了 `timeAgo` 过滤器，会把时间戳转成可读时间字符串。

```html
<text class="small-text text-cell"> | {{ story.time | timeAgo }} ago</text>
```

在 [src/filter/index.js](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/filters/index.js#L16-L25) 中的实现是这样的：

```js
function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}
```

效果如下：

![filter]()

除此之外

+ 在 [src/components/comment.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/comment.vue#L16) 里用到了 [unescape](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/filters/index.js#L34-L55) 过滤器。
+ 在 [src/views/ArticleView.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/views/ArticleView.vue#L3) 里用到了 [https](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/filters/index.js#L9-L14) 过滤器。

## 内容槽（`<solt>`）

> [Vue slots 文档](https://cn.vuejs.org/v2/guide/components.html#使用-Slot-分发内容)

槽是 Vue.js 中用来实现“内容分发”的功能的，可以理解为内容的占位符。参考 [src/components/external-link.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/external-link.vue#L3) 例子：

```html
<template>
  <div @click="open">
    <slot></slot>
  </div>
</template>
```

在 [src/components/story.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/story.vue#L4-L7) 里使用时，`<external-link>` 标签中的内容将会替换到 `<slot>`。

```html
<external-link :url="story.url" class="story-link">
  <text class="story-title">{{story.title}}</text>
  <text class="small-text" v-if="story.url">({{ story.url | host }})</text>
</external-link>
```

## 递归组件

> [Vue 递归组件的文档](https://cn.vuejs.org/v2/guide/components.html#递归组件)

Vue 可以实现递归组件，可以在自己的模板中调用自己，只需要你写上 `name`属性就可以了。

支持写递归组件，听起来好像是框架在故意炫技，为什么会有这种奇葩功能？因为的确有这种奇葩需求…… 例如 Hacker News 里的评论，是可以无限展开的。

![]()

其实每条评论都有一个唯一 `id` 的，每条评论下边的回复的 `id` 都存在 `kids` 属性上；存的只是 `id` 不是真实的评论数据。从网络获取到某条评论之后，还有根据 `kids` 数组中的 `id` 获取评论下的所有回复，然后获取回复下的所有评论，然后获取评论下的所有回复…… 这很明显是个递归过程。即使评论的数据用树形结构去存，你不知道树的深度，还是得用递归的方式把所有评论渲染出来。

> 【评论】和【回复】是一个意思，为了好表达才用的俩词，汉语就是比英语词多……

下面问题来了，如何渲染这种递归的评论？用正常的组件好像很难实现这种效果，我没想到很合适的写法，有兴趣可以试着想一下。

### 编写递归组件

让组件支持递归很简单，只要加上 `name` 属性就行了，然后就可以在自己的模板中调用自己。

```html
<!-- comment.vue -->
<template>
  <div>
    <text>tips:</text>
    <comment></comment>
  </div>
</template>

<script>
  export default {
    name: 'comment'
  }
</script>
```

上边就是一个最简单的递归组件的例子，写了 `name` 属性而且在模板中用了自己。但是它死循环了，没有结束条件，最终会报一个 "max stack size exceeded" 的错。

在 weex-hackernews 里，[src/components/comment.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/comment.vue#L18) 就是一个递归组件。它用于渲染一条评论，在内部有使用它自己渲染自己的评论。效果如下：

![]()

下边是 `<comment>` 组件简化后的核心代码：

```html
<template>
  <div v-if="comment">
    <text>{{comment.text}}</text>
    <comment v-for="id in comment.kids" :id="id"></comment>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    name: 'comment',
    props: ['id'],

    computed: {
      comment () {
        return store.state.items[this.id]
      }
    }
  }
</script>
```

在 `<comment>` 组件中，`comment` 属性的数据是根据当前的 `id` 属性从 store 中取出来的，然后根据 `comment.kids` 循环创建多个 `<comment>` 标签，并且把 `id` 属性传下去。子 `<comment>` 标签根据传递过来的 `id` 属性从 store 中获取 `comment` 数据渲染自身，然后根据 `comment.kids` 循环创建多个 `<comment>` 标签，并且把 `id` 属性传下去。…… 依次递归。

再具体的细节，就建议直接看 [comment.vue](https://github.com/weexteam/weex-hackernews/blob/master/src/components/comment.vue) 的代码了。至于 store 是如何获取数据的，关注后续讲 Vuex 的文章。

## 小结

**通篇讲的是 Vue 2.0 的特性，与 Weex 没有半毛钱关系。** Vue 2.0 的特性比较多，能力很强大，这里只讲了很小一部分；只要思路清晰，各种奇葩效果也能优雅的实现。在 Vue 2.0 的所有特性中，只要不是强依赖与 Web 本身的特性，都可以在 Weex 里用。如果你对 Web 平台有足够的了解，在写代码的时候就能时刻清楚哪些特性是 Web / DOM 强相关的，哪些是跨平台通用的，这对你写跨端（Weex）或者跨栈（node.js）的程序很有帮助。
