<template>
    <tinymce 
      v-model="theValue" 
      :height="item.config && item.config.height || 300" 
      ref="tinymce"
    />
</template>
<script>
import Tinymce from './tinymce'
// import base from 'vue-elementui-freedomen/mixins/base.js'
import base from '@/plug/mixins/base.js'
export default {
  name: 'fdtinymce',
  props: ['item'],
  mixins: [base],
  components: { Tinymce },
  data() {
    return { 
      theValue: ''
    }
  },
  watch: {
    'item.value'(nd) { 
      if (nd !== this.theValue) {
        this.$refs.tinymce.setValue(nd) 
        this.theValue = nd 
      }
    },
    'theValue': 'change'
  },
  methods: {
    change() {   
      this.mixin_event({
        type: 'change',
        prop: this.item.prop,
        value: this.theValue
      })
    }
  },
  created() {
    if (this.item.value === void 0) {
      this.$set(this.item, 'value', '')
    }
    this.theValue = this.item.value
    this.item.$data[this.item.prop] = this.item.value
    this.mixin_config('tinymce') 
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

