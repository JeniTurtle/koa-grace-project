'use strict';

const path = require('path');
const util = require('util');
const koa = require('koa');
const mock = require('koa-grace-mock');
const router = require('koa-grace-router');
const vhost = require('koa-grace-vhost');
const proxy = require('koa-grace-proxy');
const views = require('koa-grace-views');
const body = require('koa-grace-body');
const _static = require('koa-grace-static');
const compress = require('koa-compress');

let config = global.config;

let app = koa();

app.use(function *(next){
  let that = this;
  let start = new Date;

  this.consoleLog = {
    type: 'normal-log',
    text: null
  };

  this.logger = {
    log: function(text) {
      that.consoleLog.text = text;
    },
    error: function(text) {
      that.consoleLog.type = 'error-log';
      that.consoleLog.text = text;
    }
  };

  yield next;
  let ms = new Date - start;

  let logMessage = util.format(this.consoleLog.type + ': %s %s - status:[%s] - %sms - headers: %s', this.method, this.url, this.status, ms, JSON.stringify(this.request.headers));

  if (this.consoleLog.text) {
    logMessage += (' logMessage: ' + this.consoleLog.text);
  }

  if (this.consoleLog.type == 'normal-log') {
    console.log(logMessage);
  } else {
    console.error(logMessage);
  }
});

// compress
app.use(compress());

// body
app.use(body({
  formLimit: '5mb'
}));

// 配置静态文件路由
app.use(_static(['/*/build/**/*', '/*/static/**/*'], {
  dir: config.path.project,
  maxage: config.site.env == 'production' && 60 * 60 * 1000
}));

// 获取vhost
let vhosts = Object.keys(config.vhost);
// 注入vhost路由
app.use(vhost(vhosts.map((item) => {
  let vapp = koa();

  let appName = config.vhost[item];
  let appPath = path.resolve(config.path.project + '/' + appName);

  // 在开发环境才使用mock数据功能
  config.site.env == 'development' && vapp.use(mock(vapp, {
    root: appPath + '/mock/',
    prefix: config.mock.prefix + appName
  }));

  // 配置api
  vapp.use(proxy(vapp, config.api, {
    timeout: config.proxy.timeout, // 接口超时时间
    allowShowApi: config.site.env !== 'production'
  }));

  // 配置模板引擎
  let template = (typeof config.template == 'object' ? config.template[appName] : config.template);

  let views_path = path.resolve(appPath, './views');

  vapp.use(views(views_path, {
    root: views_path,
    map: {
      html: template || 'swig'
    },
    cache: config.site.env == 'production' && 'memory'
  }));

  // 配置控制器文件路由
  vapp.use(router(vapp, {
    root: appPath + '/controller',
    default_path: config.path.default_path[appName],
    default_jump: config.path.default_jump[appName],
    domain: item,
    errorPath: '/error/404'
  }));

  return {
    host: item,
    app: vapp
  };
}).filter((item) => {
  return !!item;
})));

module.exports = app;
