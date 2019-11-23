<template>
    <el-checkbox v-model="item.value" @change="change">
        {{mixin_filter(item.filter, item.label, item.$data)}}
    </el-checkbox>
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      clearable: true 
 * }
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    name: 'fdcheckbox',
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
        }
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', false)
        } 
        this.item.$data[this.item.prop] = this.item.value
    }
}
</script>
