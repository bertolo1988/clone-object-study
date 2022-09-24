const _ = require('lodash')

class DeepClone {
  static cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  static cloneStructured(obj) {
    return structuredClone(obj)
  }

  // https://lodash.com/docs/4.17.15#cloneDeep
  static cloneDeepLodash(obj) {
    return _.cloneDeep(obj)
  }

  // https://github.com/documentcloud/underscore-contrib/blob/106d020dbd4c12ee87409a388c281ed5cda8754a/underscore.object.builders.js#L67
  static cloneUnderscoreContribLibrary(obj) {
    if (obj == null || typeof obj != 'object') {
      return obj
    }
    var temp = new obj.constructor()
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        temp[key] = _.snapshot(obj[key])
      }
    }
    return temp
  }

  // https://stackoverflow.com/a/4460624/1543163
  static cloneNemisj(item) {
    if (!item) {
      return item
    }
    var types = [Number, String, Boolean],
      result
    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
      if (item instanceof type) {
        result = type(item)
      }
    })
    if (typeof result == 'undefined') {
      if (Object.prototype.toString.call(item) === '[object Array]') {
        result = []
        item.forEach(function (child, index, array) {
          result[index] = clone(child)
        })
      } else if (typeof item == 'object') {
        // testing that this is DOM
        if (item.nodeType && typeof item.cloneNode == 'function') {
          result = item.cloneNode(true)
        } else if (!item.prototype) {
          // check that this is a literal
          if (item instanceof Date) {
            result = new Date(item)
          } else {
            // it is an object literal
            result = {}
            for (var i in item) {
              result[i] = clone(item[i])
            }
          }
        } else {
          // depending what you would like here,
          // just keep the reference, or create new object
          if (false && item.constructor) {
            // would not advice to do that, reason? Read below
            result = new item.constructor()
          } else {
            result = item
          }
        }
      } else {
        result = item
      }
    }
    return result
  }

  // https://stackoverflow.com/a/34624648/1543163
  static cloneTim(aObject) {
    // Prevent undefined objects
    // if (!aObject) return aObject;
    let bObject = Array.isArray(aObject) ? [] : {}
    let value
    for (const key in aObject) {
      // Prevent self-references to parent object
      // if (Object.is(aObject[key], aObject)) continue;
      value = aObject[key]
      bObject[key] = typeof value === 'object' ? copy(value) : value
    }
    return bObject
  }

  // https://stackoverflow.com/a/40294058/1543163
  static cloneTrincot(obj, hash = new WeakMap()) {
    if (Object(obj) !== obj) return obj // primitives
    if (hash.has(obj)) return hash.get(obj) // cyclic reference
    const result =
      obj instanceof Set
        ? new Set(obj) // See note about this!
        : obj instanceof Map
        ? new Map(Array.from(obj, ([key, val]) => [key, deepClone(val, hash)]))
        : obj instanceof Date
        ? new Date(obj)
        : obj instanceof RegExp
        ? new RegExp(obj.source, obj.flags)
        : // ... add here any specific treatment for other classes ...
        // and finally a catch-all:
        obj.constructor
        ? new obj.constructor()
        : Object.create(null)
    hash.set(obj, result)
    return Object.assign(
      result,
      ...Object.keys(obj).map((key) => ({ [key]: deepClone(obj[key], hash) }))
    )
  }

  // https://stackoverflow.com/a/57349400/1543163
  static cloneKoolDandy(obj) {
    if (!obj || typeof obj !== 'object') return obj
    var retObj = {}
    for (var attr in obj) {
      var type = obj[attr]
      switch (true) {
        case type instanceof Date:
          var _d = new Date()
          _d.setDate(type.getDate())
          retObj[attr] = _d
          break

        case type instanceof Function:
          retObj[attr] = obj[attr]
          break
        case type instanceof Array:
          var _a = []
          for (var e of type) {
            //_a.push(e);
            _a.push(deepCopy(e))
          }
          retObj[attr] = _a
          break
        case type instanceof Object:
          var _o = {}
          for (var e in type) {
            //_o[e] = type[e];
            _o[e] = deepCopy(type[e])
          }
          retObj[attr] = _o
          break
        default:
          retObj[attr] = obj[attr]
      }
    }
    return retObj
  }

  static cloneRonald(obj) {
    if (typeof arr !== 'object') return arr
    if (Array.isArray(arr)) return [...arr].map(deepCopy)
    for (const prop in arr) copy[prop] = deepCopy(arr[prop])
    return copy
  }
}

module.exports = DeepClone
