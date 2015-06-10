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

function initStore(){
    var storage = new Container("Storage");
    var shelf1 = new Container("Shelf1");
    var shelf2 = new Container("Shelf2");

    storage.addSubContainer(shelf1);
   /* storage.addSubContainer(shelf2);
*/
    return storage;
};

function createStore(callBackFunction, container){
   /* var store =
    {
        _id: container.getID(),
        "containerName" : container.getName(),
        "containerAttributes" : container.getAttributes(),
        "subContainers" : container.getSubContainers(),
        "containerItems" : container.getItems()
    };*/
    var store = JSON.stringify(container);

    console.log(container);
    console.log(store);

    $.couch.db("container").saveDoc(store, {
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

saveStore();