<template>
    <span>
        <el-time-select
            v-if="mixin_type(item) === 'date-time'"
            v-model="theValue"
            :picker-options="(item.config && item.config.pickerOptions) || {
                start: '06:00',
                step: '00:15',
                end: '22:00'
            }"
            @change="change"
            :size="item.config && item.config.size" 
            :disabled="mixin_disabled(item.disabled, item.value, item.$data)"
            :style="[defalutStyles[mixin_type(item)], mixin_style(item.style, item.value, item.$data)]"
            :class="mixin_class(item.class, item.value, item.$data)"
            :value-format="item.config && item.config.valueFormat"
            :format="item.config && item.config.format"
            :clearable="(item.config && item.config.clearable === false) ? false : true"
            :placeholder="item.placeholder">
        </el-time-select>
        <el-date-picker
            v-else
            v-model="theValue"
            :type="getDateType()"
            @change="change"
            :size="item.config && item.config.size" 
            :clearable="(item.config && item.config.clearable === false) ? false : true"
            :disabled="mixin_disabled(item.disabled, item.value, item.$data)"
            :style="[defalutStyles[mixin_type(item)], mixin_style(item.style, item.value, item.$data)]"
            :class="mixin_class(item.class, item.value, item.$data)"
            :value-format="item.config && item.config.valueFormat"
            :format="item.config && item.config.format"
            :placeholder="item.placeholder">
        </el-date-picker>
    </span>
</template>
<script>
import base from '../../mixins/base.js';
import external from '../../config/external.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fddate',
    data() {
        return {
            theValue: ''
        }
    },
    watch: {
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
        getDateType() {
            return this.mixin_type(this.item).split('-')[1]
        }
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', '')
        }
        this.theValue = this.item.value
        this.defalutStyles = external.defaultStyles
        this.item.$data[this.item.prop] = this.item.value
        this.mixin_config('date') 
    }
}
</script>
