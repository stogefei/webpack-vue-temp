import { ModdleElement } from 'bpmn-moddle/dist'
import editor from '@/store/editor'
import modeler from '@/store/modeler'
import {pinia} from '@/store/index'

export function createScript(props: ScriptForm): ModdleElement {
  const prefix = editor(pinia).getProcessEngine
  const moddle = modeler(pinia).getModdle
  const { scriptFormat, value, resource } = props

  return moddle!.create(`${prefix}:Script`, { scriptFormat, value, resource })
}

export function getScriptType(script: ModdleElement & BpmnScript): string {
  if (script.get('resource')) {
    return 'External Resource'
  }
  if (script.get('value')) {
    return 'Inline Script'
  }
  return 'none'
}
