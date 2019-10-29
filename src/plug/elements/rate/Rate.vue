<template>
    <el-rate 
        v-model="item.value" 
        :disabled="mixin_disabled(item.disabled, item.value, item.data)"
        :colors="item.config && item.config.colors || ['#99A9BF', '#F7BA2A', '#FF9900']"
        :max="item.config && item.config.size || 5"
        :style="mixin_style(item.style, item.value, item.data)"
        @change="change"
        >
    </el-rate>
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      plain: true 
 *      round: true
 * }
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    mixins: [base],
    name: 'fdrate',
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
    }
}
</script>
