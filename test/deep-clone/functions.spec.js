/* // TODO divide this by tests
it('should clone a function', () => {
  function Foo() {}
  let clone = func(Foo)
  assert.ok(typeof clone === typeof Foo)
  assert.ok(typeof new clone() === typeof new Foo())
  assert.ok(new clone() instanceof Foo)
  assert.ok(new Foo() instanceof clone)
  assert.ok(clone.name === Foo.name)
  assert.deepStrictEqual(clone.prototype, Foo.prototype)
  assert.deepStrictEqual(clone, Foo)
}) */
