const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('objects', (func) => {
  describe(`🟣 ${func.name} `, () => {
    describe('RegExp', () => {
      it('should clone `index` and `input` array properties', () => {
        let input = /c/.exec('abcde')
        let clone = func(input)

        assert.strictEqual(clone.index, 2)
        assert.strictEqual(clone.input, 'abcde')
      })
    })
  })
})
