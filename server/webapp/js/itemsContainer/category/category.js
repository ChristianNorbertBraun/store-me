/**
 * Created by Waleska on 09.06.2015.
 */

function categoryAdd(categoryId,cbFn)
{
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;
        addCategoryToDB(categoryId, function (ready, data){
        if(ready)
        {
            cbFn(true,data);
        }
        });
    }
    catch(err)
    {
        console.log(err);
    }
}

function categoryEdit(oldCategory, newCategory)
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    setItemsToNewCategory(oldCategory, newCategory, function (itemsReady){
        if(itemsReady)
        {
            deleteCategoryId(oldCategory, function (categoryReady){
                if(categoryReady)
                {
                    addCategoryToDB(newCategory, function (ready, data){
                        if(ready)
                        {
                            return data;
                        }
                    });
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

function getAllCategorys()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    var mapFunction = function (doc)
    {
        emit();
    };

    $.couch.db("categorys").query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            return data;
        },
        error: function (status) {
            console.log(status);
        },
        reduce: false
    });
}

function keyHandlerCategory(event)
{
    var key = event.keyCode;
    if(key == 13) categoryAddOrEdit();
}

