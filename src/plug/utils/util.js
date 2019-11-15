
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
function clone(data) {
    let model = {} 
    for (let item in data) { 

      if (data[item] instanceof Array) {
        model[item] = new Array();
        for (let i = 0; i < data[item].length; i++) {
            if (isPlainObject(data[item][i])) {
              model[item].push(clone(data[item][i]));
            } else {
              model[item].push(data[item][i])
            }
        }
      } else {
        model[item] = data[item];
      }
    }
    return model;
} 

const PREFIX = 'fd-'
function getType(column) {
  let type = column.type
  if (typeof type === 'string') {
      return PREFIX + type.split('-')[0]
  } else if (typeof type === 'function') {
      return getType({...column, type: type({value: column.value, data: column.$data})})
  }
  return ''
}

export default {
    isPlainObject: isPlainObject,
    clone: clone,
    getType: getType
}