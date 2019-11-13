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
                :style="mixin_style(item.style, option.value, item.data)"
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
                :style="mixin_style(item.style, option.value, item.data)"
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
    name: 'fdradio',
    mixins: [base],
    data() {
        return {}
    },
    watch: {
        item: {
            handler(nd, od) {
                if (typeof nd.value === 'number') 
                    this.item.value = nd.value + ''
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
        }
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', '')
        } else {
            this.item.value = this.item.value + ''
        }
        this.item.$data[this.item.prop] = this.item.value
    }
}
</script>
