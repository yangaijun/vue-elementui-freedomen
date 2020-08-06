### v1.1.3

* input 添加change类型配置, 发生change 事件的触发条件default: change

  ```js
  {type: 'input', prop: 'i', config: {changeEventType: 'input/focus/blur/change(defalut)/clear'}}
  ```


* date 类添加year,month,dates 类，并完善config

  ```js
  type添加:date-year,date-month,date-dates
  config添加: {valueFormat,disabled,clearable,format,size}
  ```

* select 当options的每个属性的disabled都为真，整体select的disabled属性为真

* 添加新元素 divider 分割线

  ```js
  {type: 'divider', prop: 'divider', value: 'divider', config: {direction: 'horizontal / vertical', contentPosition: 'left / right / center'}}
  ```

### v1.1.2

* 添加组件fd-list,   region 列表

  ```js
  <fd-list :columns="[]" :data="[]" @event="event" />
  //region list
  ```

* upload 添加新type   upload-avatar   上传头像，一张图片,  添加onPreview 

  ```js
  {type: 'upload-avatar'}
  {type: 'upload-pcard', config: {..., onPreview(){}}}
  ```

* 添加新元素 text  用法，参数同 span  但config 中可以切换tag

  ```js
  {type: 'text', prop: 'text', config: {tag: 'p'}}
  //tag default span, 可以切换为 p, div, ....
  ```

* 添加新元素imgs,   多张图片

  ```js
  {type: 'imgs', prop: 'imgs', value: []} //其它参数同img, 只是value 是数组或 , 分割的字符串
  ```

  

### v1.1.1

* 添加核心组件region columns改变可以更新

* render 添加 forceUpdate 来强制更新 render

  ```js
  {type: 'render', forceUpdate: true}
  //可以强制更新render
  /**
     render({createElement, data, value}) {
     	    你希望可以通过  data  的其它属性改变来更新此render //forceUpdate: true
     }
  */
  ```

  

### v1.1.0

* upload 添加配置属性是否自动上传autoUpload, 手动上传参数autoUpload: function autoUpload(submit) {}, submit： 提交函数

  ```js
  {type: 'upload', config: {autoUpload: (uploadSubmit) => {
      this.uploadSubmit = uploadSubmit
  }, ...}}
  methods: {
  	onSubmit() {
          this.uploadSubmit()
      }     
  }
  ```

  

* 添加长度验证len

  ```js
  //长度验证 len, 支持对数组长度验证
  //len10:25   长度10-25范围
  //len20   最大20
  //len10:   最小10
  //rule: len25   长不超过25整数
  //rule: "int,len10:" 长度不小于 10 的整数
  //rule: "int,len10:25" 长度在10~25 的整数
  ```

  

### v1.0.9

* 添加事件可传递参数 $params

  ```js
  <fd-region 
      :columns="[
  	    type: 'button', value: 'button', prop: 'button', $params: {name: '传递到事件回调'},
          {type: 'input', prop: 'input', $params: {id: 1}}
      ]"
      @event="(params) => {
           //params: {$params: {传递的$params}, type: '',...}
      }"
  ```

* 修改upload 上传不可以绑定string类型BUG

### v1.0.8 

修改upload tip

### v1.0.7

* 添加 flex 布局 fd-div 标签

  ```xml
  <fd-div row> </fd-div> <!-- flex 行布局 -->
  <fd-div col> </fd-div> <!-- flex 列布局 -->
  
  <fd-div flex="1"></fd-div> <!-- flex = 1 -->
  <fd-div :flex="2"></fd-div> <!-- flex = 2 -->
  ```

* 添加换行  br, 线hr ,占位space

  ```js
  [
      {type: 'br'}, //换行
  	{type: 'hr', style, class}, //线
      {type: 'space', style, class} //占位 div
  ]
  ```

* 修复table 事件没有$index

* 修复input的slotPrepend和slotAppend 属性错误

* 添加验证

  ```js
  /**
  must: 不能为空
  empty: 可以为空 'empty,number' 表示可以不填，但是填写了那就得是数值
  phone: 手机号码
  email： 邮箱
  url：链接
  number： 数值 12,12.5,-12.5,+12.48
  int： 整数
  intp: 正整数
  intn: 负整数
  zipcode： 邮编
  age： 年龄
  idcard： 身份证号码
  username： 用户名，字母数字下划线组合5-16长度
  */
  <fd-form 
  	:columns="[
  		{type: 'input', prop: 'testint', rule: 'int'},
          {type: 'input', prop: 'testnumm', rule: 'empty,number'}
  	]"
  />
  ```


* input-remote 添加自定义模版scopedSlot：region columns

  ```js
  {type: 'input-remote', prop: 'inputRemote', options({resolve}) {
      resolve({value: '江苏', address: '上海'})
  }, scopedSlot: [
      {type: 'span', prop: 'value'},
      {type: 'span', prop: 'address'}
  ]}
  ```

  

### v1.0.6

* input 添加slotPrepend

* input 添加slotAppend

* input 添加 input-remote 新类型

  ```js
  //slotPrepend & slotAppend 对象类型同region columns [] 或者 单条 column {}
  {type: 'input', prop: 'slotTest', slotPrepend: {
      type: 'span', value: '效果'}, slotAppend: [{
      type: 'span', value: '.com'  
      }]
  }
  //input-remote
  {type: 'input-remote', prop: 'inputRemote',  options({query, data, value, resolve, store}){
      resolve([{value: query + 'testValue'}])
  }
  }
  ```

* input 添加自定义样式

  ```js
  Freedomen.styles({ 
    'input-len220': {
      width: '220px'
    },
    'input-len250': {
      width: '250px'
    }
  })
  //使用
  {type: 'input-len220', prop: 'len220'}
  ```


* 添加预配置

  ```js
  import Freedomen from 'vue-elementui-freedomen'
  //代全局预先配置, 键为元素名称值为配置对象{}
  Freedomen.configs({
      form: {labelWidth: '120px', ...},
      table: {border: false, pageSizes: [10, 20, 50, 200]},
      upload: {action: 'https://...'},
      switch: {...},
      ...         
  })
  ```


* 文件上传 添加upload-file, upload-pcard, upload-picture

  ```js
  //upload-pcard   同elm list-type: picture-card
  //upload-picture 同elm listtype: picture
  //upload-file 可拖拽上传
  //upload  button点击上传
  //配置新增
  columns:[
      {
          type: 'upload', 
          prop: 'upload', 
          filter:({data, value}) => `https://aliyun.com/${value}`,
          config: {
              tip: '提示信息',
              fileSizeRange: [10, 1024], //可以 [1024], 1024, [1,1024]格式。单个默认上传最大KB, 长度为2的数组即是文件大小区间限制
              fileTypes: "md,jpg", //可以数组或字符串，上传的文件后缀是其中才可以上传
              action: 'http:...',//文件上传地址
              onSuccess: function (response) {// 如果返回的结果不是数组或字符串，可以通过此处理返回数组或字符串,如['/apple.jpg', 'orange.png'] 或 'orange.png' 或[{url: 'orange.png', id: 1024, ...}], 返回对应的value的格式
                  return response.data
              },
              data: {}, //其他参数数据
              headers: {}, //头
              name: 'file', //上传接收参数名称
          }
      }
  ]
  ```


* switch 默认开关值改为  true / false

### v1.0.5 

* form 添加 submit 方法可以手动调用

  ```js
  <fd-form
      :columns="..."
      ref="form"
  >
  <el-button @click='submit'>验证<el-button>
  methods: {
      submit() {
          this.$refs.form.submit().then(data => {
              console.log('验证成功')
          }).catch(_ => {
              console.log('验证失败')
          })
      }
  }
  ```

  

* form 绑定data 可以使用.sync

  ```js
  <fd-form
      :data.sync="formData"
      :columns="[
          {type: 'input', prop: 'input'},
          {type: 'select-mutiple', prop: 'select'}
      ]"
  >
  data() {
  	return {
          data: {} //使用sync会改变其中的初始值 为{input: '', select: []}
      }        
  }
  ```

  

### v1.0.4 更改

* dropdown 属性label 改为 text

* form 函数验证返回Promise对象({data, value, store})改为 ({resolve, data, value, store}), 直接调用resolve返回出错信息

  ```js
  //原：
  rule: ({value, data}) => { 
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve('错误信息')
          }, 400);
      })
  }}
  //改为：
  rule: ({resolve, value, data}) => {  
      setTimeout(() => {
          resolve('错误信息')
      }, 400)  
  }}
  //函数同
  rule: ({resolve, value, data}) => {   
      resolve('错误信息') 
  }}
  ```

​      