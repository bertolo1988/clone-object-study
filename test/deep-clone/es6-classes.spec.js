const assert = require('node:assert')
const _ = require('lodash')
const { mapClassStaticMethods } = require('../test-utils')
const DeepClone = require('../../src/functions/deep-clone')

const funcs = mapClassStaticMethods(DeepClone)

describe.each(funcs)('es6 classes', (func) => {
  describe(`🟣 ${func.name} `, () => {
    describe('class definitions', () => {
      it('should clone the class prototype', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }
        }
        const clone = func(InputClass)

        assert.ok(InputClass.prototype === clone.prototype)
      })

      it('should clone the constructor', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }
        }
        const clone = func(InputClass)
        assert.equal(clone.constructor.name, InputClass.constructor.name)
      })

      it('clone typeof should yield same result as original', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }
        }
        const clone = func(InputClass)
        assert.equal(typeof clone, typeof InputClass)
      })

      it('should clone the class constructor', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }
        }
        const clone = func(InputClass)
        assert.ok(InputClass.constructor === clone.constructor)
        assert.ok(clone.constructor.name === clone.constructor.name)
      })

      it('should clone static methods', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }

          static tic() {
            return 'tac'
          }
        }
        const clone = func(InputClass)
        assert.ok(clone.tic === InputClass.tic)
        assert.ok(InputClass.tic() === 'tac')
        assert.ok(clone.tic() === InputClass.tic())
      })

      it('should clone inherited static methods', () => {
        class Bar {
          static car() {
            return 'BMW'
          }
        }
        class InputClass extends Bar {
          constructor(foo) {
            super()
            this.foo = foo
          }
          static tic() {
            return 'tac'
          }
        }
        const clone = func(InputClass)
        assert.ok(clone.car() === 'BMW')
      })
    })

    describe('class instances', () => {
      it('should clone a class instance and the state', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }
        }
        const input = new InputClass('bar')
        const clone = func(input)
        assert.deepEqual(clone, input)
        assert.equal(input.foo, clone.foo)
      })

      it('should clone the construct', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }
        }
        const input = new InputClass('bar')
        const clone = func(input)
        assert.equal(input.constructor, clone.constructor)
        assert.ok(input.constructor.name === clone.constructor.name)
      })

      it('should clone the class methods', () => {
        class InputClass {
          constructor(foo) {
            this.foo = foo
          }
          fooBar() {
            return this.foo
          }
        }
        const input = new InputClass('bar')
        const clone = func(input)
        assert.ok(input.fooBar === clone.fooBar)
      })

      it('should clone extended class instance state', () => {
        class FooBar {
          constructor(a) {
            this.a = a
          }
        }
        class InputClass extends FooBar {
          constructor(foo) {
            super(foo)
          }
        }
        const input = new InputClass('foo-bar')
        const clone = func(input)
        assert.ok(clone.a === 'foo-bar')
      })

      it('clone typeof should yield same result as the original', () => {
        class FooBar {
          constructor(a) {
            this.a = a
          }
        }
        class InputClass extends FooBar {
          constructor(foo) {
            super(foo)
          }
        }
        const input = new InputClass('foo-bar')
        const clone = func(input)
        assert.equal(typeof clone, typeof input)
      })

      it('should clone inherited non static methods', () => {
        class Snackbar {
          constructor(name) {
            this.name = name
          }

          car() {
            return this.name
          }
        }

        class Restaurant extends Snackbar {
          constructor(foo) {
            super(foo)
          }
        }

        const name = 'foo-bar'
        const input = new Restaurant(name)
        const clone = func(input)
        assert.ok(clone.car() === name)
      })
    })
  })
})
