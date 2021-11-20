import Watcher from "../watcher.mjs";

export default function compileAttribute(node, vm) {
  // 将类数组格式的属性节点转换为数组
  const attrs = Array.from(node.attributes);

  for (const attr of attrs) {
    const { name, value } = attr;
    // 正则的精准匹配
    if (name.match(/v-on:click/)) {
      // 编译 v-on:click 指令
      compileVOnClick(node, value, vm);
    } else if (name.match(/v-bind:(.*)/)) {
      compileVBind(node, value, vm);
    } else if (name.match(/v-model/)) {
      compileVModel(node, value, vm);
    }
  }
}

function compileVOnClick(node, method, vm) {
  // 当然避免不了原生DOM操作
  node.addEventListener("click", function (...args) {
    vm.$options.methods[method].apply(vm, args);
  });
}

function compileVBind(node, attrValue, vm) {
  const attrName = RegExp.$1;
  console.log("attrName", attrName);
  // 移除模版中的 v-bind 属性
  node.removeAttribute(`v-bind:${attrName}`);
  // 当属性值发生变化时，重新执行回调函数
  function cb() {
    // console.log("v-bind ", node);
    node.setAttribute(attrName, vm[attrValue]);
  }
  // 实例化 Watcher，当属性值发生变化时，dep 通知 watcher 执行 update 方法，cb 被执行，重新更新属性
  new Watcher(cb);
}

function compileVModel(node, key, vm) {
  let { tagName, type } = node;
  tagName = tagName.toLowerCase();
  // 双向数据绑定原理 单向数据绑定+事件监听
  if (tagName === "input" && type === "text") {
    // 设置 input 输入框的初始值
    node.value = vm[key];
    // 给节点添加 input 事件，当事件发生时更改响应式数据
    node.addEventListener("input", function () {
      vm[key] = node.value;
    });
  }
  // <input type="checkbox" v-model="isChecked" />
  else if (tagName === "input" && type === "checkbox") {
    node.checked = vm[key];
    node.addEventListener("change", function () {
      vm[key] = node.checked;
    });
  }
  // <select v-model="selectedValue"></select>
  else if (tagName === "select") {
    node.value = vm[key];
    node.addEventListener("change", function () {
      vm[key] = node.value;
    });
  }
}
