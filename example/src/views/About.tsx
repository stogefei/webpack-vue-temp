import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'About',
  components: {
  }
})
export default class Design extends Vue {
  render () {
    return (
      <div class={'design-box'}>
        <h3>about页面</h3>
      </div>
    )
  }
}
