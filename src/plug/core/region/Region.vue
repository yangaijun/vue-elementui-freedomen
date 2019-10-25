<template>
   <div>
       <template v-for="(column, index) in tempColumns">
            <fd-elements v-if="isPlainObject(column) && isLegal(column)" @event="event" :key="index" :item="column"/>
            <div v-else-if="isRow(column)" :key="index" style="flex-direction: row"> 
                <region :columns='column' :data="data" @event="throwEvent"/>
            </div>
            <div v-else-if="isCol(column)" :key="index"> 
                <region :columns='column' :data="data" @event="throwEvent"/>
            </div>
            <el-form-item v-else-if="isFormItem(column)" :label="column[column.length - 1].label" :key="index">
                <region :columns='column' :data="data" @event="throwEvent"/>
            </el-form-item>
       </template>
   </div>
</template>
<script>
import base from '../../mixins/base.js';
import FdElements from '../../elements/Elements';
import util from '../../utils/util.js';
/**
 * config: {
 *      plain: true 
 *      round: true
 * }
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    name: 'region',
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
        getType(column) {
            //todo
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
                return type === 'row' || type === void 0
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
    },
    mounted() {
    }
    
}
</script> 
