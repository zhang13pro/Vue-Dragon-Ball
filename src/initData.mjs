import { proxy } from "./utils.mjs";
import observe from "./observe.mjs";

export default function initData(vm) {
  // * 1、初始化 options.data
  let { data } = vm.$options;
  // 保证data一定是对象
  if (!data) vm._data = {};
  else vm._data = typeof data === "function" ? data() : data;
  // * 2、代理 data 对象上的各个属性到 Vue 实例
  for (const key in vm._data) {
    proxy(vm, "_data", key);
  }
  // * 3、给 data 对象上的各个属性设置响应式能力
  observe(vm._data);
}
