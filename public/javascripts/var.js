// $(function(){
    // var util = require('util')
    // string
    var string = '{"content":"this is var from js"}'
    // json
    var json ={content:"this is var from js"}
    // obj
    // 
        var json2string = document.getElementById('json2string')
        var string2json = document.getElementById('string2json')

        json2string.addEventListener('click',function(){
            mstring = JSON.stringify(json)
            console.log(mstring);
            document.getElementById('myvar').innerText = mstring
        })
        string2json.addEventListener('click',function(){
            mjson = JSON.parse(string)
            // util.isObject(mjson)
            console.log("Is obj");
            console.log(mjson);
            document.getElementById('myvar').innerText = $.toJSON(mjson)
        })

// })
