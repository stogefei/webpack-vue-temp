<template>
  <component :is="icon" v-bind="$props" />
</template>

<script>
import {
   AlignStartVertical,
   AlignEndVertical,
   AlignCenterVertical,
   AlignStartHorizontal,
   AlignCenterHorizontal,
   AlignEndHorizontal,
   ZoomOut,
   ZoomIn,
   Undo2,
   Redo2,
   Eraser,
   ChevronsRight,
   ChevronsLeft,
   Map,
   File,
   Download,
   Save,
   Eye,
   Box
   } from 'lucide-vue';
export default {
  name: "LucideIcon",
  components: {
    AlignStartVertical,
    AlignEndVertical,
    AlignCenterVertical,
    AlignStartHorizontal,
    AlignCenterHorizontal,
    AlignEndHorizontal,ZoomOut,
    ZoomIn,
    Undo2,
    Redo2,
    Eraser,
    // eslint-disable-next-line vue/no-reserved-component-names
    Map,
    ChevronsRight,
    ChevronsLeft,
    File,
    Download,
    Save,
    Eye,
    Box
  },
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 12
    },
    color: {
      type: String,
      default: "currentColor"
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    defaultClass: {
      type: String,
      default: "lucide-icon"
    }
  },
  computed: {
    icon() {
      return this.name;
    }
  }
};
</script>
