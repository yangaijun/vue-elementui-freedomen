<template>
    <el-button 
        :type="buttonType(mixin_type(item))" 
        @click="click" 
        :icon="item.icon"
        :loading="item.loading" 
        :size="item.config && item.config.size"
        :round="item.config && item.config.round"
        :disabled="mixin_disabled(item.disabled, item.value, item.$data)"
        :style="mixin_style(item.style, item.value, item.data)"
        :plain="item.config && item.config.plain"
        :circle="item.config && item.config.circle"
        :autofocus="item.config && item.config.autofocus"
        :native-type="item.config && item.config.nativeType"
    >
        {{mixin_filter(item.filter, item.value, item.$data)}}
    </el-button>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    name: 'fdbutton',
    mixins: [base],
    data() {
        return {}
    },
    methods: {
        buttonType(type) {
            return {
                'button-text': 'text',
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
