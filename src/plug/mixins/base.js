 
import  util from '../utils/util'
import store from '../core/store'

export default {
    methods: {
        mixin_filter(filter, value, data) {
            if (filter === void 0) {
                return value
            } else if (typeof filter === 'function') {
                return filter({value: value, data: data, store: store})
            } else if (util.isPlainObject(filter)) {
                return filter[value] || filter.$default
            } else if (typeof filter === 'string') { 
                let date = new Date(value)
                if (date == 'Invalid Date')
                    return value || ''
                return util.formatDate.format(date, filter)
            }
            return filter
        },
        mixin_style(style, value, data) {
            if (typeof style === 'function') {
                return style({value: value, data: data, store: store})
            }
            return style
        },
        mixin_disabled(disabled, value, data) {
            if (typeof disabled === 'function') {
                return disabled({value: value, data: data, store: store})
            }
            return disabled
        },
        mixin_event(params) {
            this.$emit('event', params)
        },  
        mixin_type(item) { 
            let type = item.type
            if (typeof type === 'string') {
                return type
            } else if (typeof type === 'function') {
                return this.mixin_type({
                    value: item.value, 
                    data: item.$data, 
                    type: type({value: item.value, data: item.$data, store: store})
                })
            }
            return '' 
        },
        mixin_reset_options(options) {
            let newOptions = [] 
            if (util.isPlainObject(options)) { 
                for (let key in options) {
                    newOptions.push({
                        value: key + '',
                        label: options[key]
                    })
                }
                return newOptions
            } else if (typeof options === 'string') {
                let tempOptions = options.split(',')
                for (let key of tempOptions) {
                    newOptions.push({
                        value: key + '',
                        label: key
                    })
                } 
            }
            return newOptions || []
        },
        //options ? "a,b,c" || {a: '1', b: '2'} => [{label: 'a', value: 'a'}]
        mixin_options(options, deal = true) { 
            if (typeof options === 'function') {
                let promise = new Promise((resolve) => {
                    this.item.options({resolve: resolve, data: this.item.$data, store: store}) 
                }) 
                promise.then(_options => { 
                    if (deal)
                        this.options = this.mixin_reset_options(_options)
                    else this.options = _options
                })
            } else {  
                this.options = deal ?  this.mixin_reset_options(options) : options
            }
        }
    },
}