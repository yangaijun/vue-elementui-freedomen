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
/**
 * config: {
 *      labelPosition: right/left/top 
 *      labelWidth: true,
 *      editable: true/false,
 *      eidtStyle: 'text/disabled'
 * },
 * data, columns=>{label:string, type: string*, prop: string*, eidt: boolean, rule:function/array/string}
 */
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
                        newItem.push({type: 'span', class: 'el-form-item__error', filter: () => this.rules[column.prop].message})
                    }
                    newItem.push({type: 'form-item', prop: column.prop, label: column.label})

                    newColumns.push(newItem)
                } else if (Array.isArray(column)) {
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
                        message: ''
                    }
                }
            }
        },
        validOne(data, r) { 
            let message = rule.valid(data, r) 
            // if (message instanceof Promise) {
            //     message.then(res => {

            //     })
            // }
            if (message === null || message === void 0 || message === '') {
                return false
            }
            return message
        },
        valid() {
            let error = false
            for (let r in this.rules) {
                let message = this.validOne(this.tempData[r], this.rules[r].rule)
                if (message !== false) {
                    error = true
                    this.rules[r].message = message
                } else {
                    this.rules[r].message = ''
                }
            }
            return error
        },
        colne(columns) {
            return columns
        },
        event(params) { 
            if (params.prop == '$submit') {
                if (!this.valid()) {
                    this.$emit('submit', this.tempData)
                }
            } else if (params.prop == '$reset') {
                for (let r in this.rules) {
                    this.rules[r].message = ''
                }
            } else if (params.type === 'change' && this.rules[params.prop] !== void 0) {
                let message = this.validOne(this.tempData[params.prop], params.prop)
                if (message) {
                    this.rules[params.prop].message = message
                } else {
                    this.rules[params.prop].message = ''
                }
            }
            this.$emit('event', params)
        }
    },
    created() {
        let columns = this.colne(this.columns)
        let rules = {}
        this.resetRules(columns, rules)
        this.rules = rules
        this.tempColumns = this.resetColumns(columns)
        this.tempData = this.data
    }
}
</script> 
