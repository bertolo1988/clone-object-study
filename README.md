# clone-object-study

The source code of a study about cloning in Javascript.

## Lits available clone methods

```
npm run methods
```

## Run all tests for all clone methods (not recommended)

```
npm run test
```

## Run all tests for a single clone method

You can select a clone method by defining the METHOD environment variable.

```
METHOD=cloneLib NODE_ENV=test npx jest
```

Alternatively you can set it using dotenv.

```
echo METHOD="cloneLib" > .env
npm run test
```

## Run a test suite for a single clone method

```
echo METHOD="cloneLib" > .env
npm run test test/deep-clone/arrays.spec.js
```
