<template>
    <el-divider :content-position="item.config && item.config.contentPosition" :direction="item.config && item.config.direction">
       {{mixin_filter(item.filter, item.value, item.$data)}}
    </el-divider>
</template>
<script> 
import base from '../../mixins/base.js';
export default { 
    props: ['item'],
    name: 'fddivider',
    mixins: [base],
    created() {
        this.mixin_config('divider') 
    }
}
</script>
