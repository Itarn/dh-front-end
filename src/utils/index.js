import lodashSet from 'lodash.set'

export { createNamespace } from './create'

export function isDef (val) {
  return getType(val) !== 'undefined' && getType(val) !== 'null'
}

export function isFunction (val) {
  // return typeof val === 'function'
  return getType(val) === 'function'
}

export function isObject (val) {
  return getType(val) === 'object'
}

export function isPromise (val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isNonPrimative (val) {
  let key = ['object', 'array', 'function']
  return key.findIndex(k => getType(val) === k) !== -1
}

export function getType (obj) {
  let str = Object.prototype.toString.call(obj) // 检测基本类型值，引用类型值的类型
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'unfefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element' // Dom 对象
  }
  return map[str]
}

export function cloneDeep (val) {
  if (isNonPrimative(val)) {
    val = JSON.parse(JSON.stringify(val))
  }
  return val
}

export function setVal (...args) {
  lodashSet(...args)
}

export function genUUID () {
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
