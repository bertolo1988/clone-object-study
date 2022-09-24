const assert = require('node:assert')
const DeepClone = require('../src/functions/deep-clone')
const ShallowClone = require('../src/functions/shallow-clone')

function testClone(func) {
  describe(`${func.name}`, () => {
    describe('shallow cloning', () => {
      it('should clone a string', () => {
        let input = 'some-string'
        let clone = func(input)
        assert.deepStrictEqual(input, clone)
      })
    })
  })
}

function runTests() {
  const funcs = [...Object.keys(DeepClone), ...Object.keys(ShallowClone)]
  for (let func of funcs) {
    testClone(func)
  }
}

runTests()
