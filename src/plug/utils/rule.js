import util from './util.js'
import store from '../core/store'
const rules = {
    // not empty
    must: {
        label: '不能为空',
        regular: ({value}) => {
            if (value instanceof Array)
                return value.length !== 0
            else if (util.isPlainObject(value)) 
                return Object.keys(value).length !== 0
            return value !== ''
        }
    }, 
    //cell phone number
    phone: { label: '请正确输入手机号码', regular: /^1\d{1}[0-9]\d{4,8}$/ },
    email: { label: '请正确输入email', regular: new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$") }, //ok
    url: { label: '请正确输入链接', regular: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/ },  
    number: { label: '请输入数值', regular: new RegExp("^([+-]?)\\d*\\.?\\d+$")}, 
    int: {label: '请输入整数', regular: new RegExp("^([+]?)\\d*\\.?\\d+$")},
    intp: {label: '请输入正整数', regular: new RegExp("^([+]?)\\d*$") },
    intn: {label: '请输入负整数', regular: new RegExp("^-[1-9]\\d*|0$") },
    zipcode: {label: '请正确输入6位邮编', regular: /^\\d{6}$/}, 
    ip4:{label: '请正确输入IP', regular: /^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$/},
    age: { label: '请正确输入年龄', regular: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/ }, 
    idcard: { label: '请正确身份证号码', regular: /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/ },
    username: { label: '仅允许字母开头，字母数字下划线组合5-16长度', regular: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ }
}
function validate(value, rule, data) {
    if (!rule)
        return null

    if (typeof rule === 'function') {
        return new Promise((resolve) => {
            rule({resolve: resolve, value: value, data: data, store: store}) 
        }) 
    } else if (util.isPlainObject(rule)) {
        if (typeof rule.regular === 'function') {
            return rule.regular({value: value, data: data, store: store}) ? null : rule.label
        } else if (rule.regular instanceof RegExp) {
            if (!value)
                return rule.label
            return rule.regular.test(value) ? null : rule.label
        }
    } else {
        rule = Array.isArray(rule) ? rule : (rule + '').split(',')
    }
    let message = null
    for (let r of rule) {
        if (typeof r == 'string' && r.indexOf('len') == 0) {
            let nums = r.substring(3).split(':')
            let min, max
            if (nums.length == 1) {
                max = nums[0]
            } else {
                min = nums[0]
                max = nums[1]
            }
            if (min && value.length < min) {
                message = `长度不能小于${min}`
            } 
            if (max && value.length > max) {
                message = `长度不能超过${max}`
            }
        } else if (rules[r] !== void 0) {
            if (typeof rules[r].regular == 'function') {
                message = rules[r].regular({value: value, data: data, store: store}) ? null : rules[r].label
            } else if (rules[r].regular instanceof RegExp) {
                message = rules[r].regular.test(value) ? null : rules[r].label
            }
            if (message !== null)
                break
        } else {
            console.error(`no such rule: '${r}'`)
        }
    }
    return message
}

export default {
    valid: validate,
    rules: rules
}