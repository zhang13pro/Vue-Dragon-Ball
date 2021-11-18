import compileNode from "./compileNode.mjs";

export default function mount(vm) {
  let el = document.querySelector(vm.$options.el);
  // 编译节点
  compileNode(Array.from(el.childNodes), vm);
}
