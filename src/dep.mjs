// Vue1.x 中响应式数据对象的所有属性（key）和 dep 是一一对应对应关系，一个 key 对应一个 dep；响应式数据在页面中每引用一次就会产生一个 watcher，所以在 Vue1.0 中 dep 和 watcher 是一对多的关系。
export default function Dep() {
  // 存储当前 dep 实例收集的所有 watcher
  this.watchers = [];
}
// Dep.target 是一个静态属性，值为 null 或者 watcher 实例
// 在实例化 Watcher 时进行赋值，待依赖收集完成后在 Watcher 中又重新赋值为 null
Dep.target = null;

// 在发生读取操作时（vm.xx) && 并且 Dep.target 不为 null 时进行依赖收集
Dep.prototype.depend = function () {
  if (this.watchers.includes(Dep.target)) return;
  this.watchers.push(Dep.target);
};

Dep.prototype.notify = function () {
  for (const watcher of this.watchers) {
    watcher.update();
  }
};
