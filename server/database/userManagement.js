/**
 * Created by Marcel on 23.06.2015.
 */
var cradle = require('cradle');
var stringsFile = require('../webapp/string/strings.js');
var dbSettings = require('./dbSettings.js');
var express = require('express');
var app = express();

app.get("/login", function (req, res) {
    var userInfo = prepareAuthentication(req);
});

function prepareAuthentication(req){
    var auth =  req.header('authorization');
    var buffer = new Buffer(auth.split(" ")[1], 'base64');
    var decryptedString = buffer.toString();
    console.log(decryptedString);
    var userInfo = decryptedString.split(":");

    return userInfo;
}