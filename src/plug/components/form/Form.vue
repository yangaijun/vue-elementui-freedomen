<template>
    <el-form 
        :label-width="tempConfig && tempConfig.labelWidth || '120px'" 
        :inline="tempConfig && tempConfig.inline"
        :size="tempConfig && tempConfig.size"
        :label-position="tempConfig && tempConfig.labelPosition"
        class="fd_form">
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
import merge from '../../mixins/merge'
export default {
    name: 'FdForm',
    mixins: [merge],
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
                this.ruleQueues = []
            }
        },
        data (nd, od) { 
            this.tempData = nd
        } 
    },
    data() {
        return {
            tempColumns: [],
            tempData: {},
            rules: {},
            tempConfig: {}
        }
    },
    methods: {
        resetColumns(columns) {
            let newColumns = []
            var inline = this.config && this.config.inline
            columns.forEach(column => {
                if (util.isPlainObject(column)) {  
                    let newItem = [column]
                    if (column.rule) { 
                        if (column.type == 'input') {
                            column.suffixIcon = () => { if (this.rules[column.prop].loading) return 'el-icon-loading' }
                        }
                        newItem.push(  
                            {type: 'span', class: 'el-form-item__error', filter: () => this.rules[column.prop].message}  
                        )
                    } 
                    newItem.push({...column, type: 'formitem', inline: inline, $loadRelation: column})  
                    newColumns.push(newItem) 
                } else if (Array.isArray(column)) {
                    if (column.length && column[column.length - 1].rule !== void 0) {
                        column.splice(
                            column.length - 1, 0,  
                            {type: 'span', class: 'el-form-item__error', filter: () => this.rules[column[column.length - 1].prop].message}
                        )
                    }
                    newColumns.push(column)
                }
            }) 
            if (!inline) {
                newColumns.push({type: 'row'}) 
                newColumns = [newColumns]
            } 
            return newColumns 
        },
        resetRules(columns, rules) {
            for (let column of columns) {
                if (Array.isArray(column)) {
                    this.resetRules(column, rules)
                } else if (column.rule !== void 0) {
                    // use index if no prop of form-item?
                    rules[column.prop] = {
                        rule: column.rule,
                        column: column,
                        loading: false,
                        message: ''
                    }
                }
            }
        },
        asyncQueue() {   
            let promises = this.ruleQueues.map(el => {
                return rule.valid(el.data, el.rule, this.data)
            }) 
            return Promise.all(promises)
        },
        validOne(data, r, ruleObj) { 
            if (!r.column.$load) { 
                return false
            } 
            let message = rule.valid(data, r.rule, this.data) 
            if (message instanceof Promise) { 
                if (this.ruleQueues) {
                    this.ruleQueues.push({
                        data: data, 
                        rule: r.rule,
                        ruleObj: ruleObj
                    })
                } 
                ruleObj.loading = true 
                message.then(res => {
                    ruleObj.loading = false
                    if (res)
                        ruleObj.message = res 
                })
                return false
            }
            if (message === null || message === void 0 || message === '') {
                return false
            }
            return message
        },
        valid() {
            let error = false
            this.ruleQueues = []
            for (let r in this.rules) {
                let message = this.validOne(this.tempData[r], this.rules[r], this.rules[r])
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
            this.$emit('update:data', this.tempData)
            for (let r in this.rules) {
                this.rules[r].message = ''
            } 
        },
        submit() {
            if (this.valid()) { 
                if (this.ruleQueues.length) {
                    if (!this.submitLoading) {
                        this.submitLoading = true
                    } else {
                        return Promise.reject('')
                    }
                    return new Promise((resolve, reject) => {
                        this.asyncQueue().then(el => { 
                            if (el.every(el => !el)) 
                                resolve(this.tempData)
                            else 
                                reject('')
                            this.submitLoading = false
                        }) 
                    }) 
                } 
                return Promise.resolve(this.tempData)
            } else {
                return Promise.reject('')
            } 
        },
        clone(columns) {
            return columns
        }, 
        event(params) { 
            this.$emit('event', params)

            if (params.prop == '$submit') { 
                this.submit().then(data => {
                    this.$emit('submit', data)
                }) 
            } else if (params.prop == '$reset') {
                this.reset()
            } else if (params.type === 'change' && this.rules[params.prop] !== void 0) {
                let message = this.validOne(this.tempData[params.prop], this.rules[params.prop], this.rules[params.prop])
                if (message) {
                    this.rules[params.prop].message = message
                } else {
                    this.rules[params.prop].message = ''
                }
            } 
        }
    },
    mounted() {
        this.firstData = util.clone(this.data) 
        this.$emit('update:data', this.firstData)   
    },
    created() {   
        let columns = this.clone(this.columns)
        let rules = {}
        this.resetRules(columns, rules)
        this.rules = rules  
        this.tempColumns = this.resetColumns(columns)
        this.tempData = this.data

        let config = this.mergeConfig('form', this.config) 
        if (config) {
            this.tempConfig = config
        }
    }
}
</script> 
