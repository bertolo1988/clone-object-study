function mapStaticMethods(myClass) {
  const methods = Object.getOwnPropertyNames(myClass).filter(
    (prop) => typeof myClass[prop] === 'function'
  )
  return methods.map((key) => myClass[key])
}

function mapClassStaticMethods(myClass) {
  return [...mapStaticMethods(myClass)]
}

module.exports = { mapClassStaticMethods }
