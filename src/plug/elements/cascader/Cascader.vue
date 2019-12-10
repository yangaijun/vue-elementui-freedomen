<template>
    <el-cascader
        :placeholder="item.placeholder"
        :options="options"
        v-model="item.value"
        @change="change"
        :show-all-levels="item.config && item.config.showAllLevels"
        :props="item.config && item.config.props"
        :change-on-select="item.config && item.config.changeOnSelect"
        filterable 
        clearable
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
        return {
            options: []
        }
    },
    watch: {
        externalOptions: 'resetOptions'
    },
    computed: {
        externalOptions () {
            return this.item.options
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
    }
}
</script>
