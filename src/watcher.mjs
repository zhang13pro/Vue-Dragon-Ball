import Dep from "./dep.mjs";

export default function Watcher(cb) {
  this._cb = cb;
  Dep.target = this;

  //  cb函数会执行 vm.xx 属性读取，进行依赖收集
  cb();
  // 防止重复收集
  Dep.target = null;
}

Watcher.prototype.update = function () {
  this._cb();
};
