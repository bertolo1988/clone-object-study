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

    it('should clone a matrix', () => {
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
  })
})
