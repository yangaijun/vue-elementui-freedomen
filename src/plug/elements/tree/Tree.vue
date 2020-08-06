<template>
    <el-tree
        :data="item.options || []"
        :ref="treeRef"
        node-key="value"
        default-expand-all
        highlight-current
        @check-change="change"
        :style="mixin_style(item.style, item.value, item.$data)"
        :class="mixin_class(item.class, item.value, item.$data)"
        :show-checkbox="item.type === 'tree-select'">
    </el-tree>
</template>
<script>
import base from '../../mixins/base.js';
import util from '../../utils/util.js'
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdtree',
    computed: {
        treeRef: () => {
            return 'tree' + util.getUUID()
        }
    },
    methods: {
        change() {
            this.item.value = this.$refs[this.treeRef].getCheckedKeys()
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        }
    },
    mounted() { 
        this.$refs[this.treeRef].setCheckedKeys(this.item.value);
    },
    created() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        }
        this.item.$data[this.item.prop] = this.item.value
        this.mixin_config('upload') 
    }
}
</script>
