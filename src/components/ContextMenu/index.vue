<template>
    <el-popover
       v-model="showPopover"
       trigger="manual"
       :visibleArrow="false"
       placement="right-start"
       popperClass="menue-popover"
       :appendToBody="true"
      :popperOptions="{
          boundariesElement: 'viewport',
          removeOnDestroy: true
      }"
      :style="currentPosition"
        >
        <div class="bpmn-context-menu">
            <div class="context-menu_header">{{ contextMenuTitle }}</div>
                <div class="context-menu_body">
                <div v-for="item in currentReplaceOptions"
                    :key="item.actionName"
                    class="context-menu_item"
                    @click="triggerAction(item, $event)"
                >
                    <i :class="`context-menu_item_icon ${item.className}`"></i>
                    <span>{{ translateCh(item.label) }}</span>
                </div>
            </div>
        </div>
        <span slot="reference"></span>
   </el-popover>
</template>
<script lang="javascript">
import { Popover, Tooltip } from 'element-ui'
import EventEmitter from '@/utils/EventEmitter'
// import { Element } from 'diagram-js/lib/model/Types'
import { customTranslate } from '@/additional-modules/Translate'
import BpmnReplaceOptions from '@/utils/BpmnReplaceOptions'
import { isAppendAction } from '@/utils/BpmnDesignerUtils';
import contextMenuActions from './contextMenuActions';
import { createPopper } from '@popperjs/core'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
export default {
  name: "ContextMenu",
  components: {
    ElPopover: Popover
  },
  data() {
    return {
      currentReplaceOptions: [],
      contextMenuTitle: "",
      showPopover: false,
      isAppend: false,
      position: { x: 0, y: 0 },
      currentPosition: {}
    };
  },
  created() {
    EventEmitter.on("show-contextmenu", this.initEventCallback);
    document.body.addEventListener("click", this.closePopover);
  },
  beforeDestroy() {
    EventEmitter.removeListener("show-contextmenu", this.initEventCallback);
    document.body.removeEventListener("click", this.closePopover);
  },
  methods: {
    translateCh(text) {
      return customTranslate(text);
    },

    triggerAction(entry, event) {
      try {
        const { appendAction, replaceAction } = contextMenuActions();
        this.isAppend ? appendAction(entry.target, event) : replaceAction(entry.target, this._currentElement);
        this.showPopover = false;
      } catch (e) {
        console.error(e);
      }
    },

    closePopover() {
      this.showPopover = false;
    },

    async initEventCallback(event, element) {
      console.log(event, this.$el.clientWidth);
      this.x = event.clientX
      this.y = event.clientY
      this._currentElement = element || null;
      this.isAppend = isAppendAction(element);
      this.currentReplaceOptions = BpmnReplaceOptions(element);
      this.contextMenuTitle = this.isAppend ? "创建元素" : "更改元素";
      this.currentPosition = await this.resetPosition(event);
      this.showPopover = true;
    },

    async resetPosition(event) {
      if (!this.$el) {
        await this.$nextTick();
        await this.resetPosition();
      }
      // 页面内容区尺寸
      const { clientWidth: pageWidth, clientHeight: pageHeight } = document.body;
      // 组件大小
      const { clientWidth: modelWidth, clientHeight: modelHeight } = this.$el;
      // 默认不靠边，边距 20 px
      const padding = 20;
      // 鼠标点击位置
      const { clientX, clientY } = event;

      // 组件位置计算
      let left = clientX,
        top = clientY;
      if (modelWidth + padding + clientX >= pageWidth) {
        left = clientX - modelWidth;
      }
      if (modelHeight + padding + clientY >= pageHeight) {
        top = clientY - modelHeight;
      }
      return { left: (left += "px"), top: (top += "px") };
    }
  }
};
</script>
