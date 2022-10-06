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

    it('should clone type', () => {
      const input = new Date()
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })
  })
})
