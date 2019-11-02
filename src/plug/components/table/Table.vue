<template>
    <div>
        <el-table  @selection-change='selectionChange' :data="data" :row-style='config && config.rowStyle' :border="(config && config.border === false) ? false : true">
            <el-table-column v-if="config && config.selection" type="selection" width="55" />
            <el-table-column v-if="config && config.index" type="index" width="65" :label="config && config.indexLabel" />

            <el-table-column 
                :sortable='column.sortable' 
                :show-overflow-tooltip='(config && config.showTip === false) ? false : true' 
                :prop="column.prop" :label="column.label" 
                v-for="(column, index) in columns"
                v-if="Authorized(column)" 
                :key="index" 
                :width="column.width"> 
                    <template slot-scope="scope">
                        <region 
                            v-if="column.render"
                            :data="scope.row"
                            @event="event"
                            :columns="column.render({value: scope.row[column.prop], data: scope.row})"/>
                        <region 
                            v-else
                            :data="scope.row"
                            @event="event"
                            :columns="[{type: 'span', ...column}]"/>
                    </template>
            </el-table-column>
        </el-table>
        <!-- <div v-if="page" style="text-align:right;">
            <el-pagination @size-change="pageSizeChange" @current-change="pageNoChange" 
                :current-page="table.page.pageNo"
                :page-sizes="basePageTableConfig.page.pageSizes"
                :page-size="table.page.pageSize"
                :layout="basePageTableConfig.page.layout"
                :total="table.page.total">
            </el-pagination>
        </div> -->
    </div>
</template>
<script>
/**
 * data: [], columns: [], 
 * config: {
 *  rowStyle: funtcion/object
 *  selection: true 
 *  index: true
 *  showTip: false
 * }, page: {}
 */
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
    components: {
        Region
    },
    data() {
        return {
            selectionChange() {}
        }
    },
    methods: {
        Authorized (column) {
            return  external.Authorized({column: column})
        },
        event(params) { 
            this.$emit('event', params)
        }
    }
    
}

</script>

