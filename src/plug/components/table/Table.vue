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
            <fd-table-column :columns="columns" :config="tempConfig" @event='event'></fd-table-column> 
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
import FdTableColumn from './TableColumn'
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
    components: { FdTableColumn }, 
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
        event(params) {  
            this.$emit('event', params)
        }
    },
    created() {
        let config = this.mergeConfig('table', this.config) 
        if (config) {
            this.tempConfig = config
            console.log(this.tempConfig)
        }
    }
}
</script>

