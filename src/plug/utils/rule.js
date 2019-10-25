const rules = {
    // not empty
    must: {
        label: '不能为空',
        regular: value => {
            if (value instanceof Array)
                return value.length !== 0
            return !!value
        }
    },
    //empty
    empty: {
        label: '',
        regular: value => {
            if (value instanceof Array)
                return value.length === 0
            return !value
        }
    },
    //cell phone number
    cellphone: { label: '请正确输入手机号码', regular: /^1\d{1}[0-9]\d{4,8}$/ },
    //telphone number
    telphone: { label: '请正确输入电话号码', regular: /^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/ },
    //positive integer
    number: { label: '请输入数字', regular: /^[0-9]*$/ },
    //float
    float: { label: '两位小数', regular: /^[0-9]+(.[0-9]{2})?$/ },
    //email
    email: { label: '请正确输入email', regular: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    //age
    age: { label: '请正确输入年龄', regular: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/ },
    //name
    name: { label: '请正确输入姓名', regular: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/ },
    //url
    url: { label: '请正确输入链接', regular: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/ },
    //idcard
    idcard: { label: '请正确身份证号码', regular: /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/ },
    //account
    account: { label: '仅允许字母开头，字母数字下划线组合5-16长度', regular: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ },

}

function valid(value, rule) {
    let tempRule
    if (rule instanceof Function) {
        return rule(value)
    } else if (Array.isArray(rule)) {
        tempRule = rule
    } else if (typeof rule === 'string') {
        tempRule = rule.split(',')
    }
    let message = null
    for (let r of tempRule) {
        if (rules[r] !== void 0) {
            if (typeof rules[r].regular === 'function') {
                message = rules[r].regular(value) ? null : rules[r].label
            } else if (rules[r].regular instanceof RegExp) {
                message = rules[r].regular.test(value) ? null : rules[r].label
            }

            if (message === null)
                break
        } else {
            console.error("no such rule: " + r)
        }
    }
    return message
}

export default {
    valid: valid
}