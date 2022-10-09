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
      assert.ok(clone !== input)
      assert.deepEqual(clone, input)
    })

    it('should clone a prototype object', () => {
      function Foo() {}
      Foo.prototype.foo = 'bar'
      let clone = func(Foo.prototype)
      assert.ok(!(clone instanceof Foo))
      assert.ok(clone !== Foo.prototype)
      assert.deepStrictEqual(clone, { foo: 'bar' })
    })

    it('should set the `[[Prototype]]` of a clone', function () {
      function Foo() {}
      Foo.prototype.bar = 1
      const clone = func(new Foo())
      assert.ok(clone instanceof Foo)
      assert.ok(clone.bar === 1)
    })

    it('should set the `[[Prototype]]` of a clone even when the `constructor` is incorrect', function () {
      function Foo() {
        this.a = 1
      }
      Foo.prototype.constructor = Object
      assert.ok(func(new Foo()) instanceof Foo)
    })

    it('should clone getters', () => {
      function Foo() {}

      Object.defineProperty(Foo.prototype, 'bar', {
        configurable: true,
        enumerable: true,
        get: function () {
          return 'foo-bar'
        }
      })

      let input = new Foo()
      var clone = func(input)

      assert.strictEqual(clone.bar, 'foo-bar')
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

    it('should clone symbol properties', () => {
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

    it('should clone type', () => {
      const input = { foo: 'bar' }
      const clone = func(input)
      assert.equal(typeof clone, typeof input)
    })

    it('should clone the constructor', () => {
      const input = { foo: 'bar' }
      const clone = func(input)
      assert.ok(input.constructor.name === clone.constructor.name)
    })
  })
})
