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

    'testdci.yunlaiwu.com': 'pc/dci', // 版保测试服务器域名
    'dci.yunlaiwu.com': 'pc/dci', // 版保正式环境域名
    'banquanbaohu.com': 'pc/dci', // 版保正式环境域名
    'www.banquanbaohu.com': 'pc/dci',  // 版保正式环境域名
    'chenming.banquanbaohu.com': 'pc/dci', // 版保本地测试域名

    'xinbianju.com': 'pc/newwriter', // 新编剧正式环境域名
    'www.xinbianju.com': 'pc/newwriter', // 新编剧正式环境域名
    'chenming.xinbianju.com': 'pc/newwriter' // 新编剧本地测试域名
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
      'pc/dci': '/dci/home',
      'pc/newwriter': '/newwriter/home'
    },
    // 如果设置jump为false，则当直接访问域名时不重定向到default_path
    default_jump: {
      'pc/dci': false,
      'pc/newwriter': false
    }
  },

  // 模板引擎配置
  template: 'swig'

};
