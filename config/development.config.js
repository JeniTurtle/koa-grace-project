"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");

const env = 'development';

const port = 8006;

const appsPath = path.resolve(__dirname, '../apps/');

process.env.DEBUG = process.env.DEBUG || 'koa-grace*';

module.exports = {

  // proxy配置
  proxy: {
    // 超时配置 
    timeout: 15000
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

  // controller中请求各类数据前缀和域名的键值对
  api: {
    api: 'https://api.yunlaiwu.com/',
    testapi: 'http://testapi.yunlaiwu.com:8099/',
    xpage: 'https://y.yunlaiwu.com/',
    local: 'http://127.0.0.1:' + port + '/__MOCK__/pc/'
  },

  // 通用参数，以模板参数的形式传递给模板引擎
  constant: {
    env: env,

    // 模板文件拿来动态加载静态资源
    src: function (app, dir, ext) {
      return src(path.join('/', app, 'static', dir), ext);
    }
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
