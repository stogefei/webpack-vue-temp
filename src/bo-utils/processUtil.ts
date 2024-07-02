import { Element } from 'diagram-js/lib/model/Types'
import modelerStore from '@/store/modeler'
import editorStore from '@/store/editor'
import {pinia} from '@/store/index'
export function getProcessExecutable(element: Element): boolean {
  return !!element.businessObject.isExecutable
}

export function setProcessExecutable(element: Element, value: boolean) {
  const store = modelerStore(pinia)
  const modeling = store.getModeling

  modeling.updateProperties(element, {
    isExecutable: value
  })
}

export function getProcessVersionTag(element: Element): string | undefined {
  const editor = editorStore(pinia)
  const prefix = editor.getProcessEngine

  return element.businessObject.get(`${prefix}:versionTag`)
}

export function setProcessVersionTag(element: Element, value: string) {
  const store = modelerStore(pinia)
  const editor = editorStore(pinia)

  const modeling = store.getModeling
  const prefix = editor.getProcessEngine

  modeling.updateProperties(element, {
    [`${prefix}:versionTag`]: value
  })
}
