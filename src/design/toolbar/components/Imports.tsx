import { defineComponent, ref } from 'vue'
import { Button } from 'element-ui';
import { pinia } from '@/store/index'
import modeler from '@/store/modeler'

const Imports = defineComponent({
  name: 'Imports',
  components: {
    EButton: Button,
  },
  setup() {
    const modelerStore = modeler(pinia)
    const importRef = ref<HTMLInputElement | null>(null)

    const openImportWindow = () => {
      importRef.value && importRef.value.click()
    }

    const changeImportFile = () => {
      if (importRef.value && importRef.value.files) {
        const file = importRef.value.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
          const xmlStr = this.result
          modelerStore.getModeler!.importXML(xmlStr as string)
        }
        importRef.value.value = ''
        importRef.value.files = null
      }
    }
    return {
      importRef,
      openImportWindow,
      changeImportFile,
    }
  },
  render () {
    return (
        <e-button size="mini" type="primary" onClick={this.openImportWindow}>
          打开文件
          <input
          type="file"
          ref='importRef'
          style="display: none"
          accept=".xml,.bpmn"
          onChange={this.changeImportFile}></input>
        </e-button>
    )
  }
})

export default Imports
