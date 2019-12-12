<template>
    <el-select
        v-model="item.value"
        :placeholder="item.placeholder"
        :allow-create="item.config && item.config.allowCreate"
        :clearable="item.config && item.config.clearable"
        v-if="item.type === 'select-remote'"
        :loading="loading"
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
            :style="mixin_style(item.style, option.value, item.data)"
        >
        </el-option>
    </el-select>
    <el-select
        v-model="item.value"
        :placeholder="item.placeholder"
        :allow-create="item.config && item.config.allowCreate"
        :filterable="item.config && item.config.filterable"
        :clearable="item.config && item.config.clearable"
        v-else
        :multiple="item.type === 'select-multiple'"
        @change="change" 
    >
        <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="mixin_disabled(item.disabled, option.value, item.$data)"
            :style="mixin_style(item.style, option.value, item.data)"
        >
        </el-option>
    </el-select>
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      clearable: true 
 * }
 * next: options: [{...}, {...}], label: '', value: '', @change => add row
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    mixins: [base],
    name: 'fdselect',
    data() {
        return {
            loading: false,
            options: []
        }
    },
    computed: {
        externalOptions () {
            return this.item.options
        }
    },
    watch: {
        externalOptions() {
            if (this.item.type !== 'select-remote')
                this.resetOptions()
        },
        item: {
            handler () {
                if (this.item.type !== 'select-remote' && this.item.options && typeof this.item.options === 'function') 
                    this.resetOptions()
            },
            deep: true
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
        remoteMethod(query) {
            if (query !== '')
                this.loading = true
            let promise = new Promise((resolve, reject) => {
                this.item.options(query, resolve) 
            }) 
            promise.then(_options => {
                this.loading = false
                this.options = _options
            })
        },
        resetOptions() {
            this.mixin_options(this.item.options)
        }
    },
    created() {
        if (this.item.type === 'select-remote' && typeof this.item.options !== 'function')
            console.warn('remote type the options must be promise: resolve([{label:,value:}]/{1:2}/"a,b,c")')

        if (this.item.value === void 0) {
            this.$set(this.item, 'value', this.item.type == 'select-multiple' ? [] : '')
        } else {
            if (this.item.type == 'select-multiple') {
                if (Array.isArray(this.item.value))
                    this.item.value = this.item.value.map(value => {
                        return value
                    })
                else if (typeof this.item.value === 'string') {
                    this.item.value = this.item.value.split(',')
                } else if (typeof this.item.value === 'number') {
                    this.item.value = [this.item.value + '']
                } else {
                    throw new Error('not support type of the value, just support: string, array, number => to array')
                }
            } else {
                this.item.value += ''
            }
        }
        this.item.$data[this.item.prop] = this.item.value 
        if (this.item.type != 'select-remote')
            this.resetOptions()
    }
}
</script>
