/**
 * Created by Waleska on 10.06.2015.
 */

function addItemToDB(item, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    try
    {
        $.couch.db(strings.database.items).saveDoc(item, {
            success: function(data) {
                console.log(data);
                cbFn(true, data);
            },
            error: function(status) {
                console.log(status);
            }
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}

function updateItemToDB(oldItemId, itemName, categoryID, attributes, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    try
    {
        $.couch.db(strings.database.items).openDoc(oldItemId, {
            success: function(data) {
                console.log(data);

                data[rows[0[value[itemName]]]] = itemName;
                data[rows[0[value[categoryID]]]] = categoryID;
                data[rows[0[value[attributes]]]] = attributes;

                $.couch.db(strings.database.items).saveDoc(data, {
                    success: function(data) {
                        console.log(data);
                        cbFn(true, data);
                    },
                    error: function(status) {
                        console.log(status);
                    }
                });
            },
            error: function(status) {
                console.log(status);
            }
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
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
}


function getAllItemsFromDB(mapFunction, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    try {
        $.couch.db(strings.database.items).query(mapFunction, "_count", "javascript", {
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
    catch(err)
    {
        console.log(err.message);
    }
}

function deleteItemFromDB(itemID, cbFn)
{
    $.couch.urlPrefix = strings.link.dbConnection;

    $.couch.db(strings.database.items).openDoc(itemID, {
        success: function(data) {
            console.log(data);
            $.couch.db(strings.database.items).removeDoc(data, {
                success: function(data2) {
                    console.log(data2);
                    cbFn(true, data2);
                },
                error: function(status) {
                    console.log(status);
                }
            });
        },
        error: function(status) {
            console.log(status);
        }
    });
}