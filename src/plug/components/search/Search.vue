<template>
    <el-form inline class="fd_search">
        <fd-region 
            :columns="tempColumns"
            :data="tempData"
            @event="event"
        />
    </el-form>
</template>
<script>
import util from '../../utils/util.js'
import FdRegion from '../../core/region/Region'
import rule from '../../utils/rule.js'
import { search } from '../../action'

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
                    newItem.push({type: 'formitem', inline: true, prop: column.prop, label: column.label})

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
        reset() {
            let newObj = {} 
            for (let key in this.firstData) {
                newObj[key] = this.firstData[key]
            }
            this.tempData = newObj
        },
        event(params) {  
            if (params.prop == '$reset') {
                this.reset()
                params.row = util.clone(this.tempData)
            }  
            this.$emit('event', params)
        }
    },
    mounted() {
        this.firstData = util.clone(this.data)  
    },
    created() {
        let columns = this.colne(this.columns)
        this.tempColumns = this.resetColumns(columns)
        this.tempData = this.data 
        this.actionKey = util.getUUID()
        search.setAction(this.actionKey, this.event, this.data)
    },
    destroyed () {
        search.delAction(this.actionKey)
    }
}
</script> 
