import BpmnReplace from 'bpmn-js/lib/features/replace/BpmnReplace'
import ElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory'
import Create from 'diagram-js/lib/features/create/Create'
import modeler from '@/store/modeler'
import {pinia} from '@/store/index'

export default function () {
  const modelerStore:any = modeler(pinia)
  let replaceElement
  let elementFactory
  let create

  function replaceAction(target, currentElement) {
    if (!replaceElement) {
      // @ts-ignore
      replaceElement = modelerStore.getModeler!.get<BpmnReplace>('bpmnReplace').replaceElement
    }
    replaceElement(currentElement, target)
  }

  function appendAction(target, event) {
    if (!elementFactory) {
         // @ts-ignore
      elementFactory = modelerStore.getModeler!.get<ElementFactory>('elementFactory')
    }
    if (!create) {
         // @ts-ignore
      create = modelerStore.getModeler!.get<Create>('create')
    }
    const shape = elementFactory.createShape(target)
    if (target.isExpanded != null) {
      shape.businessObject.di.isExpanded = target.isExpanded
    }
    setTimeout(() => create.start(event, shape), 30)
  }

  return {
    replaceAction,
    appendAction
  }
}
