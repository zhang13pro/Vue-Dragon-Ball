import protoArgument from "./protoArgument.mjs";
import observe from "./observe.mjs";
import defineReactive from "./defineReactive.mjs";
import Dep from "./dep.mjs";

export default function Observer(data) {
  // getter中收集依赖，拦截器中触发依赖
  // 依赖之所以保存在这 是因为在getter中和Array拦截器中都可以访问到Observer实例
  this.dep = new Dep(); // 为对象本身设置一个 dep，方便在更新对象本身时使用，比如 数组通知依赖更新时就会用到

  Object.defineProperty(data, "__ob__", {
    // 为对象设置 __ob__ 属性，值为 this(Observer)，标识当前对象已经是一个响应式对象了
    value: this,
    // 设置为 false，禁止被枚举，
    // 1、可以在递归设置数据响应式的时候跳过 __ob__
    // 2、将响应式对象字符串化时也不显示 __ob__ 对象
    enumerable: false,
    writeable: false,
    configurable: false,
  });

  if (Array.isArray(data)) {
    //   数组响应式
    protoArgument(data);
    this.observeArray(data);
  } else {
    //   对象响应式
    this.walk(data);
  }
}

Observer.prototype.observeArray = function (arr) {
  for (const item of arr) {
    // 递归 以达到 this.arr[idx].xx 是响应式的目的
    observe(item);
  }
};

Observer.prototype.walk = function (obj) {
  for (const key in obj) {
    defineReactive(obj, key, obj[key]);
  }
};
