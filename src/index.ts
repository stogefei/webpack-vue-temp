import Bpmn from './design/index';
export * from './store/index';
import "./bpmn-icons/index";
// @ts-ignore
Bpmn.install = function (Vue) {
  Vue.component(Bpmn.name, Bpmn);
};

export default Bpmn;
