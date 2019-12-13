<template>
    <div>
        <el-checkbox-group
            v-if="mixin_type(item) == 'check-buttons'"
            :min="min()"
            :max="max()"
            v-model="item.value">
            <el-checkbox-button
                v-for="option in options"
                :key="option.value"
                :label="option.value"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)"
                :style="mixin_style(item.style, option.value, item.data)"
                @change="change">
                {{ option.label }}
            </el-checkbox-button>
        </el-checkbox-group>
        <el-checkbox-group
            v-else
            :min="min()"
            :max="max()"
            v-model="item.value">
            <el-checkbox
                v-for="option in options"
                :key="option.value"
                :label="option.value"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)"
                :style="mixin_style(item.style, option.value, item.data)"
                @change="change">
                    {{ option.label }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
    
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      clearable: true 
 * }
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    name: 'fdcheck',
    mixins: [base],
    data() {
        return {
            options: []
        }
    },
    watch: { 
        item: {
            handler (nd, od) {
                if (this.item.options && (typeof this.item.options === 'function' || nd.options !== od.options)) 
                    this.resetOptions()
            },
            deep: true
        },
        selfValue(nd, od) {
            if (!this.testValue(nd, od)) {
                this.resetValue(nd)
            }
        } 
    }, 
    computed: {
        selfValue(nd, od) {
            return this.item.value
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
        min() {
            if (typeof this.item.min === 'function') {
                return this.item.min({value: this.item.value, data: this.item.$data})
            }
            return this.item.min
        },
        max() {
            if (typeof this.item.max === 'function') {
                return this.item.max({value: this.item.value, data: this.item.$data})
            }
            return this.item.max 
        },
        resetOptions() {
            this.mixin_options(this.item.options)
        },
        testValue(nd, od) {
            if (typeof nd === typeof od) {
                if (Array.isArray(nd) && nd.length && od.length) {
                    return nd[0] === od[0]
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
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        } else {
            this.resetValue(this.item.value)
        } 
        this.item.$data[this.item.prop] = this.item.value
        this.resetOptions()
    }
}
</script>
