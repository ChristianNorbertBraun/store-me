/**
 * Created by Waleska on 10.06.2015.
 */

function onLoadItemAddOrEdit(){
    itemTemp = new Item(itemInputField, markedCategory);
}

function getDataItemFromCouch(itemID)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    $.couch.db(strings.database.items).openDoc(itemID, {
        success: function(data) {
            console.log(data);
            return data;
        },
        error: function(status) {
            console.log(status);
        }
    });
};


function createItem(itemID, itemName, categoryID, attributes, cbFn)
{
    try
    {
        var item = new Item(itemID, itemName, categoryID, attributes);
        addItemToDB(item, function(ready, data){
            if(ready) cbFn(true, data);
        });
    }
    catch(err)
    {
        console.log(err);
    }
}

function deleteItem(itemID, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    deleteItemFromDB(itemID, function(ready, data){
        if(ready) cbFn(true, data);
    });
}

function getAllItems(cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    var mapFunction = function (doc)
    {
        emit();
    };

    $.couch.db(strings.database.items).query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            cbFn(true, data);
        },
        error: function (status) {
            console.log(status);
        },
        reduce: false
    });
}

function keyHandlerItems(event)
{
    var key = event.keyCode;
    if(key == 13) addItem();
}

