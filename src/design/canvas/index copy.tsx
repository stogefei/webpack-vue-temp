import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import { debounce } from 'min-dash';
import './styles/index.less';
import '../../styles/tailwind.css';
import { createNewDiagram } from "../../utils/index";
import moduleAndExtensions from "./moduleAndExtensions";
import { catchError } from "../../utils/printCatch";
import initModeler from "./initModeler";
import {defaultSettings} from'../../config/index';
const prefixCls: string = 'cloudpivot-bpmn-canvas';

@Component({
  name: prefixCls,
  components: {
  }
})
export default class Design extends Vue {
  @Prop({ default: () => '' }) xml: string;

  @Prop( { default: () => [] }) events: any[];

  debounceReload = null;

  getEditor = {
    bg: 'grid'
  };

  get bgClass() {
    const bg = this.getEditor.bg;
    if (bg === "grid-image") return "designer-with-bg";
    if (bg === "image") return "designer-with-image";
    return "";
  }

  @Watch('getEditor', { immediate: true,  deep: true, })
  async watchGetEditor (value, oldValue) {
    try {
      // console.log(this.debounceReload, 'this.debounceReload');
      // this.reloadProcess(value, oldValue);
    } catch (e) {
      catchError(e);
    }
  }

  async reloadProcess (setting, oldSetting) {
    const view:any = this.$refs.designerRef;
    const modelerModules = moduleAndExtensions(defaultSettings);
    // console.log(view, 'view==')
    await this.$nextTick();
    const modeler = initModeler(view, modelerModules, this);
    // await createNewDiagram(this.xml, defaultSettings);
    // if (!oldSetting || setting.processEngine !== oldSetting.processEngine) {
    //   await createNewDiagram(modeler);
    // } else {
    //   await createNewDiagram(modeler, this.xml, setting);
    // }
  }

  created() {
    // this.debounceReload = debounce(this.reloadProcess, 100);
    this.$nextTick(() => {
      this.reloadProcess(this.getEditor, undefined)
    })
  }

  mounted () {

  }

  render (h) {
    return (
      <div class="designer" ref="designerRef" id="designerRef"></div>
    )
  }
}

