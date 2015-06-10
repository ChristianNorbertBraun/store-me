/**
 * Created by Waleska on 10.06.2015.
 */

function addItem()
{
    try
    {
        checkIfCategoryIsMarked();
        getItemInput();
        checkItemInputField();
        addItemToDB();
        addItemToTable(null);
    }
    catch(err)
    {
    }
}

function deleteItem()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    checkIfItemIsMarked();
    deleteItemFromDB();
    deleteItemFromTable();
}

function keyHandlerItems(event)
{
    var key = event.keyCode;
    if(key == 13) addItem();
}

