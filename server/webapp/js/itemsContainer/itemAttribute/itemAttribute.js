/**
 * Created by Waleska on 12.06.2015.
 */

function ItemAttributeAdd()
{
    try
    {
        getItemAttributeInputFields();
        checkItemAttributeInputFields();
        var itemAttribute = new ItemAttribute(itemAttributeKeyInputField, itemAttributeValueInputField, null, null);
        //itemTemp.addAttribute(itemAttribute);
        window.alert("0");
        addItemAttributeToTable(itemAttribute);
    }
    catch(err)
    {
    }
}

function ItemAttributeDelete()
{
    if(!markedItemAttribute)
    {
        //window.alert(strings.itemAttributes.noAttributeMarked);
        throw "no Attribute marked"
    }
    deleteItemAttributeFromItem();
    deleteItemAttributeFromTable();
}

function ItemAttribute(attributeName, value, unit, type)
{
    this.attributeName = attributeName;
    this.value = value;
    this.unit = unit;
    this.type = type;

    this.getName = function()
    {
        return this.attributeName;
    };

    this.setName = function(attributeName)
    {
        this.attributeName = attributeName;
    };

    this.getValue = function()
    {
        return this.value;
    };

    this.setValue = function(value)
    {
        this.value = value;
    };

    this.getUnit = function()
    {
        return this.unit;
    };

    this.setUnit = function(unit)
    {
        this.unit = unit;
    };

    this.getType = function()
    {
        return this.type;
    };

    this.setType = function(type)
    {
        this.type = type;
    };
}

// functions

var removeFromArray = function(array, index)
{
    var hold = array[index];
    array[index] = array[array.length-1];
    array[array.length-1] = hold;
    array.pop();
};

var copyArray = function(array)
{
    var result = [];

    for (var i = 0; i < array.length; i++)
    {
        result.push(array[i]);
    }
    return result;
};

var sortNumerically = function (a, b)
{
    return a - b;
};