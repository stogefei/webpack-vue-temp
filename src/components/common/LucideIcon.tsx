
import { computed, defineComponent, h } from 'vue'
import * as icons from 'lucide-vue'

export default defineComponent({
  name: 'LucideIcon',
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
    const icon:any = computed(() => {
      return icons[props.name];
    })
    return { 
      icon, 
      size: props.size,
      color: props.color,
      defaultClass: props.defaultClass
     }
  },
  render () {
    return h(this.icon, { props: {size: this.size, color: this.color, defaultClass: this.defaultClass} })
  }
})