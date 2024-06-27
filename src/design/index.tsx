import { defineComponent, ref, h } from 'vue'
import { Message }from 'element-ui'
import Toool from'./toolbar/index';
import Canvas from'./canvas/index';
const prefixCls: string = 'cloudpivot-bpmn';
const Bpmn = defineComponent({
  inheritAttrs: false,
  name: prefixCls,
  setup() {
    window.__messageBox = Message;
    const processXml = ref<string | undefined>(undefined)
    return {
      processXml,
    }
  },

  render () {
    return (
      <div class={prefixCls}>
        <div class="main-content">
          <Toool/>
          <Canvas xml={this.processXml}/>
        </div>
      </div>
    )
  }
})

export default Bpmn
