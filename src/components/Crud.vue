<template>
	<fd-form 
        :columns="[
            {type: 'input', prop: 'txt', rule: 'phone', label: 'pho'},
            {type: 'input', prop: 'txt1', rule: 'number', label: 'nubmer'},
            {type: 'input', prop: 'txt3', rule: 'intp', label: 'intp'},
            {type: 'input', prop: 'txt4sss', rule: 'intn', label: 'intn'},
            {type: 'input', prop: 'txt5va', rule: 'email', label: 'email'},

            {type: 'input', prop: 'txt6 s5', rule: 'username', label: 'dme'},
            {type: 'input', prop: 'txt32', rule: 'idcard', label: 'idcard'},
            {type: 'input', prop: 'tx3t', rule: 'ip4', label: 'ipv4'}, 
            {type: 'button', value: 'submit', prop:'$submit'},
            {type: 'button', value: 'reset', prop:'$reset'},

        ]"
    />

</template>

<script> 
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/mode/javascript/javascript.js' 
	export default {
        label: '介绍',
        components: {
            codemirror
        },
		data() {
			return { 
                codex: ``,
                cmOptions: {
                    // codemirror options
                    tabSize: 4,
                    mode: {
                        name: 'javascript',
                        json: true
                    },
                    theme: 'base16-dark',
                    lineNumbers: true,
                    line: true,
                    // more codemirror options, 更多 codemirror 的高级配置...
                },
                tableData: [
                    {name: '赵匡胤', gender: 1},
                    {name: '白马', gender: 2},
                    {name: '王子', gender: 1},
                ],
                tableData3: [{name: '大头', gender: 1, age: 25, edit: false}],
                tableData4: [
                    {name: '大头', gender: 1, age: 25, other1: '其他1', other2: '其他2', other3: '其他3'},
                    {name: '大头', gender: 1, age: 21, other1: '其他11', other2: '其他22', other3: '其他33'},
                    {name: '大头', gender: 2, age: 29, other1: '其他11', other2: '其他22', other3: '其他33'}
                ],
                page: {
                    pageNo: 1,
                    pageSize: 15,
                    total: 200
                },
                tableColumns: [
                    {label: '姓名', prop: 'name'},
                    {label: '性别', prop: 'gender', filter: {1: '男', 2: '女'}},
                    
                ],
                
                columns: [
                    {prop: 'params', label: '参数名称'},
                 
                ],
                data: [
                    {params: 'columns', must: '是', type: 'Array', descript: '列'},
                    {params: 'data', must: '是', type: 'Array', descript: '填充的数据'},
                    {params: 'page', must: '否', type: 'Object', descript: '分页 {pageNo, pageSize, total}'},
                    {params: 'config', must: '否', type: 'Object', descript: '见下表'}
                ],
                code3: `
                    <el-button @click="tableData3.push({edit: true})">添加</el-button>
                    <fd-table 
                        :columns="[
                            {label: '姓名', prop: 'name', type: ({data}) => data.edit ? 'input': 'span'},
                            {label: '年龄', prop: 'age', type: ({data}) => data.edit ? 'input': 'span'},
                            {label: '性别', prop: 'gender', type: ({data}) => data.edit ? 'select': 'span', filter: {1: '男', 2: '女'}, options: {1: '男', 2: '女'}},
                            {label: '操作', render: ({data}) =>{
                                return [
                                    {type: 'button-text', prop: 'op', filter: ({data}) => data.edit ? '保存' : '编辑'},
                                    {type: 'button-text', prop: 'delete', value: '删除', style:'color: red'}
                                ]
                            }}
                        ]" 
                        @event="event3"
                        :data="tableData3" 
                    />
                    export default {
                        data() {
                            return {
                                tableData3: [{name: '大头', gender: 1, age: 25, edit: false}]
                            }
                        },
                        methods: {
                            event3(params) {
                                if (params.prop == 'op') {
                                    this.tableData3[params.$index].edit = !this.tableData3[params.$index].edit
                                } else if (params.prop == 'delete') {
                                    this.tableData3.splice(params.$index, 1)
                                }
                            }
                        }
                    }
                `,
                code2: `
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
                        :data="[{name: '大头', gender: 1, edit: 0}]" 
                    />
                `,
                code4: `
                    <fd-table 
                        :columns="[
                            {label: '姓名', prop: 'name'},
                            {label: '年龄', prop: 'age'},
                            {label: '性别', prop: 'gender', type: ({data}) => data.edit ? 'select': 'span', filter: {1: '男', 2: '女'}, options: {1: '男', 2: '女'}},
                            {type: '$expand', render({data}) {
                                return [
                                    {type: 'span', value: 'Other1: ' + data.other1},
                                    {type: 'span', value: ',Other2:' + data.other2},
                                    {type: 'span', value: ',Other3:' + data.other3}
                                ]
                            }}
                        ]"  
                        :data="tableData4" 
                    />
                    data() {
                        return {
                            tableData4: [
                                {name: '大头', gender: 1, age: 25, other1: '其他1', other2: '其他2', other3: '其他3'},
                                {name: '大头', gender: 1, age: 21, other1: '其他11', other2: '其他22', other3: '其他33'},
                                {name: '大头', gender: 2, age: 29, other1: '其他11', other2: '其他22', other3: '其他33'}
                            ]
                        }
                    }
                `,
                code: `
                    <fd-table 
                        :columns="tableColumns" 
                        @event="tableEvent" 
                        :data="tableData" 
                        :page="page" 
                    />
                    export default {
                        data() {
                            return {
                                 page: {
                                    pageNo: 1,
                                    pageSize: 15,
                                    total: 200
                                },
                                tableData: [
                                    {name: '赵匡胤', gender: 1},
                                    {name: '白马', gender: 2},
                                    {name: '王子', gender: 1},
                                ],
                                tableColumns: [
                                    {label: '姓名', prop: 'name'},
                                    {label: '性别', prop: 'gender', filter: {1: '男', 2: '女'}},
                                    {label: '操作', render: ({data}) => {
                                        return [
                                            {type: 'button-text', prop: 'delete', value: '删除'},
                                            {type: 'button-text', prop: 'edit', value: '编辑', load: () => data.gender == 1},
                                            {type: 'button-text', prop: 'detail', value: '详情'},
                                        ]
                                    }}
                                ]
                            }
                        },
                        methods: {
                            tableEvent(data) {
                                alert(JSON.stringify(data))
                            }
                        }
                    }
                `
			}
		},
		methods: {
            event(params) {
                console.log(params)
            },
            tableEvent(data) {
                alert(JSON.stringify(data))
            },
            event3(params) {
                if (params.prop == 'op') {
                    this.tableData3[params.$index].edit = !this.tableData3[params.$index].edit
                } else if (params.prop == 'delete') {
                    this.tableData3.splice(params.$index, 1)
                }
            }
		},
		mounted() { 
           
		}
	}

</script>
<style> 
    .item {  
        margin: 5px;
    }
    
</style>