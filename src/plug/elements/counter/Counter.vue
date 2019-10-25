<template>
    <el-input-number
        v-model="item.value"
        @change="change" 
        :disabled="mixin_disabled(item.disabled, item.value, item.$data)"
        :controls-position="item.config && item.config.controlsPosition"
        :min="min()"
        :max="max()"
    >
    </el-input-number>
</template>
<script>
import base from '../../mixins/base.js';
/**
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    mixins: [base],
    name: 'fdcounter',
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
        },
        min() {
            if (typeof this.item.min === 'function') {
                return this.item.min({value: this.item.value, data: this.item.$data})
            }
            return this.item.min || 0
        },
        max() {
            if (typeof this.item.max === 'function') {
                return this.item.max({value: this.item.value, data: this.item.$data})
            }
            return this.item.max 
        },
        step() {
            if (typeof this.item.step == 'function') {
                return this.item.step({value: this.item.value, data: this.item.$data})
            }
            return this.item.step || 1
        }
    },
    mounted() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', 0)
        }
    }
}
</script>
