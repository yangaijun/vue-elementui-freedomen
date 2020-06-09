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

* table 多级表头

  ```js
  //column 加入children属性
  columns: [
      {label: '配送信息', children: [{label: '姓名', prop: 'name'}, {label: '地址', children: [...]}]}
  ]
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
              fileTypes: "md,jpg", //可以数据或字符串，上传的文件后缀是其中才可以上传
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