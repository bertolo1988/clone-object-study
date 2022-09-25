# clone-object-study

## Correctness

### What to expect from a good deep clone?

- clone every primitive value: boolean, null, undefined, number, BigInt, String and Symbol

- clone Infinity, NaN

- clone every object at any depth that is listed by Object.keys() (all enumerable own properties)

- clone every object at any depth that is listed by Object.getOwnPropertyNames() (returns all own properties)

- correctly clone circular dependencies

- call clone methods on class instances

### To consider

Errors?

Buffers?

Functions?

Maps?

Sets?

# Notes

Underscore.js has no deep clone.

Underscore Contrib deep clone doesnt work.

https://www.npmjs.com/package/clone-deep - does not work
