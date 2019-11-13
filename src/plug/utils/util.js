
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
export default {
    isPlainObject: isPlainObject,
    clone: clone
}