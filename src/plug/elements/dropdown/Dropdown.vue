<template>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{item.label}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  v-for="option in mixin_options(item.options)" :key="option.value">
            黄金糕

        </el-dropdown-item>
        
      </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
import base from '../../mixins/base.js';
/**
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    mixins: [base],
    name: 'fddate',
    data() {
        return {}
    },
    methods: {
        change() {
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        },
        min() {
            if (typeof this.item.min === 'function') {
                return this.item.min({value: this.item.value, data: this.item.$data})
            }
            return this.item.min || 0
        },
        max() {
            if (typeof this.item.max === 'function') {
                return this.item.max({value: this.item.value, data: this.item.$data})
            }
            return this.item.max 
        },
        step() {
            if (typeof this.item.step == 'function') {
                return this.item.step({value: this.item.value, data: this.item.$data})
            }
            return this.item.step || 1
        }
    },
    mounted() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', 0)
        }
    }
}
</script>
