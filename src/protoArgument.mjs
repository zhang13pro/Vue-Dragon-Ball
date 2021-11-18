const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
// 对自变型数组进行增强 patch(补丁)
const methodsToPatch = [
  "push", // return number of elements
  "pop", // return element
  "unshift",
  "shift",
  "splice",
  "sort",
  "reverse",
];

methodsToPatch.forEach((method) => {
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      // 不改变原本的功能
      const result = arrayProto[method].apply(this, args);
      // 实现数组响应式
      console.log("array reactive");

      // 对数组新增的元素添加响应性
      let inserted;
      switch (method) {
        case "push": // 继续匹配
        case "unshift":
          inserted = args;
          break;
        case "splice":
          // this.arr.splice(start, deleteCount, item1, item2, ...)
          // 如果不传item inserted = []
          inserted = args.slice(2);
          break;
      }

      // 如果数组有新增的元素，则对新增的元素进行响应式处理
      // Vue源码是使用 if (inserted) 进行判断，但是if语句的隐式类型转换会将 [] 作为truly值
      inserted.length && this.__ob__.observeArray(inserted);
      // 依赖通知更新
      this.__ob__.dep.notify();

      return result;
    },
    configurable: true,
    writeable: true,
    enumerable: true,
  });
});

// 拦截数组原型并覆盖
export default function protoArgument(arr) {
  Object.setPrototypeOf(arr, arrayMethods);
}
