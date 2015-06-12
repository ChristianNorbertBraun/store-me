/**
 * Created by Waleska on 12.06.2015.
 */

function loadItemAttribute()
{
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

        var mapFunction = function (doc)
        {
            emit("item_id", doc.id);
        };

        $.couch.db("items").query(mapFunction, "_count", "javascript", {
            success: function (data) {
                console.log(data);
                var rows = data["rows"];
                var i;
                for(i = 0; i < data["total_rows"] ; i++)
                {
                    if(rows[i].value == markedItem) {
                        getItemAttributes(rows[i].id);
                        break;
                    }
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

function getItemAttributes(itemId)
{
    $.couch.db("items").openDoc(itemId, {
        success: function(data) {
            console.log(data);
            var i;
            for(i = 0; i < data.attributes.length; i++)
            {
                addItemAttributeToTable(data.attributes[i]);
                itemTemp.addAttribute(attributes[i]);
            }
        },
        error: function(status) {
            console.log(status);
        }
    });
}
