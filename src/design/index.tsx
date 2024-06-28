import { defineComponent, ref, h, computed} from 'vue'
import { Message }from 'element-ui'
import Toool from'./toolbar/index';
import ContextMenu from '@/components/ContextMenu/index.vue'
import Canvas from'./canvas/index';
import { EditorSettings } from '../types/editor/settings'
import { defaultSettings } from '@/config'
const prefixCls: string = 'cloudpivot-bpmn';
const Bpmn = defineComponent({
  inheritAttrs: false,
  name: prefixCls,
  components: {
    Canvas: Canvas,
    Toool: Toool,
    ContextMenu: ContextMenu,
  },
  setup() {
    window.__messageBox = Message;
    const processXml = ref<string | undefined>(undefined)
    const editorSettings = ref<EditorSettings>({ ...defaultSettings })

    const customPalette = computed<boolean>(() => editorSettings.value.paletteMode === 'custom')
    const customPenal = computed<boolean>(() => editorSettings.value.penalMode === 'custom')
    const showToolbar = computed<boolean>(() => editorSettings.value.toolbar)
    const computedClasses = computed<string>(() => {
      const baseClass = ['designer-container']
      customPalette.value && baseClass.push('designer-with-palette')
      customPenal.value && baseClass.push('designer-with-penal')
      editorSettings.value.bg === 'grid-image' && baseClass.push('designer-with-bg')
      editorSettings.value.bg === 'image' && baseClass.push('designer-with-image')

      return baseClass.join(' ')
    })
    return {
      processXml,
      computedClasses,
      showToolbar,
    }
  },
  mounted() {
    document.body.addEventListener('contextmenu', function (ev) {
      ev.preventDefault()
    })
  },
  render () {
    return (
      <div class={prefixCls}>
        <div class="main-content">
          <Toool/>
          <Canvas xml={this.processXml}/>
          <ContextMenu/>
        </div>
      </div>
    )
  }
})

export default Bpmn
