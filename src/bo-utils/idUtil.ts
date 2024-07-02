import { Element } from 'diagram-js/lib/model/Types'
import modelerStore from '@/store/modeler'
import {pinia} from '@/store/index'
import { isIdValid } from '@/utils/BpmnValidator'

export function getIdValue(element: Element): string {
  return element.businessObject.id
}

export function setIdValue(element: Element, value: string) {
  const errorMsg = isIdValid(element.businessObject, value)

  if (errorMsg && errorMsg.length) {
    return window.__messageBox.warning(errorMsg)
  }

  const store = modelerStore(pinia)
  const modeling = store.getModeling

  modeling.updateProperties(element, {
    id: value
  })
}
