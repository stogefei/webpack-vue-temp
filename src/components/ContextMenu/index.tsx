
import { reactive, nextTick, ref, defineComponent} from 'vue'
import { Popover, Button } from 'element-ui'
import EventEmitter from '@/utils/EventEmitter'
import { Element } from 'diagram-js/lib/model/Types'
import { customTranslate } from '@/additional-modules/Translate'
import BpmnReplaceOptions from '@/utils/BpmnReplaceOptions'
import { isAppendAction } from '@/utils/BpmnDesignerUtils';
import contextMenuActions from './contextMenuActions';
const ContextMenu = defineComponent({
  name: 'Aligns',
  components: {
    ElButton: Button,
    ElPopover: Popover,
  },
  setup() {
    const translateCh = customTranslate
    const showPopover = ref(true)
    const x = ref(0)
    const y = ref(0)
    const currentReplaceOptions = ref<any[]>([])
    let mouseEvent: MouseEvent | null = null
    let currentElement: Element | null = null
    const isAppend = ref<boolean>(false)
    const popperRef = ref<HTMLElement>(null)
    const contextMenuTitle = ref<string>('创建元素')

    const { appendAction, replaceAction } = contextMenuActions()

    const triggerAction = (entry, event) => {
      try {
        isAppend.value
          ? appendAction(entry.target, event)
          : replaceAction(entry.target, currentElement)
        showPopover.value = false
      } catch (e) {
        console.error(e)
      }
    }

    const initEventCallback = async(event: MouseEvent, element?: Element) => {
      x.value = event.clientX
      y.value = event.clientY

      mouseEvent = event
      currentElement = element || null
      isAppend.value = isAppendAction(element)
      currentReplaceOptions.value = BpmnReplaceOptions(element)
      contextMenuTitle.value = isAppend.value ? '创建元素' : '更改元素'
      await nextTick(() => {
        console.log('update')
        // dcPopover.value.showPopper = true
        // dcPopover.value.updatePopper()
        // dcPopover.value.doShow()
      });
      showPopover.value = true;
    }

    const closePopover = () => {
      showPopover.value = false
    };

    return {
      x,
      y,
      popperRef,
      showPopover,
      contextMenuTitle,
      initEventCallback,
      closePopover,
      triggerAction,
      currentReplaceOptions,
      translateCh,
    }
  },
  created() {
    console.log('created');
    EventEmitter.on("show-contextmenu", this.initEventCallback);
    document.body.addEventListener("click", this.closePopover);
  },
  beforeDestroy() {
    EventEmitter.removeListener('show-contextmenu', this.initEventCallback)
    document.body.removeEventListener('click', this.closePopover)
  },
  render () {
    console.log(this.showPopover, 'this.showPopover');
    const tag = this.showPopover
    ? <div class="bpmn-context-menu" ref="popperRef">
      <div class="context-menu_header">{ this.contextMenuTitle }</div>
      <div class="context-menu_body">
        {
          this.currentReplaceOptions.map(item => {
              return (
                <div class="context-menu_item">
                <i class={`context-menu_item_icon ${item.className}`}></i>
                <span onClick={($event) => this.triggerAction(item, $event)}>{this.translateCh(item.label) }</span>
              </div>
              )
          })
        }
      </div>
   </div> : null
    return (
      tag
    )
  }
})

export default ContextMenu;
