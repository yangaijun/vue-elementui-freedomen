<template>
    <el-row 
        :class="column.class" 
        :gutter="column.gutter"
        :type="column.rowType"
        :justify="column.justify"
        :align="column.align"
        :tag="column.tag"> 
        <slot></slot> 
    </el-row>
</template>
<script>
import external from '../../config/external.js'
import base from '../../mixins/base.js';
import util from '../../utils/util.js' 
export default {
    name: 'fdrow',
    props: ['data', 'columns'],
    mixins: [base],
    data() {
        return {
            column: {}
        }
    }, 
    created() {
        let column = this.columns[this.columns.length - 1]
        let type = util.getType(column) 
        if (type && type.indexOf('fd-row') === 0)
            this.column = column
    } 
}
</script> 
