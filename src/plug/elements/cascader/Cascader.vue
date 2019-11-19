<template>
    <el-cascader
        :placeholder="item.placeholder"
        :options="item.options"
        v-model="item.value"
        @change="change"
        filterable 
    >
    </el-cascader>
</template>
<script>
/**
 * config: {
 *      plain: true 
 *      round: true
 * }
 */
import base from '../../mixins/base.js';

export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    name: 'fdcascader',
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
        click() {
            this.mixin_event({
                type: 'click',
                prop: this.item.prop,
                value: this.item.value
            })
        }
    },
    mounted() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        }
        this.item.$data[this.item.prop] = this.item.value
    }
}
</script>
