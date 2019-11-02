
const privileges = {
    Authorized: null
}

function Authorized(params) {
    if (privileges.Authorized !== null && typeof privileges.Authorized === 'function') {
        return privileges.Authorized(params)
    }
    return true
}

var defaultStyles = {
    'span-test': {
        color: 'red'
    },
    'row': {
        backgroundColor: '#ccc'
    }
}
export default {
    privileges: privileges,
    Authorized: Authorized,
    defaultStyles: defaultStyles
}