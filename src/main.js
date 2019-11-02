// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'mini' })
// import 'mavon-editor/dist/css/index.css'
// import mavonEditor from 'mavon-editor'
// Vue.use(mavonEditor)
import Plug from './plug'

Plug.privileges.Authorized = function({column}) {
 
  return true
}

Vue.use(Plug) 
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
