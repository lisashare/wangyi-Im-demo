## web demo (html5) 二次开发指南

### 工程结构
- 前端工程构建文件夹 build
  - 诸如webpack、postcss的配置文件

- 图片资源文件 res
  - (目前nos的资源全在网易的cdn服务器上，这里是给开发者的一个备份示例)，在res文件夹下会有一个备份

- 生成脚本代码 dist
  - js 通过npm run dev/npm run prod 生成的目标js文件
  - css 通过npm run dev/npm run prod 生成的目标css文件
  - nim 从云信官网上下载的[web sdk](http://netease.im/im-sdk-demo)

- 工程开发目录 src
  - main.js 应用页面主入口
  - App.vue 应用页面模板入口，即被main.js挂载
  - login.js
  - regist.js

  - 工具函数 utils
    - cookie.js 读写cookie工具
    - md5.js md5加密工具
    - page.js 页面跳转工具，以及判断路由是否是主导航页
    - index.js 其他通用工具函数

  - VUE插件 plugins
    - 触摸插件，vue-touch不支持vue 2.0 用plugins/touchEvent

  - 配置文件 configs
    - configs demo基本配置

  - pages demo具体页面UI逻辑
    - components demo UI组件，如聊天控件、表情控件等

  - router 前端路由

  - store h5 demo数据驱动的管理中心
    - index.js vuex数据中心入口
    - state.js 数据中心变量声明
    - actions 异步数据变更请求提交
    - mutations 同步操作数据变更

  - themes h5 demo的主要公共UI样式库
    - themes.css / themes1.css ... 直接可替换的公共皮肤配置
    - common
      - animation.css 切页动画及其他css3动画
      - base.css 基准样式
      - grid.css 布局样式，一般以g-开头
      - module.css 模块样式，一般以m-开头
      - unit.css 单元样式，一般以u-开头
      - weui.css 用于重置vux/weUi默认样式

## 开发中有疑问的问题

1.  A用户每次点进去聊天都有一条信息发送，返回到其他页面，再进入还是发送默认消息

问题：指定用户对应的客服是从（登录，进入聊天/消息）那一刻起就不变了，还是变的，不变的话，我就在本地做存储这样再次登录就不会发消息 

2. 进入页面的记录，我这个暂时不明白是网易可以设置还是怎么，我这块的逻辑都是没改过的，同样改完样式的代码，在网易的appkey，token中就有记录，我改成我们测试的就没有

3. setTimeout(function(){
  document.body.scrollTop = document.body.scrollHeight
},300)

scrollTop    指某个可滚动区块向下滚动的距离
scrollHeight 网页内容body实际高度