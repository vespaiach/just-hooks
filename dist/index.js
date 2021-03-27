
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./just-hooks.cjs.production.min.js')
} else {
  module.exports = require('./just-hooks.cjs.development.js')
}
