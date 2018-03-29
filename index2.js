/**
*   @description 响应式基本原理 第二步，添加依赖追踪原理：get收集、set更新
*   @param Watcher  订阅者
*   @param Dep    订阅者列表，存放Watcher列表
*   @param observer 观察者
*   @param 依赖收集的条件 触发get方法；新建一个watcher对象
**/

// 订阅者列表 Dep
class Dep {
  constructor() {
    // 用来存放watcher对象的数组
    this.subs = [];
  }

  // 在subs中添加一个watcher对象
  addSub(sub) {
    this.subs.push(sub);
  }

  // 通知所有订阅者（watcher对象）更新视图, watcher触发更新操作
  notify() {
    this.subs.forEach((item) => {
      item.update();
    });
  }
}

// 订阅者 Watcher
class Watcher {
  constructor() {
    // ????????????
    // 在new一个watcher对象时将该对象赋值给Dep.target,方便在get中使用
    Dep.target = this;
  }

  // 更新视图的方法
  update() {
    console.log('视图又更新啦~');
  }
}

Dep.target = null;

// 属性响应式化
function responsiveObj(obj, key, value) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    // 属性可枚举
    enumerable: true,
    // 属性可被修改或删除
    configurable: true,
    get: function responsiveGet() {
      // 收集依赖
      // ????????
      // 什么时候生成的Watcher对象, 此时发生了哪些操作
      console.log('Dep.target is--', Dep.target);
      dep.addSub(Dep.target);
      return value;
    },
    set: function responsiveSet(newValue) {
      if (newValue === value) return;
      // 触发dep的notify方法，通知所有的订阅者更新视图~，触发Watcher对象update方法
      dep.notify();

      // cb(newValue);
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

    // 新建一个Watcher观察者对象，此时Dep.target指向这个Watcher对象
    new Watcher();
    // 读取test，触发get方法进行依赖收集
    console.log('render ~', this._data.test);
  }
}

let o = new Vue({
  data: {
    test: 'I am a test.'
  }
});
o._data.test = 'hello Vue!'
