'use strict'

/**
 * exports.
 */

module.exports = concat

/**
 * Assign properties of source object(s) to a new object.
 *
 * @param {...Object} [sources]
 * The source objects.
 *
 * @param {Function|Null} [iteratee]
 * Function for transforming target values (must be last parameter).
 *
 * @return {Object}
 * New object.
 */

function concat (/* [sources], [iteratee] */) {
  var tee = getIteratee(arguments[arguments.length - 1])
  var end = arguments.length
  var idx = -1
  var out = {}

  while (++idx < end) {
    copy(out, arguments[idx], tee)
  }

  return out
}

/**
 * Copy source properties to target.
 *
 * @param {Object} target
 * Object to assign properties to.
 *
 * @param {Object} source
 * Object to pull properties from.
 *
 * @param {Function|Null} iteratee
 * Function for transforming target values.
 *
 * @return {Object}
 * New object.
 */

function copy (target, source, iteratee) {
  for (var key in Object(source)) {
    if (iteratee) {
      target[key] = iteratee(key, target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }

  return target
}

/**
 * Return iteratee if type is `Function`, otherwise, return `null`.
 *
 * @param {Function|Object} iteratee
 * Value that optionally a function.
 *
 * @return {Function|Null}
 * Return iteratee if type is `Function`, otherwise, return `null`.
 */

function getIteratee (iteratee) {
  return typeof iteratee === 'function' ? iteratee : null
}
