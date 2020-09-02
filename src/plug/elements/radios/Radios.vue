<template>
    <span>
        <el-radio-group
            v-if="mixin_type(item) === 'radios-button'"
            v-model="theValue"
            :size="item.config&&item.config.size"
            @change="change">
            <el-radio-button
                v-for="option in options"
                :key="option.value"
                :label="option.value" 
                :style="mixin_style(item.style, option.value, item.$data)"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)">
                {{option.label}}
            </el-radio-button>
        </el-radio-group>
        <el-radio-group
            v-else
            v-model="theValue"
            :size="item.config && item.config.size"
            @change="change">
            <el-radio
                v-for="option in options"
                :key="option.value"
                :label="option.value"
                :border="item.config&&item.config.border"
                :style="mixin_style(item.style, option.value, item.$data)"
                :disabled="mixin_disabled(item.disabled, option.value, item.$data)">
                    {{option.label}}
            </el-radio>
        </el-radio-group>
    </span> 
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    name: 'fdradio',
    mixins: [base],
    data() {
        return {
            options: [],
            theValue: ''
        }
    }, 
    watch: { 
        item: {
            handler (nd, od) {
                if (typeof nd.value === 'number')
					this.item.value = nd.value + ''
                    
                if (this.item.options && (typeof this.item.options === 'function' || nd.options !== od.options)) 
                    this.resetOptions()
            },
            deep: true
        }, 
        'item.value'(nd) { 
            this.theValue = this.item.value
        } 
    }, 
    methods: {
        change() {
            this.item.value = this.theValue
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        },
        resetOptions() {
            this.mixin_options(this.item.options)
        }
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', '')
        } else {
            this.item.value = this.item.value + ''
        }
        this.theValue = this.item.value
        this.item.$data[this.item.prop] = this.item.value 
        this.resetOptions()
        this.mixin_config('radio') 
    }
}
</script>
