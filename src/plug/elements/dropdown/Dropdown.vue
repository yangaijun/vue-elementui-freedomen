<template>
    <el-dropdown @command="click">
      <span class="el-dropdown-link">
        {{item.label}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  v-for="option in mixin_options(item.options)" :key="option.value" :command="option.value">
            {{option.label}} 
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
    name: 'fddropdown',
    methods: {
        click(value) {
            this.mixin_event({
                type: 'click',
                prop: this.item.prop,
                value: value
            })
        }
    }
}
</script>
