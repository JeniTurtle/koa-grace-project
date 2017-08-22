/**
 * 默认配置文件
 */

"use strict";

const path = require("path");

let env = process.env.NODE_ENV || 'development';

module.exports = {

  extend: true,

  vhost: {
    '127.0.0.1': 'pc/dci',
    'localhost': 'pc/dci',
    'testdci.yunlaiwu.com': 'pc/dci',
    'dci.yunlaiwu.com': 'pc/dci',
    'banquanbaohu.com': 'pc/dci',
    'chenming.banquanbaohu.com': 'pc/dci'
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
      'pc/dci': '/dci/home'
    },
    // 如果设置jump为false，则当直接访问域名时不重定向到default_path
    default_jump: {
      'pc/dci': false
    }
  },

  // 模板引擎配置
  template: 'swig'

};
