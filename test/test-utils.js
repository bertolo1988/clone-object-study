require('dotenv').config()
const DeepClone = require('../src/functions/deep-clone')

function mapStaticMethods(myClass) {
  const methods = Object.getOwnPropertyNames(myClass).filter(
    (prop) => typeof myClass[prop] === 'function'
  )
  return methods.map((key) => myClass[key])
}

function mapClassStaticMethods(myClass) {
  return [...mapStaticMethods(myClass)]
}

function getCloneMethods(myClass) {
  const funcs = mapClassStaticMethods(myClass)
  if (process.env.METHOD != null) {
    const result = funcs.filter((e) => e.name == process.env.METHOD)
    return result
  } else {
    return funcs
  }
}

function printDeepCloneMethods() {
  console.log(mapClassStaticMethods(DeepClone).map((e) => e.name))
}

module.exports = {
  mapClassStaticMethods,
  getCloneMethods,
  printDeepCloneMethods
}
