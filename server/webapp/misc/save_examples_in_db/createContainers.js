/**
 * Created by Marcel on 10.06.2015.
 */


function saveStore() {
    try {
        //toDo string.link.dbConnection change to a local variable
        $.couch.urlPrefix = strings.link.dbConnection;
        var store = initStore();
        createStore(function(created){
            if(created){
                console.log("ist erstellt");
            } else {
                console.log("konnte nicht erstellt werden");
            }
        }, store);

    }
    catch(err) {
        console.log(err);
    }

};

function loadCompleteStore(){
    try {
        $.couch.urlPrefix = strings.link.dbConnection;
         return loadStore(function(created, data){
           if(created){

               console.log("ist geladen");
               console.log(data);



               var theContainer = new Container('default');

               var res = theContainer.getSubContainers.apply(data);


               console.dir(theContainer.getName.apply(res[0]));




           } else {
               console.log("nicht geladen");
           }
        });
    } catch(err) {
        console.log(err);
    }
}

function initStore(){
    var storage = new Container("Storage");
    var shelf1 = new Container("Shelf1");
    var shelf2 = new Container("Shelf2");

    storage.addSubContainer(shelf1);
    storage.addSubContainer(shelf2);

    return storage;
};

function createStore(callBackFunction, container){

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
};

function loadStore(callBackFunction){

    $.couch.db("container").view("all/all", {
        success: function(data) {
            var containerObject = data["rows"][0].value;
            delete containerObject._id;
            delete containerObject._rev;

            callBackFunction(true, containerObject);

        },
        error: function(status) {
            console.log(status);
            callBackFunction(false);
        },
        reduce: false
    });


}

//saveStore();
loadCompleteStore();
