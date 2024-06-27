import { defineComponent} from 'vue';
const About = defineComponent({
  setup(props, { emit }) {
    return () => <div class="about">about</div>
  },
})

export default About
