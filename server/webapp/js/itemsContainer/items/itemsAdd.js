/**
 * Created by Waleska on 10.06.2015.
 */

function addItemToTable(name)
{
    var newItemRow = document.getElementById("item-table").insertRow();
    newItemRow.addEventListener("click", function(event){
        markFieldItem(event.target.id);
    });
    try {
        if(!name) newItemRow.id = itemInputField + "row";
        else newItemRow.id = name + "row";
        var newItem = newItemRow.insertCell(0);
        if(!name)
        {
            newItem.id = itemInputField;
            newItem.innerHTML = itemInputField;
        }
        else
        {
            newItem.id = name;
            newItem.innerHTML = name;
        }
    }
    catch(err)
    {
        //window.alert(strings.category.alreadyExist);
        throw "already Exist";
    }
}

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
