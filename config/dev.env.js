var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://106.14.192.174:9095/"'
  BASE_API: '"http://192.168.138.136:9095/"'
})
