<template>
    <el-badge :value="item.value" :max="item.max" :is-dot="item.isDot">
        <slot></slot>
    </el-badge>
</template>
<script>  
import base from '../../mixins/base.js' 

export default {
    name: 'fdbadge',
    props: ['data', 'columns'],
    mixins: [base], 
    computed: {
        item() {
            return this.columns[this.columns.length - 1]
        }
    } 
}
</script> 
