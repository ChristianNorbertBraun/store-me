/**
 * Created by Waleska on 09.06.2015.
 */

function categoryAdd()
{
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;
        getCategoryInput();
        checkCategoryInputField();
        addCategoryToDB();
        addCategoryToTable(null);
    }
    catch(err)
    {
    }
}

function categoryEdit()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;
    getCategoryInput();
    checkCategoryInputField();
    setItemsToNewCategory(function (itemsReady){
        if(itemsReady)
        {
            deleteCategoryId(function (categroyReady){
                if(categroyReady)
                {
                    addCategoryToDB(function (ready){
                        if(ready)
                        {
                            refreshTable();
                            cleanItemTable();
                        };
                    });
                }
            });
        }
    });
}

function categoryDelete()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    checkIfCategoryIsMarked();
    checkIfCategoryHasItems(function (checked){
        if(checked)
        {
            deleteCategoryFromDB();
            deleteCategoryFromTable();
        }
    });
}

function keyHandlerCategory(event)
{
    var key = event.keyCode;
    if(key == 13) categoryAddOrEdit();
}

