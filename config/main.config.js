/**
 * 默认配置文件
 */

"use strict";

const path = require("path");

let env = process.env.NODE_ENV || 'development';

module.exports = {

  extend: true,

  vhost: {
    '127.0.0.1': 'pc',
    'localhost': 'pc',
    'testdci.yunlaiwu.com': 'pc',
    'dci.yunlaiwu.com': 'pc'
  },
  
  // proxy timeout时间
  proxy: {
    timeout: 15000
  },

  // 站点相关的配置
  site: {
    env: env,
    port: process.env.PORT || 8006
  },

  // 路径相关的配置
  path: {
    // project
    project: path.resolve(__dirname, '../apps/'),
    default_path: {
      pc: '/dci/home/'
    },
    // 如果设置jump为false，则当直接访问域名时不重定向到default_path
    default_jump: {
      pc: true
    }
  },

  // 模板引擎配置
  template: 'swig'

};
