const components = {}

function registerElements(_cmp = {}) {
    for (let key in _cmp) {
        components[key] = _cmp[key]
    }
}

export default {
    components,
    registerElements
}