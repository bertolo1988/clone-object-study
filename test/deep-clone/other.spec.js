const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('other', (func) => {
  describe(`🟣 ${func.name} `, () => {
    describe('RegExp', () => {
      it('should clone `index` and `input` array properties', () => {
        let input = /c/.exec('abcde')
        let clone = func(input)

        assert.strictEqual(clone.index, 2)
        assert.strictEqual(clone.input, 'abcde')
      })
    })

    it('should clone a function', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      const a = 1,
        b = 2
      assert.ok(clone(a, b) === foo(a, b))
    })
  })
})
