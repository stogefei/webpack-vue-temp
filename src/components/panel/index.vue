<template>
      <div ref="panelRef" :class="['panel', showPannel ? 'panel-open' : '']">
        <div class="toggle-btn" @click="handleToggle">
          <lucide-icon :name="showPannel ? 'ChevronsRight' : 'ChevronsLeft'" :size="14" />
        </div>
        <div class="panel-header">
            <bpmn-icon :name="bpmnIconName" />
            <p>{{ translateElment(currentElementType || "Process") }}</p>
        </div>
        <el-collapse :value="['base-info']">
          <component  :is="cp" v-for="cp in renderComponents" :key="cp.name" />
        </el-collapse>
      </div>
</template>

<script>
import { markRaw} from 'vue';
import {Collapse} from "element-ui";
// import { Element, Connection, Label, Shape } from 'diagram-js/lib/model/Types';
import debounce from 'lodash.debounce'
import Translate from 'diagram-js/lib/i18n/translate'

import EventEmitter from '@/utils/EventEmitter'
import modelerStore from '@/store/modeler'
import {pinia} from '@/store/index'
import Logger from '@/utils/Logger'
import BpmnIcon from "@/components/common/BpmnIcon.vue";
import getBpmnIconType from '@/bpmn-icons/getIconType'

import LucideIcon from '@/components/common/LucideIcon.vue'
import { isAsynchronous } from '@/bo-utils/asynchronousContinuationsUtil'
import { isExecutable } from '@/bo-utils/executionListenersUtil'
import { isJobExecutable } from '@/bo-utils/jobExecutionUtil'
import { isStartInitializable, isUserAssignmentSupported } from '@/bo-utils/initiatorUtil'
import ElementGenerations from "./components/ElementGenerations.vue";
import bpmnIcons from '@/bpmn-icons'
import { isCanbeConditional } from '@/bo-utils/conditionUtil'
import { translateElment } from '@/additional-modules/Translate'
export default {
    name: 'PropertiesPanel',
    components: {
      BpmnIcon,
      LucideIcon: LucideIcon,
      ElCollapse: Collapse,
    },
    data() {
      return {
        bpmnElementName: "Process",
        bpmnIconName: "Process",
        currentElementType: undefined,
        currentElementId: undefined,
        translateElment,
        renderComponents: [],
        showPannel: true
      };
  },
  computed: {
    iconType () {
      return this.showPannel ? 'ChevronsRight' : 'ChevronsLeft'
    },
    modeler () {
      return modelerStore(pinia)
    }
  },
  created() {
    EventEmitter.on('modeler-init', (modeler) => {
      // 导入完成后默认选中 process 节点
      modeler.on('import.done', () => {
        this.setCurrentElement(null)
      })
      // 监听选择事件，修改当前激活的元素以及表单
      modeler.on('selection.changed', ({ newSelection }) => {
        this.setCurrentElement(newSelection[0] || null)
      })
      modeler.on('element.changed', ({ element }) => {
        // 保证 修改 "默认流转路径" 等类似需要修改多个元素的事件发生的时候，更新表单的元素与原选中元素不一致。
        if (element && element.id === this.currentElementId) {
          this.setCurrentElement(element)
        }
      })

      modeler.on('element.click', (event) => {
        Logger.prettyInfo('Element Click', event)
      })
    })
  },
  mounted() {
    !this.currentElementId && this.setCurrentElement(null)
  },
  methods: {
    setCurrentElement: debounce(function (element) {
      // const modeler = modelerStore(pinia)
      let activatedElement = element
      let activatedElementTypeName = ''

      if (!activatedElement) {
        activatedElement =
          this.modeler.getElRegistry?.find((el) => el.type === 'bpmn:Process') ||
          this.modeler.getElRegistry?.find((el) => el.type === 'bpmn:Collaboration')

        if (!activatedElement) {
          return Logger.prettyError('No Element found!')
        }
      }
      activatedElementTypeName = getBpmnIconType(activatedElement)

      this.modeler.setElement(markRaw(activatedElement))
      this.currentElementId = activatedElement.id
      this.currentElementType = activatedElement.type.split(':')[1]

      this.penalTitle = this.modeler.getModeler?.get('translate')(this.currentElementType)
      this.bpmnIconName = bpmnIcons[activatedElementTypeName]
      this.bpmnElementName = activatedElementTypeName

      this.setCurrentComponents(activatedElement)
      EventEmitter.emit('element-update', activatedElement)

      Logger.prettyPrimary(
        'Selected element changed',
        `ID: ${activatedElement.id} , type: ${activatedElement.type}`
      )
    }, 100),
    setCurrentComponents(element) {
            // 清空
      this.renderComponents.splice(0, this.renderComponents.length)
      this.renderComponents.push(ElementGenerations)
      // renderComponents.push(ElementDocumentations)
      // isCanbeConditional(element) && renderComponents.push(ElementConditional)
      // isJobExecutable(element) && renderComponents.push(ElementJobExecution)
      // renderComponents.push(ElementExtensionProperties)
      // isExecutable(element) && renderComponents.push(ElementExecutionListeners)
      // isAsynchronous(element) && renderComponents.push(ElementAsyncContinuations)
      // isStartInitializable(element) && renderComponents.push(ElementStartInitiator)
      // isUserAssignmentSupported(element) && renderComponents.push(UserAssignment)
    },
    handleToggle () {
      this.showPannel = !this.showPannel;
    }
  }
}
</script>