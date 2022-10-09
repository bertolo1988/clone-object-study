const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('Map', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should deeply clone Map', () => {
      const a = new Map([[1, 5]])
      const b = func(a)
      assert.deepEqual(Array.from(a), Array.from(b))
      a.set('cc', { f: 'bar' })
      assert.notDeepEqual(Array.from(a), Array.from(b))
    })

    it('should clone the constructor', () => {
      const a = new Map([
        ['foo', 'bar'],
        ['a', 'b']
      ])
      const b = func(a)
      assert.ok(a.constructor.name === b.constructor.name)
    })

    it('should clone the prototype', () => {
      const a = new Map([
        ['foo', 'bar'],
        ['a', 'b']
      ])
      const b = func(a)
      assert.deepEqual(a.prototype, b.prototype)
    })

    it('should clone the size property', () => {
      const a = new Map([
        ['foo', 'bar'],
        ['a', 'b']
      ])
      const b = func(a)
      assert.ok(a.size === b.size)
    })

    it('should clone own enumerable properties if they exist', () => {
      const a = new Map([
        ['foo', 'bar'],
        ['a', 'b']
      ])
      a.foo = 'bar'
      const b = func(a)
      assert.ok(a.foo === b.foo)
    })

    it('should clone own non enumerable properties', () => {
      const a = new Map([
        ['foo', 'bar'],
        ['a', 'b']
      ])
      Object.defineProperty(a, 'bar', {
        value: 42,
        enumerable: false
      })
      let clone = func(a)
      assert.ok(clone.bar === 42)
    })

    it('clone typeof should yield same result as the original', () => {
      const input = new Map([
        ['foo', 'bar'],
        ['a', 'b']
      ])
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })
  })
})
