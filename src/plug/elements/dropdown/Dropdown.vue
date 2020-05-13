<template>
    <el-dropdown @command="click" :size="item.size">
        <el-button type="primary" v-if="mixin_type(item) == 'dropdown-button'">
            {{item.text}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <span class="el-dropdown-link" v-else>
          {{item.text}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="option in options" :key="option.value" :command="option.value">
              {{option.label}} 
          </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    mixins: [base],
    name: 'fddropdown',
    data() {
        return {
            options: []
        }
    },
    watch: { 
        item: {
            handler (nd, od) {
                if (this.item.options && (typeof this.item.options === 'function' || nd.options !== od.options)) 
                    this.resetOptions()
            },
            deep: true
        } 
    }, 
    methods: {
        click(value) {
            this.mixin_event({
                type: 'click',
                prop: this.item.prop,
                value: value
            })
        },
        resetOptions() {
            this.mixin_options(this.item.options)
        }
    },
    created() {
        this.resetOptions()
    }
}
</script>
