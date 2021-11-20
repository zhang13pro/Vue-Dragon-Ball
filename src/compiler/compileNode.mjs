import compileTextNode from "./compileTextNode.mjs";
import compileAttribute from "./compileAttribute.mjs";

export default function compileNode(nodes, vm) {
  for (var i = 0, len = nodes.length; i < len; i++) {
    const node = nodes[i];

    if (node.nodeType === 1) {
      console.log("元素节点", node);
      // 编译元素节点的属性
      compileAttribute(node, vm);
      // 递归编译子节点
      compileNode(Array.from(node.childNodes), vm);
    } else if (node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)) {
      // 匹配胡子语法 编译文本节点
      console.log("文本节点", node);
      compileTextNode(node, vm);
    }
  }
}
