<template>
    <el-progress 
        :percentage="item.value"
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
    data() {
        return {}
    },
    methods: {
    }
  
}
</script>
