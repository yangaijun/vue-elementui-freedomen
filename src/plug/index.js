import components from './components.js'
import external from './config/external.js'

const install = function(Vue, config = {}) {
    components.map(component => {
        Vue.component(component.name, component)
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    privileges: external.privileges
}