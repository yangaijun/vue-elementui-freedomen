 

function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'
}
export default {
    methods: {
        mixin_filter(filter, value, data) {
            if (filter === void 0) {
                return value
            } else if (typeof filter === 'function') {
                return filter({value: value, data: data})
            } else if (isPlainObject(filter)) {
                return filter[value] || filter.$default
            }
            return filter
        },
        mixin_style(style, value, data) {
            if (typeof style === 'function') {
                return style({value: value, data: data})
            }
            return style
        },
        mixin_disabled(disabled, value, data) {
            if (typeof disabled === 'function') {
                return disabled({value: value, data: data})
            }
            return disabled
        },
        mixin_event(params) {
            this.$emit('event', params)
        },
        //options ? "a,b,c" || {a: '1', b: '2'} => [{label: 'a', value: 'a'}]
        mixin_options(options) {
            if (isPlainObject(options)) {
                let newOptions = []
                for (let key in options) {
                    newOptions.push({
                        value: key,
                        label: options[key]
                    })
                }
                return newOptions
            } else if (typeof options === 'string') {
                let newOptions = [], tempOptions = options.split(',')
                for (let key of tempOptions) {
                    newOptions.push({
                        value: key,
                        label: key
                    })
                }
                return newOptions
            }
            return options || []
        }
    },
}