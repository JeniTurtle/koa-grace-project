/**
 * 默认配置文件
 */

"use strict";

const path = require("path");

let env = process.env.NODE_ENV || 'development';

module.exports = {

  extend: true,
  
  // proxy timeout时间
  proxy: {
    timeout: 15000
  },

  // controller中请求各类数据前缀和域名的键值对
  api: {
    api: 'https://api.yunlaiwu.com/',
    testapi: 'https://api.github.com/'
  },

  // 站点相关的配置
  site: {
    env: env,
    port: process.env.PORT || 3000
  },

  // 路径相关的配置
  path: {
    // project
    project: path.resolve(__dirname, '../apps/'),
    default_path: {
      pc: '/demo/home/'
    },
    // 如果设置jump为false，则当直接访问域名时不重定向到default_path
    default_jump: {
      pc: false
    }
  },

  // vhost配置
  vhost: {
    '127.0.0.1': 'pc'
  },

  // 模板引擎配置
  template: 'swig'

};
