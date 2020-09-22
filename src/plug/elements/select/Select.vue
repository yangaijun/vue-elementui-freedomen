<template>
    <el-select
        v-if="mixin_type(item) === 'select-remote'"
        v-model="item.value"
        :class="mixin_class(item.class, item.value, item.$data)"
        :style="[defalutStyles[mixin_type(item)], mixin_style(item.style, item.value, item.$data)]"
        :placeholder="item.placeholder"
        :allow-create="item.config && item.config.allowCreate"
        :clearable="item.config && item.config.clearable"
        :loading="loading"
        :disabled="disabled()"
        filterable
        reserve-keyword
        remote
        @change="change"  
        :remote-method="remoteMethod"
    >
        <el-option
            v-for="option in mixin_reset_options(options)"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="mixin_disabled(item.disabled, option.value, item.$data)" 
        >
        </el-option>
    </el-select>
    <el-select
        v-else
        v-model="item.value"
        :placeholder="item.placeholder"
        :class="mixin_class(item.class, item.value, item.$data)"
        :style="[defalutStyles[mixin_type(item)], mixin_style(item.style, item.value, item.$data)]"
        :allow-create="item.config && item.config.allowCreate"
        :filterable="item.config && item.config.filterable"
        :clearable="item.config && item.config.clearable"
        :multiple="mixin_type(item) === 'select-multiple'"
        :disabled="disabled()"
        @change="change" 
    >
        <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="mixin_disabled(item.disabled, option.value, item.$data)"
        >
        </el-option>
    </el-select>
</template>
<script>
import base from '../../mixins/base.js';
import external from '../../config/external.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdselect',
    data() {
        return {
            loading: false,
            options: []
        }
    },
    watch: { 
        selfValue(nd, od) { 
            if (typeof nd === 'number') 
                this.item.value = nd + ''
            else if (this.mixin_type(this.item) == 'select-multiple' && !this.testValue(nd, od))
                this.resetValue(nd)
        } 
    },
    computed: {
        selfValue() {
            return  this.item.value
        } 
    },
    methods: {
        change() {
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        },
        disabled() {
            let item = this.item
            if (item.disabled === void 0)
                return  
            for (let option of  this.mixin_reset_options(this.options)) {
                if (!this.mixin_disabled(item.disabled, option.value, item.$data))
                    return
            }
            return true
        },
        remoteMethod(query) {
            if (query !== '')
                this.loading = true
            let promise = new Promise((resolve, reject) => {
                this.item.options({query, resolve}) 
            }) 
            promise.then(_options => {
                this.loading = false
                this.options = _options
            })
        },
        resetOptions() {
            this.mixin_options(this.item.options)
        },
        testValue(nd, od) {
            if (typeof nd === typeof od) {
                if (Array.isArray(nd) && nd.length && od.length) {
                    return nd[0] === od[0] && nd.length === od.length
                }
                return true
            } 
            return false
        },
        resetValue(value) {
            if (Array.isArray(value))
                this.item.value = value.map(_value => {
                    return _value + ''
                })
            else if (typeof value === 'string') {
                this.item.value = value.split(',')
            } else if (typeof value === 'number') {
                this.item.value = [value + '']
            } else {
                throw new Error('not support type of the value, just support: string, array, number => to array')
            }
        }
    },
    created() {
        if (this.mixin_type(this.item) === 'select-remote' && typeof this.item.options !== 'function')
            console.warn('remote type the options must be promise: resolve([{label:,value:}]/{"value":"label"}/"a,b,c")')

        if (this.item.value === void 0) {
            this.$set(this.item, 'value', this.mixin_type(this.item) == 'select-multiple' ? [] : '')
        } else {
            if (this.mixin_type(this.item) == 'select-multiple') {
                this.resetValue(this.item.value)
            } else {
                this.item.value += ''
            }
        }
        this.defalutStyles = external.defaultStyles
        this.item.$data[this.item.prop] = this.item.value 
        if (this.mixin_type(this.item) !== 'select-remote')
            this.resetOptions()
        this.mixin_config('select') 

        if (this.mixin_type(this.item) !== 'select-remote' && typeof this.item.options === 'function') {
            this.item.$optionsFresh(this.resetOptions)
        }
    }
}
</script>
