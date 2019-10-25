
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export default {
    isPlainObject: isPlainObject
}