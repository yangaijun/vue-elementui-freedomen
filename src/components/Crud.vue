<template>
    <fd-vuex :store="store" save>  
        <!-- <fd-search :columns="searchColumns" @event="searchEvent"/> -->
        <fd-table :columns="tableColumns" @event="tableEvent" :data="tableData" :page="page"/>
        <!-- <fd-form :columns="formColumns" @event="formEvent" :data="formData" @submit="submit"></fd-form> -->
     <fd-form :columns="formColumns2" @event="formEvent" :data="formData2" @submit="submit"></fd-form>
        <!-- <fd-table 
            :columns="[
                {label: '姓名', prop: 'name', type: ({data}) => data.edit ? 'input': 'span'},
                {label: '性别', prop: 'gender', type: ({data}) => data.edit ? 'select': 'span', filter: {1: '男', 2: '女'}, options: {1: '男', 2: '女'}},
                {label: '操作', render: ({data, store}) =>{
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
        /> -->
    </fd-vuex>
</template>
<script> 
export default {
  name: 'Crud',
  components: {FdNavMenu},
  data () {
    return { 
        store: {gg: true},
        tbConfig: {selection: true},
        formData2: {select: '', giaogiao: {}},
        formColumns2: [
            {type: 'select', prop: 'select', options: '1,2', label: '请选择'},
            {type: 'input', prop: 'c', label: '姓名2', rule: 'must'},
            {type: 'render', label: 'nihao', rule: 'must',  render({data, value}) {
                
                return [
                    {type: 'span', value: data.select},
                    {type: 'input', value: 'value', prop: 'ainiou'},
                    {type: 'span', value: "heh3:"},
                    {type: 'input', value: 'value', prop: 'buaile'}
                ]
            }},
            {type: 'render', label: 'nihao', rule: 'must', prop: 'd', render({data, createElement, value}) {
                return createElement('FdTable', {
                    props: {
                        columns: [
                            {prop: 'nihao', label: '98shidni'}
                        ],
                        data: [{nihao: '98'}]
                    }
                })
            }},
            //  {type: 'render', label: 'labl', render({createElement}) {
            //     return createElement('span', 'this.blogTitle')
            // }},
            
            
            {type: 'button', prop: '$submit', value: '提交'}
        ],
        searchColumns: [ 
            {type: 'select-remote', prop: 'remote', options: (query, resolve) => {
                setTimeout(() => {
                    resolve({1: '文件', 2: '视频'})
                }, 200)
            }},
             {type: 'span', value: '你好', style: "fontSize: 25px;"},
            {type: 'date-date', prop: 'date', placeholder: '请选择日期'},
            {type: 'input', prop: 'name', label: '姓名', placeholder: '请输入姓名'},
            {type: 'select', prop: 'sex', label: '性别', options: '男,女'},
            {type: 'button-primary', prop: 'search', value: '查询', disabled: ({data}) => data.name == '12'},
            {type: 'button', prop: '$reset', value: '重置', disabled: ({store}) => store.gg}
        ],
        tableColumns: [
            {type: '$expand', render({data, createElement}){
                return createElement('FdForm', {
                    props: {
                        columns: [
                            {type: 'span', label: '姓名', prop: 'name'},
                            {type: 'span', label: '性别', prop: 'gender', filter: {1: '男', 2: '女'}} 
                        ],
                        data: data,
                        config: {
                            inline: true
                        }
                    }
                }) 
            }},
            {label: '姓名', prop: 'name', type: ({store}) => store.gg ? 'span' : 'input'},
            {label: '性别', prop: 'gender', filter: {1: '男', 2: '女'}},
            {label: 'tag', prop: 'tag-warn', value: '中车', type: 'tag-danger'},
            {type: 'img', prop: 'img', label: '图片', filter: ({value}) => `http://www.jasobim.com:8085${value}`, previewSrcList:['/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg'], style: {width: '220px', height: '120px'}},
            {label: '操作', type: 'render', render: ({data}) => {
                return [ 
                    {type: 'button-text', prop: 'vprop', value: 'vprop?', vPopover: 'popover5'},
                    {type: 'button-text', prop: 'delete', value: '删除'},
                    {type: 'button-text', prop: 'edit', value: '编辑', load: () => data.gender == 1},
                    {type: 'button-text', prop: 'detail', value: '详情', load: ({store}) => store.gg},
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
            [
                {type: 'input', prop: 'i1', style: 'width: 200px'},
                {type: 'span', value: '--'},
                {type: 'input', prop: 'i2', style: 'width: 200px'},
                {type: 'formitem', prop: 'up', label: 'double', rule: ({data}) => { 
                   return new Promise((resolve) => {
                       setTimeout(() => {
                           resolve('buduiba')
                       }, 800);
                   })
                }}
            ],
            {type: 'slider', prop: 'slider', label: 'slider'},
            {type: 'select', prop: 'select1', options: "1,2,4", label: [
                {type: 'span', value: '秋伤别恋'},
                {type: 'icon', value: 'el-icon-success'}
            ]}, 
            {type: 'tags-create', value:"你好,我不好", prop:'create', label: 'tags', max: 4, load: ({store}) => store.gg},
            {type: 'date-time', prop: 'd'},
            {type: 'span', value: 3, label: '你好', filter: 'yyyy-MM-dd'},
            {label: 'ca', prop: 'dd', type: 'cascader', value: ['45', '45'],  options: ({resolve, data}) => {
                setTimeout(() => {
                    resolve([{label: 'd', value: '45', children: [{label: 'd', value: '45'}, {label: 'ddd4', value: '453'}, data.select1 == '1' && {label: 'select1Chnage', value: 's453'}]}])
                }, 2000);
            } },
            {label: [
                {type: 'span', value: '秋伤恋'},
                {type: 'icon', value: 'el-icon-success'}
            ], prop: 'name', type: 'input',  rule: ({data}) => { 
                   return new Promise((resolve) => {
                       setTimeout(() => {
                           resolve('buduiba')
                       }, 800);
                   })
                }},
            {label: '性别', prop: 'gender', type: 'radios', options: ({resolve}) => {
                setTimeout(() => {
                    resolve({1: '男', 2: '女', 3: '未知'})
                }, 2000);
            }},
            {label: '性别2', prop: 'gender2', type: 'check-boxs', options: {1: '男', 2: '女'}, load: ({value}) => value != 2},
            
            {type: 'img', prop: 'img', label: '图片', filter: ({value}) => `http://www.jasobim.com:8085${value}`, style: {width: '220px', height: '120px'}},
            {type: 'upload', prop: 'gg', label: '完全人', filter: ({value}) => `http://www.jasobim.com:8085${value}`, config: {action: 'http://www.jasobim.com:8085/api/files/uploadFiles'}},
            [
                {type: 'button-primary', value: '提交', prop: '$submit'},
                {type: 'button', value: '重置', prop: '$reset'},
                {type: 'formitem', load: false}
            ],
            {type: 'radios', prop: 'test', options: '1,2', label: 'choose'},
            [
                {type: 'input'}
            ],
            [
{type: 'input'}
            ],
            [
                {type: 'button-primary', value: '提交', prop: '$submit'},
                {type: 'button', value: '重置', prop: '$reset'},
                {type: 'formitem'}
            ]
        ],
        formData: {calca: '', hello: [{v: 'f1'}], select1: '1', listData:{list: []}, calcb: '', result: '', img: '/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg', gg: ['/uploadFiles/projectfiles/c8e5dfa78e702594f826afcab6e7f2a6.jpg', '/uploadFiles/projectfiles/5ccb4026deea49bbae21ce344f55ccab.jpg']}
    }
  },
methods: {
    searchEvent(params) {  
        this.store.gg = !this.store.gg
        if (params.prop == 'search') { 
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
        console.log(params)
    },
    formEvent(params) {
        console.log(params)
        if (params.prop == 'add') {
            this.formData.listData.list.push({prop: '1'})
        }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
