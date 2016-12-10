
/*
 * GET users listing.
 */
var Mind = require('./../models/mongodb.js').MindDAO;
var Mindlocal = require('./../models/localmongodb.js').MindDAOlocal;


exports.tab = function(req, res){
  return res.render('newtab',{});
};


exports.mindsave = function(req,res){
     Mind.save(req.body,function(err,log){
        err = typeof err !=='undefined'?err:null
        log = typeof log !=='undefined'?log:null
        if(err!==null){
            var errstring = JSON.stringify(err)
            res.send(errstring)
        }
        if(log!==null){
            var logstring = JSON.stringify(log)
            res.send(logstring)
        }
        res.send('mindsave')
     })
}
exports.mindlocalsave = function(req,res){
     Mindlocal.save(req.body,function(err,log){
        err = typeof err !=='undefined'?err:null
        log = typeof log !=='undefined'?log:null
        if(err!==null){
            var errstring = JSON.stringify(err)
            res.send(errstring)
        }
        if(log!==null){
            var logstring = JSON.stringify(log)
            res.send(logstring)
        }
        res.send('mindlocalsave')
     })
}
exports.mindget = function(req,res){
     Mind.get(function(err,obj){
        err = typeof err !=='undefined'?err:null
        obj = typeof obj !=='undefined'?obj:null
        if(err!==null){
            var errstring = JSON.stringify(err)
            res.send(errstring)
        }
        console.log('route:mindget');
        res.send(obj)
    })

}
exports.mindinsert = function(req,res){
    Mind.insert(function(err,log){
        err = typeof err !=='undefined'?err:null
        log = typeof log !=='undefined'?log:null
        if(err!==null){
            var errstring = JSON.stringify(err)
            res.send(errstring)
        }
        if(log!==null){
            var logstring = JSON.stringify(log)
            res.send(logstring)
        }
        res.send('mindinsert')
    })

}
