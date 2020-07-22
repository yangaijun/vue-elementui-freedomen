import base from '../../mixins/base.js';
import external from '../../config/external.js'
const text = {  
    name: 'fdtext', 
    mixins: [base],
    props:  {
        item: Object
    },   
    render: function (createElement){     
        let item = this.item
        let tag = item.config && item.config.tag || 'span'
        return createElement(tag, {
            class: this.mixin_class(item.class, item.value, item.$data),
            style: [external.defaultStyles[this.mixin_type(item)], this.mixin_style(item.style, item.value, item.$data)]
        }, this.mixin_filter(item.filter, item.value, item.$data))
    }
}
text.install = function (Vue) {
    Vue.component(text.name, text)
}
export default text