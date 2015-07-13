//todo change debugMode before release
var debugMode = true;

var stringsFile = require('./webapp/string/strings.js');
var sessionScript = require('./webapp/js/sessions/session_handler.js');
var databaseInit = require('./database/databaseConfig.js');
var userScript = require('./webapp/js/data_structure/user.js');
var encryptionScript = require('./webapp/js/encryption/stormecryptBE.js');
var dbSettings = require('./database/dbSettings.js');

var cradle = require('cradle');
var db = new(cradle.Connection)(dbSettings.url, dbSettings.port).database(stringsFile.database.user);
var bodyParser = require('body-parser');
var express = require('express');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, sessionid');
    next();
});

databaseInit.prepareDB();

 app.get("/", function(req, res) {
    console.log('on login');
     res.sendfile('webapp/index.html')
 });

app.get("/reset(.html)?", function (req,res){
   res.sendfile('webapp/misc/reset.html');
});
app.get("/register(.html)?", function(req,res){
    console.log('on register');
    res.sendfile('webapp/register.html');
});

app.get("/login", function (req, res) {
    var userInfo = prepareAuthentication(req);
    console.log(userInfo[0] + 'trys to login');
    db.get(userInfo[0], function(err, doc){
        if(doc == undefined){
            //  res.statusCode = err.headers.status;
            res.send("user does not exits");
            console.log("no user");
        } else if (userInfo[1] !== doc.password){
            res.statusCode = 400;
            console.log("password wrong");
            res.send("login failed");
        } else if (userInfo[1] === doc.password){
            console.log(userInfo[0] + "logged in successful!");
            res.statusCode = 200;
            var sessionID = sessionScript.newSession(userInfo[0], userInfo[1]);
            res.send(sessionID);
        }
    })
});

app.get("/logout", function(req, res){
    console.log('user logged out');
    var sessionID =  req.header('sessionID');
    sessionScript.endSession(sessionID);
    res.sendfile('webapp/index.html');
});

app.get("/manager(.html)?",function(req, res){
    console.log('on manager');
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
    console.log('on dashboard');
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
    console.log('on inventory');
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
    console.log('on coredata');
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

app.options(/^(.+)$/, function(req, res){
    console.log('received options request');
    res.end('');

});
 /** serves all the static files */
 app.get(/^(.+)$/, function(req, res){
     res.sendfile( __dirname+ "/webapp" + req.params[0]);
 });

 app.listen(stringsFile.link.port, function() {
   console.log("Listening on " + stringsFile.link.port);
 });


app.post("/registeruser", function(req, res){
    console.log('register user');

    var userInfo = prepareAuthentication(req);
    var user = userScript.newUser(userInfo[0], userInfo[1]);
    console.log(user);
    db.save(user, function (err, res) {
       console.log(res);
        if(err !== null){
           console.log(err);
       }
    });
    var sessionID = sessionScript.newSession(userInfo[0], userInfo[1]);
    console.log('register User');
    res.send(sessionID);
});


function prepareAuthentication(req)
{
    var auth = req.header('authorization');
    var decryptedString = (encryptionScript.storeMeDecrypt(auth));
    return decryptedString.split(":");
}
