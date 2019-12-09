/*
 * @Author: your name
 * @Date: 2019-08-28 12:34:02
 * @LastEditTime: 2019-11-04 10:04:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hospitald:\project\starr\config\dev.env.js
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"'
})
