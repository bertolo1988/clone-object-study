const _ = require('lodash')

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
}

module.exports = ShallowClone
