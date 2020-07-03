<template>
    <hr 
        :color="getColor(item.style)"
        :class="mixin_class(item.class, item.value, item.$data)"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]" 
    />
</template>
<script> 
import external from '../../config/external.js'
import base from '../../mixins/base.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdhr', 
    methods: {
        getColor(style) {
            if (style && style.color)
                return style.color
        }
    },
    created() { 
        this.defalutStyles = external.defaultStyles 
    }
}
</script>
