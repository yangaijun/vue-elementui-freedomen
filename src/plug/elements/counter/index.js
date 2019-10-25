import FdCounter from './Counter.vue'
FdCounter.install = function (Vue) {
    Vue.component(FdCounter.name, FdCounter)
}

export default FdCounter