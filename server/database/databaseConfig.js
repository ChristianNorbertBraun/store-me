/**
 * Created by Marcel on 17.06.2015.
 */

var cradle = require('cradle');
var stringsFile = require('../webapp/string/strings');


var dbStoremeusers = new(cradle.Connection)('http://127.0.0.1', 5984).database(stringsFile.database.user);
var dbContainers = new(cradle.Connection)('http://127.0.0.1', 5984).database(stringsFile.database.container);
var dbItems = new(cradle.Connection)('http://127.0.0.1', 5984).database(stringsFile.database.items);
var dbCategory = new(cradle.Connection)('http://127.0.0.1', 5984).database(stringsFile.databse.category);


dbStoremeusers.exists(function(error,exists){
    if(error){
        console.log('error', error);
    }
    else if(exists){
        console.log('Connected to database storemeusers');
    }
    else{
        console.log('Database storemeUsers doesn\'t exist. Create...');
        dbStoremeusers.create(function(error){
            if(error){
                console.log(error);
            }
            else{
                console.log('Database created');
            }
        });
    }
});

dbContainers.exists(function(error, exists){
    if(error){
        console.log('error', error);
    }
    else if(exists){
        console.log('Connected to database dbContainer');

    }
    else{
        console.log('Database dbContainer doesn\'t exist. Create...');
        dbContainers.create(function(error){
            if(error){
                console.log(error);
            }
            else{
                console.log('Database created');
            }
        });
    }
});

dbItems.exists(function(error,exists){
    if(error){
        console.log('error', error);
    }
    else if(exists){
        console.log('Connected to database storemeItems');

    }
    else{
        console.log('Database storemeItems doesn\'t exist. Create...');
        dbItems.create(function(error){
            if(error){
                console.log(error);
            }
            else{
                console.log('Database created');
            }
        });
    }
});

dbCategory.exists(function(error,exists){
    if(error){
        console.log('error', error);
    }
    else if(exists){
        console.log('Connected to database storemeCategory');

    }
    else{
        console.log('Database storemeCategory doesn\'t exist. Create...');
        dbCategory.create(function(error){
            if(error){
                console.log(error);
            }
            else{
                console.log('Database created');
            }
        });
    }
});