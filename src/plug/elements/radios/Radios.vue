<template>
    <div>
        <el-radio-group
            v-if="item.type=='radio-buttons'"
            v-model="item.value"
            @change="change">
            <el-radio-button
                v-for="option in mixin_options(item.options)"
                :key="option.value"
                :label="option.value"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)">
                {{option.label}}
            </el-radio-button>
        </el-radio-group>
        <el-radio-group
            v-else
            v-model="item.value"
            @change="change">
            <el-radio
                v-for="option in mixin_options(item.options)"
                :key="option.value"
                :label="option.value"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)">
                    {{option.label}}
            </el-radio>
        </el-radio-group>
    </div>
    
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
    mounted() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', '')
        } else {
            this.item.value = this.item.value + ''
        }
    }
}
</script>
