<template>
    <el-slider 
        v-model="item.value" 
        @change="change"
        :min="min()"
        :max="max()"
        :step="item.step"
        :style="mixin_style(item.style, item.value, item.$data)"
        :class="mixin_class(item.class, item.value, item.$data)"
        :disabled="mixin_disabled(item.disabled, item.value, item.$data)">
    </el-slider>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdslider',
    data() {
        return {}
    },
    methods: {
        min() {
            if (typeof this.item.min === 'function') {
                return this.item.min({value: this.item.value, data: this.item.$data})
            }
            return this.item.min || 0
        },
        max() {
            if (typeof this.item.max === 'function') {
                return this.item.max({value: this.item.value, data: this.item.$data})
            }
            return this.item.max || 100
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
            this.$set(this.item, 'value', this.min())
        } 
        this.item.$data[this.item.prop] = this.item.value
        this.mixin_config('slider') 
    }
}
</script>
