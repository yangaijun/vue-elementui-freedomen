
<template>   
    <div>
        <template v-for="(column, index) in columns">
            <el-table-column
                :key="index"
                v-if="column.children"
                :label="column.label">
                <fd-table-column 
                    :columns="column.children"
                    :config="config"
                    @event="event">
                </fd-table-column>
            </el-table-column> 
            <el-table-column 
                type="expand"
                :key="index"
                v-else-if="Authorized(column) && column.type && column.type === '$expand'">
                <template slot-scope="scope">
                    <region 
                        :data="scope.row" 
                        @event="(params) => {  event(params, scope.$index) }"  
                        :columns="[{type: 'render', render: ({createElement, store}) => column.render({value: scope.row[column.prop], createElement, data: scope.row, store})}]"/>
                </template>
            </el-table-column>
            <el-table-column 
                :key="index"
                :sortable='column.sortable' 
                :show-overflow-tooltip='(config && config.showTip === false) ? false : true' 
                :prop="column.prop" 
                :label="column.label"  
                v-else-if="Authorized(column)" 
                :fixed="column.fixed"
                :width="column.width"> 
                <template slot-scope="scope">
                    <region 
                        :data="scope.row"
                        @event="(params) => { event(params, scope.$index) }"
                        :columns="column.render 
                            ? [{type: 'render', render: ({createElement, store}) =>  column.render({value: scope.row[column.prop], createElement, data: scope.row, store})}] 
                            : [{type: 'span', ...column}]"
                        />
                </template>
            </el-table-column>
        </template>    
    </div>
</template>
<script>
import Region from '../../core/region/Region'
import external from '../../config/external.js' 
export default {
    name: 'FdTableColumn',
    props: ['columns', 'config'],
    components: { Region },  
    methods: {
        Authorized (column) {
            return  external.Authorized({column: column})
        }, 
        event(params, index) { 
            if (index !== void 0) 
                params.$index = index
            this.$emit('event', params)
        } 
    },
    created() {
        if (this.columns.length) {
            let last = this.columns.pop()
            this.columns.unshift(last)
        }
    }
}
</script>
