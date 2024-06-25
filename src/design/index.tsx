import { Component, Vue } from 'vue-property-decorator';
import {Icon} from'@h3/antd-vue';
import Canvas from'./canvas/index';
const prefixCls: string = 'cloudpivot-bpmn';
@Component({
  name: prefixCls,
  components: {
    AIcon: Icon,
    Canvas,
  }
})
export default class Design extends Vue {
  render () {
    return (
      <div class={prefixCls}>
        <div class="main-content">
          <Canvas/>
        </div>
      </div>
    )
  }
}

