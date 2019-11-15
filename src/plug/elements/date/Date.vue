<template>
    <div>
        <el-time-select
            v-if="item.type==='date-time'"
            v-model="item.value"
            :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
            }"
            @change="change"
            :style="mixin_style(item.style, item.value, item.data)"
            :placeholder="item.placeholder">
        </el-time-select>
        <el-date-picker
            v-else-if="item.type==='date-datetime'"
            v-model="item.value"
            type="datetime"
            @change="change"
            :style="mixin_style(item.style, item.value, item.data)"
            :placeholder="item.placeholder">
        </el-date-picker>
        <el-date-picker
            v-else
            v-model="item.value"
            type="date"
            @change="change" 
            :style="mixin_style(item.style, item.value, item.data)"
            :placeholder="item.placeholder">
        </el-date-picker>
    </div>
</template>
<script>
import base from '../../mixins/base.js';
/**
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    mixins: [base],
    name: 'fddate',
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
        }
        this.item.$data[this.item.prop] = this.item.value
    }
}
</script>
