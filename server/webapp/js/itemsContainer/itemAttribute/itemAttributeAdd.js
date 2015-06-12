/**
 * Created by Waleska on 12.06.2015.
 */

function addItemAttributeToTable(attribute)
{
    window.alert("1");
    var newItemAttributeRow = document.getElementById("item-attribute-table").insertRow();
    newItemAttributeRow.addEventListener("click", function(event){
        markFieldItemAttribute(event.target.id);
    });
    try {
        newItemAttributeRow.id = attribute.attributeName + "row";
        var newAttributeKey = newItemAttributeRow.insertCell(0);
        var newAttributeValue = newItemAttributeRow.insertCell(1);
        newAttributeKey.id = attribute.attributeName;
        newAttributeKey.innerHTML = attribute.attributeName;
        newAttributeValue.id = attribute.value;
        newAttributeValue.innerHTML = attribute.value;
    }
    catch(err)
    {
        //window.alert(strings.attriubte.alreadyExist);
        throw "already Exist";
    }
}