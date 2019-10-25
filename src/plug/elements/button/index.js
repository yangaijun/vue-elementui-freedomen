//button, button-primary, button-success, button-info, button-warning, button-danger
import FdButton from './Button.vue'
FdButton.install = function (Vue) {
    Vue.component(FdButton.name, FdButton)
}

export default FdButton