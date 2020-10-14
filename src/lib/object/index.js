/**
 * Returns the value of the property based on the object path.
 *
 * @export
 * @param {String} path Path to the property you want to access.
 * @param {Object} object The source object.
 * @returns {*}
 */
export function get(path, object) {
  path = path + ''
  const tokens = path.split('.')
  let currentProperty = object

  for (let i = 0; i < tokens.length; i++) {
    currentProperty = currentProperty[tokens[i]]
  }
  return currentProperty
}

/**
 * Sets the value of the object based on the path.
 *
 * @export
 * @source https://stackoverflow.com/a/10934946
 * @param {String} path Path to the property you want to access.
 * @param {Object} object The source object.
 * @param {*} newValue
 */
export function set(path, object, newValue) {
  path = path + ''
  path = path.split('.')
  while (path.length > 1) object = object[path.shift()]
  return (object[path.shift()] = newValue)
}
