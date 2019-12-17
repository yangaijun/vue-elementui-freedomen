<template>
    <el-form 
        :label-width="config && config.labelWidth || '100px'" 
        :inline="config && config.inline"
        :label-position="config && config.labelPosition">
        <fd-region 
            :columns="tempColumns"
            :data="tempData"
            @event="event"
        >
        </fd-region>
    </el-form>
</template>
<script>
import util from '../../utils/util.js';
import FdRegion from '../../core/region';
import rule from '../../utils/rule.js';

export default {
    name: 'FdForm',
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Object,
            default: function () {
                return {}
            }
        },
        config: Object,
    },
    components: {
        FdRegion
    },
    watch: {
        tempData(nd, od) { 
            if (od) { 
                this.resetColumns(this.columns, nd)
            }
        },
        data(nd, od) { 
            this.tempData = nd
        }
    },
    data() {
        return {
            tempColumns: [],
            tempData: {},
            rules: {}
        }
    },
    methods: {
        resetColumns(columns) {
            let newColumns = []
            columns.forEach(column => {
                if (util.isPlainObject(column)) {
                    let newItem = [column]
                    if (column.rule) {
                        newItem.push(
                            {type: 'span', class: 'el-form-item__error', filter: () => this.rules[column.prop].message} 
                        )
                    }
                    newItem.push({type: 'formitem', prop: column.prop, label: column.label})
                    
                    newColumns.push(newItem)
                } else if (Array.isArray(column)) {
                    if (column.length && column[column.length - 1].rule !== void 0) {
                        column.splice(column.length - 1, 0, {type: 'span', class: 'el-form-item__error', filter: () => this.rules[column[column.length - 1].prop].message})
                    }
                    newColumns.push(column)
                }
            });
            return newColumns;
        },
        resetRules(columns, rules) {
            for (let column of columns) {
                if (Array.isArray(column)) {
                    this.resetRules(column, rules)
                } else if (column.rule !== void 0) {
                    //如果是form-item没有prop  是不是可以用index来？
                    rules[column.prop] = {
                        rule: column.rule,
                        loading: false,
                        message: ''
                    }
                }
            }
        },
        validOne(data, r, ruleObj) { 
            let message = rule.valid(data, r, this.data) 
            if (message instanceof Promise) { 
                ruleObj.loading = true
                
                message.then(res => {
                    ruleObj.loading = false
                    ruleObj.message = res 
                })
                return 
            }
            if (message === null || message === void 0 || message === '') {
                return false
            }
            return message
        },
        valid() {
            let error = false
            for (let r in this.rules) {
                let message = this.validOne(this.tempData[r], this.rules[r].rule, this.rules[r])
                if (message !== false) {
                    error = true
                    this.rules[r].message = message
                } else {
                    this.rules[r].message = ''
                }
            }
            return !error
        },
        reset() {
            let newObj = {} 
            for (let key in this.firstData) {
                newObj[key] = this.firstData[key]
            }
            this.tempData = newObj
            for (let r in this.rules) {
                this.rules[r].message = ''
            } 
        },
        clone(columns) {
            return columns
        },
        event(params) { 
            if (params.prop == '$submit') {
                if (this.valid()) {
                    this.$emit('submit', this.tempData)
                }
            } else if (params.prop == '$reset') {
                this.reset()
            } else if (params.type === 'change' && this.rules[params.prop] !== void 0) {
                let message = this.validOne(this.tempData[params.prop], this.rules[params.prop].rule, this.rules[params.prop])
                if (message) {
                    this.rules[params.prop].message = message
                } else {
                    this.rules[params.prop].message = ''
                }
            }
            this.$emit('event', params)
        }
    },
    mounted() {
        this.firstData = util.clone(this.data)  
    },
    created() {  
        let columns = this.clone(this.columns)
        let rules = {}
        this.resetRules(columns, rules)
        this.rules = rules 
        this.tempColumns = this.resetColumns(columns)
        this.tempData = this.data
    }
}
</script> 
