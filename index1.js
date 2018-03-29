/**
*   @description 响应式基本原理 第一步
*
**/



// 模拟视图更新
function cb(newValue) {
  console.log('视图更新啦~' + newValue);
}

// 属性响应式化
function responsiveObj(obj, key, value) {
  Object.defineProperty(obj, key, {
    // 属性可枚举
    enumerable: true,
    // 属性可被修改或删除
    configurable: true,
    get: function responsiveGet() {
      return value;
    },
    set: function responsiveSet(newValue) {
      if (newValue === value) return;
      cb(newValue);
    }
  });
}

// 对象响应式化(对对象里的每一个属性进行响应式化)
function observer(obj) {
  if (!obj && (typeof obj !== 'object')) return;

  Object.keys(obj).forEach((item) => {
    responsiveObj(obj, item, obj[item]);
  });
}

// Vue中的data实际上是一个函数，这里暂时当做对象
class Vue {
  // Vue构造类
  constructor(options) {
    this._data = options.data;
    observer(this._data);
  }
}

let o = new Vue({
  data: {
    test: 'I am a test.'
  }
});
o._data.test = 'hello Vue!'
