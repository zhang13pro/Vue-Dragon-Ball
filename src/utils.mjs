export function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get() {
      return target[sourceKey][key];
    },
    set(Value) {
      target[sourceKey][key] = Value;
    },
  });
}
