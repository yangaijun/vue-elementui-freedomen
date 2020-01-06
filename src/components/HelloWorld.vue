<template>
  <div>
      <el-input v-for="(item, key) in item.value" :key="key" v-model="item.v"  style="width: 120px;"></el-input>
      <el-button type="primary" @click="item.value.push({v: ''})">添加一条</el-button>
      <el-button type="danger" @click="item.value.pop()">刪除一條</el-button>
  </div>
</template>
<script>
import base from '../plug/mixins/base.js'
export default {
  name: 'fdhello',
  props: ['item'],
  mixins: [base],
  data () {
    return { }
  },
  methods: {
    
  },
  created() { },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
