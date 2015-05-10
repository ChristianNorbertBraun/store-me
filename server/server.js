var express = require('express');
var app = express();

 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('webapp/index.html')
 });


 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname+ "/webapp" + req.params[0]);
 });

 app.listen(8080, function() {
   console.log("Listening on 8080");
 });
