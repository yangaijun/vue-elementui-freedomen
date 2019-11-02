<template>
    <div >
      <el-button type="primary">主要按钮</el-button>
        <fd-form :columns="formColumns" :data="formData" @event="event" />
        <fd-search :columns="searchColumns" :data="searchData" @event="event" />
        <fd-table :data="tableData" :columns="tableColumns" @event="event"/>
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
        {type: 'input', prop: 'm416', value:'dd', label: '姓名', rule: 'empty,age'},
        {type: 'input', prop: 'age', label: '年龄', rule: 'age'},
        [
          {type: 'counter', prop: 'ddd', value: 1, label: '姓名'},
          {type: 'span-test', value: '--', style: {marginLeft: '20px', marginRight: '20px'}},
          {type: 'counter', prop: 'gggg', value: 2, label: '年龄'},
          {type: 'form-item',  label: 'test'}
        ],
        {type: 'dropdown', prop: 'ak', label: '下拉', options: '你的,我的'}, 
        [
          {type: 'button-primary', prop: '$submit', value: '提交'},
          {type: 'button', prop: '$reset', value: '重置'},
          {type: 'form-item'}
        ]
      ],
      formData: {name: '张一', age: 25},
      columns: [
        {type: 'button', value: 'great!'},
        [
          {type: 'input', value: '985'},
          {type: 'counter', value: 25, prop:'counter'},
          {type: 'col'}
        ], [
          {type: 'slider', value: 25, prop: 'slider'},
          {type: 'input', value: 555, prop: 'text'},
          {type: 'row'}
        ]
      ],
      data: {a: 12, counter: 1, slider: 23,'333': '666'},
      form: {
        type: 'll',
        prop: 'd',
        value: 12,
        '333': '666'
      },
      item: {
        prop: 'button',//defalut
        type: 'button-warning',
        value: 'nihao',
        filter: ({value}) => 'dddddd',
        disabled: ({value}) => value == 'youyou',
        config: {
          round: true
        }
      },
      input: {
        prop: 'ipnut',
        type: 'input-area',
        placeholder: 'heh',
        disabled: ({value}) => value == 'youyou',
      },
      counter: {
        prop: 'couter', disabled: ({value}) =>value == 10
      },
      select: {
        prop: 'select',
        placeholder: 'very goo',
        type: 'select',
        options: {1: 'name', 2: 'boy'},
      },
      checkboxs: {
        prop: 'checkbox',
        type: 'check-buttons',
        options: {1: 'name', 2: 'boy', 3: 'gri'},
        value:1,
        max: 1
      },
      radios: {
        prop: 'radios',
        options: "田,mh",
        type: 'radio-buttons',
      },
      elswitch: {
        value: 0,
        disabled: ({value}) => value 
      },
      rate: {
        disabled: ({value}) => value == 3
      },
      progress: {value: 1},
      slider: {
        value: 10,
        disabled: ({value}) => value == 3
      }
    }
  },
  methods: {
    event(params ) { 
      console.log(params)
      
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
