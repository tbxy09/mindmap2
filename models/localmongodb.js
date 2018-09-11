
var MongoClient = require('mongodb').MongoClient
var MindDAO = function(){};
var log = {}

MindDAO.prototype.save = function(obj,callback){
          MongoClient.connect('mongodb://192.168.1.102:27017/Tb_xy09',function(err,db){
            if(err){
              return callback(err)
            }
            var col = db.collection('contentMap');
            console.log('MindDAO.save');
            var json = JSON.stringify(obj)
            if(json=='{}'){
              log.level = "warning"
              log.c= "try to write empty"
              db.close()
              return callback(null,log)
            }
            else{
                col.findOneAndReplace({name:'contentMap'},{name:'contentMap',obj:obj},function(err,r){
                  if(err){
                    db.close()
                    return callback(err,null)
                  }
                  // console.log(r.value);
                  db.close()
                  return callback(null,null)
                })
            }
          })
}

exports.MindDAOlocal = new MindDAO()
