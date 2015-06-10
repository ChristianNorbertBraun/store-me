/**
 * Created by Waleska on 10.06.2015.
 */

function loadCategoryItems()
{
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

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
                    if(rows[i].value == markedCategory) addItemToTable(rows[i].id);
                }
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

function cleanItemTable()
{
    var Parent = document.getElementById("item-table");
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
    markedItem = null;
}