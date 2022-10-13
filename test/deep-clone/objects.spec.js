const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('objects part1', (func) => {
  describe(`🟣 ${func.name} `, () => {
    it('should clone a shallow object', () => {
      let input = { foo: 'bar' }
      let clone = func(input)
      assert.deepEqual(input, clone)
      assert.ok(clone !== input)
      assert.ok(clone.foo === input.foo)
      delete input.foo
      assert.equal(clone.foo, 'bar')
    })

    it('should clone a non shallow object', () => {
      let input = { foo: { bar: 'ti' } }
      let clone = func(input)
      assert.deepEqual(input, clone)
      assert.ok(clone !== input)
      assert.ok(clone.foo !== input.foo)
      assert.ok(clone.foo.bar === input.foo.bar)
      delete input.foo.bar
      assert.equal(clone.foo.bar, 'ti')
    })

    it('should clone an object with circular references', () => {
      var input = {
        foo: { b: { c: { d: {} } } },
        bar: {}
      }

      // circular ref 1
      input.foo.b.c.d = input
      // circular ref 2
      input.bar.b = input.foo.b

      let clone = func(input)
      // circular ref 1
      assert.ok(clone === clone.foo.b.c.d)
      // circular ref 2
      assert.ok(clone.bar.b === clone.foo.b)
      // clone should point to a different object
      assert.ok(clone.foo.b !== input.foo.b)
      assert.ok(clone !== input)
      assert.deepEqual(clone, input)
    })

    it('should clone a getter', () => {
      const input = {
        a: 2,
        get foo() {
          return this.a * 2
        }
      }
      let clone = func(input)
      assert.ok(clone.foo === 4)
      assert.ok(
        typeof Object.getOwnPropertyDescriptor(clone, 'foo').get === 'function'
      )
    })

    it('should clone a setter', () => {
      const input = {
        set foo(val) {
          this.a = val
        }
      }
      let clone = func(input)
      clone.foo('bar')
      assert.ok(clone.a === 'bar')
      assert.ok(input.a === undefined)
      assert.ok(
        typeof Object.getOwnPropertyDescriptor(clone, 'foo').set === 'function'
      )
    })

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

    it('should clone non enumerable, non writable and configurable properties', () => {
      const input = Object.create(Object.prototype, {
        property1: {
          value: 42,
          enumerable: false,
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
      assert.equal(cloneOwnDescriptor.enumerable, false)
      assert.equal(cloneOwnDescriptor.configurable, true)
      assert.equal(cloneOwnDescriptor.writable, false)
    })

    it('should clone non enumerable, writable and non configurable properties', () => {
      const input = Object.create(Object.prototype, {
        property1: {
          value: 42,
          enumerable: false,
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
      assert.equal(cloneOwnDescriptor.enumerable, false)
      assert.equal(cloneOwnDescriptor.configurable, false)
      assert.equal(cloneOwnDescriptor.writable, true)
    })

    it('should clone non enumerable, non writable and non configurable properties', () => {
      const input = Object.create(Object.prototype, {
        property1: {
          value: 42,
          enumerable: false,
          configurable: false,
          writable: false
        }
      })
      const clone = func(input)
      const cloneOwnDescriptor = Object.getOwnPropertyDescriptor(
        clone,
        'property1'
      )
      assert.ok(cloneOwnDescriptor != null)
      assert.equal(cloneOwnDescriptor.enumerable, false)
      assert.equal(cloneOwnDescriptor.configurable, false)
      assert.equal(cloneOwnDescriptor.writable, false)
    })

    it('should clone own symbol properties', () => {
      const input = { [Symbol('a')]: 44 }
      const clone = func(input)

      const cloneOwnPropertySymbols = Object.getOwnPropertySymbols(clone)

      assert.ok(cloneOwnPropertySymbols.length === 1)
      assert.equal(
        cloneOwnPropertySymbols[0].toString(),
        Symbol('a').toString()
      )
    })

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

    it('should clone non extensible object', () => {
      let input = { foo: 'bar' }
      Object.preventExtensions(input)
      const clone = func(input)
      assert.ok(Object.isExtensible(clone) === false)
    })

    it('clone typeof should yield same result as the original', () => {
      const input = { foo: 'bar' }
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })

    it('should clone the constructor', () => {
      const input = { foo: 'bar' }
      const clone = func(input)
      assert.ok(input.constructor.name === clone.constructor.name)
    })

    describe('prototype', () => {
      afterEach(() => {
        delete Object.prototype.dangerousFunction
      })

      it('clones the __proto__ by referencing', () => {
        const input = { a: 1 }
        input.__proto__.dangerousFunction = 'bar'
        let clone = func(input)
        assert.ok(clone.__proto__.dangerousFunction === 'bar')
        assert.ok(clone.__proto__ === input.__proto__)
      })

      it('clones the __proto__ by really copying', () => {
        const input = { foo: 'bar' }
        let clone = func(input)
        assert.ok(Object.getPrototypeOf(clone) !== Object.getPrototypeOf(input))
        Object.getPrototypeOf(clone).dangerousFunction = 'bar'
        assert.ok(Object.getPrototypeOf(input).dangerousFunction === undefined)
      })

      it('clones non enumerable properties in the prototype', () => {
        const inputProto = Object.create(null, {
          foo: {
            value: 'bar',
            enumerable: false
          }
        })
        const input = Object.create(inputProto)
        let clone = func(input)
        assert.ok(clone.foo === input.foo)
      })
    })
  })
})
