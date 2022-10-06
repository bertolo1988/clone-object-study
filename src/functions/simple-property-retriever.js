const SimplePropertyRetriever = {
  getOwnEnumerables(obj) {
    return this._getPropertyNames(obj, true, false, this._enumerable)
    // Or could use for...in filtered with Object.hasOwn or just this: return Object.keys(obj);
  },
  getOwnNonenumerables(obj) {
    return this._getPropertyNames(obj, true, false, this._notEnumerable)
  },
  getOwnEnumerablesAndNonenumerables(obj) {
    return this._getPropertyNames(
      obj,
      true,
      false,
      this._enumerableAndNotEnumerable
    )
    // Or just use: return Object.getOwnPropertyNames(obj);
  },
  getPrototypeEnumerables(obj) {
    return this._getPropertyNames(obj, false, true, this._enumerable)
  },
  getPrototypeNonenumerables(obj) {
    return this._getPropertyNames(obj, false, true, this._notEnumerable)
  },
  getPrototypeEnumerablesAndNonenumerables(obj) {
    return this._getPropertyNames(
      obj,
      false,
      true,
      this._enumerableAndNotEnumerable
    )
  },
  getOwnAndPrototypeEnumerables(obj) {
    return this._getPropertyNames(obj, true, true, this._enumerable)
    // Or could use unfiltered for...in
  },
  getOwnAndPrototypeNonenumerables(obj) {
    return this._getPropertyNames(obj, true, true, this._notEnumerable)
  },
  getOwnAndPrototypeEnumerablesAndNonenumerables(obj) {
    return this._getPropertyNames(
      obj,
      true,
      true,
      this._enumerableAndNotEnumerable
    )
  },
  // Private static property checker callbacks
  _enumerable(obj, prop) {
    return Object.prototype.propertyIsEnumerable.call(obj, prop)
  },
  _notEnumerable(obj, prop) {
    return !Object.prototype.propertyIsEnumerable.call(obj, prop)
  },
  _enumerableAndNotEnumerable(obj, prop) {
    return true
  },
  // Inspired by http://stackoverflow.com/a/8024294/271577
  _getPropertyNames(obj, iterateSelf, iteratePrototype, shouldInclude) {
    const props = []
    do {
      if (iterateSelf) {
        Object.getOwnPropertyNames(obj).forEach((prop) => {
          if (props.indexOf(prop) === -1 && shouldInclude(obj, prop)) {
            props.push(prop)
          }
        })
      }
      if (!iteratePrototype) {
        break
      }
      iterateSelf = true
      obj = Object.getPrototypeOf(obj)
    } while (obj)
    return props
  }
}

module.exports = SimplePropertyRetriever
