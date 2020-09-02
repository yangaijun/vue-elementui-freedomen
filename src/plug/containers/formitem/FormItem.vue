<template>
    <el-col  
        v-if="!column.inline"
        :span="column.span"
        :offset="column.offset"
        :push="column.push"
        :pull="column.pull"
        :xs="column.xs"
        :sm="column.sm"
        :md="column.md"
        :lg="column.lg"
        :xl="column.xl"
        :tag="column.tag"
        >
        <el-form-item :style="style()" :class="errorClass()"> 
            <span slot="label">  
                <span v-if="hasRule()" class="el-form-item-must" style="color: #f56c6c">*</span>
                <fd-region 
                    v-if="Array.isArray(columns[columns.length - 1].label)"
                    :columns="columns[columns.length - 1].label"
                />
                <span v-else>
                    {{columns[columns.length - 1].label}} 
                </span>
            </span>
            <slot></slot>
        </el-form-item>
    </el-col>
    <el-form-item :style="style()" v-else :class="errorClass()"> 
        <span slot="label">  
            <span v-if="hasRule()" class="el-form-item-must" style="color: #f56c6c">*</span>
            <fd-region 
                v-if="Array.isArray(columns[columns.length - 1].label)"
                :columns="columns[columns.length - 1].label"
            />
            <span v-else>
                {{columns[columns.length - 1].label}} 
            </span>
        </span>
        <slot></slot>
    </el-form-item>
</template>
<script>
import util from '../../utils/util.js'; 
import external from '../../config/external.js'
import base from '../../mixins/base.js';

export default {
    name: 'fdformitem',
    props: ['data', 'columns'],
    mixins: [base], 
    data() {
        return {
            tempColumns: [],
            column: {}
        }
    },   
    methods: { 
        style() { 
            let type = util.getType(this.column)
            let column = this.column
            if (type && type.indexOf('fd-formitem') === 0)
                return [external.defaultStyles[type], this.mixin_style(column.style, column.value, column.$data)]
            else 
                return null
        },
        throwEvent(params) {
            this.$emit('event', params)
        },
        errorClass() { 
            if (this.hasRule() && this.columns.length > 2) { 
                let errorlabels = this.columns[this.columns.length - 2]
                if (errorlabels.class == 'el-form-item__error' && errorlabels.filter()) {
                    return 'el-form-item is-error'
                }
                
            }
        },
        hasRule() { 
            for (let column of this.columns) {
                if (column.rule !== void 0) {
                    if (
                        (typeof column.rule === 'string' || Array.isArray(column.rule))
                        && column.rule.includes('empty')
                    ) {
                        return false
                    } else {
                        return true
                    }
                }
            }
            return false
        } 
    },
    created() {
        this.column = this.columns[this.columns.length - 1] 
    }
}
</script> 
