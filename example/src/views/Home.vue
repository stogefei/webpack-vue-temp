<template>
  <div class="demo-home">
    <CloudpivotBpmn />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import CloudpivotBpmn from'../../../dist/index';
import CloudpivotBpmn from'../../../src/index';

@Component({
  components: {
    // CloudpivotBpmn: Bpmn,
    CloudpivotBpmn,
  },
})
export default class Home extends Vue {}
</script>
<style lang="less">
// @import '../../../dist/css/main.css';
@import './home.less';
</style>
