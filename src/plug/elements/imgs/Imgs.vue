<template>
    <div class="fd_imgs" style="display: flex;">
        <el-image 
            v-for="(el, index) in item.value"
            :key="index"
            :class="['fd_imgs_item', item.class]"
            :preview-src-list="getPreviewSrcList(index)"
            :style="[defalutStyles[item.type], mixin_style(item.style, el, item.$data)]"
            :src="mixin_filter(item.filter, el, item.$data) || el"
        />
    </div> 
</template>
<script>
import base from '../../mixins/base.js';
import external from '../../config/external.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdimgs',
    methods: {
        getPreviewSrcList(index) {
            if (this.item.previewSrcList) {
                return this.item.previewSrcList.slice(index).concat(this.item.previewSrcList.slice(0, index))
            }
        }
    },
    created() {
        this.defalutStyles = external.defaultStyles
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        } else if (!Array.isArray(this.item.value)) {
            this.item.value = this.item.value.split(',')
        }
        this.item.$data[this.item.prop] = this.item.value

        if (this.item.filter && this.item.previewSrcList) {
            this.item.previewSrcList = this.item.previewSrcList.map(img => {
                return this.mixin_filter(this.item.filter, img, this.item.$data)
            })
        }
    }
}
</script>
