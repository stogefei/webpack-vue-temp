
import { defineComponent, h } from 'vue'
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
   Map } from 'lucide-vue';

export default defineComponent({
  name: 'LucideIcon',
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
    Map
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
      default: 'currentColor'
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    defaultClass: {
      type: String,
      default: 'lucide-icon'
    }
  },
  setup(props) {
    return { 
      name: props.name,  
      iconProps: {
        size: props.size,
        color: props.color,
        defaultClass: props.defaultClass
      }
     }
  },
  render () {
    return h(this.name, { props: {...this.iconProps} })
  }
})