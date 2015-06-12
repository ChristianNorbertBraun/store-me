/**
 * Created by Waleska on 10.06.2015.
 */

var itemInputField, markedItem;

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

function checkIfItemIsMarked()
{
    if(!markedItem)
    {
        //window.alert(strings.item.noItemMarked);
        throw "no item marked";
    }
}

function loadNameIntoInput()
{
    var itemTableRow = document.getElementById(markedItem + "row");
    document.getElementById("item-input").value = itemTableRow.cells[0].id;;
}