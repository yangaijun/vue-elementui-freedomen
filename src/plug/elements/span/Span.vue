<template>
    <span 
        :class="mixin_class(item.class, item.value, item.$data)"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]"
    >
        {{ mixin_filter(item.filter, item.value, item.$data) }}
    </span>
</template>
<script>
import base from '../../mixins/base.js';
import external from '../../config/external.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdspan',
    created() {
        this.defalutStyles = external.defaultStyles
    }
}
</script>
