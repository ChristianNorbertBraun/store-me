/**
 * Created by Waleska on 12.06.2015.
 */

function deleteItemAttributeFromTable()
{
    var itemAttributeTableRow = document.getElementById(markedItemAttribute + "row");
    document.getElementById("item-attribute-table").deleteRow(itemAttributeTableRow.rowIndex);
    markedItemAttribute = null;
}

function deleteItemAttributeFromItem()
{
    var key = getMarkedItemAttributeKey();
    itemTemp.removeAttribute(key);
}

function getMarkedItemAttributeKey()
{
    var itemAttributeTableRow = document.getElementById(markedItemAttribute + "row");
    var key = itemAttributeTableRow.cells[0].id;
    return key;
}