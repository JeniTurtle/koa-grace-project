"use strict";

const path = require("path");
const fs = require('fs');
const env = 'production';

process.env.DEBUG = process.env.DEBUG || 'koa-grace-error*';

module.exports = {
  // vhost配置
  vhost: {
    '127.0.0.1': 'pc',
    'localhost': 'pc'
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
    local: 'http://127.0.0.1:3000/__MOCK__/pc/'
  },

  // mock server配置
  mock: {
    prefix: '/__MOCK__/'
  },

  // 站点相关的配置
  site: {
    env: env,
    port: 3000,
    hostname: 'cloudwood'
  },

  // 通用参数，以模板参数的形式传递给模板引擎
  constant: {
    env: env,
    cdn: 'https://cdn2.yunlaiwu.com',
    domain: {
      pc: 'http://127.0.0.1:3000'
    },
    // 模板文件拿来动态加载静态资源
    gulp: gulp
  },

  // 路径相关的配置
  path: {
    // project
    project: path.resolve(__dirname, '../apps/'),
    // 当直接访问域名时的默认路由
    default_path: {
      pc: '/demo/home/'
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

function gulp(app, dir, file) {
  let dir_list = dir.split("/");

  if (dir_list.length < 2 || !file) {
    return path.join('/', app, dir, file || '');
  }

  let ext = '.' + file.split('.').pop();

  if (ext == '.scss' || ext == '.less' || ext == '.sass') {
    ext = '.css';
  }

  let src = path.join('/', app, 'build', dir, dir_list.pop() + ext);

  return src + "?t=" + getVersion(app, dir_list[0]);
}

function getVersion(app, module) {
  try {
    let versionFile = path.resolve(__dirname, '../apps/', app, 'build', module, 'version.json');
    let data = JSON.parse(fs.readFileSync(versionFile));
    return data && data.version;
  } catch (err){
    console.error(err);
    return new Date().getTime();
  }
}
