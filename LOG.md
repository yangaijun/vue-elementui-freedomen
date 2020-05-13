

# vue-elementui-freedomen

[文档地址](http://115.159.65.195:8080/vefdoc)

[项目DEMO地址](https://github.com/yangaijun/mall-demo)

> elementUI 二次开发版本，让开发更简单，更高效 ，可以全局对元素级别权限控制，增删改查更加方便，验证更容易，重复的代码更少，不懂VUE的后台人员更容易使用, 更快速开发。freedomen系 并不是封装，还是控制，对组件核心方法进行统一， 加入核心控制器Region来对每个元素组件进行分配、控制、数据处理、相互通信、与事件接收， 所以任何一个满足 最小的统一构造 都是可以无缘接入 元素中，而实现无限扩展。



## 使用说明

``` bash
//首先要安装element ui，不会请访问element ui官网

npm install vue-elementui-freedomen
//yarn add veu-elementui-freedomen
//cnpm i vue-elementui-freedomen

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

### 具體介紹還是看文檔吧

