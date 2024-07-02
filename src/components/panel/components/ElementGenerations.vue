<template>
  <el-collapse-item name="base-info">
    <template slot="title">
      <lucide-icon name="Box" :size="16" />
      基础信息
    </template>

    <edit-item :label="labelCode">
      <el-input v-model="elementId" size="small" maxlength="64" @change="updateElementId" />
    </edit-item>

    <edit-item :label="labelName">
      <el-input v-model="elementName" size="small" maxlength="64" @change="updateElementName" />
    </edit-item>

    <template v-if="isProcess">
      <edit-item key="version" label="Version">
        <el-input v-model="elementVersion" size="small" maxlength="20" @change="updateElementVersion" />
      </edit-item>

      <edit-item key="executable" label="Executable">
        <el-switch v-model="elementExecutable" @change="updateElementExecutable" />
      </edit-item>
    </template>
  </el-collapse-item>
</template>

<script>
import {CollapseItem, Input, Switch} from "element-ui";
import EditItem from "@/components/common/EditItem.vue";
import LucideIcon from '@/components/common/LucideIcon.vue'
import { catchError } from "@/utils/printCatch";
import { getNameValue, setNameValue } from "@/bo-utils/nameUtil";
import {
  getProcessExecutable,
  getProcessVersionTag,
  setProcessExecutable,
  setProcessVersionTag
} from "@/bo-utils/processUtil";
import { setIdValue } from "@/bo-utils/idUtil";
import EventEmitter from "@/utils/EventEmitter";
import modelerStore from '@/store/modeler';
import { mapState } from 'pinia';

export default {
  name: "ElementGenerations",
  components: {
      LucideIcon,
      EditItem,
      ElCollapseItem: CollapseItem,
      ElInput: Input,
      ElSwitch: Switch,
    },
  data() {
    return {
      elementId: "",
      elementName: "",
      elementVersion: "",
      elementExecutable: true,
      isProcess: false,
      getActiveNode: null,
      getActiveNodeId: null,
    };
  },
  computed: {
      ...mapState(modelerStore, ['getActive', 'getActiveId']),

      labelName () {
        return this.isProcess ? '流程名称' : '节点名称'
      },
      labelCode () {
        return this.isProcess ? '流程编码' : '节点编码'
      },
    },
  mounted() {
    this.reloadGenerationData();
    EventEmitter.on("element-update", this.reloadGenerationData);
  },
  methods: {
    reloadGenerationData(activatedElement) {
      this.getActiveNode = activatedElement || this.getActive;
      this.getActiveNodeId = activatedElement?.id;
      this.isProcess = !!this.getActiveNode && this.getActiveNode.type === "bpmn:Process";
      this.elementId = this.getActiveNodeId || this.getActiveId;
      this.elementName = getNameValue(this.getActiveNode) || "";
      if (this.isProcess) {
        this.elementExecutable = getProcessExecutable(this.getActiveNode);
        this.elementVersion = getProcessVersionTag(this.getActiveNode) || "";
      }
    },
    updateElementName(value) {
      setNameValue(this.getActiveNode, value);
    },
    updateElementId(value) {
      setIdValue(this.getActiveNode, value);
    },
    updateElementVersion(value) {
      const reg = /((\d|([1-9](\d*))).){2}(\d|([1-9](\d*)))/;
      if (reg.test(value)) {
        setProcessVersionTag(this.getActiveNode, value);
      } else {
        catchError("版本号必须符合语义化版本2.0.0 要点");
      }
    },
    updateElementExecutable(value) {
      setProcessExecutable(this.getActiveNode, value);
    }
  }
};
</script>
