
var MongoClient = require('mongodb').MongoClient
var MindDAO = function(){};
MindDAO.prototype.insert = function(callback){
    MongoClient.connect('mongodb://192.168.2.100:27017/Tb_xy09', function(err, db) {
        // Get the collection
        console.log('insert');
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
            // console.log('obj');
            // console.log(obj);
            // var json = JSON.stringify(obj)
            // console.log('json');
            // console.log(json);
            col.findOneAndReplace({name:'contentMap'},{name:'contentMap',obj:obj
          },function(err,r){
              // console.log(docs.length);
              // console.log(docs[0])
              // docs[0].contentMap = obj
              if(err){
                console.log(err);
              }
              console.log(r.value);
              // console.log(r.value.obj);
              db.close()
              callback()
            })
          })
}

MindDAO.prototype.get = function(callback){
      MongoClient.connect('mongodb://192.168.2.100:27017/Tb_xy09',function(err,db){
        var col = db.collection('contentMap');
        col.find().toArray(function(err,docs){
          callback(docs[0].obj)
          db.close()
        })
      })
}

module.exports = new MindDAO()
