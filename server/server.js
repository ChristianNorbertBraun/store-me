var express = require('express');
var app = express();

var cradle = require('cradle');

var db = new(cradle.Connection)('http://127.0.0.1', 5984).database('storemeusers');

db.exists(function(error,exists){
    if(error){
        console.log('error', error);
    }
    else if(exists){
        console.log('Connected to database storemeusers');

    }
    else{
        console.log('Database storemeUsers doesn\'t exist. Create...');
        db.create(function(error){
            if(error){
                console.log(error);
            }
            else{
                console.log('Database created');
            }
        });

    }

});

 /** serves main page */
 app.get("/", function(req, res) {
     console.log(req.headers);
    res.sendfile('webapp/index.html')
 });

app.get("/manager(.html)?",function(req, res){
    /*var auth =  req.header('authorization');
    var b = new Buffer(auth.split(" ")[1], 'base64');
    var s = b.toString();
    console.log(s);*/

    res.sendfile('webapp/manager.html');
});

app.get("/dashboard(.html)?", function(req, res){
    res.sendfile('webapp/dashboard.html');
});

app.get("/register(.html)?", function(req,res){
    res.sendfile('webapp/register.html');
});

app.get("/inventory(.html)?", function(req,res){
    res.sendfile('webapp/inventory.html');
})

 /** serves all the static files */
 app.get(/^(.+)$/, function(req, res){
     console.log('static file request : ' + req.params[0]);
     res.sendfile( __dirname+ "/webapp" + req.params[0]);

 });

 app.listen(8080, function() {
   console.log("Listening on 8080");
 });


app.post("/registeruser", function(req, res){
   var userInfo = prepareAuthentication(req);
    db.save({
        name:userInfo[0], password:userInfo[1]
    }, function (err, res) {
       console.log(res);
    });
    res.send("Hallo");
});

function prepareAuthentication(req){
    var auth =  req.header('authorization');
    var buffer = new Buffer(auth.split(" ")[1], 'base64');
    var decryptedString = buffer.toString();
    console.log(decryptedString);
    var userInfo = decryptedString.split(":");

    return userInfo;
}




