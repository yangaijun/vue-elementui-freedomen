<template>
    <el-progress 
        :percentage="mixin_filter(item.filter, item.value, item.$data)"
        :style="mixin_style(item.style, item.value, item.data)"
    >
    </el-progress>
</template>
<script>
import base from '../../mixins/base.js';
/**
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    name: 'fdprogress',
    mixins: [base],
    methods: {
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', 0)
        }
        this.item.$data[this.item.prop] = this.item.value
    }
    
}
</script>
