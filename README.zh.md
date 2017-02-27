# Hacker News App

首个使用 Weex 和 Vue 开发的 Hacker News 原生应用。

## 预览

用 [Weex Playground App](https://weex.apache.org/playground.html) 扫描下方二维码即可。

![QR Code](./qrcode.jpg)

> 二维码内容是 `http://whatever.cn?_wx_tpl=https://raw.githubusercontent.com/weexteam/weex-hackernews/master/ios/assets/index.js` ，确保你的手机能登上 GitHub 。

## 编译项目文件

安装依赖：

```
npm install
```

编译代码：

```bash
# 生成 Web 平台和 native 平台可用的 bundle 文件
# 位置：
# dist/index.web.js
# dist/index.web.js
npm run build

# 监听模式的 npm run build
npm run dev
```

拷贝 bundle 文件：

```bash
# 将生成的 bundle 文件拷贝到 Android 项目的资源目录
npm run copy:android

# 将生成的 bundle 文件拷贝到 iOS 项目的资源目录
npm run copy:ios

# run both copy:andriod and copy:ios
npm run copy
```

### 启动 Web 服务

```
npm run serve
```

启动服务后会监听 1337 端口，访问 http://127.0.0.1:1337/index.html 即可在浏览器中预览页面。

### 启动 Android 项目

首先应该安装 [Android Studio](https://developer.android.com/studio/index.html) 和必要的 Android SDK，配置好基本的开发环境。

使用 Android Studio 打开 `android` 目录中的项目，等待自动安装完依赖以后，即可启动模拟器或者真机预览页面。

### 启动 iOS 项目

首先应该配置好 [iOS 开发环境](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) 并且安装 [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) 工具。

进入 `ios` 目录，使用 CocoaPods 安装依赖：

```
pod install
```

使用 Xcode 打开 `ios` 目录中的项目（`HackerNews.xcworkspace`），然后即可启动模拟器预览页面。

> 注：如果想要在真机上查看效果，还需要配置开发者签名等信息。
