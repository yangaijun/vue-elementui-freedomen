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