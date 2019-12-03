import FdVuex from './Vuex'
FdVuex.install = function (Vue) {
    Vue.component(FdVuex.name, FdVuex)
}

export default FdVuex