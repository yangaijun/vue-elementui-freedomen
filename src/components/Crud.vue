<template>
    <div>
        <fd-search :columns="searchColumns" @event="searchEvent"/>
        <fd-table :columns="tableColumns" @event="tableEvent" :data="tableData" :page="page" :config="tbConfig"/>
        <fd-form :columns="formColumns" @event="formEvent" :data="formData" @submit="submit"></fd-form>
        <fd-table 
            :columns="[
                {label: '姓名', prop: 'name', type: ({data}) => data.edit ? 'input': 'span'},
                {label: '性别', prop: 'gender', type: ({data}) => data.edit ? 'select': 'span', filter: {1: '男', 2: '女'}, options: {1: '男', 2: '女'}},
                {label: '操作', render: ({data}) =>{
                    return [
                        {type: 'switch', prop: 'edit'}
                    ]
                }}
            ]" 
            :data="[{name: '大头一一一一五一',gender: 1,edit: 0}]" 
            @event="(params) => {
                if (params.prop == 'save')
                    params.row.edit = 0
            }"
        />
    </div>
</template>
<script>

export default {
  name: 'Crud',
  data () {
    return { 
        tbConfig: {selection: true},
        searchColumns: [
            {type: 'checkbox', label: 'ck', prop: 'ck'},
            {type: 'select-remote', prop: 'remote', options: (query, resolve) => {
                setTimeout(() => {
                    resolve({1: '文件', 2: '视频'})
                }, 200)
            }},
            {type: 'date-date', prop: 'date', placeholder: '请选择日期'},
            {type: 'input', prop: 'name', label: '姓名', placeholder: '请输入姓名'},
            {type: 'select', prop: 'sex', label: '性别', options: '男,女'},
            {type: 'button-primary', prop: 'search', value: '查询', disabled: ({data}) => data.name == '12'},
            {type: 'button', prop: '$reset', value: '重置'}
        ],
        tableColumns: [
            {label: '姓名', prop: 'name'},
            {label: '性别', prop: 'gender', filter: {1: '男', 2: '女'}},
            {label: 'tag', prop: 'tag-warn', value: '中车', type: 'tag-danger'},
            {type: 'img', prop: 'img', label: '图片', filter: ({value}) => `http://www.jasobim.com:8085${value}`, previewSrcList:['/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg'], style: {width: '220px', height: '120px'}},
            {label: '操作', render: ({data}) => {
                return [
                    {type: 'button-text', prop: 'delete', value: '删除'},
                    {type: 'button-text', prop: 'edit', value: '编辑', load: () => data.gender == 1},
                    {type: 'button-text', prop: 'detail', value: '详情'},
                ]
            }}
        ],
        tableData: [
            {name: '赵匡胤', gender: 1, img: '/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg'},
            {name: '白马', gender: 2, img: '/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg'},
            {name: '王子', gender: 1, img: '/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg'},
        ],
        page: {
            pageNo: 1,
            pageSize: 10,
            total: 998
        },
        formColumns: [
            {type: 'tags-create', value:"你好,我不好", prop:'create', label: 'tags', max: 4 },
            {type: 'date-time', prop: 'd'},
            {type: 'span', value: 3, label: '你好', filter: 'yyyy-MM-dd'},
            {label: 'ca', prop: 'dd', type: 'cascader', value: ['45', '45'], options: [{label: 'd', value: '45', children: [{label: 'd', value: '45'}, {label: 'ddd4', value: '453'}]}]},
            {label: '姓名', prop: 'name', type: 'input', rule: 'test'},
            {label: '性别', prop: 'gender', type: 'radios', options: {1: '男', 2: '女'}},
            {type: 'img', prop: 'img', label: '图片', filter: ({value}) => `http://www.jasobim.com:8085${value}`, style: {width: '220px', height: '120px'}},
            {type: 'upload', prop: 'gg', label: '完全人', filter: ({value}) => `http://www.jasobim.com:8085${value}`, config: {action: 'http://www.jasobim.com:8085/api/files/uploadFiles'}},
            [
                {type: 'button-primary', value: '提交', prop: '$submit'},
                {type: 'button', value: '重置', prop: '$reset'},
                {type: 'formitem'}
            ]
        ],
        formData: {calca: '', calcb: '', result: '', img: '/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg', gg: ['/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg', '/uploadFiles/projectfiles/5ccb4026deea49bbae21ce344f55ccab.jpg']}
    }
  },
methods: {
    searchEvent(params) {  
        if (params.prop == 'search') {
            console.log(params)
        }
    },
    tableEvent(params) {
        if (params.prop == 'detail') {
            alert('详情')
        } else if (params.prop == 'edit') {
            this.formData = params.row
        }
    },
    submit(params) {
        this.page.total = 250
    },
    formEvent(params) {
        console.log(params)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
