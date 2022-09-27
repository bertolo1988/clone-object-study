const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('objects', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone frozen object', () => {
      const input = { foo: 'bar' }
      Object.freeze(input)
      const clone = func(input)
      assert.ok(Object.isFrozen(clone))
    })

    it('should clone sealed object', () => {
      const input = { foo: 'bar' }
      Object.seal(input)
      const clone = func(input)
      assert.ok(Object.isSealed(clone))
    })

    /*     exports['clone instance with getter'] = function (test) {
      test.expect(1);
      function Ctor() {}
      Object.defineProperty(Ctor.prototype, 'prop', {
        configurable: true,
        enumerable: true,
        get: function() {
          return 'value';
        }
      });
    
      var a = new Ctor();
      var b = clone(a);
    
      test.strictEqual(b.prop, 'value');
      test.done();
    }; */
    /*     exports['clone object with symbol properties'] = function (test) {
      var symbol = Symbol();
      var obj = {};
      obj[symbol] = 'foo';
  
      var child = clone(obj);
  
      test.notEqual(child, obj);
      test.equal(child[symbol], 'foo');
  
      test.done();
    } */
  })
})
