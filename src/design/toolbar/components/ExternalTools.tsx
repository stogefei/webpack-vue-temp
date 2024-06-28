import { defineComponent } from 'vue'
import { Button, ButtonGroup, Popover } from 'element-ui'
import LucideIcon from '@/components/common/LucideIcon'
import modeler from '@/store/modeler'
import {pinia} from '@/store/index'

const ExternalTools = defineComponent({
  name: 'ExternalTools',
  components: {
    EButton: Button,
    EButtonGroup: ButtonGroup,
    ElPopover: Popover,
  },
  setup() {
    const moduleStore = modeler(pinia)

    let minimap: any | null = null
    // const minimapStatus = computed(() => editor().getEditorConfig.miniMap)
    const minimapToggle = () => {
      !minimap && (minimap = moduleStore.getModeler!.get('minimap'))
      minimap && minimap.toggle()
    }
    return {
      minimapToggle
    }
  },
  render () {
    return(
      <e-button-group>
          <e-button size="mini" onClick={() => this.minimapToggle()}>
            <el-popover title="展开/收起小地图" popper-class="tool-popper" trigger="hover" >
              <LucideIcon slot="reference" name="Map" size={12}></LucideIcon>
            </el-popover>
          </e-button>
      </e-button-group>
    )
  }
})

export default ExternalTools
