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


//example for saveStore function


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


 var store = new Container("store");
 var shelf1 = new Container("shelf1");
 var shelf2 = new Container("shelf2");
 var subshelf1_1 = new Container("subschelf1_1");
 var subshelf1_2 = new Container("subschelf1_2");
 var subshelf2_1 = new Container("subschelf2_1");
 var subshelf2_2 = new Container("subschelf2_2");


 store.addSubContainer(shelf1);
 store.addSubContainer(shelf2);

 shelf1.addSubContainer(subshelf1_1);
 shelf1.addSubContainer(subshelf1_2);

 shelf2.addSubContainer(subshelf2_1);
 shelf2.addSubContainer(subshelf2_2);



     subshelf1_1.addItem(01, 5);
     subshelf1_1.addItem(02, 6);
     subshelf1_2.addItem(03, 6);
     subshelf2_1.addItem(04, 5);
     subshelf2_2.addItem(05, 5);

    return store;

 };



//example for loadStore function

 function loadCompleteStore(){
 try {
 return loadStore(function(created, data){
 if(created){

    console.log(data);
 //getting access to the attributes of the container-class do it like this
 //var res = defaultContainer.getSubContainers.apply(data);
//console.log(res);
 } else {
 console.log("nothing loaded");
 }
 });
 } catch(err) {
 console.log(err);
 }
 };

//createStore();
loadCompleteStore();



