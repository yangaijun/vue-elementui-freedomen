<template>
    <region 
        :columns="tempColumns"
        :data="tempData"
        @event="event"
    />
</template>
<script>
import util from '../../utils/util.js';
import Region from '../../core/region/Region';
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
    components: {
        Region
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
            let newColumns = [...columns]
            const marginLeft = '8px'
            newColumns.forEach(column => {
                if (typeof column.style === 'function');

                else if (column.style !== void 0) {
                    if (util.isPlainObject(column.style) && column.style.maginLeft === void 0) {
                        column.style.maginLeft = marginLeft
                    } else if (typeof column.style === 'string' && column.style.indexOf('marginLeft') === -1) {
                        column.style += `;marginLeft: ${marginLeft};`
                    }
                } else {
                    column.style = `marginLeft: ${marginLeft};`
                }
                

            })
            console.log(newColumns)
            newColumns.push({
                type: 'row'
            })
            return newColumns
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
