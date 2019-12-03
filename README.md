

# vue-elementui-freedomen

[文档地址](http://115.159.65.195/vefdoc)



> elementUI 二次开发版本，让开发更简单，更高效 ，可以全局对元素级别权限控制，增删改查更加方便，验证更容易，重复的代码更少，不懂VUE的后台人员更容易使用, 更快速开发。

```bash
//DEMO  
//down && npm install
npm run dev
```



## 使用说明

``` bash
//首先要安装element ui，不会请访问element ui官网
npm install vue-elementui-freedomen

import ElementUI from 'element-ui'
import Freedomen from 'vue-elementui-freedomen'

Vue.use(ElementUI)
Vue.use(Freedomen) 
```



## 权限

```js
Freedomen.privileges.Authorized = function({column}) {
  //没有编辑权限
  // if (column.prop == 'edit') 
  //   return false
  return true
}
```



## Form表单

> form 即是表单，那么来看一下如何最方便的实现吧

```js
<template>
	<fd-form :columns="formColumns" :data="formData" @submit="submit" />
</template>

export default {
    data () {
        return {
            formData: {},
            formColumns: [
                {label: '姓名', prop: 'name', type: 'input', rule: 'must'},
                {label: '性别', prop: 'gender', type: 'radios', options: {1: '男', 2: '女'}},
                [
                    {type: 'button-primary', value: '提交', prop: '$submit'},
                    {type: 'button', value: '重置', prop: '$reset'},
                    {type: 'formitem'}
                ]
            ],
        }
    }
}
```



## Search查询

> search 即是搜索的表单

```js
<template>
	<fd-search :columns="searchColumns" @event="searchEvent" />
</template>
export default {
    data () {
        return {
            searchColumns: [ 
                {type: 'input', prop: 'name', label: '姓名', placeholder: '请输入姓名'},
                {type: 'select', prop: 'sex', label: '性别', options: '男,女'},
                {type: 'button-primary', prop: 'search', value: '查询'},
            ]
        }
    }
}
```



## Table表格

> table 就是表格喽

```js
<template>
	<fd-table :columns="tableColumns" :data="tableData" :page="page" />
</template>
export default {
    data () {
        return {
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
            ],
            tableData: [
                {name: '赵匡胤', gender: 1},
                {name: '白马', gender: 2}
            ],
        }
    }
}
```



## Region

```js
//为本组件核心控制器
...
```

