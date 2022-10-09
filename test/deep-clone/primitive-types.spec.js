const assert = require('node:assert')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('primitive types', (func) => {
  describe(`${func.name} `, () => {
    it('should clone a string', () => {
      let input = 'some-string'
      let clone = func(input)
      assert.deepStrictEqual(input, clone)
      assert.equal(typeof input, typeof clone)
    })

    it('should clone a number', () => {
      let input = 111
      let clone = func(input)
      assert.deepStrictEqual(input, clone)
      assert.equal(typeof input, typeof clone)
    })

    it('should clone a boolean', () => {
      let input = true
      let clone = func(input)
      assert.deepStrictEqual(input, clone)
      assert.equal(typeof input, typeof clone)
    })

    it('should clone undefined', () => {
      let input = undefined
      let clone = func(input)
      assert.deepStrictEqual(input, clone)
      assert.equal(typeof input, typeof clone)
    })

    it('should clone null', () => {
      let input = null
      let clone = func(input)
      assert.deepStrictEqual(input, clone)
      assert.equal(typeof input, typeof clone)
    })

    it('should clone a Symbol', () => {
      let input = Symbol('hello')
      let clone = func(input)
      assert.equal(input, clone)
      assert.equal(typeof input, typeof clone)
    })

    it('should clone a BigInt', () => {
      let input = BigInt('9007199254740991')
      let clone = func(input)
      assert.deepStrictEqual(input, clone)
      assert.equal(typeof input, typeof clone)
    })
  })
})
