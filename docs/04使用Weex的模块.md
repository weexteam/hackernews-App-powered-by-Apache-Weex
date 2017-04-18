# 【使用 Weex 和 Vue 开发原生应用】 4 使用 Weex 平台的功能

> 系列文章的目录在 👉 [这里](https://segmentfault.com/a/1190000008342533)

除了 Vue 框架提供的功能以为，Weex 平台本身也提供了很多功能，这些功能比前端框架更底层一些，而且是跨框架通用的，在 [Vue](https://github.com/vuejs/vue) 和 [Rax](https://github.com/alibaba/rax) 里都可以用。本文的几个例子越来越偏底层，最后一个例子还需要写 java 代码。

## 使用 Weex 的模块

> [Weex 模块的文档](http://weex.apache.org/cn/references/modules/index.html)

通过 `weex.requireModule` 即可引入 weex 的模块。

```js
const modal = weex.requireModule('modal')

modal.toast({
  message: 'native toast'
})
```

### Weex 的模块到底是什么东西？

模块的用法很简单，像普通 js 模块一样调接口就行了，看起来挺像一个 npm 模块的，但是在 Weex 模块内部会调用原生接口，最终调用的都是原生平台提供的功能。**Weex 的模块提供了使用原生功能的能力。**

例如 [`modal` 模块](http://weex.apache.org/cn/references/modules/modal.html)可以弹出 `toast` 、`alert` 、`confirm` 、`prompt` 等各种弹窗，这些弹窗都是原生弹窗，在 Android 和 iOS 下的风格和行为是由各自的系统决定的。Weex 的模块在 js 这一层只负责向原生环境里传递数据，通知 native 去执行某些操作。

像 `storage` 、`navigator` 、`clipboard` 这种依赖平台特性的功能，需要调用平台原生接口才能实现，所以只能写成模块。

### 模块的同步和异步

一般来说，都是调用模块的功能，并不会依赖模块返回值的，但是像 [`dom` 模块](http://weex.apache.org/cn/references/modules/dom.html)中的 `getComponentRect` 接口是用来计算组件的宽高和位置的，必须得从原生端获取值。但是在 Weex 最初设计的版本里，模块都是异步返回值的，也就是说，只能通过回调函数的方式拿到真正的布局信息（也可以自己封装成 Promise）。现在 Weex 已经支持了模块的同步返回值，但是为了保持原先版本中接口的行为一致，`getComponentRect` 这个方法依然是异步的。

```js
const dom = weex.requireModule('dom')

const returns = dom.getComponentRect(this.$refs.box, option => {
  console.log(option) // { result: true, size: { ... } }
})

console.log(returns) // undefined
```

上边的代码中，会先执行 `console.log(returns)` 再执行 `console.log(option)`，并且 `getComponentRect` 方法没有返回值，所以 `returns` 的值是 undefined，`option` 中才是真正的原生端返回的布局信息。

### 扩展 Weex 的模块

Weex 本身内置了很多模块，出于通用性考虑，我们只会把最基础的模块打包进 SDK。其他个性化的模块可以自己来实现，或者从社区中找。[Weex Market](http://market.weex-project.io) 将会是一个收集这些扩展模块（组件、插件）的地方，结合 [weex-pack](https://github.com/weexteam/weex-pack) 可以实现方便的安装和扩展。**（目前来说，Weex Market 中还是基于旧版 `.we`语法的模块比较多，不适用于 Vue，在使用前要看准适用的框架）**

具体的扩展 Weex 模块的方法，参考：

+ [《Android APIs》](http://weex.apache.org/cn/references/android-apis.html)
+ [《Android 扩展》](http://weex.apache.org/cn/references/advanced/extend-to-android.html)
+ [《iOS APIs》](http://weex.apache.org/cn/references/ios-apis.html)
+ [《iOS 扩展》](http://weex.apache.org/cn/references/advanced/extend-to-ios.html)

## 获取平台环境数据

Weex 的运行环境有好几种，在写代码的时候，有些情况下需要获取环境数据。Weex 提供了 `weex.config` 变量可以获取配置信息。

+ `bundleUrl`: 当前 js bundle 的 URL 地址。
+ `env`: 环境对象。
  + `weexVersion`: WeexSDK 的版本。
  + `appName`: 应用名字。
  + `appVersion`: 应用版本。
  + `platform`: 平台信息，目前是 `"iOS"`、`"Android"` 和 `"Web"` 之一。
  + `osVersion`: 系统版本。
  + `deviceModel`: 设备型号 (仅限 iOS 和 Android)。
  + `deviceWidth`: 设备宽度。
  + `deviceHeight`: 设备高度。

此外其实还有一个全局的 `WXEnvironment` 变量，它和 `weex.config.env` 的属性是一样的。

下边是一个获取环境数据的二维码（支持拷贝）：

![]()

## 写三端不一致的代码

### 只针对 native 平台注册 Vuex

因为在浏览器环境中，Vuex 是会[自动注册](https://github.com/vuejs/vuex/blob/v2.1.2/src/index.js#L425-L428)的，只需要引入库文件就行了，如果重复注册，Vuex 会抛出警告的。

```js
// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
```

但是在 native 环境中没有 `window` 变量，就需要再手动调用 `Vue.use(Vuex)` 注册 Vuex 插件，在注册前判断当前运行的平台。

```js
import Vue from 'vue'
import Vuex from 'vuex'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}
```

### 不同的链接跳转行为

如果你在不同端上运行了 [weex-hackernews](https://github.com/weexteam/weex-hackernews) 里的项目，会发现在浏览器上点击文章链接是会新开一个页签的，但是在客户端上点击链接就不会新开视图，而是在当前视图里跳转。

![]()

这种不同的行为体现在 [story.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/story.vue#L4-L7) 文件里，这里的跳转链接并不是直接使用的 Weex 里的 [`<a>`](http://weex.apache.org/cn/references/components/a.html) 标签，而是自定义了一个 `<external-link>` 的组件，把 `url` 参数传过去。

```html
<external-link :url="story.url">
  <text>{{story.title}}</text>
  <text v-if="story.url">({{ story.url | host }})</text>
</external-link>
```

页面跳转逻辑是在 [external-link.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/external-link.vue) 里组件实现的：

```html
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
```

该组件监听了 `click` 事件，在点击时会首先判断当前运行的平台，如果是 `Web` ，则使用 `window.open` 新开页面，否则（在原生平台中）就默认使用 `vue-router` 进行跳转，这个“跳转”其实只是更新了当前的视图，其实还在同一个原生页面内。

## 透传原生事件

如果你看了 [src/App.vue](https://github.com/weexteam/weex-hackernews/blob/v1.0/src/App.vue#L2) 中的代码，会发现里边用了一个 `androidback` 的事件。它实现的效果是绑定了 Android 中的“返回”事件，点击返回按钮就会退回上一个视图。

```html
<template>
  <div @androidback="back">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>
```

这个事件并不是 Vue.js 本身提供的，也不是 Web 标准里的，在浏览器上肯定不会给你提供一个以 `android` 开头的事件名。在 `vue-router` 里也不会加这样的东西。甚至如果你去翻 Weex 的文档，也找不到这个事件类型，它也不是 Weex 默认提供的。

想要实现 Android 特有的功能，就得在 Android 项目里的代码，在“前端”层面是解决不了这个问题的，要写 `java`。

### 在 Android 中派发原生事件

首先，在 Android 里肯定是可以监听到“返回”按钮的点击事件的，其实只要实现 `Activity` 里的 `onBackPressed` 接口就可以了，它会在当前视图里点击返回按钮时执行。在 weex-hackernews Andorid 项目里的 [MainActivity.java](https://github.com/weexteam/weex-hackernews/blob/v1.0/android/app/src/main/java/com/example/weex/hackernews/MainActivity.java#L53-L56) 中，就实现了 `onBackPressed` 接口：

```java
public void onBackPressed() {
    Log.e("USER ACTION", "BACK");
    WXSDKManager.getInstance().fireEvent(mWXSDKInstance.getInstanceId(), "_root", "androidback");
}
```

在这个方法里，通过 `WXSDKManager.getInstance()` 取到了当前页面的实例，然后调用 `fireEvent` 接口给根视图派发 `androidback` 事件，事件名是可以自定义的。在 Weex Runtime 中会接收到这个事件，会传递给 Vue.js 框架，并且触发最外层组件的 `androidback` 事件，最终会找到 `back` 方法并执行。（这里说的 Weex Runtime 是前端代码实现的，比 Vue.js 更底层一些）。

## 小结

除了 Vue.js 本身的特性以外，Weex 还提供了很多平台化的特性，这些特性比前端框架更底层，也更通用一些。即使你用的不是 Vue.js 而是 [Rax](https://github.com/alibaba/rax)，或者是旧版的 `.we` 的语法，Weex 里的这些特性也都是可以用的。

虽然同一份代码可以运行在三端，但是 iOS 和 Android 和 Web 都有各自的优势和缺陷，如果你想实现一些平台特有的功能，Weex 也是支持的。如果你想要体现平台特有的优势，就得针对某个平台写一下原生代码。在写 iOS 或者 Android 代码的时候，肯定能确保在其他平台中不会执行到；但是在写 js 代码的时候，如果使用了只在 Web 上才有的特性，就得注意一些，不要让 iOS 和 Android 执行到这些代码。
