
import store from '../core/store'
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
function clone(data) {
    if (Array.isArray(data)) {
        let newArr = []
        for (let value of data) {
            newArr.push(clone(value))
        }
        return newArr
    } else {
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
        type: type({value: column.value, data: column.$data, store: store})
      })
  }
  return ''
}
const contains = ['fd-row', 'fd-col', 'fd-formitem', 'fd-badge', 'fd-bgroup']

function isContains(column) {
    let type = getType(column)   
    return contains.includes(type)
}
//date format
const SIGN_REGEXP = /([yMdhsm])(\1*)/g
const DEFAULT_PATTERN = 'yyyy-MM-dd'
function padding(s, len) {
    var len = len - (s + '').length
    for (var i = 0; i < len; i++) s = '0' + s
    return s
} 
const formatDate = {
    format: function(date, pattern) {
        pattern = pattern || DEFAULT_PATTERN;
        return pattern.replace(SIGN_REGEXP, function($0) {
            switch ($0.charAt(0)) {
                case 'y':
                    return padding(date.getFullYear(), $0.length)
                case 'M':
                    return padding(date.getMonth() + 1, $0.length)
                case 'd':
                    return padding(date.getDate(), $0.length)
                case 'w':
                    return date.getDay() + 1
                case 'h':
                    return padding(date.getHours(), $0.length)
                case 'm':
                    return padding(date.getMinutes(), $0.length)
                case 's':
                    return padding(date.getSeconds(), $0.length)
            }
        });
    },
    parse: function(dateString, pattern) {
        var matchs1 = pattern.match(SIGN_REGEXP)
        var matchs2 = dateString.match(/(\d)+/g)
        if (matchs1.length == matchs2.length) {
            var _date = new Date(1970, 0, 1)
            for (var i = 0; i < matchs1.length; i++) {
                var _int = parseInt(matchs2[i])
                var sign = matchs1[i]
                switch (sign.charAt(0)) {
                    case 'y':
                        _date.setFullYear(_int)
                        break
                    case 'M':
                        _date.setMonth(_int - 1)
                        break
                    case 'd':
                        _date.setDate(_int)
                        break
                    case 'h':
                        _date.setHours(_int)
                        break
                    case 'm':
                        _date.setMinutes(_int)
                        break
                    case 's':
                        _date.setSeconds(_int)
                        break
                }
            }
            return _date
        }
        return null
    }
}
export default {
    isPlainObject: isPlainObject,
    clone: clone,
    getType: getType,
    getUUID: getUUID,
    formatDate: formatDate,
    isContains: isContains
}