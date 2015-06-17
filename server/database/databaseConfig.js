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

};

function initDB(dbName, db, callbackFunction){
    db.exists(function(error,exists){
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
            db.create(function(error){
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
