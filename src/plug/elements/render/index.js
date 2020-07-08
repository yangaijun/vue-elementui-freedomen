import store from '../../core/store'
const render = {  
    name: 'fdrender', 
    props:  {
        item: Object
    },   
    methods: {
        forceUpdate() { 
            this.$forceUpdate()
        }
    },
    render: function (createElement){     
        let item = this.item
        if (typeof item.forceUpdate == 'function') {
            item.forceUpdate(this.forceUpdate)
        }

        let throwEvent = (params) => {  
            if (item.value !== void 0 && item.prop) {
                this.$emit('event', {
                    prop: item.prop,
                    type: params.type,
                    value: item.value,
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