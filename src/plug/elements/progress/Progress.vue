<template>
    <el-progress 
        :percentage="mixin_filter(item.filter, item.value, item.$data)"
        :style="mixin_style(item.style, item.value, item.$data)"
        :class="mixin_class(item.class, item.value, item.$data)"
        :stroke-width="item.config && item.config.strokeWidth"
        :text-inside="item.config && item.config.textInside"
        :status="item.config && item.config.status"
    >
    </el-progress>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    name: 'fdprogress',
    mixins: [base],
    methods: {},
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', 0)
        }
        this.item.$data[this.item.prop] = this.item.value
        this.mixin_config('progress') 
    }
}
</script>
