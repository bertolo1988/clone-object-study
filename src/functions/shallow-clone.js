const _ = require('lodash')
const underscore = require('underscore')

class ShallowClone {
  static cloneOperator(obj) {
    return { ...obj }
  }

  static cloneAssign(obj) {
    return Object.assign({}, obj)
  }

  static cloneLodash(obj) {
    return _.clone(obj)
  }

  // https://github.com/jashkenas/underscore
  static cloneUnderscore(obj) {
    return underscore.clone(obj)
  }
}

module.exports = ShallowClone
