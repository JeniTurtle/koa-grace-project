"use strict";

const path = require("path");
const fs = require('fs');
const util = require('util');
const env = 'production';

process.env.DEBUG = process.env.DEBUG || 'koa-grace-error*';

module.exports = {

  // proxy配置
  proxy: {
    // 超时配置
    timeout: 15000
  },

  // 站点相关的配置
  site: {
    env: env,
    port: 8006,
    hostname: 'cloudwood'
  },

  // controller中请求各类数据前缀和域名的键值对
  api: {
    api: 'https://api.yunlaiwu.com/',
    testapi: 'http://testapi.yunlaiwu.com:8099/',
    xpage: 'https://y.yunlaiwu.com/'
  },

  // 通用参数，以模板参数的形式传递给模板引擎
  constant: {
    env: env,
    // 模板文件拿来动态加载静态资源
    src: function(app, dir, ext) {
      let tags = {
        js: '<script src="%s" type="text/javascript"></script>',
        css: '<link href="%s" rel="stylesheet" type="text/css" />'
      };

      if (!ext || !tags[ext]) {
        return path.join('/', app, 'static', dir);
      }

      let dirs = dir.split("/");
      let url = path.join('/', app, 'build', dir, dirs.pop() + "." + (ext || "")) + "?t=" + getVersion(app, dirs[0]);
      return util.format(tags[ext], url);
    }
  }

};

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
