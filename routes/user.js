module.exports = {
  //  /user/
 
  'get /' : async app =>{
    const {$service,ctx} = app;
    const name = await $service.user.getName();
    ctx.body = '用户' + name
  },
  'get /Detail':async app => {
    const {$service,ctx} = app;
    const age = $service.user.getAge();

    ctx.body = '用户详细页面'+ age;
  }
}