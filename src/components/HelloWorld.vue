<template>
    <div >
        <fd-form :columns="formColumns" :data="formData" @event="event" />
        <!-- <fd-search :columns="searchColumns" :data="searchData" @event="event" />
        <fd-table :data="tableData" :columns="tableColumns" @event="event"/> -->
    </div>
</template>
<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData: [
        {haha: 'fjklds', haha2: '不是你的', test: 0},
        {haha: 'wrarr', haha2: '不玩就逄了', test: 1}
      ],
      tableColumns: [
        {prop: 'm416', label: '一号', render: ({data}) => {
          return [
            {type: () => data.test ? 'span' : 'input', prop: 'haha'}
          ]
        }},
        {prop: 'haha2', label: '二号', render: ({data}) => {
            return [
              {type: 'span', filter: ({data}) => {
                return data.test ? '真' : '假'}
              },
              {type: 'switch', prop: 'test'}
            ]
        }},
        {label: '操作', render: ({data}) => {
          return [
            {type: 'dropdown', prop: 'ak', label: '下拉', options: '你的,我的'}, 
          ]
        }}
      ],
      searchColumns: [
        {type: 'input', prop: 'm416', value:'dd', label: '姓名'},
        {type: 'date-datetime',placeholder: '请选择日期', prop: 'ddddd', label: '姓名'},
        {type: 'button', prop: '$submit', value: '提交'},
      ],
      searchData: {dd: 100},
      formColumns: [
        {type: 'input', prop: 'm416', value:'dd', label: '姓名', rule: ({data}) => data.m416 == '12' && '不可以等于12哦', load: ({value}) => value != 14},
        {type: 'input', prop: 'age', label: '年龄',  rule: () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('失败')
              }, 1000)
            })
          }},
        [
          {type: 'counter', prop: 'ddd', value: 1, label: '姓名'},
          {type: 'span-test', value: '--', style: {marginLeft: '20px', marginRight: '20px'}},
          {type: 'counter', prop: 'gggg', value: 2, label: '年龄'},
          {type: 'formitem',  label: 'test', load:({data}) => data.ddd != 6, style: {float: 'left'}}
        ],
        {type: 'dropdown', prop: 'ak', label: '下拉', options: '你的,我的'}, 
        {type: 'check-boxs', prop: 'radios', options: '近,远',   rule: 'must', label: '家中'},
        {type: 'check-buttons', prop: 'checkbuttons', options: '近,远', rule: 'must', label: '家中'},
        {type: 'select', prop: 'select', options: {1: '近', 2: '远', 3: '长'}, rule: 'must', label: '家要中'},
        {type: 'rate', value: 3, label: '等分', prop: 'df'},
        {type: 'slider', prop: 'fdslider', label: 'Slider'},
        {type: 'select-multiple', prop: 'select2', value: '1,2', options: {1: '近', 2: '远', 3: '长'}, rule: 'must', label: '家要中'},
        {type: 'progress', prop: 'progress', label: 'progress', value: 12, filter: ({data}) => data.fdslider},
        [
          {type: 'switch', prop: 'switch'},
          {type: 'span', prop: 'noe', filter: ({data}) => data.switch ? '你的': '我的', style: ({data}) => data.switch && {color: 'blue'}},
          {type: 'formitem',  label: '滚蛋'}
        ], [
          {type: 'button-primary', prop: '$submit', value: '提交'},
          {type: 'button', prop: '$reset', value: '重置'},
        ]
      ],
      formData: {fdslider: 18, switch: 1},
    }
  },
  methods: {
    event(params ) {  
      if (params.prop == '$submit')
        this.formData.m416 = 'wq j '
      console.log(params)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
