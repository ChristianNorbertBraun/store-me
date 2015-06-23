//todo change debugMode before release
var debugMode = true;
var express = require('express');
var app = express();
var cradle = require('cradle');
var stringsFile = require('./webapp/string/strings.js');
var db = new(cradle.Connection)().database(stringsFile.database.user);
var sessionScript = require('./webapp/js/sessions/session_handler.js');

var databaseInit = require('./database/databaseConfig.js');
 app.get("/", function(req, res) {
     console.log(req.headers);
    res.sendfile('webapp/index.html')
 });

app.get("/register(.html)?", function(req,res){
    res.sendfile('webapp/register.html');
});

app.get("/login", function (req, res) {
    var userInfo = prepareAuthentication(req);
    db.get(userInfo[0], function(err, doc){
        if(doc == undefined){
            res.statusCode = err.headers.status;
            res.send("user does not exits");
        } else if (userInfo[1] !== doc.password){
            res.statusCode = 400;
            res.send("login failed");
        } else if (userInfo[1] === doc.password){
            res.statusCode = 200;
            var session = sessionScript.newSession(userInfo[0], userInfo[1]);
            res.send(session);
        }
    })
});

app.get("/manager(.html)?",function(req, res){
    if(debugMode){
        res.sendfile('webapp/manager.html');
    } else {
        var session = req.query[stringsFile.fixeddata.queryparams];
        if(sessionScript.isValidSession(session))
            res.sendfile('webapp/manager.html');
        else
            res.sendfile('webapp/index.html');
    }
});

app.get("/dashboard(.html)?", function(req, res){
    if(debugMode){
        res.sendfile('webapp/dashboard.html');
    } else {
        var session = req.query[stringsFile.fixeddata.queryparams];
        if(sessionScript.isValidSession(session))
            res.sendfile('webapp/dashboard.html');
        else
            res.sendfile('webapp/index.html');
    }
});


app.get("/inventory(.html)?", function(req,res){
    if(debugMode){
        res.sendfile('webapp/inventory.html');
    } else {
        var session = req.query[stringsFile.fixeddata.queryparams];
        if(sessionScript.isValidSession(session))
            res.sendfile('webapp/inventory.html');
        else
            res.sendfile('webapp/index.html');
    }
});

app.get("/coredata(.html)?", function(req,res){
    if(debugMode){
        res.sendfile('webapp/coredata.html');
    } else {
        var session = req.query[stringsFile.fixeddata.queryparams];
        if(sessionScript.isValidSession(session))
            res.sendfile('webapp/coredata.html');
        else
            res.sendfile('webapp/index.html');
    }
});

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




