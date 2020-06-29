<template>
    <el-tag 
        :closable="item.config && item.config.closable"
        @close="click"
        :style="[defalutStyles[item.type], mixin_style(item.style, item.value, item.$data)]"
        :type="tagType(mixin_type(item))" > 
        {{ mixin_filter(item.filter, item.value, item.$data) }}
    </el-tag>
</template>
<script>
import base from '../../mixins/base.js';
import external from '../../config/external.js'
export default {
    props: ['item'],
    name: 'fdtag',
    mixins: [base],
    data() {
        return {}
    },
    methods: {
        tagType(type) {
            return {
                'tag-success': 'success',
                'tag-info': 'info',
                'tag-warning': 'warning',
                'tag-danger': 'danger' 
            }[type]
        },
        click() {
            this.mixin_event({
                type: 'close',
                prop: this.item.prop,
                value: this.item.value
            })
        }
    },
    created() {
        this.defalutStyles = external.defaultStyles
        this.mixin_config('tag') 
    }
}
</script>
