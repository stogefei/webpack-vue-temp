import { defineComponent, ref } from 'vue'
import { Button, ButtonGroup, Popover } from 'element-ui'
import LucideIcon from '@/components/common/LucideIcon'
import EventEmitter from '@/utils/EventEmitter'
import type Modeler from 'bpmn-js/lib/Modeler'
import type Canvas from 'diagram-js/lib/core/Canvas'
// import CanvasEvent from 'diagram-js/lib/core/EventBus'

const Scales = defineComponent({
  name: 'ScaleTools',
  components: {
    EButton: Button,
    EButtonGroup: ButtonGroup,
    ElPopover: Popover,
  },
  setup() {
    const currentScale = ref(1)
    let canvas: Canvas | null = null

    EventEmitter.on('modeler-init', (modeler: Modeler) => {
      try {
        canvas = modeler.get<Canvas>('canvas')
        currentScale.value = canvas.zoom()
      } finally {
        modeler.on('canvas.viewbox.changed', ({ viewbox }: any) => {
          currentScale.value = viewbox.scale
        })
      }
    })

    const zoomReset = (newScale: number | any) => {
      canvas && canvas.zoom(newScale, newScale === 'fit-viewport' ? undefined : { x: 0, y: 0 })
    }

    const zoomOut = (newScale?: number) => {
      currentScale.value = newScale || Math.floor(currentScale.value * 100 - 0.1 * 100) / 100
      zoomReset(currentScale.value)
    }

    const zoomIn = (newScale?: number) => {
      currentScale.value = newScale || Math.floor(currentScale.value * 100 + 0.1 * 100) / 100
      zoomReset(currentScale.value)
    }

    return {
      zoomOut,
      zoomIn,
      zoomReset,
      currentScale,
    }
  },
  render () {
    return(
      <e-button-group>
          <e-button size="mini" onClick={() => this.zoomOut()}>
            <el-popover popper-class="tool-popper" trigger="hover" title="放大视图">
              <LucideIcon slot="reference" name="ZoomOut" size={12}></LucideIcon>
            </el-popover>
          </e-button>
          <e-button size="mini" onClick={() => this.zoomReset('fit-viewport')}>
            <span style="text-align: center; display: inline-block; width: 40px">
              {Math.floor(this.currentScale * 10) * 10 + '%'}
            </span>
          </e-button>
          <e-button size="mini" onClick={() => this.zoomIn()}>
            <el-popover popper-class="tool-popper" trigger="hover" title="缩小视图">
              <LucideIcon slot="reference" name="ZoomIn" size={12}></LucideIcon>
            </el-popover>
          </e-button>
      </e-button-group>
    )
  }
})

export default Scales
