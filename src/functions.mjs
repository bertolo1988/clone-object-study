export function cloneOperator(obj) {
  return { ...obj }
}

export function cloneAssign(obj) {
  return Object.assign({}, obj)
}

export function cloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj))
}
