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


function createItem()
{
    try
    {
        checkIfCategoryIsMarked();
        getItemInput();
        checkItemInputField();
        addItemToDB(item);
        addItemToTable(null);
        itemTemp = null;
    }
    catch(err)
    {
    }
}

function deleteItem()
{
    $.couch.urlPrefix = strings.link.dbConnection;

    checkIfItemIsMarked();
    deleteItemFromDB();
    deleteItemFromTable();
}

function keyHandlerItems(event)
{
    var key = event.keyCode;
    if(key == 13) addItem();
}

