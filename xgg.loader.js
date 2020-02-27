const fs = require('fs');
const path = require('path');
const Router = require('koa-router')

function load(dir,cb) {
  const url = path.resolve(__dirname,dir)
  const files = fs.readdirSync(url)
  files.forEach(filename => {
    // 去掉后缀;
    filename = filename.replace('.js','')
    const file = require(url+'/'+filename)
    cb(filename,file)
  })
}

function initRouter(app){
  const router = new Router();
  load('routes',(filename,routes)=>{
    // index处理
    const pre = filename ==='index' ? '' : `/${filename}`

    // 判断路由类型
    routes = typeof routes === 'function' ? routes(app) : routes


    Object.keys(routes).forEach(key => {
      const [method,path] = key.split(' ');
      console.log(`正在映射地址: ${method.toLocaleLowerCase()} ${pre}${path}`)
      // router[method](pre + path , routes[key])
      router[method](pre + path , async (ctx) => {
        app.ctx = ctx;
        console.warn(key,routes,routes[key])
        await routes[key](app)
      })
    })

  });

  return router;
}


function initController(app){
  const controllers = {}
    // 读取目录
  load('controller',(filename,controller)=>{
    controllers[filename] = controller(app)
  })

  return controllers;
}


function initService(){
  const services = {}
  load('service',(filename,service)=>{
    services[filename] = service
  })
  return services;

}

const Sequelize = require('sequelize');
function loadConfig(app){
  load('config',(filename,conf)=>{
    if (conf.middleware) {
      conf.middleware.forEach(mid => {
          const midPath = path.resolve(__dirname, 'middleware', mid)
          app.$app.use(require(midPath))
      })
    }

    if(conf.db) {
      app.$db = new Sequelize(conf.db);
      // 加载模型
      app.$model = {}
      load('model',(filename,{scheme,options})=>{
        app.$model[filename] = app.$db.define(filename,scheme,options)
      })

      app.$db.sync({force:true})
    }
  })
}

const schedule = require('node-schedule')
function initSchedule() {
  // 读取控制器目录
  load("schedule", (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
  });
}

module.exports = {initRouter,initController,initService,loadConfig,initSchedule};