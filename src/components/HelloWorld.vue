<template>
    <div >
        <!-- <Button :item="item" @event="event" />
        <Input :item='input' @event="event"/>
        <Counter :item='counter' @event="event" />
        <Select :item='select' @event="event"/>
        <CheckBoxs :item='checkboxs' @event="event" />
        <Radios :item='radios' @event="event"/>
        <ElSwitch :item='elswitch' @event='event'/>
        <Rate :item='rate' @event='event'/>
        <Slider :item='slider' @event='event'/>
        <Progress :item='progress' @event='event'/> -->
        <!-- <Region :columns="columns" :data="data" @event='event'/> -->
        <Form :columns="formColumns" :data="formData" @event="event" />
        <Search :columns="searchColumns" :data="searchData" @event="event" />
        <Table :data="tableData" :columns="tableColumns" @event="event"/>
    </div>
</template>
<script>
import vueJsonEditor from 'vue-json-editor'
import Button from '../plug/elements/button/Button';
import Input from '../plug/elements/input/Input'
import Counter from '../plug/elements/counter/Counter';
import Select from '../plug/elements/select/Select';
import CheckBoxs from '../plug/elements/checkboxs/CheckBoxs';
import Radios from '../plug/elements/radios/Radios'
import ElSwitch from '../plug/elements/switch';
import Rate from '../plug/elements/rate';
import Slider from '../plug/elements/slider';
import Progress from '../plug/elements/progress';
import Region from '../plug/core/region/Region';
import Form from '../plug/components/form/Form';
import Search from '../plug/components/search/Search';
import Table from '../plug/components/table/Table';

export default {
  components: {
    vueJsonEditor, Button, Input, Counter, Select, CheckBoxs, Radios, ElSwitch, Rate, Slider, Progress, Region, Form, Search, Table
  },
  name: 'HelloWorld',
  data () {
    return {
      tableData: [
        {haha: 'fjklds', haha2: '不是你的', test: 0},
        {haha: 'wrarr', haha2: '不玩就逄了', test: 1}
      ],
      tableColumns: [
        {prop: 'haha', label: '一号', render: ({data}) => {
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
            {type: 'button-text', value: '好的', prop: 'isOver'},
            {type: 'button-text', value: '好的3', prop: 'isO4ver', style: 'color:red'}
          ]
        }}
      ],
      searchColumns: [
        {type: 'input', prop: 'name', value:'dd', label: '姓名'},
        {type: 'input', prop: 'dd', value:'dd', label: '姓名'},
        {type: 'date-datetime', prop: 'ddddd', label: '姓名'},
        {type: 'button', prop: '$submit', value: '提交'},
      ],
      searchData: {dd: 100},
      formColumns: [
        {type: 'input', prop: 'name', value:'dd', label: '姓名', rule: 'empty,age'},
        {type: 'input', prop: 'age', label: '年龄', rule: 'age'},
        [
          {type: 'counter', prop: 'ddd', value: 1, label: '姓名'},
          {type: 'counter', prop: 'gggg', value: 2, label: '年龄'},
          {type: 'form-item',  label: 'test'}
        ],
        [
          {type: 'button', prop: '$submit', value: '提交'},
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
