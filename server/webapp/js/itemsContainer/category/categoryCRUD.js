/**
 * Created by Waleska on 09.06.2015.
 */

function categoryAdd(categoryId,cbFn)
{
    try
    {
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


function categoryUpdate(oldCategory, newCategory, cbFn)
{
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


function getAllCategories(cbFn)
{
    var mapFunction = function (doc)
    {
        emit();
    };

    getAllCategoriesFromDB(mapFunction, cbFn);
}




