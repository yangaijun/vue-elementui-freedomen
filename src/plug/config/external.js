
import rule from '../utils/rule'

const privileges = {
    Authorized: null
}

function Authorized(params) {
    if (privileges.Authorized !== null && typeof privileges.Authorized === 'function') {
        return privileges.Authorized(params)
    }
    return true
}

const defaultStyles = {
    'span-test': {
        color: 'red'
    },
    'row': {
        backgroundColor: '#ccc'
    }
}
const defaultConfigs = {

}

function addRules(rules = {}) {
    let keys = Object.keys(rules)
    if (keys.length) {
        keys.forEach(key => {
            rule.rules[key] = rules[key]
        })
    }
}
function addStyles(styles = {}) {
    let keys = Object.keys(styles)
    if (keys.length) {
        keys.forEach(key => {
            defaultStyles[key] = styles[key]
        })
    }
}
function addConfigs(configs = {}) {
    let keys = Object.keys(configs)
    if (keys.length) {
        keys.forEach(key => {
            defaultConfigs[key] = configs[key]
        })
    }
}
export default {
    privileges: privileges,
    Authorized: Authorized,
    defaultStyles: defaultStyles,
    defaultConfigs: defaultConfigs,
    addRules: addRules, 
    addStyles: addStyles,
    addConfigs: addConfigs
}