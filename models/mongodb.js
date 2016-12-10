
var MongoClient = require('mongodb').MongoClient
var MindDAO = function(){};
var DailyCommand = function(){};
var log = {}


MindDAO.prototype.insert = function(callback){
    MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09', function(err, db) {
        // Get the collection
        console.log('MindDAO.insert');
        var col = db.collection('contentMap');
        if(err){
          //this is connection err
          return callback(err)
        }
        col.find().toArray(function(err,docs){
          db.close()
          if(err){
            //this is action err
            return callback(err)
          }
          // console.log(docs.length);
          if (docs.length==0){
              // console.log('enter the if');
              log.level = "warning"
              log.c = "inser new doc"
              col.insertOne({name:'contentMap',obj:{}},function(r){
              return callback(null,log);
              })
          }
          else{
            return callback(null,null);
          }


            // db.close()
        })
  })
};

MindDAO.prototype.save = function(obj,callback){
          MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09',function(err,db){
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

MindDAO.prototype.get = function(callback){
      MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09',function(err,db){
        if(err){
          return callback(err)
        }
        var col = db.collection('contentMap');
        console.log('MindDAO.get');
        col.find().toArray(function(err,docs){
          // console.log(docs[0].obj);
          db.close()
          if(err){
            return callback(err,null)
          }
          return callback(null,docs[0].obj)
        })
      })
}
DailyCommand.prototype.insert = function(obj,callback){
          MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09',function(err,db){
            var col = db.collection('dailycommand');
            console.log('DailyCommand.insert');
            // var json = JSON.stringify(obj.content)
            // console.log(json);
            console.log(obj);
            col.insert(obj,function(err,r){
            db.close()
            if(err){
              return callback(err)
            }
            return callback(null);
            })
          })
}
DailyCommand.prototype.search = function(kw,callback){
      MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09',function(err,db){
        var col = db.collection('dailycommand');
        console.log('DailyCommand.search');
        if(kw.content=="")
        {
          col.find().toArray(function(err,docs){
          // console.log(docs[0].obj);
          docs.forEach(function(data){
            console.log(data);
          })
          db.close()
          return callback(docs)
          })
        }
        else
        {
          console.log(kw.content);
          col.find({$text:{$search:kw.content}}).toArray(function(err,docs){
            console.log(docs);
            docs.forEach(function(data){
              console.log(data);
            })
            db.close()
            return callback(docs)
          })
        }

      })
}

exports.MindDAO = new MindDAO()
exports.DailyCommand = new DailyCommand()
