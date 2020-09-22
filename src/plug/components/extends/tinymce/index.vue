<template>
    <tinymce 
      v-model="theValue"  
      ref="tinymce"
      :height="item.config && item.config.height"
      :toolbar="item.config && item.config.toolbar"
      :plugins="item.config && item.config.plugins"
      :language="item.config && item.config.language"
      :menubar="item.config && item.config.menubar"
      :width="item.config && item.config.width"
      :codeDialogHeight="item.config && item.config.codeDialogHeight"
      :codeDialogWidth="item.config && item.config.codeDialogWidth"
      :uploadImageConfig="item.config && item.config.uploadImageConfig"
    />
</template>
<script>
import Tinymce from './Tinymce' 
import base from '../../../mixins/base.js'
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
