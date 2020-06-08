<template>
<span>
    <el-autocomplete
        v-if="mixin_type(item) == 'input-remote'"
        v-model="item.value"
        :fetch-suggestions="options"
        placeholder="请输入内容"
        @select="change"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]"
        :prefix-icon="icon(item.prefixIcon)"
        :suffix-icon="icon(item.suffixIcon)" 
    >
    </el-autocomplete>
    <el-input 
        @change="change" 
        v-else
        :type="inputType(mixin_type(item))" 
        v-model="item.value"
        :rows="item.config && item.config.rows"
        :size="item.config && item.config.size" 
        :minlength="item.config && item.config.minlength"
        :maxlength="item.config && item.config.maxlength"
        :show-password="item.config && item.config.showPassword"
        :show-word-limit="!!(item.config && item.config.maxlength)" 
        :disabled="mixin_disabled(item.disabled, item.value, item.$data)"
        :placeholder="item.placeholder" 
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]"
        :clearable="(item.config && item.config.clearable === false) ? false : true"
        :prefix-icon="icon(item.prefixIcon)"
        :suffix-icon="icon(item.suffixIcon)" 
    >
        <fd-region 
            v-if="item.soltPrepend"
            slot="prepend"
            :columns="Array.isArray(item.soltPrepend)?item.soltPrepend:[item.soltPrepend]"
            :data="item.$data"
            @event="event"
        />
        <fd-region 
            v-if="item.soltAppend"
            slot="append"
            :columns="Array.isArray(item.soltAppend)?item.soltAppend:[item.soltAppend]"
            :data="item.$data"
            @event="event"
        />
    </el-input>
    </span>
</template>
<script>
import base from '../../mixins/base.js'
import store from '../../core/store'
import external from '../../config/external.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdinput',
    data() {
        return {}
    },
    methods: {
        inputType(type) {
            return {
                'input': 'text',
                'input-password': 'password',
                'input-area': 'textarea'
            }[type]
        },
        icon(icon) {
            if (typeof icon == 'function') {
                return icon({value: this.item.value, data: this.item.$data, store: store})
            } else {
                return icon
            }
        },
        change() {
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        },
        event(params) {
            this.$emit('event', params)
        },
        options(query, resolve) {
            this.item.options({data: this.item.$data, value: this.item.value, store: store, resolve: resolve, query: query})
        }
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', '')
        } 
        this.item.$data[this.item.prop] = this.item.value
        this.defalutStyles = external.defaultStyles
        this.mixin_config('input') 
    }
}
</script>
