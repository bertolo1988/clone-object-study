const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('arrays', (func) => {
  describe(`🟣 ${func.name} `, () => {
    describe('basic', () => {
      it('clone typeof should yield same result as the original', () => {
        const input = [[1, 2], { foo: 'bar' }]
        const clone = func(input)
        assert.equal(typeof clone, typeof input)
      })

      it('should clone the constructor', () => {
        const input = [[1, 2], { foo: 'bar' }]
        const clone = func(input)
        assert.ok(input.constructor.name === clone.constructor.name)
      })

      it('should clone a shallow array', () => {
        let input = [1, 2, { foo: 'bar' }]
        let clone = func(input)
        assert.deepEqual(input, clone)
        assert.ok(clone !== input)
        input.pop()
        assert.equal(clone[clone.length - 1].foo, 'bar')
      })

      it('should clone a non shallow array', () => {
        let input = [{ a: 1 }, { foo: { bar: 'ti' } }]
        let clone = func(input)
        assert.deepEqual(input, clone)
        input.pop()
        assert.equal(clone[clone.length - 1].foo.bar, 'ti')
      })

      it('should clone an object with circular reference to an element of the array', () => {
        var input = [
          { a: 1 },
          {
            foo: { b: { c: { d: {}, e: 1 } } },
            bar: {}
          }
        ]

        input[input.length - 1].foo.b.c.d = input[input.length - 1]

        let clone = func(input)

        // should clone with circular ref
        assert.ok(clone[clone.length - 1].foo.b.c.d === clone[clone.length - 1])
        // clone should point to a different object
        assert.ok(
          clone[clone.length - 1].foo.b.c.d !==
            input[clone.length - 1].foo.b.c.d
        )
        assert.ok(clone !== input)
        assert.deepEqual(clone, input)
      })

      it('should clone an object with circular reference to the main array', () => {
        var input = [
          { a: 1 },
          {
            foo: { b: { c: { d: {}, e: 1 } } },
            bar: {}
          }
        ]

        input[input.length - 1].foo.b.c.d = input

        let clone = func(input)

        // should clone with circular ref
        assert.ok(clone[clone.length - 1].foo.b.c.d === clone)
        // clone should point to a different object
        assert.ok(clone[clone.length - 1].foo.b.c.d !== input)
        assert.ok(clone !== input)
        assert.deepEqual(clone, input)
      })

      it('should clone an object with circular references pointing to a different property in same object', () => {
        var input = [
          { a: 1 },
          {
            foo: { b: { c: { d: {}, e: 1 } } },
            bar: {}
          }
        ]

        input[input.length - 1].bar.b = input[input.length - 1].foo.b

        let clone = func(input)
        // should clone with circular ref
        assert.ok(
          clone[clone.length - 1].bar.b === clone[clone.length - 1].foo.b
        )
        // clone should point to a different object
        assert.ok(
          clone[clone.length - 1].bar.b !== input[input.length - 1].bar.b
        )
        assert.ok(clone !== input)
        assert.deepEqual(clone, input)
      })
    })

    describe(`property descriptors`, () => {
      it('should clone a getter', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          enumerable: true,
          get: function () {
            return 'hi!'
          }
        })
        let clone = func(input)
        assert.ok(clone.hello === 'hi!')
        assert.ok(
          typeof Object.getOwnPropertyDescriptor(clone, 'hello').get ===
            'function'
        )
      })

      it('should clone a setter', () => {
        // TODO review getter and setter test both for array and object
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          enumerable: true,
          set: function (val) {
            return this.a === val
          }
        })
        input['a'] = 'foobar'
        let clone = func(input)
        assert.ok(clone.hello != null)
        assert.ok(
          typeof Object.getOwnPropertyDescriptor(clone, 'hello').set ===
            'function'
        )
        clone.hello(42)
        assert.ok(clone.a === 42)
        // input should remain unchanged
        assert.ok(input.a === 'foobar')
      })

      it('should clone enumerable properties (same as shallow clone)', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          value: 42,
          enumerable: true
        })
        const clone = func(input)
        assert.equal(
          Object.getOwnPropertyDescriptor(clone, 'hello')?.enumerable,
          true
        )
      })

      it('should clone non enumerable properties', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          value: 42,
          enumerable: false
        })
        const clone = func(input)
        assert.equal(
          Object.getOwnPropertyDescriptor(clone, 'hello')?.enumerable,
          false
        )
      })

      it('should clone enumerable and writable properties', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          value: 42,
          enumerable: true,
          configurable: false,
          writable: true
        })
        const clone = func(input)
        const cloneOwnDescriptor = Object.getOwnPropertyDescriptor(
          clone,
          'hello'
        )
        assert.ok(cloneOwnDescriptor != null)
        assert.equal(cloneOwnDescriptor.enumerable, true)
        assert.equal(cloneOwnDescriptor.configurable, false)
        assert.equal(cloneOwnDescriptor.writable, true)
      })

      it('should clone non enumerable, non writable and configurable properties', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          value: 42,
          enumerable: false,
          configurable: true,
          writable: false
        })
        const clone = func(input)
        const cloneOwnDescriptor = Object.getOwnPropertyDescriptor(
          clone,
          'hello'
        )
        assert.ok(cloneOwnDescriptor != null)
        assert.equal(cloneOwnDescriptor.enumerable, false)
        assert.equal(cloneOwnDescriptor.configurable, true)
        assert.equal(cloneOwnDescriptor.writable, false)
      })

      it('should clone non enumerable, writable and non configurable properties', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          value: 42,
          enumerable: false,
          configurable: false,
          writable: true
        })
        const clone = func(input)
        const cloneOwnDescriptor = Object.getOwnPropertyDescriptor(
          clone,
          'hello'
        )
        assert.ok(cloneOwnDescriptor != null)
        assert.equal(cloneOwnDescriptor.enumerable, false)
        assert.equal(cloneOwnDescriptor.configurable, false)
        assert.equal(cloneOwnDescriptor.writable, true)
      })

      it('should clone non enumerable, non writable and non configurable properties', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, 'hello', {
          value: 42,
          enumerable: false,
          configurable: false,
          writable: false
        })
        const clone = func(input)
        const cloneOwnDescriptor = Object.getOwnPropertyDescriptor(
          clone,
          'hello'
        )
        assert.ok(cloneOwnDescriptor != null)
        assert.equal(cloneOwnDescriptor.enumerable, false)
        assert.equal(cloneOwnDescriptor.configurable, false)
        assert.equal(cloneOwnDescriptor.writable, false)
      })

      it('should clone own symbol properties', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.defineProperty(input, Symbol('a'), {
          value: 44,
          enumerable: true
        })
        const clone = func(input)

        const cloneOwnPropertySymbols = Object.getOwnPropertySymbols(clone)

        assert.ok(cloneOwnPropertySymbols.length === 1)
        assert.equal(
          cloneOwnPropertySymbols[0].toString(),
          Symbol('a').toString()
        )
      })
    })

    describe('object options', () => {
      it('should clone frozen object', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.freeze(input)
        const clone = func(input)
        assert.ok(Object.isFrozen(clone))
      })

      it('should clone sealed object', () => {
        const input = [[1, 2], { foo: 'bar' }]
        Object.seal(input)
        const clone = func(input)
        assert.ok(Object.isSealed(clone))
      })

      it('should clone non extensible object', () => {
        let input = [[1, 2], { foo: 'bar' }]
        Object.preventExtensions(input)
        const clone = func(input)
        assert.ok(Object.isExtensible(clone) === false)
      })
    })

    describe('prototype', () => {
      afterEach(() => {
        delete Object.prototype.dangerousFunction
      })

      it('clones the __proto__ by referencing', () => {
        const input = [[1, 2], { foo: 'bar' }]
        input.__proto__.dangerousFunction = 'bar'
        let clone = func(input)
        assert.ok(clone.__proto__.dangerousFunction === 'bar')
        assert.ok(clone.__proto__ === input.__proto__)
      })

      it('clones the __proto__ by really copying', () => {
        const input = [[1, 2], { foo: 'bar' }]
        let clone = func(input)
        assert.ok(Object.getPrototypeOf(clone) !== Object.getPrototypeOf(input))
        Object.getPrototypeOf(clone).dangerousFunction = 'bar'
        assert.ok(Object.getPrototypeOf(input).dangerousFunction === undefined)
      })
    })
  })
})
