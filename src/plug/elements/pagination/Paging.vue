<template>
    <el-input 
        @change="change" 
        :type="inputType(item.type)" 
        v-model="item.value"
        :disabled="mixin_disabled(item.disabled, item.value, item.data)"
        :placeholder="item.placeholder" 
        :style="mixin_style(item.style, item.value, item.data)"
        :clearable="(item.config && item.config.clearable === false) ? false : true"
        :prefix-icon="item.prefixIcon"
        :suffix-icon="item.suffixIcon"
    >
    </el-input>
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      plain: true 
 *      round: true
 * }
 */
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdinput',
    data() {
        return {}
    },
    methods: {
        inputType(type) {
            return {
                'input': 'text',
                'input-password': 'password',
                'input-area': 'textarea'
            }[type]
        },
        change() {
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        }
    }
}
</script>
