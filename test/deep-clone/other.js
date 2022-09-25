describe('non primitive types', () => {
  describe('object literal {}', () => {
    it('should clone a simple shallow object', () => {
      let input = { foo: 'bar' }
      let clone = func(input)
      assert.deepEqual(input, clone)
      delete input.foo
      assert.equal(input.foo, undefined)
      assert.deepEqual(clone.foo, 'bar')
    })

    it('should clone a simple non shallow object', () => {
      let input = { foo: { bar: 'ti' } }
      let clone = func(input)
      assert.deepEqual(input, clone)
      delete input.foo.bar
      assert.equal(input.foo.bar, undefined)
      assert.deepEqual(clone.foo.bar, 'ti')
    })
  })

  describe('new Object()', () => {
    it('should clone a simple shallow object', () => {
      let input = new Object({ foo: 'bar' })
      let clone = func(input)
      assert.deepEqual(input, clone)
      delete input.foo
      assert.equal(input.foo, undefined)
      assert.deepEqual(clone.foo, 'bar')
    })

    it('should clone a simple non shallow object', () => {
      let input = new Object({ foo: { bar: 'ti' } })
      let clone = func(input)
      assert.deepEqual(input, clone)
      delete input.foo.bar
      assert.equal(input.foo.bar, undefined)
      assert.deepEqual(clone.foo.bar, 'ti')
    })
  })

  describe('Object.create()', () => {
    it('should clone a simple shallow object', () => {
      let input = Object.create({ foo: 'bar' })
      let clone = func(input)
      assert.deepEqual(input, clone)
      delete input.foo
      assert.equal(input.foo, undefined)
      assert.deepEqual(clone.foo, 'bar')
    })

    it('should clone a simple non shallow object', () => {
      let input = Object.create({ foo: { bar: 'ti' } })
      let clone = func(input)
      assert.deepEqual(input, clone)
      delete input.foo.bar
      assert.equal(input.foo.bar, undefined)
      assert.deepEqual(clone.foo.bar, 'ti')
    })
  })
})

describe.skip('other non primitive types', () => {
  // Functions, Promise, Error, Date, Map, WeakMap, Set, RegExp, Blob, File, FileLists, Blobs, TypedArray, ArrayBuffer, Buffer, DataView,ImageData,ImageBitmap
})

describe.skip('more complex tests', () => {
  it.skip('should clone all methods in a non shallow object', () => {
    // TODO
  })

  it.skip('should clone and maintain circular references', () => {
    // TODO
  })

  it.skip('should clone classes', () => {
    // TODO
  })

  it.skip('should clone class instances and keep the state', () => {
    // TODO
  })

  it.skip('should clone class instances and keep all methods', () => {
    // TODO
  })
})
