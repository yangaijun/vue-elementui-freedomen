<template>
    <img 
        :class="item.class"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.data)]"
        :src="mixin_filter(item.filter, item.value, item.$data) || item.value"
    />
</template>
<script>
import base from '../../mixins/base.js';
import external from '../../config/external.js'
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
    name: 'fdimg',
    created() {
        this.defalutStyles = external.defaultStyles
    }
}
</script>
