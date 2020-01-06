<template>
    <el-image 
        :class="item.class"
        :preview-src-list="item.previewSrcList"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]"
        :src="mixin_filter(item.filter, item.value, item.$data) || item.value"
    />
</template>
<script>
import base from '../../mixins/base.js';
import external from '../../config/external.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdimg',
    created() {
        this.defalutStyles = external.defaultStyles

        if (this.item.filter && this.item.previewSrcList) {
            this.item.previewSrcList = this.item.previewSrcList.map(img => {
                return this.mixin_filter(this.item.filter, img, this.item.$data)
            })
        }
    }
}
</script>
