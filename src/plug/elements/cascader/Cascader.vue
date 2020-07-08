<template>
    <el-cascader
        :placeholder="item.placeholder"
        :style="mixin_style(item.style, item.value, item.data)"
        :class="mixin_class(item.class, item.value, item.$data)"
        :options="options"
        v-model="item.value"
        @change="change"
        :show-all-levels="item.config && item.config.showAllLevels"
        :props="item.config && item.config.props" 
        filterable 
        clearable
    >
    </el-cascader>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    name: 'fdcascader',
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
        resetOptions() {
            this.mixin_options(this.item.options, false)
        },
        click() {
            this.mixin_event({
                type: 'click',
                prop: this.item.prop,
                value: this.item.value
            })
        }
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        }
        this.item.$data[this.item.prop] = this.item.value
        this.resetOptions()
        this.mixin_config('cascader') 
    }
}
</script>
