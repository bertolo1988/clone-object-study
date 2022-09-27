const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('objects', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone frozen object', () => {
      const input = { foo: 'bar' }
      Object.freeze(input)
      const clone = func(input)
      assert.ok(Object.isFrozen(clone))
    })

    it('should clone sealed object', () => {
      const input = { foo: 'bar' }
      Object.seal(input)
      const clone = func(input)
      assert.ok(Object.isSealed(clone))
    })

    it('should clone getters', () => {
      function Foo() {}

      Object.defineProperty(Foo.prototype, 'bar', {
        configurable: true,
        enumerable: true,
        get: function () {
          return 'foo-bar'
        }
      })

      let input = new Foo()
      var clone = func(input)

      assert.strictEqual(clone.bar, 'foo-bar')
    })
  })
})
