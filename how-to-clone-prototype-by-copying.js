// How to clone a javascript object without just referencing the prototype
const assert = require('node:assert')

const input = { a: 1 }

// every prototype is an object with normal property descriptors
const prototypeDescriptors = Object.getOwnPropertyDescriptors(
  Object.getPrototypeOf(input)
)

// this creates an object without prototype using the property
// descriptors of input.__proto__
const protoClone = Object.create(null, prototypeDescriptors)

// this clones input but assigns our protoClone as our __proto__
const inputClone = Object.create(
  protoClone,
  Object.getOwnPropertyDescriptors(input)
)

// proof that inputClone is a clone of input without just referencing the prototype
assert.ok(inputClone !== input)
assert.ok(Object.getPrototypeOf(inputClone) !== Object.getPrototypeOf(input))

Object.getPrototypeOf(input).foo = 'bar'

assert.ok(Object.getPrototypeOf(inputClone).foo === undefined)
assert.equal(inputClone.a, input.a)

console.log('voilá')
