
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
function getUUID() {
  let rand =  () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (rand() + rand() + "-" + rand() + "-" + rand() + "-" + rand() + "-" + rand() + rand() + rand());
} 
const PREFIX = 'fd-'
function getType(column) {
  let type = column.type
  if (typeof type === 'string') {
      return PREFIX + type.split('-')[0]
  } else if (typeof type === 'function') {
      return getType({
        value: column.value, 
        data: column.$data, 
        type: type({value: column.value, data: column.$data})
      })
  }
  return ''
}

export default {
    isPlainObject: isPlainObject,
    clone: clone,
    getType: getType,
    getUUID: getUUID
}