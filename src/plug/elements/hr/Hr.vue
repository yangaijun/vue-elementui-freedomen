<template>
    <hr :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]" />
</template>
<script> 
import external from '../../config/external.js'
import base from '../../mixins/base.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdhr', 
    created() { 
        this.defalutStyles = external.defaultStyles 
    }
}
</script>
