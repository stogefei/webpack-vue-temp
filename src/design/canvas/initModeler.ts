import { markRaw, Ref } from 'vue'
import Modeler from "bpmn-js/lib/Modeler";
import EventEmitter from "../../utils/EventEmitter";
import EnhancementContextmenu from '../../additional-functions/EnhancementContextmenu'

import type { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer'
import type { ModulesAndModdles } from './moduleAndExtensions'

import modelerStore from '@/store/modeler'
export default async function (
  designer: HTMLElement | null,
  modelerModules: ModulesAndModdles,
  context
) {
  const store = modelerStore()

  const options: BaseViewerOptions = {
    container: designer as HTMLElement,
    additionalModules: modelerModules[0] || [],
    moddleExtensions: modelerModules[1] || {},
    ...modelerModules[2]
  }
  if (store.getModeler) {
    // 清除旧 modeler
    store.getModeler.destroy()
    await store.setModeler(undefined)
  }

  const modeler: Modeler = new Modeler(options)

  await store.setModeler(markRaw(modeler))


  EventEmitter.emit('modeler-init', modeler)

  EnhancementContextmenu(modeler)

  modeler.on('commandStack.changed', async (event) => {
    try {
      const { xml } = await modeler.saveXML({ format: true })

      context.$emit('update:xml', xml)
      context.$emit('command-stack-changed', event)
    } catch (error) {
      console.error(error)
    }
  })
  console.log(modeler, 'modeler==')
}
