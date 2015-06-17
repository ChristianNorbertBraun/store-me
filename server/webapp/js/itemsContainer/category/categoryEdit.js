/**
 * Created by Waleska on 10.06.2015.
 */

function setItemsToNewCategory(oldCategory, newCategory, cbFn)
{
    try
    {
        var mapFunction = function (doc)
        {
            emit("category_id", doc.category_id);
        };

        $.couch.db(strings.database.items).query(mapFunction, "_count", "javascript", {
            success: function (data) {
                console.log(data);
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
    $.couch.db(strings.database.items).openDoc(id, {
        success: function(data) {
            console.log(data);
            data.category_id = newCategory;
            $.couch.db(strings.database.items).saveDoc(data, {
                success: function(data2) {
                    console.log(data2);
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