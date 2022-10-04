const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('Functions', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone a function', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      const a = 1,
        b = 2
      assert.ok(clone(a, b) === foo(a, b))
    })

    it('should clone the function name', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      assert.ok(clone.name === 'foo')
    })

    it('should deep clone a function', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      assert.deepEqual(clone, foo)
      foo.bar = '111'
      assert.notDeepEqual(clone, foo)
    })

    it('should clone a function own properties', () => {
      function foo(a, b) {
        return a + b
      }
      foo.bar = 'aa'
      let clone = func(foo)
      assert.ok(clone.bar === foo.bar)
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
  })
})
