<template>
    <el-select
        v-model="item.value"
        :placeholder="item.placeholder"
        :allow-create="item.config && item.config.allowCreate"
        :filterable="item.config && item.config.filterable === false ? false : true"
        :clearable="item.config && item.config.clearable"
        
        :multiple="item.type === 'select-multiple'"
        @change="change" 
    >
        <el-option
            v-for="option in mixin_options(item.options)"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="mixin_disabled(item.disabled, option.value, item.$data)"
            :style="mixin_style(item.style, option.value, item.data)"
        >
        </el-option>
    </el-select>
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      clearable: true 
 * }
 * next: options: [{...}, {...}], label: '', value: '', @change => add row
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    mixins: [base],
    name: 'fdselect',
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
    mounted() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', this.item.type == 'select-multiple' ? [] : '')
        } else {
            if (this.item.type == 'select-multiple') {
                this.item.value = this.item.value.map(value => {
                    return value + ''
                })
            } else {
                this.item.value += ''
            }
          
        }
    }
}
</script>
