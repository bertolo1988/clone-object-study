const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('objects', (func) => {
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

    it('should set the `[[Prototype]]` of a clone, cloning an instance is also an instance', function () {
      function Foo() {}
      Foo.prototype.bar = 1
      const clone = func(new Foo())
      assert.ok(clone instanceof Foo)
      assert.ok(clone.bar === 1)
    })

    it('should clone a prototype object', () => {
      function Foo() {}
      Foo.prototype.foo = 'bar'
      let clone = func(Foo.prototype)
      assert.ok(!(clone instanceof Foo))
      assert.ok(clone !== Foo.prototype)
      assert.deepStrictEqual(clone, { foo: 'bar' })
    })

    it.skip('should clone a simple non shallow object that has an extra symbol property', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that has an extra symbol property in the prototype', () => {
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

    it.skip('should clone a simple non shallow object that is sealed and keep it sealed', () => {
      // TODO
    })

    it.skip('should clone a simple non shallow object that is frozen and keep it frozen', () => {
      // TODO
    })
  })
})
