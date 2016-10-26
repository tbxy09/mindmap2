
var MongoClient = require('mongodb').MongoClient
var MindDAO = function(){};
var DailyCommand = function(){};

MindDAO.prototype.insert = function(callback){
    MongoClient.connect('mongodb://192.168.2.100:27017/Tb_xy09', function(err, db) {
        // Get the collection
        console.log('MindDAO.insert');
        var col = db.collection('contentMap');
        col.find().toArray(function(err,docs){
            console.log(docs.length);

          if (docs.length==0){
            console.log('enter the if');
            col.insertOne({name:'contentMap',obj:{}},function(r){
            db.close()
            callback();
            })
          }
          else{
            db.close();
            callback();
          }


            // db.close()
        })
  })
};

MindDAO.prototype.save = function(obj,callback){
          MongoClient.connect('mongodb://192.168.2.100:27017/Tb_xy09',function(err,db){
            var col = db.collection('contentMap');
            console.log('MindDAO.save');
            // var json = JSON.stringify(obj)
            col.findOneAndReplace({name:'contentMap'},{name:'contentMap',obj:obj
          },function(err,r){
              if(err){
                console.log(err);
              }
              // console.log(r.value);
              db.close()
              callback()
            })
          })
}

MindDAO.prototype.get = function(callback){
      MongoClient.connect('mongodb://192.168.2.100:27017/Tb_xy09',function(err,db){
        var col = db.collection('contentMap');
        console.log('MindDAO.get');
        col.find().toArray(function(err,docs){
          // console.log(docs[0].obj);
          callback(docs[0].obj)
          db.close()
        })
      })
}
DailyCommand.prototype.insert = function(obj,callback){
          MongoClient.connect('mongodb://192.168.2.100:27017/Tb_xy09',function(err,db){
            var col = db.collection('dailycommand');
            console.log('DailyCommand.insert');
            // var json = JSON.stringify(obj.content)
            // console.log(json);
            console.log(obj);
            col.insert(obj,function(err,r){
            console.log(err);
            db.close()
            callback();
            })
          })
}
DailyCommand.prototype.search = function(kw,callback){
      MongoClient.connect('mongodb://192.168.2.100:27017/Tb_xy09',function(err,db){
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
          callback(docs)
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
            callback(docs)
          })
        }

      })
}

exports.MindDAO = new MindDAO()
exports.DailyCommand = new DailyCommand()
