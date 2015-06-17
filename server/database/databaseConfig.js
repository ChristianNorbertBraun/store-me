/**
 * Created by Marcel on 17.06.2015.
 */
var cradle = require('cradle');
var stringsFile = require('../webapp/string/strings.js');
var dbSettings = {
    url:"http://127.0.0.1",
    port: 5984
};

prepareDB();


/**
 * Get all needed databases by reading the database object from strings.js
 * Iterate through all databases and create a new cradle connection
 *
 * @function
 * @author Marcel Groﬂ
 */
function prepareDB() {

    for(var name in stringsFile.database){
        var tempDb = new(cradle.Connection)(dbSettings.url, dbSettings.port).database(stringsFile.database[name]);
        initDB(stringsFile.database[name], tempDb, function(created){
            if(created){
                //TODO change active waiting into a better way
                while(!created){}
            }
        });
    }

}

/**
 * Checks if database exists, if not create database
 *
 * @param {String} dbName                          - Name of the database to be initialised
 * @param {cradle.Connection} cradleConnection     - Connection to the database
 * @param {Function} callbackFunction              - Necessary callbackFunction
 * @author Marcel Groﬂ
 */
function initDB(dbName, cradleConnection, callbackFunction){
    cradleConnection.exists(function(error,exists){
        if(error){
            console.log('error', error);
            callbackFunction(false);
        }
        else if(exists){
            console.log('Connected to database '+ dbName);
            callbackFunction(true);
        }
        else{
            console.log('Database '+ dbName +' doesn\'t exist. Create...');
            cradleConnection.create(function(error){
                if(error){
                    console.log(error);
                    callbackFunction(false);
                }
                else{
                    console.log('Database created');
                    callbackFunction(true);
                }
            })
        }
    })
}
