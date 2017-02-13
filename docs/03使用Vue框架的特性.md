# 使用 Vue 框架的其他特性

其实在 Weex 中使用 Vue.js 还是有一些限制的，参考官方文档：[《Vue.js 在 Weex 和 Web 中的差异》](https://weex-project.io/cn/references/vue/difference-with-web.html)。总结下来无非是三点：

+ 平台差异，要使用三端通用的特性
+ 只引入了 Vue Runtime
+ 样式差异

除了文档中列出的限制之外，Vue 的其他语言特性都是支持的。下边列出了几个在 [weex-hackernews](https://github.com/weexteam/weex-hackernews) 项目里用到的特性：

## mixin

> [Vue mixin 文档](https://cn.vuejs.org/v2/guide/mixins.html)

## filter

> [Vue filter 文档](https://cn.vuejs.org/v2/api/#filters)

## 命名组件（递归组件）

> [Vue 命名组件的文档](https://vuejs.org/v2/guide/components.html#Recursive-Components)
