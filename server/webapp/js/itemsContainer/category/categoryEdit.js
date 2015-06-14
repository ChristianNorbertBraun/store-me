/**
 * Created by Waleska on 10.06.2015.
 */

function setItemsToNewCategory(cbFn)
{
    try
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
                    if(rows[i].value == markedCategory) setNewCategory(rows[i].id);
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

function setNewCategory(id)
{
    $.couch.db("items").openDoc(id, {
        success: function(data) {
            console.log(data);
            data.category_id = categoryInputField;
            $.couch.db("items").saveDoc(data, {
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