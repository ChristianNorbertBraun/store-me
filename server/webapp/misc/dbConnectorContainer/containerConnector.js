/**
 * Created by Marcel on 10.06.2015.
 */

function saveStore(callBackFunction, container){
    $.couch.urlPrefix = strings.link.dbConnection;

    checkIfDatabaseExists(function(created, id, rev){
        if (created){
            container["_id"] = id;
            container["_rev"] = rev;
            $.couch.db("container").saveDoc(container, {
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

};

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
    $.couch.db("container").create({
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

function loadStore(callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;

    var mapFunction = function(doc) {
        emit(null, doc);
    };
    $.couch.db("container").query(mapFunction, "_count", "javascript", {
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


//example for saveStore function

/*
function createStore() {
    try {
        var store = initStore();
        saveStore(function(created){
            if(created){
                console.log("ist erstellt");
            } else {
                console.log("konnte nicht erstellt werden");
            }
        }, store);
    } catch(err) {
        console.log(err);
    }
 };

 function initStore(){
    var storage = new Container("Storage");
    var shelf1 = new Container("Shelf1");
    var shelf2 = new Container("Shelf2");

     storage.addSubContainer(shelf1);
     storage.addSubContainer(shelf2);

    return storage;
 };
 */


//example for loadStore function
/*
 function loadCompleteStore(){
 try {
 return loadStore(function(created, data){
 if(created){

 console.log(data);

 //getting access to the attributes of the container-class do it like this
 var res = defaultContainer.getSubContainers.apply(data);

 } else {
 console.log("nothing loaded");
 }
 });
 } catch(err) {
 console.log(err);
 }
 };
 */



