import store from '../../core/store'

const render = {  
    name: 'fdrender', 
    props:  {
        item: Object
    }, 
    render: function (createElement){  
        let item = this.item
        let throwEvent = (params) => {  
            if (this.item.value !== void 0 && this.item.prop) {
                this.$emit('event', {
                    prop: this.item.prop,
                    type: params.type,
                    value: this.item.value,
                    row: params
                })
            } else {
                this.$emit('event', params)
            }
        }
        let _render = item.render({
            data: item.$data, 
            value: item.value,
            store: store,
            createElement
        })

        if (Array.isArray(_render)) {
            return createElement('FdRegion', {
                props: {
                    data: item.value || item.$data,
                    columns: _render
                },
                on: {
                    event: params => {
                        throwEvent(params)
                    }
                }
            })
        } else {
            return _render
        } 
    } 
}
render.install = function (Vue) {
    Vue.component(render.name, render)
}
export default render