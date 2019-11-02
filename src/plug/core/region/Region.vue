<template>
   <div>
    <template v-for="(column, index) in tempColumns">
        <fd-elements 
            v-if="isPlainObject(column) && isLegal(column) && Authorized(column)" 
            @event="event" 
            :key="index" 
            :item="column"
        />
        <div 
            v-else-if="isRow(column) && Authorized(column)" 
            :style="[
                defalutStyles[column[column.length - 1].type], 
                mixin_style(column[column.length - 1].style, column[column.length - 1].value, column[column.length - 1].data), 
                {'flex-direction': 'row'}]" 
            :key="index" 
        > 
            <fd-region :columns='column' :data="data" @event="throwEvent"/>
        </div>
        <div 
            v-else-if="isCol(column) && Authorized(column)" 
            :style="[
                defalutStyles[column[column.length - 1].type], 
                mixin_style(column[column.length - 1].style, column[column.length - 1].value, column[column.length - 1].data)]"
            :key="index"
        > 
            <fd-region :columns='column' :data="data" @event="throwEvent"/>
        </div>
        <el-form-item 
            v-else-if="isFormItem(column) && Authorized(column[column.length - 1])" 
            :label="column[column.length - 1].label" 
            :style="mixin_style(column[column.length - 1].style, column[column.length - 1].value, column[column.length - 1].data)"
            :key="index"
        >
            <fd-region :columns='column' :data="data" @event="throwEvent"/>
        </el-form-item>
    </template>
   </div>
</template>
<script>
import base from '../../mixins/base.js';
import FdElements from '../../elements/Elements';
import util from '../../utils/util.js';
import external from '../../config/external.js'

export default {
    name: 'FdRegion',
    props: {
        columns: {
            required: true,
            type: Array
        },
        data: {
            type: Object, 
        }
    },
    components: { 
        FdElements
    },
    mixins: [base],
    watch: {
        data: {
            handler(nd, od) {
                if (od) {
                    this.resetColumns(this.columns, nd)
                }
            },
            deep: true
        }
    },
    data() {
        return {
            tempColumns: []
        }
    },
    methods: {
        Authorized (column) {
            return  external.Authorized({column: column})
        },
        getType(column) {
            return column.type
        },
        clone(columns) {
            //some to do 
            return columns
        },
        isPlainObject(column) {
            return util.isPlainObject(column)
        },
        isRow(column) {
            if (Array.isArray(column)) {
                let type = this.getType(column[column.length - 1])
                return type === 'row'
            }
            return false
        },
        isCol(column) {
            if (Array.isArray(column)) {
                let type = this.getType(column[column.length - 1])
                return type === 'col' || type === void 0
            }
            return false
        },
        isFormItem(column) {
            if (Array.isArray(column)) {
                let type = this.getType(column[column.length - 1])
                return type === 'form-item' || type === void 0
            }
            return false
        },
        isLegal(column) {
            return !['col', 'row', undefined, 'form-item'].includes(column.type)
        },
        setColumn(column, data) {
            if (column.value === void 0) 
                this.$set(column, 'value', (data[column.prop] === void 0 || data[column.prop] === null) ? column.value : data[column.prop])
            else
                column.value = (data[column.prop] === void 0 || data[column.prop] === null) ? column.value : data[column.prop]

            column.$data = data
        },
        resetColumns(columns = [], data = {}) {
            for (let i = 0; i < columns.length; i ++) { 
                if (Array.isArray(columns[i])) {
                    this.resetColumns(columns[i], data)
                } else { 
                    this.setColumn(columns[i], data) 
                } 
            } 
            return columns
        },
        throwEvent(params) {
            this.$emit('event', params)
        },
        event(params) {
            if (params && params.type == 'change') {
                if (params.prop) {
                    this.data[params.prop] = params.value
                }
            }
            this.$emit('event', {...params, row: this.data})
        }
    },
    created() {
        var columns = this.clone(this.columns)
        this.tempColumns = this.resetColumns(columns, this.data)
        this.defalutStyles = external.defaultStyles
    }
}
</script> 
