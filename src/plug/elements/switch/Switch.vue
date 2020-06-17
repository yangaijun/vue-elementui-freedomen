<template>
    <el-switch
        v-model="item.value"
        :active-color="item.config && item.config.activeColor"
        :inactive-color="item.config && item.config.inactiveColor"
        :active-value="item.config && item.config.activeValue"
        :inactive-value="item.config && item.config.inactiveValue"
        :active-text="item.config && item.config.activeText"
        :inactive-text="item.config && item.config.inactiveText"
        :disabled="!!mixin_disabled(item.disabled, item.value, item.data)"
        :style="mixin_style(item.style, item.value, item.data)"
        @change="change">
    </el-switch>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdswitch', 
    methods: {
        change() {
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        }
    },
    mounted() { 
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', false)
        } 
        this.item.$data[this.item.prop] = this.item.value
        this.mixin_config('switch') 
    }
}
</script>
