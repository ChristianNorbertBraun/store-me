/**
 * Created by Waleska on 10.06.2015.
 */

/**
 * Create an new Item in Database
 * @param {function} cbFn       - necessary callBackFunction
 * @param {Number} itemID
 * @param {Number} categoryID
 * @param {String} itemName
 * @param {Array} attributes
 * @author Marcel Waleska
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

/**
 * Delete Item from Database
 * @param {function} cbFn       - necessary callBackFunction
 * @param {Number} itemID
 * @author Marcel Waleska
 */
function deleteItem(itemID, cbFn)
{
    deleteItemFromDB(itemID, function(ready, data){
        if(ready) cbFn(true, data);
    });
}

/**
 * Return all Items from Database in the CallBackFunction
 * @param {function} cbFn       - necessary callBackFunction
 * @author Marcel Waleska
 */
function getAllItemsFromCouch(cbFn)
{
    var mapFunction = function (doc)
    {
        emit(null,doc);
    };

    getAllItemsFromDB(mapFunction, cbFn);
}

/**
 * Update an Item in Database
 * @param {function} cbFn       - necessary callBackFunction
 * @param {Number} oldItemId
 * @param {String} itemName
 * @param {Number} categoryID
 * @param {Array} attributes
 * @author Marcel Waleska
 */
function updateItem(oldItemId, itemName, categoryID, attributes, cbFn)
{
    deleteItem(oldItemId, function (ready, data){
        if(ready) createItem(oldItemId, itemName, categoryID, attributes, cbFn)
    })
}