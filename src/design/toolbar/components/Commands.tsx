import { defineComponent } from 'vue'
import { Button, ButtonGroup, Popover } from 'element-ui'
import EventEmitter from '@/utils/EventEmitter'
import type Modeler from 'bpmn-js/lib/Modeler'
import type CommandStack from 'diagram-js/lib/command/CommandStack'
import { createNewDiagram } from '@/utils'
import LucideIcon from '@/components/common/LucideIcon'

const Commands = defineComponent({
  name: 'Commands',
  components: {
    EButton: Button,
    EButtonGroup: ButtonGroup,
    ElPopover: Popover,
    LucideIcon,
  },
  setup() {
    let command: CommandStack | null = null

    EventEmitter.on('modeler-init', (modeler: Modeler) => {
      command = modeler.get<CommandStack>('commandStack')
    })

    const undo = () => {
      command && command.canUndo() && command.undo()
    }

    const redo = () => {
      command && command.canRedo() && command.redo()
    }

    const restart = () => {
      command && command.clear()
      createNewDiagram()
    }

    return {
      undo,
      redo,
      restart,
    }
  },
  render () {
    return (
      <e-button-group>
        <e-button size="mini" onClick={this.undo}>
          <el-popover popper-class="tool-popper" title="撤销" trigger="hover">
            <LucideIcon slot="reference" name="Undo2" size={12}></LucideIcon>
          </el-popover>
        </e-button>
        <e-button size="mini" onClick={this.redo}>
          <el-popover popper-class="tool-popper" title="重做" trigger="hover">
              <LucideIcon slot="reference" name="Redo2" size={12}></LucideIcon>
            </el-popover>
        </e-button>
        <e-button size="mini" onClick={this.restart}>
          <el-popover popper-class="tool-popper" trigger="hover" title="擦除重做">
            <LucideIcon slot="reference" name="Eraser" size={12}></LucideIcon>
          </el-popover>
        </e-button>
    </e-button-group>
    )
  }
})

export default Commands
