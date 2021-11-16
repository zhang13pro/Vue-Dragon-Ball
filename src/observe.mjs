import Observer from "./observer.mjs";

export default function observe(data) {
  if (typeof data !== "object") return;
  // 如果 value.__ob__ 属性已经存在，说明 value 对象已经具备响应式能力，直接返回已有的响应式对象
  if (data.__ob__) return data.__ob__;

  return new Observer(data);
}
