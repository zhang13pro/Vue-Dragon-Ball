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
  console.log("node", node);
  console.log("method", method);
  console.log("vm", vm);
}
