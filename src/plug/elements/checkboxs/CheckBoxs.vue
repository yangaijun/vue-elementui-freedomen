<template>
    <div>
        <el-checkbox-group
            v-if="item.type=='check-buttons'"
            :min="min()"
            :max="max()"
            v-model="item.value">
            <el-checkbox-button
                v-for="option in mixin_options(item.options)"
                :key="option.value"
                :label="option.value"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)"
                @change="change">
                {{option.label}}
            </el-checkbox-button>
        </el-checkbox-group>
        <el-checkbox-group
            v-else
            :min="min()"
            :max="max()"
            v-model="item.value">
            <el-checkbox
                v-for="option in mixin_options(item.options)"
                :key="option.value"
                :label="option.value"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)"
                @change="change">
                    {{option.label}}
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
        return {}
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
    },
    mounted() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        } else {
            if (Array.isArray(this.item.value))
                this.item.value = this.item.value.map(value => {
                    return value + ''
                })
            else if (typeof this.item.value === 'string' || typeof this.item.value === 'number') {
                this.item.value = [this.item.value + '']
            } else {
                throw new Error('not support type of the value, just support: string, array, number => to array')
            }
        }
    }
}
</script>
