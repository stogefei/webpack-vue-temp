import { Component, Vue } from 'vue-property-decorator';
import './index.less';
import './index.css';
import img from './imgs/mysql.png';
// const img = require('./imgs/mysql.png');
const prefixCls: string = 'cloudpivot-bpmn';
@Component({
  name: prefixCls,
})
export default class Design extends Vue {
  static install: (Vue: any) => void;
  test () {
    console.log('test===')
  }

  test2 () {
    console.log('test2===')
  }
   
  mounted () {
    this.test()
    this.test2()
  }

  render () {
    return (
      <div class={prefixCls}>
        <h1>test组件111</h1>
        <img style={{width: '20px', height: '30px'}} src={img} alt="" />
        <p class={'test-p'}>test-p</p>
      </div>
    )
  }
}