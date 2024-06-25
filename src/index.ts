
import Design from './design/index'
// import Design from './design/test.vue'

// @ts-ignore
Design.install = function (Vue) {
  Vue.component(Design.name, Design);
};

export default Design;
