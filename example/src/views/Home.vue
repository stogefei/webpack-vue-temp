<template>
  <div class="demo-home">
    <CloudpivotBpmn />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import './home.less';
import CloudpivotBpmn from'../../../dist/index';

@Component({
  components: {
    CloudpivotBpmn,
  },
})
export default class Home extends Vue {}
</script>
<style lang="less">
@import '../../../dist/css/main.css';
</style>
