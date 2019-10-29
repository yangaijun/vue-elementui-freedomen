<template>
    <el-input 
        @change="change" 
        :type="inputType(item.type)" 
        v-model="item.value"
        :disabled="mixin_disabled(item.disabled, item.value, item.data)"
        :placeholder="item.placeholder" 
        :style="mixin_style(item.style, item.value, item.data)"
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
    }
}
</script>
