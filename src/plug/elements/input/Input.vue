<template>
    <el-input 
        @change="change" 
        :type="inputType(item.type)" 
        v-model="item.value"
        :rows="item.config && item.config.rows"
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
    //prop, value, config: {}, filter, disabled, link?to router, $data
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
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', '')
        }
        this.item.$data[this.item.prop] = this.item.value
    }
}
</script>
