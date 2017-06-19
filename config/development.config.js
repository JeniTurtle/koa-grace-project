"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");

const env = 'development';

const port = 3001;

const appsPath = path.resolve(__dirname, '../apps/');

process.env.DEBUG = process.env.DEBUG || 'koa-grace*';

module.exports = {
  // vhost配置
  vhost: {
    // 本地host
    '127.0.0.1': 'pc',
    'localhost': 'pc',
    // 测试环境host
    'testdci.yunlaiwu.com': 'pc',
    // 线上环境host
    'banquanbaohu.yunlaiwu.com': 'pc'
  },

  // proxy配置
  proxy: {
    // 超时配置 
    timeout: 15000
  },

  // controller中请求各类数据前缀和域名的键值对
  api: {
    api: 'https://api.yunlaiwu.com/',
    testapi: 'https://api.github.com/',
    local: 'http://127.0.0.1:' + port + '/__MOCK__/pc/'
  },

  // mock server配置
  mock: {
    prefix: '/__MOCK__/'
  },

  // 站点相关的配置
  site: {
    env: env,
    port: port,
    hostname: 'localhost'
  },

  // 通用参数，以模板参数的形式传递给模板引擎
  constant: {
    env: env,

    // 模板文件拿来动态加载静态资源
    src: function (app, dir, ext) {
      return src(path.join('/', app, 'static', dir), ext);
    }
  },

  // 路径相关的配置
  path: {
    // project
    project: appsPath,
    // 当直接访问域名时的默认路由
    default_path: {
      pc: '/dci/home/'
    },
    // 如果设置jump为false，则当直接访问域名时不重定向到default_path
    default_jump: {
      pc: true
    }
  },

  // 模板引擎配置，默认：swig
  template: {
    pc: 'swig'
  }

};



function src(dir, ext) {
  ext = ext == 'css' ? 'less' : ext;

  let tags = {
    js: '<script src="%s" type="text/javascript"></script>',
    less: '<link href="%s" rel="stylesheet" type="text/less" />'
  };

  if (!ext || !tags[ext]) {
    return dir;
  }

  let arr = [];
  let files = fs.readdirSync(path.join(appsPath, dir));

  files.forEach((fileName) => {
    if (fileName.indexOf("." + ext) >= 0) {
      let filePath = path.join(dir, fileName);
      let tag = util.format(tags[ext], filePath);
      arr.push(tag);
    }
  });
  return arr.join('');
}
