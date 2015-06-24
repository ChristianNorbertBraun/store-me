/**
 * Created by Waleska on 10.06.2015.
 */

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
    deleteItemFromDB(itemID, function(ready, data){
        if(ready) cbFn(true, data);
    });
}


function getAllItems(cbFn)
{
    var mapFunction = function (doc)
    {
        emit(null,doc);
    };

    getAllItemsFromDB(mapFunction, cbFn);
}


function updateItem(oldItemId, itemName, categoryID, attributes, cbFn)
{
    updateItemToDB(oldItemId, itemName, categoryID, attributes, function (ready, data){
        if(ready) cbFn(true, data);
    })
}