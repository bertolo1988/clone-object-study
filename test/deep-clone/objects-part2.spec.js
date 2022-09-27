const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('objects', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone enumerable properties (same as shallow clone)', () => {
      const input = Object.create(Object.prototype, {
        property1: {
          value: 42,
          enumerable: true
        }
      })
      const clone = func(input)
      assert.equal(
        Object.getOwnPropertyDescriptor(clone, 'property1')?.enumerable,
        true
      )
    })

    it('should clone non enumerable properties', () => {
      const input = Object.create(Object.prototype, {
        property1: {
          value: 42,
          enumerable: false
        }
      })
      const clone = func(input)
      assert.equal(
        Object.getOwnPropertyDescriptor(clone, 'property1')?.enumerable,
        false
      )
    })

    it('should clone enumerable and writable properties', () => {
      const input = Object.create(Object.prototype, {
        property1: {
          value: 42,
          enumerable: true,
          configurable: false,
          writable: true
        }
      })
      const clone = func(input)
      const cloneOwnDescriptor = Object.getOwnPropertyDescriptor(
        clone,
        'property1'
      )
      assert.ok(cloneOwnDescriptor != null)
      assert.equal(cloneOwnDescriptor.enumerable, true)
      assert.equal(cloneOwnDescriptor.configurable, false)
      assert.equal(cloneOwnDescriptor.writable, true)
    })

    it('should clone enumerable and configurable properties', () => {
      const input = Object.create(Object.prototype, {
        property1: {
          value: 42,
          enumerable: true,
          configurable: true,
          writable: false
        }
      })
      const clone = func(input)
      const cloneOwnDescriptor = Object.getOwnPropertyDescriptor(
        clone,
        'property1'
      )
      assert.ok(cloneOwnDescriptor != null)
      assert.equal(cloneOwnDescriptor.enumerable, true)
      assert.equal(cloneOwnDescriptor.configurable, true)
      assert.equal(cloneOwnDescriptor.writable, false)
    })

    /*     it.skip('should clone own properties', () => {
      // TODO
    })

    it.skip('should clone symbol properties', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that is sealed and keep it sealed', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that is frozen and keep it frozen', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that has an extra non enumerable property', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that has an extra enumerable, non writable and non configurable property', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that has an extra non enumerable, non writable property', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that has an extra non enumerable, non configurable and non writable property', () => {
      // TODO
    })
 */
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
