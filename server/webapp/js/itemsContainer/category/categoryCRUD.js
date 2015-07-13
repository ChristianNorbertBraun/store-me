/**
 * Created by Waleska on 09.06.2015.
 */

/**
 * Creates an new Category in the Database
 * @param {function} cbFn       - necessary callBackFunction
 * @param {Number} categoryId
 * @author Marcel Waleska
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

/**
 * Update an existed Category in Database
 * @param {function} cbFn       - necessary callBackFunction
 * @param {Number} oldCategory
 * @param {Number} newCategory
 * @author Marcel Waleska
 */
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

/**
 * Delete Category from Database
 * @param {function} cbFn       - necessary callBackFunction
 * @param {Number} categoryId
 * @author Marcel Waleska
 */
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

/**
 * Return all existed Categories in the CallBackFunction
 * @param {function} cbFn       - necessary callBackFunction
 * @author Marcel Waleska
 */
function getAllCategories(cbFn)
{
    var mapFunction = function (doc)
    {
        emit();
    };

    getAllCategoriesFromDB(mapFunction, cbFn);
}




