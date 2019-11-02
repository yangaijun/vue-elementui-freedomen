<template>
    <el-form
    inline>
        <fd-region 
            :columns="tempColumns"
            :data="tempData"
            @event="event"
        />
    </el-form>
</template>
<script>
import util from '../../utils/util.js';
import FdRegion from '../../core/region/Region';
import rule from '../../utils/rule.js';
/**
 * config: {
 *      labelPosition: right/left/top 
 *      labelWidth: true,
 *      editable: true/false,
 *      eidtStyle: 'text/disabled'
 * },
 * data, columns=>{label:string, type: string*, prop: string*, eidt: boolean, rule:function/array/string}
 */
export default {
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Object,
            default: function () {
                return {}
            }
        },
        config: Object,
    },
    name: 'FdSearch',
    components: {
        FdRegion
    },
    data() {
        return {
            tempColumns: [],
            tempData: {},
            rules: {}
        }
    },
    methods: {
        resetColumns(columns) {
            let newColumns = []
            columns.forEach(column => {
                if (util.isPlainObject(column)) {
                    let newItem = [column]
                    newItem.push({type: 'form-item', prop: column.prop, label: column.label || column.placeholder})

                    newColumns.push(newItem)
                } else if (Array.isArray(column)) {
                    newColumns.push(column)
                }
            });
            return newColumns;
        },
        colne(columns) {
            return columns
        },
        event(params) { 
            this.$emit('event', params)
        }
    },
    created() {
        let columns = this.colne(this.columns)
        this.tempColumns = this.resetColumns(columns)
        this.tempData = this.data
    }
}
</script> 
