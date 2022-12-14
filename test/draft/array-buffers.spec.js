const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('ArrayBuffer', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should deeply clone an ArrayBuffer v1', () => {
      const input = new ArrayBuffer(16)
      const clone = func(input)
      assert.deepEqual(clone, input)
      input.foo = 'bar'
      assert.notDeepEqual(clone, input)
    })

    it('should clone the prototype', () => {
      const input = new ArrayBuffer(16)
      const clone = func(input)
      assert.ok(clone.prototype === input.prototype)
    })

    it('should clone the constructor', () => {
      const input = new ArrayBuffer(16)
      const clone = func(input)
      assert.ok(clone.constructor.name === input.constructor.name)
    })

    it('should clone byteLength', () => {
      const input = new ArrayBuffer(16)
      const clone = func(input)
      assert.ok(clone.byteLength === 16)
    })

    it('should clone enumerable properties if they exist', () => {
      const input = new ArrayBuffer(16)
      input.foo = 'bar'
      const clone = func(input)
      assert.ok(clone.foo === input.foo)
      clone.hasOwnProperty('foo')
    })

    it('should clone non enumerable properties', () => {
      const input = new ArrayBuffer(16)
      Object.defineProperty(input, 'foo', {
        value: 'bar',
        enumerable: false
      })
      let clone = func(input)
      assert.ok(clone.foo === 'bar')
    })

    it('clone typeof should yield same result as original', () => {
      const input = new ArrayBuffer(16)
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })
  })
})
