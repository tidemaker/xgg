const Koa = require('koa')
const {initRouter,initController,initService,loadConfig,initSchedule} = require('./xgg.loader')

class xgg {
  constructor(conf){
    this.$app = new Koa(conf);
    loadConfig(this)
    this.$service = initService();
    this.$ctrl = initController(this);
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes())

    initSchedule()
  }


  start(p){
    this.$app.listen(p,()=>{
      console.log(`服务启动，端口号:${p}`)
    })
  }
}


module.exports = xgg;