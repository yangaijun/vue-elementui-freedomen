import components from './components.js'
import external from './config/external.js'
import store from './core/store'
import exComponents from './config/components'
import distpicker from './components/extends/distpicker' 
import tinymce from './components/extends/tinymce'

import { search } from './action' 
const install = function(Vue) {
    Vue.observable(store)

    components.map(component => {
        Vue.component(component.name, component)
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export const Tinymce = tinymce 
export const districts = distpicker

export default {
    install,
    privileges: external.privileges,
    rules: external.addRules,
    styles: external.addStyles,
    configs: external.addConfigs,
    registerElements: exComponents.registerElements,
    action: { search }
}