const _ = require('lodash')
const underscore = require('underscore')
const underscoreContrib = require('underscore-contrib')
const rfdc = require('rfdc/default')
const justClone = require('just-clone')
const cloneLib = require('clone')
const cloneDeep = require('clone-deep')

/**
 * Reminder:
 * libs with options for circular deps
 * rfdc
 * cloneLib
 */

class DeepClone {
  static cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  static structuredClone(obj) {
    return structuredClone(obj)
  }

  // https://lodash.com/docs/4.17.15#cloneDeep
  static cloneDeepLodash(obj) {
    return _.cloneDeep(obj)
  }

  // https://github.com/documentcloud/underscore-contrib/blob/106d020dbd4c12ee87409a388c281ed5cda8754a/underscore.object.builders.js#L67
  static underscoreContribClone(obj) {
    return underscoreContrib.snapshot(obj)
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
              result[i] = DeepClone.cloneNemisj(item[i])
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

  // https://stackoverflow.com/a/40294058/1543163
  static cloneTrincot(obj, hash = new WeakMap()) {
    if (Object(obj) !== obj) return obj // primitives
    if (hash.has(obj)) return hash.get(obj) // cyclic reference
    const result =
      obj instanceof Set
        ? new Set(obj) // See note about this!
        : obj instanceof Map
        ? new Map(
            Array.from(obj, ([key, val]) => [
              key,
              DeepClone.cloneTrincot(val, hash)
            ])
          )
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
      ...Object.keys(obj).map((key) => ({
        [key]: DeepClone.cloneTrincot(obj[key], hash)
      }))
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
            _a.push(DeepClone.cloneKoolDandy(e))
          }
          retObj[attr] = _a
          break
        case type instanceof Object:
          var _o = {}
          for (var e in type) {
            //_o[e] = type[e];
            _o[e] = DeepClone.cloneKoolDandy(type[e])
          }
          retObj[attr] = _o
          break
        default:
          retObj[attr] = obj[attr]
      }
    }
    return retObj
  }

  // https://github.com/davidmarkclements/rfdc
  static cloneRfdc(obj) {
    return rfdc(obj)
  }

  // https://github.com/angus-c/just
  static justClone(obj) {
    return justClone(obj)
  }

  // https://github.com/jashkenas/underscore
  static cloneUnderscore(obj) {
    return underscore.clone(obj)
  }

  // https://github.com/jashkenas/underscore/pull/2723/files
  static underscoreCloneDeepProposal(obj) {
    if (!_.isObject(obj)) {
      return obj
    }
    var keys = !isArrayLike(obj) && _.allKeys(obj),
      length = (keys || obj).length,
      result = keys ? {} : []

    if (!stack) {
      stack = [[], []]
    }
    var stacked = _.indexOf(stack[0], obj)
    if (stacked > -1) {
      return stack[1][stacked]
    }
    stack[0].push(obj)
    stack[1].push(result)

    for (var i = 0; i < length; i++) {
      var key = keys ? keys[i] : i
      result[key] = DeepClone.cloneUnderscoreCloneDeepProposal(obj[key], stack)
    }

    return result
  }

  // https://www.npmjs.com/package/clone
  static cloneLib(obj) {
    return cloneLib(obj)
  }

  // https://www.npmjs.com/package/clone-deep
  static cloneDeep(obj) {
    return cloneDeep(obj)
  }
}

module.exports = DeepClone
