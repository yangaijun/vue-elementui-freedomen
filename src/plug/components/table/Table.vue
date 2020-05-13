<template>
    <div class="fd_table">
        <el-table  
            @selection-change='selectionChange' 
            :data="data" 
            :stripe="config && config.stripe"
            :show-header="config && config.showHeader"
            :row-style='config && config.rowStyle' 
            :row-class-name="config && config.rowClassName"
            :height="config && config.height"
            :max-height="config && config.maxHeight"
            :border="(config && config.border === false) ? false : true">

            <el-table-column v-if="config && config.selection" type="selection" width="55" />
            <el-table-column v-if="config && config.index" type="index" width="65" :label="config && config.indexLabel" />
            <template v-for="(column, index) in columns" >
                <el-table-column 
                    type="expand"
                    :key="index"
                    v-if="Authorized(column) && column.type && column.type === '$expand'" >
                    <template slot-scope="scope">
                        <region 
                            :data="scope.row" 
                            @event="(params) => { 
                                event(params, scope.$index) 
                            }"  
                            :columns="[
                                {type: 'render', render: ({createElement, store}) => {
                                    return column.render({value: scope.row[column.prop], createElement, data: scope.row, store})
                                }}
                            ]"/>
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
                            @event="(params) => {
                                event(params, scope.$index)
                            }"
                            :columns="column.render 
                                ? [{type: 'render', render: ({createElement, store}) => {
                                        return column.render({value: scope.row[column.prop], createElement, data: scope.row, store})
                                }}] 
                                : [{type: 'span', ...column}]"
                            />
                    </template>
                </el-table-column>
            </template> 
        </el-table>
        <div v-if="page" style="text-align:right; margin-top: 8px;" class="fd_table_page">
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page.pageNo"
                :page-sizes="config && config.pageSizes || [10, 20, 50, 100]"
                :page-size="page.pageSize || 10"
                :layout="config && config.layout || 'total, sizes, prev, pager, next, jumper'"
                :total="page.total || 0">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import Region from '../../core/region/Region';
import external from '../../config/external.js'
export default {
    props: {
        data: Array,
        columns: Array,
        config: Object,
        page: Object
    },
    name: 'FdTable',
    components: { Region },
    data() {
        return {}
    },
    methods: {
        Authorized (column) {
            return  external.Authorized({column: column})
        },
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
        event(params, index) { 
            if (index !== void 0) 
                params.$index = index
            this.$emit('event', params)
        }
    }
}
</script>

