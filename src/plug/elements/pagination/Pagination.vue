<template>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="item.pageNo"
      :page-sizes="item.config && item.config.pageSizes || [10, 20, 50, 100]"
      :page-size="item.config && item.config.pageSize || 10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="item.total">
    </el-pagination>
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      plain: true 
 *      round: true
 * }
 */
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdpagination',
    data() {
        return {}
    },
    methods: {
        sizeChange(pageSize) {
            this.mixin_event({
                type: 'change',
                prop: '$pageSize',
                value: pageSize
            })
        },
        currentChange(pageNo) {
            this.mixin_event({
                type: 'change',
                prop: '$pageNo',
                value: pageNo
            })
        },
        
    }
}
</script>
