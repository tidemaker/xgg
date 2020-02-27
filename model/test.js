const {STRING,FLOAT} = require('sequelize');

module.exports = {
  scheme:{
    addr:STRING(30),
    age:FLOAT
  },
  option:{
    timestamp:false
  }
}