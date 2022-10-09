const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('Set', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should deeply clone Set', () => {
      const a = new Set([2, 1, 3])
      const b = func(a)
      assert.deepEqual(Array.from(a), Array.from(b))
      a.add(8)
      assert.notDeepEqual(Array.from(a), Array.from(b))
    })

    it('should clone the constructor', () => {
      const a = new Set([2, 1, 3])
      const b = func(a)
      assert.ok(a.constructor.name === b.constructor.name)
    })

    it('should clone the prototype', () => {
      const a = new Set([2, 1, 3])
      const b = func(a)
      assert.deepEqual(a.prototype, b.prototype)
    })

    it('should clone the size property', () => {
      const a = new Set([2, 1, 3])
      const b = func(a)
      assert.ok(a.size === b.size)
    })

    it('"has" method should be usable', () => {
      const a = new Set([2, 1, 3])
      const b = func(a)
      assert.ok(b.has(2) === true)
      assert.ok(b.has(5) === false)
    })

    it('should clone own properties if they exist', () => {
      const a = new Set([2, 1, 3])
      a.foo = 'bar'
      const b = func(a)
      assert.ok(a.foo === b.foo)
    })

    it('should clone own non enumerable properties', () => {
      const input = new Set([2, 1, 3])
      Object.defineProperty(input, 'bar', {
        value: 42,
        enumerable: false
      })
      let clone = func(input)
      assert.ok(clone.bar === 42)
    })

    it('clone typeof should yield same result as the original', () => {
      const input = new Set([2, 1, 3])
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })
  })
})
