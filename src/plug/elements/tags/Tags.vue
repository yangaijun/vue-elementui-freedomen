<template>
<div>
    <div v-if="mixin_type(item) == 'tags-create'">
        <el-tag
            :key="tag"
            v-for="tag in tempValue"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
                {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else-if="notMax()" class="button-new-tag" size="small" @click="showInput">{{(item.config && item.config.createLabel) || '+ 新建'}}</el-button>
    </div>
    <div v-else>
        <el-tag :key="tag"
            v-for="tag in tempValue"
            :disable-transitions="false">
                {{tag}}
        </el-tag>
    </div>
</div>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    name: 'fdtags',
    mixins: [base],
    data() {
        return {
            inputVisible: false,
            inputValue: '',
            tempValue: [],
        }
    }, 
    watch: {
        selfValue(nd, od) { 
            if (!this.testValue(nd, od))
                this.tempValue = this.item.value = this.resetValue(nd)
        }
    },
    computed: {
        selfValue() {
            return this.item.value
        }
    },
    methods: {
        handleClose(tag) {
            this.tempValue.splice(this.tempValue.indexOf(tag), 1)
            this.change()
        },
        change() {
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.tempValue
            })
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.tempValue.push(inputValue)
                this.change()
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        testValue(nd, od) {
            if (typeof nd === typeof od) {
                if (Array.isArray(nd) && nd.length && od.length) {
                    return nd[0] === od[0] && nd.length === od.length
                }
                return true
            } 
            return false
        },
        resetValue(value) {
            if (Array.isArray(value))
                return value
            else if (typeof value == 'string') 
                return value.split(',')
            return []
        },
        notMax() {
            if (typeof this.item.max === 'function') { 
                return this.tempValue.length < this.item.max({value: this.item.value, data: this.item.$data})
            } else if (typeof this.item.max == 'number') {
                return this.tempValue.length < this.item.max
            }
            return true
        },
    },
    created() {
        //value "", []
        if (this.item.value === void 0)
            this.$set(this.item, 'value', [])

        this.tempValue = this.item.value = this.resetValue(this.item.value) 
        this.item.$data[this.item.prop] = this.item.value
    }
}
</script>
<style>
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>

