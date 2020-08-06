<template>
    <div
        :class="mixin_class(item.class, item.value, item.$data)"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]" 
    >
    </div>
</template>
<script> 
import external from '../../config/external.js'
import base from '../../mixins/base.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdspace', 
    created() { 
        this.defalutStyles = external.defaultStyles 
    }
}
</script>
