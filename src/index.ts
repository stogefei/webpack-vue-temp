import Design from './tes'
Design.install = function (Vue) {
  Vue.component(Design.name, Design);
};

export default Design;

// const Test = () => {
//     console.log('test====', 1111);
// }
// export {
//     Test
// }
// export default Test