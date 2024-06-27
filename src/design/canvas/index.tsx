import { defineComponent, ref, toRefs, nextTick, watch, onMounted } from 'vue';
import type { PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { pinia } from '@/store/index'
import editor from '@/store/editor'
import { createNewDiagram } from "../../utils/index";
import modulesAndModdle from './moduleAndExtensions'
import initModeler from "./initModeler";
import './styles/index.less';
import '../../styles/tailwind.css';
const prefixCls: string = 'cloudpivot-bpmn-canvas';

const Designer = defineComponent({
  name: prefixCls,
  props: {
    xml: {
      type: String as PropType<string>,
      default: undefined
    }
  },
  emits: ['update:xml', 'command-stack-changed'],
  setup(props, { emit }) {
    const editorStore = editor(pinia)
    const { editorSettings } = storeToRefs(editorStore)
    const { xml } = toRefs(props)
    const designer = ref<HTMLDivElement | null>(null)

    watch(
      () => editorSettings.value,
      async (value, oldValue) => {
        try {

        } catch (e) {
          console.log(e)
        }
      },
      { deep: true, immediate: true }
    )
    return {
      editorSettings,
      designer,
      xml,
    };
  },

  async mounted () {
    const modelerModules = modulesAndModdle(this.editorSettings)
    await nextTick()
    await initModeler(this.designer, modelerModules, this)
    await createNewDiagram(this.xml, this.editorSettings)
  },

  render () {
    return (
      <div ref='designer' class="designer"></div>
    )
  }
})

export default Designer

