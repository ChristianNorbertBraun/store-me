/**
 * Created by Waleska on 12.06.2015.
 */

var itemAttributeKeyInputField, itemAttributeValueInputField, markedItemAttribute;

function getItemAttributeInputFields()
{
    itemAttributeKeyInputField = $('#item-attribute-key').val();
    itemAttributeValueInputField = $('#item-attribute-value').val();
}

function checkItemAttributeInputFields()
{
    if(!itemAttributeKeyInputField || !itemAttributeValueInputField)
    {
        //window.alert(strings.itemAttributes.noInput);
        throw "no input";
    }
}

function markFieldItemAttribute(id)
{
    blankOldItemAttribute();
    document.getElementById(id).style.backgroundColor = "#d3d3d3";
    markedItemAttribute = id;
}

function blankOldItemAttribute()
{
    if(markedItemAttribute)
    {
        document.getElementById(markedItemAttribute).style.backgroundColor = "#ffffff";
    }
}
