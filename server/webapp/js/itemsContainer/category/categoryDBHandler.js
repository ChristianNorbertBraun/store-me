/**
 * Created by Waleska on 10.06.2015.
 */

function addCategoryToDB(categoryId, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    var category =
    {
        _id: categoryId
    };

    try {
        $.couch.db(strings.database.category).saveDoc(category, {
            success: function (data) {
                cbFn(true, data);
            },
            error: function (status) {
                console.log(status);
            }
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}


function deleteCategoryId(oldCategory, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    try {
        $.couch.db(strings.database.category).openDoc(oldCategory, {
            success: function (data) {
                $.couch.db(strings.database.category).removeDoc(data, {
                    success: function (data2) {
                        console.log(data2);
                        cbFn(true);
                    },
                    error: function (status) {
                        console.log(status);
                    }
                });
            },
            error: function (status) {
                console.log(status);
            }
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}


function deleteCategoryFromDB(categoryId, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    try {
        $.couch.db(strings.database.category).openDoc(categoryId, {
            success: function (data) {
                $.couch.db(strings.database.category).removeDoc(data, {
                    success: function (data2) {
                        cbFn(true);
                    },
                    error: function (status) {
                        console.log(status);
                    }
                });
            },
            error: function (status) {
                console.log(status);
            }
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}


function checkIfCategoryHasItems(categoryId, cbFn)
{
    var mapFunction = function (doc)
    {
        emit("category_id", doc.category_id);
    };

    $.couch.urlPrefix = strings.link.dbConnection;

    try {
        $.couch.db(strings.database.category).query(mapFunction, "_count", "javascript", {
            success: function (data) {
                var rows = data["rows"];
                var i;
                for (i = 0; i < data["total_rows"]; i++) {
                    if (rows[i].value == categoryId) {
                        throw "delete error";
                    }
                }
                cbFn(true);
            },
            error: function (status) {
                console.log(status);
            },
            reduce: false
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}


function setItemsToNewCategory(oldCategory, newCategory, cbFn)
{
    try
    {
        var mapFunction = function (doc)
        {
            emit("category_id", doc.category_id);
        };

        $.couch.urlPrefix = strings.link.dbConnection;

        $.couch.db(strings.database.items).query(mapFunction, "_count", "javascript", {
            success: function (data) {
                var rows = data["rows"];
                var i;
                for(i = 0; i < data["total_rows"] ; i++)
                {
                    if(rows[i].value == oldCategory) setNewCategory(rows[i].id, newCategory);
                }
                cbFn(true);
            },
            error: function (status) {
                console.log(status);
            },
            reduce: false
        });
    }
    catch(err)
    {
    }
}


function setNewCategory(id, newCategory)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    try {
        $.couch.db(strings.database.items).openDoc(id, {
            success: function (data) {
                data.category_id = newCategory;
                $.couch.db(strings.database.items).saveDoc(data, {
                    success: function (data2) {
                        console.log(data2);
                    },
                    error: function (status) {
                        console.log(status);
                    }
                });
            },
            error: function (status) {
                console.log(status);
            }
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}


function getAllCategoriesFromDB(mapFunction, cbFn)
{
    try{
        $.couch.urlPrefix = strings.link.dbConnection;

        $.couch.db(strings.database.category).query(mapFunction, "_count", "javascript", {
            success: function (data) {
                cbFn(true, data);
            },
            error: function (status) {
                console.log(status);
            },
            reduce: false
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}