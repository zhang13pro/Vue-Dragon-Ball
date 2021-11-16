const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
// 对自变型数组进行增强 patch(补丁)
const methodsToPatch = [
  "push",
  "pop",
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
      const res = arrayProto[method].apply(this, args);
      // 实现数组响应式
      console.log("array reactive");
      return res;
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
