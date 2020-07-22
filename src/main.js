// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import Hello from './components/HelloWorld.vue'
 

Vue.use(ElementUI)
// import 'mavon-editor/dist/css/index.css'
// import mavonEditor from 'mavon-editor'
// Vue.use(mavonEditor)
import Freedomen from './plug'
  
Freedomen.privileges.Authorized = function({column}) {
  // if (column.prop == 'edit')
  //   return false
  return true
}
Freedomen.rules({
  test: {
    label: '有没有问题啊',
    regular: ({value}) => {
      return value == 12
    }
  }
}) 
Freedomen.configs({
  upload: {
    action: 'http://localhost:8090/fdapi/Tab/importFile'
  },
  form: {
    labelWidth: '80px'
  },
  table: {
    border: false
  }
})
Freedomen.styles({
  'span-test': {
    color: 'red'
  },
  'input-len10': {
    width: '220px'
  },
  'input-len15': {
    width: '250px'
  }
})
Freedomen.registerElements({Hello})

Vue.use(Freedomen) 
// import external from './plug/config/external'
// external.privileges = function(column) {
//   if (column.prop == 'm416')
//     return false

//   return true
// }
// console.log(external)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
