<template>
    <el-form-item 
        :style="style()" 
        :label="columns[columns.length - 1].label" 
    > 
        <span slot="label">  
            <span v-if="hasRule()" class="el-form-item-must" style="color: #f56c6c">*</span>
            {{columns[columns.length - 1].label}} 
        </span>
        <slot></slot>
    </el-form-item>
</template>
<script>
import util from '../../utils/util.js';
import FdRegion from '../../core/region'
import external from '../../config/external.js'
import base from '../../mixins/base.js';

export default {
    name: 'fdformitem',
    props: ['data', 'columns'],
    mixins: [base],
    components: { 
        FdRegion
    },
    data() {
        return {
            tempColumns: []
        }
    },
    methods: {
        style() {
            let column = this.columns[this.columns.length - 1]
            let type = util.getType(column)

            if (type && type.indexOf('formitem') === 3)
                return [external.defaultStyles[type], this.mixin_style(column.style, column.value, column.$data)]
            else 
                return null
        },
        throwEvent(params) {
            this.$emit('event', params)
        },
        hasRule() { 
            for (let column of this.columns) {
                if (column.rule !== void 0)
                    return true
            }
            return false
        }
    }
}
</script> 
