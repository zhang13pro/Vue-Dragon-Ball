# Dragon Ball

## 实现功能

- 数据响应式拦截

  - 原始值
  - 普通对象
  - 数组

- 数据响应式更新

  - 依赖收集，Dep
  - 依赖通知 Watcher 更新
  - 编译器，compiler

- methods + 事件 + 数据响应式更新

- v-bind 指令

- v-model 双向绑定

  - input 输入框
  - checkbox
  - select

## 思考

Vue1.x 其实是没有使用 Virtual DOM 的，这也是当初 Vue 的设计和 React 的根本不同。所以说框架一定需要 Virtual DOM 吗？不是这样的。需要进一步[思考](https://www.xunlu.xyz/blog/2021/09/24/the-front-frame)的是框架为我们做了什么。

换个问题，`VDOM` 一定更快吗？没有 `VDOM` 就不需要 `AST` 生成 `render()` function 再生成 `vnode` 的开销。那 Vue2 为什么要拥抱`VDOM`?回答这个问题之前，再思考一下 Vue1 是怎么知道哪些状态发生了改变？答案是细粒度绑定，也就是每个绑定都有一个对应的 watcher 来观察状态的变化。这样状态改变，Vue 能清楚的知道并更新它，这很酷。于此同时，当状态被越来越多的节点使用时，状态管理会变得很臃肿，对一个大型项目来说，内存和依赖追踪的开销是非常大的。其次，操作真实`DOM`本身也是一个相当耗费性能的点。

好了，让我们来回答这个问题**Vue2 为什么要拥抱`VDOM`?**

- 业务驱动技术，而不是很多人口中的技术驱动业务。
