<template>
    <el-tree
        :data="item.options || []"
        :ref="treeRef"
        node-key="value"
        default-expand-all
        highlight-current
        @check-change="change"
        :show-checkbox="item.type === 'tree-select'">
    </el-tree>
</template>
<script>
import base from '../../mixins/base.js';
import util from '../../utils/util.js'
/**
 * config: {
 *      clearable: true 
 * }
 * next: options: [{...}, {...}], label: '', value: '', @change => add row
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
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
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        }
        this.item.$data[this.item.prop] = this.item.value
        this.$refs[this.treeRef].setCheckedKeys(this.item.value);
    }
}
</script>
