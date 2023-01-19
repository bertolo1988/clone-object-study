const assert = require('node:assert')
const _ = require('lodash')
const { getCloneMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

let funcs = getCloneMethods(DeepClone)

describe.each(funcs)('functions', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('clone should be callable', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      const a = 1,
        b = 2

      assert.ok(clone(a, b) === foo(a, b))
    })

    it('clone typeof should be a "function"', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)

      assert.ok(typeof clone === 'function')
    })

    it('should clone enumerable properties defined in the input function', () => {
      function foo(a, b) {
        return a + b
      }
      foo.bar = 'aaa'

      let clone = func(foo)

      assert.ok(clone.bar === 'aaa')
    })

    it('should clone the function name', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      assert.ok(clone.name === 'foo')
    })

    it('should clone the prototype', () => {
      function Person(name, age, gender) {
        this.name = name
        this.age = age
        this.gender = gender
      }
      Person.prototype.getName = function () {
        return this.name
      }

      let clone = func(Person)
      assert.ok(clone.prototype === Person.prototype)
    })

    it('should clone the constructor', () => {
      function Person(name, age, gender) {
        this.name = name
        this.age = age
        this.gender = gender
      }
      Person.prototype.getName = function () {
        return this.name
      }

      let clone = func(Person)
      assert.ok(clone.constructor.name === Person.constructor.name)
    })

    it('input and clone should be independent', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      foo.bar = '111'
      assert.ok(clone.bar === undefined)
    })
  })
})
