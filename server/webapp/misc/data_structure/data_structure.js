/**
 * Created by captainluma on 09.06.15.
 */

function Container(containerID, containerName)
{
    var containerID = containerID;
    var containerName = containerName;
    var attributes = [];
    var subContainer = [];
    var items = [];

    this.getID = function()
    {
        return containerID;
    }

    this.getName = function()
    {
        return containerName;
    }

    this.getAttributes = function()
    {
        return attributes;
    }

    this.getSubContainers = function()
    {
        return subContainer;
    }

    this.getItems = function()
    {
        return items;
    }

    this.addAttribute = function(attribute)
    {
        attributes.push(attribute);
    }

    this.removeAttribute = function(attributeName)
    {
        for (var i = 0; i < attributes.length; i++)
        {
            if (attributes[i].getName() === attributeName)
            {
                attributes = removeFromArray(attributes, i);
                break;
            }
        }
    }
}

function ContainerAttribute(attributeName, value, unit, type, compulsory)
{
    var attributeName = attributeName;
    var value = value;
    var unit = unit;
    var type = type;
    var compulsory = compulsory;

    this.getName = function()
    {
        return attributeName;
    }

    this.getValue = function()
    {
        return value;
    }

    this.getUnit = function()
    {
        return unit;
    }

    this.getType = function()
    {
        return type;
    }

    this.isCompulsory = function()
    {
        return compulsory;
    }
}

function ContainerItem(itemID, amount)
{
    var itemID = itemID;
    var amount = amount;

    this.getID = function()
    {
        return itemID;
    }

    this.getAmount = function()
    {
        return amount;
    }
}

function Item(itemID, itemName)
{
    var itemID = itemID;
    var itemName = itemName;
    var attributes = [];

    this.getID = function()
    {
        return itemID;
    }

    this.getName = function()
    {
        return itemName;
    }

    this.getAttributes = function()
    {
        return attributes;
    }
}

function ItemAttribute(attributeName, value, unit, type)
{
    var attributeName = attributeName;
    var value = value;
    var unit = unit;
    var type = type;

    this.getName = function()
    {
        return attributeName;
    }

    this.getValue = function()
    {
        return value;
    }

    this.getUnit = function()
    {
        return unit;
    }

    this.getType = function()
    {
        return type;
    }
}

// functions
var removeFromArray = function(array, index)
{
    var result = [];

    for (var i = 0; i < array.length; i++)
    {
        if (i === index)
        {
            continue;
        }
        else
        {
            result.push(array[i])
        }
    }
    return result;
}

// test cases

console.log("Container");
var storage = new Container("0-0-0", "Storage");
var array = [];
console.log(storage.getID() === "0-0-0");
console.log(storage.getName() === "Storage");

console.log("ContainerAttribute");
var containerAttribute = new ContainerAttribute("length", 10.0, "meters", "quantity", true);
console.log(containerAttribute.getName() === "length");
console.log(containerAttribute.getValue() === 10.0);
console.log(containerAttribute.getUnit() === "meters");
console.log(containerAttribute.getType() === "quantity");
console.log(containerAttribute.isCompulsory() === true);

console.log("ContainerItem");
var containerItem = new ContainerItem("0815", 7);
console.log(containerItem.getID() === "0815");
console.log(containerItem.getAmount() === 7);

console.log("Item");
var item = new Item("0815", "Hammer");
console.log(item.getID() === "0815");
console.log(item.getName() === "Hammer");

console.log("ItemAttribute");
var itemAttribute = new ItemAttribute("length", 5.0, "meters", "quantity");
console.log(itemAttribute.getName() === "length");
console.log(itemAttribute.getValue() === 5.0);
console.log(itemAttribute.getUnit() === "meters");
console.log(itemAttribute.getType() === "quantity");

console.log("Handling container attributes");
storage.addAttribute(containerAttribute);
console.log(storage.getAttributes()[0].getValue() === 10.0);
storage.removeAttribute(containerAttribute.getName());
console.log(storage.getAttributes().length === 0);

// TODO: add subcontainer
// TODO: remove subcontainer
// TODO: add item
// TODO: remove item