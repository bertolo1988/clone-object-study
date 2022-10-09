# clone-object-study

## Correctness

### What to expect from a good deep clone?

- clone every primitive value: boolean, null, undefined, number, BigInt, String and Symbol

- clone Infinity, NaN

- clone every object at any depth that is listed by Object.keys() (all enumerable own properties)

- clone every object at any depth that is listed by Object.getOwnPropertyNames() (returns all own properties)

- correctly clone circular dependencies

- call clone methods on class instances

# Notes

Underscore.js has no deep clone.

Underscore Contrib deep clone doesnt work.

https://www.npmjs.com/package/clone-deep - does not work

// TODO

lodas uncloneable - https://github.com/lodash/lodash/blob/2f79053d7bc7c9c9561a30dda202b3dcd2b72b90/test/clone-methods.js#L73
take more ideas from here

TODO

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays

make sure every test suite has the following tests:

https://stackoverflow.com/questions/1833588/javascript-clone-a-function

"should clone own enumerable properties if they exist"

"should clone own properties non enumerable properties if they exist"

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible