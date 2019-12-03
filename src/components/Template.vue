<template>
    <div>
        <fd-search 
            :columns="searchColumns" 
            @event="searchEvent">
        </fd-search>

        <fd-table 
            :columns="tableColumns" 
            @event="tableEvent" 
            :data="tableData" 
            :page="page" 
            :config="tbConfig">
        </fd-table>
        
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.visible"
        >
            <fd-form 
                :columns="formColumns" 
                @event="formEvent" 
                :data="formData"
                @submit="submit">
            </fd-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog: {
                title: '',
                visible: false,
            },

            formColumns: [],
            formData: {},
            formConfig: {},

            tableColumns: [],
            tableData: [],
            tablePage: {},
            tableConfig: {},

            searchColumns: [],
            searchConfig: {}
        }
    },
    methods: {
        formEvent(params) {},
        formSubmit(data) {},

        tableEvent(params) {},
        
        searchEvent(params) {}
    }
}
</script>
