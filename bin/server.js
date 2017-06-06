#!/usr/bin/env node

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');
const debug = require('debug')('koa-grace:server');

const args = parseArg();
const config = global.config = get_config(args);

const app = require('../app');

let server = http.createServer(app.callback());

server.listen(config.site.port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  let port = config.site.port;
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
});

/**
 * 获取配置文件
 * @param  {object} args 执行node bin/server.js 时的命令行参数
 * @return {object}      配置详情
 */
function get_config(args) {
  // 将端口号写入环境变量
  if (args.port) {
    process.env.PORT = args.port;
  }

  // 获取默认配置
  let config = require('../config/main.config');
  let extendConfig = {};
  let env = args.env || config.site.env;

  // 获取增量配置文件
  let fileName = env + '.config.js';

  // 如果允许增量配置，则继承增量配置
  if (config.extend) {
    let extPath = path.join(__dirname, '../config', fileName);
    extendConfig = fs.existsSync(extPath) ? require(extPath) : extendConfig;
  }

  return util._extend(config, extendConfig);
}


/**
 * 通过 process.argv 获取命令行配置项
 * @return {object} 配置项
 */
function parseArg() {
  let argvs = process.argv;
  let result = {};

  let REG = /^--[a-zA-Z0-9]+\=[a-zA-Z0-9]+$/;

  argvs.map(function(item) {
    if (!REG.test(item)) {
      return
    }

    let arr = item.split('=');
    let key = arr[0].slice(2);

    result[key] = arr[1];
  })

  return result;
}
