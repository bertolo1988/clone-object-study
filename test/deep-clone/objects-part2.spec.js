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
  })
})
