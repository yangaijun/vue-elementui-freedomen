<template>
    <el-switch
        v-model="item.value"
        :active-color="item.config && item.config.activeColor"
        :inactive-color="item.config && item.config.inactiveColor"
        :active-value="activeValue"
        :inactive-value="inactiveValue"
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
    data() {
        return {
            activeValue: 1,
            inactiveValue: 0
        }
    },
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
        if (this.item.config && this.item.config.activeValue !== void 0) {
            this.activeValue = this.item.config.activeValue
        } 
        if (this.item.config && this.item.config.inactiveValue !== void 0) {
            this.inactiveValue = this.item.config.inactiveValue
        }

        if (this.item.value === void 0) {
            this.$set(this.item, 'value', this.inactiveValue)
        } 
        this.item.$data[this.item.prop] = this.item.value
    }
}
</script>
