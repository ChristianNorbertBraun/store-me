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

function keyHandlerItems(event)
{
    var key = event.keyCode;
    if(key == 13) addItem();
}

