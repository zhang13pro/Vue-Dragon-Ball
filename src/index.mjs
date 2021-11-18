import initData from "./initData.mjs";
import mount from "./compiler/index.mjs";

export default function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  // 挂载 options 到 Vue实例
  this.$options = options;
  // this指 Vue实例
  initData(this);

  if (this.$options.el) {
    this.$mount;
  }
};

Vue.prototype.$mount = function () {
  mount(this);
};
