/**
 * Created by Waleska on 10.06.2015.
 */

function deleteCategoryId(cbFn)
{
    $.couch.db("categorys").openDoc(markedCategory, {
        success: function(data) {
            console.log(data);
            $.couch.db("categorys").removeDoc(data, {
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

function checkIfCategoryHasItems(cbFn)
{
    var mapFunction = function (doc)
    {
        emit("category_id", doc.category_id);
    };

    $.couch.db("items").query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            var rows = data["rows"];
            var i;
            for(i = 0; i < data["total_rows"] ; i++)
            {
                if(rows[i].value == markedCategory)
                {
                    window.alert("cannot delete an category wit items");
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

function deleteCategoryFromDB()
{
    $.couch.db("categorys").openDoc(markedCategory, {
        success: function(data) {
            console.log(data);
            $.couch.db("categorys").removeDoc(data, {
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

function deleteCategoryFromTable()
{
    var tableRow = document.getElementById(markedCategory + "row");
    document.getElementById("category-table").deleteRow(tableRow.rowIndex);
    markedCategory = null;
}