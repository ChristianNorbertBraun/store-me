/**
 * Created by Waleska on 09.06.2015.
 */

function categoryAdd(categoryId)
{
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;
        return addCategoryToDB(categoryId);
    }
    catch(err)
    {
    }
}

function categoryEdit(oldCategory, newCategory)
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    setItemsToNewCategory(oldCategory, newCategory, function (itemsReady){
        if(itemsReady)
        {
            deleteCategoryId(oldCategory, function (categroyReady){
                if(categroyReady)
                {
                    return addCategoryToDB(newCategory);
                }
            });
        }
    });
}

function categoryDelete(categoryId)
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    checkIfCategoryHasItems(categoryId ,function (checked){
        if(checked)
        {
            deleteCategoryFromDB(categoryId);
        }
    });
}

function keyHandlerCategory(event)
{
    var key = event.keyCode;
    if(key == 13) categoryAddOrEdit();
}

