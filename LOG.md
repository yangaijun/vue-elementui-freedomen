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