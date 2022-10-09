const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('Error', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should deeply clone an Error', () => {
      const a = new Error('Foobar')
      const b = func(a)
      assert.deepEqual(a, b)
      a['message'] = 'aaaa'
      assert.ok(b.message !== a.message)
    })

    it('should clone the constructor', () => {
      const a = new Error('Foobar')
      const b = func(a)
      assert.ok(a.constructor.name === b.constructor.name)
    })

    it('should clone message property', () => {
      const a = new Error('Foobar')
      const b = func(a)
      assert.ok(a.message === b.message)
    })

    it('should clone stack property', () => {
      const a = new Error('Foobar')
      const b = func(a)
      assert.ok(a.stack === b.stack)
    })

    it('should clone own properties if they exist', () => {
      const a = new Error('Foobar')
      a.foo = 'bar'
      const b = func(a)
      assert.ok(a.foo === b.foo)
    })

    it('clone typeof should yield same result as original', () => {
      const input = new Error('Foobar')
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })
  })
})
