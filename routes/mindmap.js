
/*
 * GET users listing.
 */
var Mind = require('./../models/mongodb.js').MindDAO;

exports.tab = function(req, res){
  return res.render('newtab',{});
};


exports.mindsave = function(req,res){
     Mind.save(req.body,function(err){
     res.send('mindsave')
     })
}
exports.mindget = function(req,res){
     Mind.get(function(obj){
        console.log('route:mindget');
        res.send(obj)
    })

}
exports.mindinsert = function(req,res){
    Mind.insert(function(){
           res.send('mindinsert')
    })

}
