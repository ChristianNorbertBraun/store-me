/**
 * Created by Waleska on 10.06.2015.
 */

var itemInputField, markedItem;

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

function markFieldItem(id)
{
    blankOldItem();
    document.getElementById(id).style.backgroundColor = "#d3d3d3";
    markedItem = id;
}

function blankOldItem()
{
    if(markedItem)
    {
        document.getElementById(markedItem).style.backgroundColor = "#ffffff";
    }
}

function addItem()
{
    try
    {
        checkIfCategoryIsMarked();
        getItemInput();
        checkItemInputField();
        addItemToDB();
        addItemToTable(null);
    }
    catch(err)
    {
    }
}

function keyHandlerItems(event)
{
    var key = event.keyCode;
    if(key == 13) addItem();
}

function getItemInput()
{
    itemInputField = $('#item-input').val();
}

function checkItemInputField()
{
    if (!itemInputField)
    {
        //window.alert(strings.items.noInput);
        throw "no input";
    }
}

function addItemToDB()
{
    $.couch.urlPrefix = "http://localhost:5984";

    var item =
    {
        _id: itemInputField,
        "category_id": markedCategory
    }

    try
    {
        $.couch.db("items").saveDoc(item, {
            success: function(data) {
                console.log(data);
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

function checkIfItemIsMarked()
{
    if(!markedItem)
    {
        //window.alert(strings.item.noItemMarked);
        throw "no item marked";
    }
}

function deleteItem()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    checkIfItemIsMarked();
    deleteItemFromDB();
    deleteItemFromTable();
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

function deleteItemFromTable()
{
    var itemTableRow = document.getElementById(markedItem + "row");
    document.getElementById("item-table").deleteRow(itemTableRow.rowIndex);
    markedItem = null;
}

