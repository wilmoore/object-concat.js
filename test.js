'use strict'

/*!
 * imports.
 */

var test = require('tape-catch')

/*!
 * imports (local).
 */

var concat = require('./')

/*!
 * iteratees.
 */

function playerUp (key, targetVal, sourceVal) {
  return key === 'player' ? sourceVal.toUpperCase() : sourceVal
}

function ignoreUndefined (key, targetVal, sourceVal) {
  return sourceVal === undefined ? targetVal : sourceVal
}

/*!
 * parameters.
 */

var parameters = [
  {
    name: 'subsequent objects override previous',
    args: [ { level: 1 }, { player: 'isaac', level: 5 } ],
    expected: { player: 'isaac', level: 5 }
  },

  {
    name: 'iteratee transforms target values based on key',
    args: [ { level: 1 }, { player: 'isaac', level: 5 }, playerUp ],
    expected: { player: 'ISAAC', level: 5 }
  },

  {
    name: 'iteratee ignores source values based on value match',
    args: [ { level: 1, karma: 20 }, { player: 'isaac', level: 5, karma: void 0 }, ignoreUndefined ],
    expected: { player: 'isaac', level: 5, karma: 20 }
  }
]

/*!
 * tests.
 */

test('concat()', function (t) {
  t.plan(parameters.length)

  parameters.forEach(function (p) {
    var actual = concat.apply(null, p.args)
    t.deepEqual(actual, p.expected, p.name)
  })
})
