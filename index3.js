/**
 *  @description 实现Virtual Dom下的一个VNode节点
 *  @param 概述 正确直观描述当前节点信息即可
 *
 */

 class VNode {
   constructor(tag, data, children, text, elem) {
     // 当前节点标签名
     this.tag = tag;
     // 当前节点的一些数据信息，props,attrs
     this.data = data;
     // 当前节点的子节点，是一个数组
     this.children = children;
     // 当前节点的文本节点
     this.text = text;
     // 当前虚拟节点对应的真实DOM节点
     this.elem = elem;
   }
 }

 // 创建一个空节点
 function createEmptyVNode() {
   const node = new VNode();
   node.text = '';
   return node;
 }

 // 创建一个文本节点
 function createTextVNode(val) {
   return new VNode(undefined, undefined, undefined, String(val));
 }

 // 克隆一个VNode节点
 function cloneVNode(node) {
   const cloneVNode= new VNode(
     node.tag,
     node.data,
     node.children,
     node.text,
     node.elem
   );
   return cloneVNode;
 }
