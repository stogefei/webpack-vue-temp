import { Component, Vue } from 'vue-property-decorator';
import { ButtonGroup } from 'element-ui';
import Imports from './components/Imports';
import Exports from './components/exports';
import Previews from './components/Previews';
import Aligns from './components/Aligns';
import Scales from './components/Scales';
import Commands from './components/Commands';
import ExternalTools from './components/ExternalTools';
const prefixCls: string = 'cloudpivot-bpmn-tool';
@Component({
  name: prefixCls,
  components: {
    EButtonGroup: ButtonGroup
  }
})
export default class Toool extends Vue {
  render () {
    return (
      <div class={prefixCls}>
        <e-button-group>
          <Imports></Imports>
          <Exports></Exports>
          <Previews></Previews>
        </e-button-group>
        <Aligns></Aligns>
        <Scales></Scales>
        <Commands></Commands>
        <ExternalTools></ExternalTools>
      </div>
    )
  }
}