# Weex 为什么能支持多个前端框架

## Weex 现状

在 WeexConf 2017（1.12） 的时候，Weex 正式对外发布了支持 [Vue 2.0](https://cn.vuejs.org/) 的 WeexSDK，其实还有一个内测了很久的前端框架 [Rax](http://rax.taobaofed.org/) 也在当天开源了。Rax 是一个兼容 React 语法，但是比 React 更小更适合移动端的前端框架，天生支持 Weex。如此一来，Weex 就同时支持 Vue 和 React 的语法了！

在此之前，Weex 本身也有一套语法格式（`.we` 文件），是基于 Vue 1.0 设计的，现在依然在 WeexSDK 中，这又是一种 Weex 支持的语法。不过，和 Vue 1.0 一样，鼓励大家逐渐向 Vue 2.0 过渡。除此之外，Weex 其实还支持 [Vanilla](http://vanilla-js.com/) ！可以直接使用类似的原生 DOM API 增删改元素、添加事件。不过使用的不是真正的 Web API，而是基于移动端设计的 [Native DOM API](http://weex.apache.org/cn/references/native-dom-api.html)。

说的有点乱，现在总结一下： **Weex 支持使用四种“前端框架”！**

+ Vue 2.0 👍
+ Rax （兼容 React 语法） 👍
+ 旧版 `.we` 格式的语法 👎
+ Vanilla （直接使用 Native DOM API） 👎

其中，建议使用 Vue 2.0 和 Rax，后两个可能会废弃，不建议使用。

## Weex 和前端框架的关系

那么问题来了，Weex 难道不是个前端框架吗？怎么就能支持其他前端框架呢？它和 Vue 、Rax 的关系到底是怎样的？


## Weex 的整体结构
