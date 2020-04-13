<template>
    <el-col 
        :class="column.class" 
        :span="column.span"
        :offset="column.offset"
        :push="column.push"
        :pull="column.pull"
        :xs="column.xs"
        :sm="column.sm"
        :md="column.md"
        :lg="column.lg"
        :xl="column.xl"
        :tag="column.tag"> 
        <slot></slot> 
    </el-col>
</template>
<script> 
import external from '../../config/external.js'
import base from '../../mixins/base.js';
import util from '../../utils/util.js'

export default {
    name: 'fdcol',
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
        if (type && type.indexOf('fd-col') === 0)
            this.column = column
    } 
}
</script> 
