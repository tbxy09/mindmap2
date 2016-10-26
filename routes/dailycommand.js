
/*
 * GET users listing.
 */
var DailyCommand = require('./../models/mongodb.js').DailyCommand;

// exports.tab = function(req, res){
//   return res.render('newtab',{});
// };


// exports.mindsave = function(req,res){
//      Mind.save(req.body,function(err){
//      res.send('mindsave')
//      })
// }
exports.debug = function(req,res){
    // return res.render("movie")
            return res.render("datatype");
}
exports.tab = function(req,res){
    return res.render("dailycommand")

}
exports.search = function(req,res){
     DailyCommand.search(req.body,function(obj){
        console.log('route:DailyCommand search');
        res.send(obj)
    })
}
// }
exports.insert = function(req,res){
    console.log('route:insert');
    DailyCommand.insert(req.body,function(err){
           res.send('DailyCommand insert')
    })

}
