const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('dates', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone a Date', () => {
      const input = new Date('December 17, 1995 03:24:00')
      const clone = func(input)
      assert.deepEqual(clone, input)
      input.setFullYear(2000)
      assert.ok(clone.getFullYear() === 1995)
      assert.notDeepEqual(clone, input)
    })

    it('cloned date should maintain same time', () => {
      const input = new Date('December 17, 1995 03:24:00')
      const clone = func(input)
      assert.ok(clone.getTime() - input.getTime() === 0)
    })

    it('setHours should be defined and usable', () => {
      const input = new Date('December 17, 1995 03:24:00')
      const clone = func(input)
      assert.ok(clone.getHours() === 3)
      clone.setHours(5)
      assert.ok(clone.getHours() === 5)
    })

    it('should clone constructor', () => {
      const input = new Date()
      const clone = func(input)
      assert.ok(input.constructor.name === clone.constructor.name)
    })

    it('clone typeof should yield same result as original', () => {
      const input = new Date()
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })

    it('should clone enumerable properties', () => {
      const input = new Date()
      Object.defineProperty(input, 'foo', {
        value: 'bar',
        enumerable: true
      })
      let clone = func(input)
      assert.ok(clone.foo === 'bar')
    })

    it('should clone non enumerable properties', () => {
      const input = new Date()
      Object.defineProperty(input, 'foo', {
        value: 'bar',
        enumerable: false
      })
      let clone = func(input)
      assert.ok(clone.foo === 'bar')
    })
  })
})
