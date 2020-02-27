const fs = require('fs')
const path = require('path')
// function writeToFile(data){
//   const localDir = getpath('../logger');
//   const filename = `${new Date().toLocaleDateString()}.txt`;
//   fs.stat(localDir, (err,stats)=>{
//     if(err) {
//       fs.mkdirSync(localDir, (err) => {
//         if (err) throw err;
//         console.warn("data",data)
//         fs.appendFileSync(`${localDir}/${filename}`,data + '\r\n',(err) => {
//           if(err) throw err;
//         })
//       });
//     }else{
//       fs.appendFile(`${localDir}/${filename}`,data  + '\r\n',(err) => {
//         if(err) throw err;
//       })
//     }
//  })
// }

class LogClass{
  constructor(dir){
    this.dir = dir;
  }

  checkDir(dir){
    const localDir = getpath(`../${dir}`);
  }

  getPath(){
    return path.resolve(__dirname,this.dir)
  }

  write(data){

  }

  info(data){
    this.write(data + '\r\n')
  }
}

const Logger = new LogClass();
module.exports = async (ctx, next) => {
    console.log('from log')
    Logger.info('logger start')
    Logger.info(ctx.method + " " + ctx.path);
    const start = new Date();
    await next();
    const duration = new Date() - start;
    Logger.info(
      ctx.method + " " + ctx.path + " " + ctx.status + " " + duration + "ms"
    );
  };