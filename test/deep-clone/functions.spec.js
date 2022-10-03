const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('Function', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone a function', () => {
      function foo(a, b) {
        return a + b
      }
      let clone = func(foo)
      const a = 1,
        b = 2
      assert.ok(clone(a, b) === foo(a, b))
    })

    it('should clone a function own properties', () => {
      function foo(a, b) {
        return a + b
      }
      foo.bar = 'aa'
      let clone = func(foo)
      assert.ok(clone.bar === foo.bar)
    })
  })
})
