const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('arrays', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone a shallow array length property', () => {
      const input = [1, 2, 3]
      const clone = func(input)
      assert.equal(clone.length, input.length)
    })

    it('should clone a shallow array', () => {
      const input = [1, 2, 3]
      const clone = func(input)
      assert.deepEqual(clone, input)
      input.push(4)
      assert.notDeepEqual(clone, input)
    })

    it('should deep clone a matrix', () => {
      const input = [
        [1, 2],
        [
          [3, 4],
          [5, 6]
        ]
      ]
      const clone = func(input)
      assert.deepEqual(clone, input)
      assert.deepEqual(clone[1][1], input[1][1])
      input[1].push(4)
      assert.notDeepEqual(clone, input)
    })

    it('clone typeof should yield same result as original', () => {
      const input = [1, 2, 3]
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })

    it('should clone the constructor', () => {
      const input = [1, 2, 3]
      const clone = func(input)
      assert.equal(clone.constructor.name, input.constructor.name)
    })

    it('should clone enumerable properties', () => {
      const input = [1, 2, 3]
      Object.defineProperty(input, 'foo', {
        value: 'bar',
        enumerable: true
      })
      let clone = func(input)
      assert.ok(clone.foo === 'bar')
    })

    it('should clone non enumerable properties', () => {
      const input = [1, 2, 3]
      Object.defineProperty(input, 'foo', {
        value: 'bar',
        enumerable: false
      })
      let clone = func(input)
      assert.ok(clone.foo === 'bar')
    })
  })
})
