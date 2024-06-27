import { defineComponent, ref, nextTick } from 'vue';
import BpmnModdle from 'bpmn-moddle';
import modeler from '@/store/modeler';
import {pinia} from '@/store/index';
import hljs from '@/highlight/index';
import { Button, Popover, Dialog } from 'element-ui'
const Previews = defineComponent({
  name: 'Previews',
  components: {
    EButton: Button,
    ElPopover: Popover,
    ElDialog: Dialog,
  },
  setup() {
    const codeString = ref<any>();
    const preRef = ref<HTMLInputElement | null>(null)
    const codeLanguage = ref('xml');
    const codeModelVisible = ref(false);
    const modelerStore = modeler(pinia)

    const moddle = new BpmnModdle()

    const openXMLPreviewModel = async () => {
      try {
        const modeler = modelerStore.getModeler!

        if (!modeler) {
          return window.__messageBox.warning('模型加载失败，请刷新重试')
        }

        const { xml } = await modeler.saveXML({ format: true, preamble: true })
        codeString.value = xml;
        codeLanguage.value = 'xml';
        codeModelVisible.value = true;
      } catch (e) {
        window.__messageBox.error((e as Error).message || (e as string))
      }
    }

    const openJsonPreviewModel = async () => {
      const modeler = modelerStore.getModeler!

      if (!modeler) {
        return window.__messageBox.warning('模型加载失败，请刷新重试')
      }

      const { xml } = await modeler.saveXML({ format: true })

      const jsonStr = await moddle.fromXML(xml!)

      codeLanguage.value = 'json';
      codeString.value = JSON.stringify(jsonStr, null, 2);;
      codeModelVisible.value = true
    }

    const open = async () => {
      await nextTick()
      if(preRef.value) {
        hljs.highlightElement(preRef.value)
      }
    }

    const close =() => {
      codeModelVisible.value = false
      codeString.value = null
    }

    return {
      openXMLPreviewModel,
      close,
      open,
      openJsonPreviewModel,
      codeString,
      codeLanguage,
      codeModelVisible,
      preRef,
    }
  },

  render () {
    const content = (<div class="button-list_column">
      <e-button size="mini" plain type="primary" onClick={this.openXMLPreviewModel}>
        预览为XML
      </e-button>
      <e-button size="mini" plain type="primary" onClick={this.openJsonPreviewModel}>
        预览为JSON
      </e-button>
    </div>);
    return (
      <e-button size="mini" type="primary">
        <el-popover trigger="hover" popper-class="tool-popper">
          <span slot="reference">预览文件</span>
          {content}
        </el-popover>
        <el-dialog 
          onClose={this.close} 
          onOpen={this.open}
          title="预览文件" 
          visible={this.codeModelVisible}
          width="72vw"
          append-to-body destroy-on-close>
          <div class="preview-model">
            <pre>
              <code id={this.codeLanguage} ref='preRef' class={this.codeLanguage}>{this.codeString}</code>
            </pre>
          </div>
        </el-dialog>
      </e-button>
    )
  }
})

export default Previews
