/**
 * Created by Waleska on 10.06.2015.
 */

function deleteItemFromTable()
{
    var itemTableRow = document.getElementById(markedItem + "row");
    document.getElementById("item-table").deleteRow(itemTableRow.rowIndex);
    markedItem = null;
}

function deleteItemFromDB()
{
    $.couch.db("items").openDoc(markedItem, {
        success: function(data) {
            console.log(data);
            $.couch.db("items").removeDoc(data, {
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
