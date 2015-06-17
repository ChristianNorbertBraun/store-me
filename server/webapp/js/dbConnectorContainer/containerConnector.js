/**
 * Created by Marcel on 10.06.2015.
 */

function saveStore(callBackFunction, container){
    $.couch.urlPrefix = strings.link.dbConnection;

    checkIfDatabaseExists(function(created, id, rev){
        if (created){
            container["_id"] = id;
            container["_rev"] = rev;
            $.couch.db(strings.database.container).saveDoc(container, {
                success: function(data) {
                    callBackFunction(true);
                    console.log(data);
                },
                error: function(status) {
                    console.log(status);
                    callBackFunction(false);
                }
            });
        }
    });

}

function loadStore(callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;

    var mapFunction = function(doc) {
        emit(null, doc);
    };
    $.couch.db(strings.database.container).query(mapFunction, "_count", "javascript", {
        success: function(data) {
            try {
                var containerObject = data["rows"][0].value;
                callBackFunction(true, containerObject, containerObject["_id"], containerObject["_rev"]);
            } catch(err){
                callBackFunction(true);
            }
        },
        error: function(status) {
            console.log(status);
            callBackFunction(false);
        },
        reduce: false
    });
}


//helper Classes
function checkIfDatabaseExists(callBackFunction){
    $.couch.allDbs({
        success: function(data) {
            var dbExists = false;
            for(var i = 0; i < data.length; i++){
                if(data[i] === "container"){
                    dbExists = true;
                    break;
                }
            }
            if(!dbExists){
                createDatabase(function(created){
                    if(created){
                        callBackFunction(true);
                    }
                });
            } else {
                loadStore(function(created, data, id, rev){
                    if(created){
                        callBackFunction(true, id, rev);
                    }
                })
            }
        }
    });
}

function createDatabase(callBackFunction){
    $.couch.db(strings.database.container).create({
        success: function(data) {
            console.log("db created");
            callBackFunction(true);
        },
        error: function(status) {
            console.log("not able to create db");
            callBackFunction(false);
        }
    });
}

