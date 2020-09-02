<template>
<span>
    <el-autocomplete
        v-if="mixin_type(item) == 'input-remote'"
        v-model="theValue"
        :fetch-suggestions="options" 
        :placeholder="item.placeholder"
        @select="change"
        @change="change"
        :class="mixin_class(item.class, item.value, item.$data)"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]"
        :prefix-icon="icon(item.prefixIcon)"
        :suffix-icon="icon(item.suffixIcon)" 
    >
        <template v-if="tempItem.scopedSlot" slot-scope="{ item }">
            <fd-region  
                :columns="tempColumns(tempItem.scopedSlot)"
                :data="item" 
            />
        </template>
    </el-autocomplete>
    <el-input 
        v-else
        :type="inputType(mixin_type(item))" 
        v-model="theValue"
        :rows="item.config && item.config.rows"
        :size="item.config && item.config.size" 
        :minlength="item.config && item.config.minlength"
        :maxlength="item.config && item.config.maxlength"
        :show-password="item.config && item.config.showPassword"
        :show-word-limit="!!(item.config && item.config.maxlength)" 
        :disabled="mixin_disabled(item.disabled, item.value, item.$data)"
        :placeholder="item.placeholder" 
        :class="mixin_class(item.class, item.value, item.$data)"
        :style="[defalutStyles[mixin_type(item)], mixin_style(item.style, item.value, item.$data)]"
        :clearable="(item.config && item.config.clearable === false) ? false : true"
        :prefix-icon="icon(item.prefixIcon)"
        :suffix-icon="icon(item.suffixIcon)" 
        @change="ichange('change')" 
        @focus="ichange('focus')"
        @blur="ichange('blur')"
        @input="ichange('input')"
        @clear="ichange('clear')"
    >
        <fd-region 
            v-if="item.slotPrepend"
            slot="prepend"
            :columns="Array.isArray(item.slotPrepend)?item.slotPrepend:[item.slotPrepend]"
            :data="item.$data"
            @event="event"
        />
        <fd-region 
            v-if="item.slotAppend"
            slot="append"
            :columns="Array.isArray(item.slotAppend)?item.slotAppend:[item.slotAppend]"
            :data="item.$data"
            @event="event"
        />
    </el-input>
</span>
</template>
<script>
import base from '../../mixins/base.js'
import store from '../../core/store'
import util from '../../utils/util'
import external from '../../config/external.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdinput',
    data() {
        return {
            tempItem: '',
            theValue: ''
        }
    },
    watch: {
        'item.value'(nd) { 
            this.theValue = this.item.value
        }
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
        ichange(type) { 
            if (this.item.config && this.item.config.changeEventType) {
                if (this.item.config.changeEventType === type) {
                    this.change()
                }
            } else if (type === 'change') { 
                this.change()
            }
        },
        change() {
            this.item.value = this.theValue
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        },
        tempColumns(columns) {
            return util.clone(columns)
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
        this.theValue = this.item.value
        this.item.$data[this.item.prop] = this.item.value
        this.defalutStyles = external.defaultStyles
        this.mixin_config('input') 
        this.tempItem = this.item 
    }
}
</script>
