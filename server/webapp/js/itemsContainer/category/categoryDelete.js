/**
 * Created by Waleska on 10.06.2015.
 */

function deleteCategoryId(oldCategory, cbFn)
{
    $.couch.db(strings.database.category).openDoc(oldCategory, {
        success: function(data) {
            console.log(data);
            $.couch.db(strings.database.category).removeDoc(data, {
                success: function(data2) {
                    console.log(data2);
                    cbFn(true);
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

function checkIfCategoryHasItems(categoryId, cbFn)
{
    var mapFunction = function (doc)
    {
        emit("category_id", doc.category_id);
    };

    $.couch.db(strings.database.category).query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            var rows = data["rows"];
            var i;
            for(i = 0; i < data["total_rows"] ; i++)
            {
                if(rows[i].value == categoryId)
                {
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

function deleteCategoryFromDB(categoryId, cbFn)
{
    $.couch.db(strings.database.category).openDoc(categoryId, {
        success: function(data) {
            console.log(data);
            $.couch.db(strings.database.category).removeDoc(data, {
                success: function(data2) {
                    console.log(data2);
                    cbFn(true);
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

function deleteCategoryFromTable()
{
    var tableRow = document.getElementById(markedCategory + "row");
    document.getElementById("category-table").deleteRow(tableRow.rowIndex);
    markedCategory = null;
}