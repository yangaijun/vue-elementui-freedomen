<template>
    <el-button 
        :type="buttonType(item.type)" 
        @click="click" 
        :disabled="mixin_disabled(item.disabled, item.value, item.data)"
        :plain="item.config && item.config.plain"
        :round="item.config && item.config.round"
    >
        {{mixin_filter(item.filter, item.value, item.$data)}}
    </el-button>
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
    data() {
        return {}
    },
    methods: {
        buttonType(type) {
            return {
                'button-primary': 'primary',
                'button-success': 'success',
                'button-info': 'info',
                'button-warning': 'warning',
                'button-danger': 'danger'
            }[type]
        },
        click() {
            this.mixin_event({
                type: 'click',
                prop: this.item.prop,
                value: this.item.value
            })
        }
    }
}
</script>
