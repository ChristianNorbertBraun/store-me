/**
 * Created by Waleska on 09.06.2015.
 */

function categoryAdd(categoryId,cbFn)
{
    try
    {
        $.couch.urlPrefix = strings.link.dbConnection;
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

function categoryEdit(oldCategory, newCategory, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    setItemsToNewCategory(oldCategory, newCategory, function (itemsReady){
        if(itemsReady)
        {
            deleteCategoryId(oldCategory, function (categoryReady){
                if(categoryReady)
                {
                    addCategoryToDB(newCategory, function (ready, data){
                        if(ready)
                        {
                            cbFn(true, data);
                        }
                    });
                }
            });
        }
    });
}

function categoryDelete(categoryId, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;
    try
    {
        checkIfCategoryHasItems(categoryId, function (checked) {
            if (checked) {
                deleteCategoryFromDB(categoryId, function (deleted){
                    if(deleted) cbFn(true);
                });
            }
        });
    }
    catch(err)
    {
        cbFn(false);
    }
}

function getAllCategorys(cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    var mapFunction = function (doc)
    {
        emit();
    };

    $.couch.db(strings.database.category).query(mapFunction, "_count", "javascript", {
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

function keyHandlerCategory(event)
{
    var key = event.keyCode;
    if(key == 13) categoryAddOrEdit();
}

