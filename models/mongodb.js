
var MongoClient = require('mongodb').MongoClient
var MindDAO = function(){};
var DailyCommand = function(){};
var log = {}

function json2array(obj){
return Object.keys(obj).map(function(key){
  console.log(obj[key]);
  return obj[key]
})
}

MindDAO.prototype.insert = function(callback){
    MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09', function(err, db) {
        // Get the collection
        console.log('MindDAO.insert');
        var colArray = db.collection('contentMapArray');
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
            // var colArray = db.collection('contentMapArray');
            var col = db.collection('contentMap');
            console.log('MindDAO.save');
            var json = JSON.stringify(obj)
            if(json=='{}'||json==null||json==undefined){
              console.log("empty");
              log.level = "warning"
              log.c= "try to write empty"
              db.close()

              return callback(null,log)
            }
            else{
                // col.findOneAndReplace({name:'contentMap'},{name:'contentMap',obj:obj.f},function(err,r){
                //   if(err){
                //     db.close()
                //     return callback(err,null)
                //   }
                //   // console.log(r.value);
                //   // db.close()
                //   // return callback(null,null)
                // })

                var colArray = db.collection('contentMapArray');
                // var col = db.collection('contentMap');
                console.log('MindDAO.saveUnit');
                // array = json2array(obj)
                colArray.findOneAndReplace({created:obj.created},{created:obj.created,content:obj.content,updated:obj.updated},function(err,r){
                      if(err){
                        db.close()
                        return callback(err,null)
                      }
                      if(r.value==null){
                          colArray.insert(obj,function(err,r){
                                db.close()
                                if(err){
                                  return callback(err,null)
                                }
                                return callback(null,null);
                          })
                      }
                      db.close()
                      return callback(null,null)
                })
              }
          })
}

MindDAO.prototype.saveUnit = function(obj,callback){
          MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09',function(err,db){
            if(err){
              return callback(err)
            }
            var colArray = db.collection('contentMapArray');
            // var col = db.collection('contentMap');
            console.log('MindDAO.saveUnit');
            // array = json2array(obj)
            colArray.findOneAndReplace({created:obj.created},{created:obj.created,content:obj.content,updated:obj.updated},function(err,r){
              if(err){
                db.close()
                return callback(err,null)
              }
              // console.log(r.value);
              db.close()
              return callback(null,null)
            })
          })
}
MindDAO.prototype.remove = function(obj,callback){
          MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09',function(err,db){
            if(err){
              return callback(err)
            }
            var colArray = db.collection('contentMapArray');
            // var col = db.collection('contentMap');
            console.log('MindDAO.remove');
            // array = json2array(obj)
            colArray.findOneAndDelete({created:obj.created},{projection:{content:obj.content,updated:obj.updated}},function(err,r){
              if(err){
                db.close()
                return callback(err,null)
              }
              // console.log(r.value);
              db.close()
              return callback(null,null)
            })
          })
}


MindDAO.prototype.get = function(callback){
      MongoClient.connect('mongodb://192.168.2.101:27017/Tb_xy09',function(err,db){
        if(err){
          return callback(err)
        }
        var colArray = db.collection('contentMapArray');
        console.log('MindDAO.get');
        colArray.find().toArray(function(err,docs){
          // console.log(docs[0].obj);
          contentMap = {}
          docs.forEach(function(a,b,c){
            if (a.created==undefined){
              console.log(b);
              // console.log(c);
              console.log(a.created);
            }
            contentMap[a.created]={created:a.created,content:a.content,updated:a.updated}
          })
          // // console.log(contentMap);
          db.close()
          if(err){
            return callback(err,null)
          }
          return callback(null,contentMap)
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
