import { computed, ComputedRef, defineComponent } from 'vue'
import { Button, ButtonGroup, Popover, Icon } from 'element-ui'
import Modeler from 'bpmn-js/lib/Modeler'
import Selection from 'diagram-js/lib/features/selection/Selection'
import Modeling from 'bpmn-js/lib/features/modeling/Modeling.js'
import EventEmitter from '@/utils/EventEmitter'
import LucideIcon from '@/components/common/LucideIcon'

const Aligns = defineComponent({
  name: 'Aligns',
  components: {
    EButton: Button,
    EButtonGroup: ButtonGroup,
    ElPopover: Popover,
    EIcon: Icon,
    LucideIcon,
  },
  setup() {

    const buttons: ComputedRef<{ name: string; key: string; icon: string }[]> = computed(() => {
      return [
        { name: '左对齐', key: 'left', icon: 'AlignStartVertical' },
        { name: '水平居中', key: 'center', icon: 'AlignCenterVertical' },
        { name: '右对齐', key: 'right', icon: 'AlignEndVertical' },
        { name: '上对齐', key: 'top', icon: 'AlignStartHorizontal' },
        { name: '垂直居中', key: 'middle', icon: 'AlignCenterHorizontal' },
        { name: '下对齐', key: 'bottom', icon: 'AlignEndHorizontal' }
      ]
    })

    let modeling: Modeling | null = null
    let selection: Selection | null = null
    let align: any = null

    EventEmitter.on('modeler-init', (modeler: Modeler) => {
      modeling = modeler.get('modeling')
      selection = modeler.get('selection')
      align = modeler.get('alignElements')
    })

    const alignElements = (tag: string) => {
      if (modeling && selection) {
        const SelectedElements = selection.get()
        if (!SelectedElements || SelectedElements.length <= 1) {
          return window.__messageBox.warning('请按住 Shift 键选择多个元素对齐')
        }
        align.trigger(SelectedElements, tag)
      }
    }
    return {
      buttons,
      alignElements,
    }
  },
  render () {
    return(
      <e-button-group>
        {this.buttons.map((item) => {
          return (
            <e-button size="mini" onClick={() => this.alignElements(item.key)}>
              <el-popover popper-class="tool-popper" trigger="hover" title={item.name}>
                <lucide-icon  slot="reference" name={item.icon} size={12}></lucide-icon>
              </el-popover>
            </e-button>
          )
        })}
      </e-button-group>
    )
  }
})

export default Aligns
