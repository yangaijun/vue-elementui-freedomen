<template>
    <div class="fd_table">
        <el-table  
            @selection-change='selectionChange' 
            :data="data" 
            :stripe="(tempConfig && tempConfig.stripe === false) ? false : true"
            :show-header="tempConfig && tempConfig.showHeader"
            :row-style='tempConfig && tempConfig.rowStyle' 
            :row-class-name="tempConfig && tempConfig.rowClassName"
            :height="tempConfig && tempConfig.height"
            :max-height="tempConfig && tempConfig.maxHeight"
            :border="(tempConfig && tempConfig.border === false) ? false : true"> 
            <el-table-column v-if="tempConfig && tempConfig.selection" type="selection" width="55" />
            <el-table-column v-if="tempConfig && tempConfig.index" type="index" width="65" :label="tempConfig && tempConfig.indexLabel" />
            <template v-for="(column, index) in columns"> 
                <el-table-column 
                    type="expand"
                    :key="index"
                    v-if="Authorized(column) && column.type && column.type === '$expand'">
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
                    :show-overflow-tooltip='(tempConfig && tempConfig.showTip === false) ? false : true' 
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
        </el-table>
        <div v-if="page && page.total" style="text-align:right; margin-top: 8px;" class="fd_table_page">
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page.pageNo"
                :page-sizes="tempConfig && tempConfig.pageSizes || [10, 20, 50, 100]"
                :page-size="page.pageSize || 10"
                :layout="tempConfig && tempConfig.layout || 'total, sizes, prev, pager, next, jumper'"
                :total="page.total || 0">
            </el-pagination>
        </div>
    </div>
</template>
<script>  
import Region from '../../core/region/Region'
import external from '../../config/external.js' 
import util from '../../utils/util'
import merge from '../../mixins/merge'
export default {
    name: 'FdTable',
    props: {
        data: Array,
        columns: Array,
        config: Object,
        page: Object
    },
    mixins: [merge], 
    components: {Region},
    data() {
        return {
            tempConfig: {}
        }
    },
    methods: { 
        sizeChange(pageSize) {
            this.event({
                type: 'change',
                prop: '$pageSize',
                value: pageSize
            })
        },
        selectionChange(rows) {
            this.event({
                prop: '$selection',
                type: 'click', 
                row: rows
            })
        },
        currentChange(pageNo) {
            this.event({
                type: 'change',
                prop: '$pageNo',
                value: pageNo
            })
        },
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
        let config = this.mergeConfig('table', this.config) 
        if (config) {
            this.tempConfig = config 
        }
    }
}
</script>

