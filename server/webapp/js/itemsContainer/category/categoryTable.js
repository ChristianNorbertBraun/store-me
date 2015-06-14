/**
 * Created by Waleska on 10.06.2015.
 */

function loadTable()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    var mapFunction = function (doc)
    {
        emit();
    };

    $.couch.db("categorys").query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            var rows = data["rows"];
            var i;
            for(i = 0; i < data["total_rows"] ; i++)
            {
                addCategoryToTable(rows[i].id);
            }
        },
        error: function (status) {
            console.log(status);
        },
        reduce: false
    });
}

function refreshTable()
{
    markedCategory = null;
    var Parent = document.getElementById("category-table");
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
    loadTable();
}