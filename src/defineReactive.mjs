import observe from "./observe.mjs";
import Dep from "./dep.mjs";

export default function defineReactive(obj, key, val) {
  // 递归调用 observe，处理 val 仍然为对象的情况
  const childOb = observe(val);
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      console.log(`响应式getter: key = ${key}`);
      return val;
    },
    set(newVal) {
      console.log(`响应式setter: ${key} = ${newVal}`);
      if (newVal === val) return;
      val = newVal;
      // 对新值进行响应式处理，这里针对的是新值为非原始值的情况，比如 val 为对象、数组
      observe(val);
      dep.notify();
    },
  });
}
