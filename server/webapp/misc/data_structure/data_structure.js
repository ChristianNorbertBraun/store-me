/**
 * Created by captainluma on 09.06.15.
 */

function Container(containerID, containerName)
{
    var containerID = containerID;
    var containerName = containerName;
    var attributes = [];
    var subContainers = [];
    var items = [];

    this.getID = function()
    {
        return containerID;
    };

    this.getName = function()
    {
        return containerName;
    };

    this.getAttributes = function()
    {
        return attributes;
    };

    this.getSubContainers = function()
    {
        return subContainers;
    };

    this.getItems = function()
    {
        return items;
    };

    this.addAttribute = function(attribute)
    {
        attributes.push(attribute);
    };

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
    };

    this.addSubContainer = function(subContainer)
    {
        subContainers.push(subContainer);
    };

    this.removeSubContainer = function(subContainerID)
    {
        for (var i = 0; i < subContainers.length; i++)
        {
            if (subContainers[i].getID() === subContainerID)
            {
                subContainers = removeFromArray(subContainers, i);
                break;
            }
        }
    };

    this.addItem = function(item)
    {
        items.push(item);
    };

    this.removeItem = function(itemID)
    {
        for (var i = 0; i < items.length; i++)
        {
            if (items[i].getID() === itemID)
            {
                items = removeFromArray(items, i);
                break;
            }
        }
    };
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
    };

    this.getValue = function()
    {
        return value;
    };

    this.getUnit = function()
    {
        return unit;
    };

    this.getType = function()
    {
        return type;
    };

    this.isCompulsory = function()
    {
        return compulsory;
    };
}

function ContainerItem(itemID, amount)
{
    var itemID = itemID;
    var amount = amount;

    this.getID = function()
    {
        return itemID;
    };

    this.getAmount = function()
    {
        return amount;
    };
}

function Item(itemID, itemName)
{
    var itemID = itemID;
    var itemName = itemName;
    var attributes = [];

    this.getID = function()
    {
        return itemID;
    };

    this.getName = function()
    {
        return itemName;
    };

    this.getAttributes = function()
    {
        return attributes;
    };

    this.addAttribute = function(attribute)
    {
        attributes.push(attribute);
    };

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
    };
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
    };

    this.getValue = function()
    {
        return value;
    };

    this.getUnit = function()
    {
        return unit;
    };

    this.getType = function()
    {
        return type;
    };
}

// functions
var removeFromArray = function(array, index)
{
    var result = [];

    for (var i = 0; i < array.length; i++)
    {
        if (i === index)
        {
            i++;
        }
        else
        {
            result.push(array[i])
        }
    }
    return result;
};

// test cases

console.log("Construct Container");
var storage = new Container("0-0-0", "Storage");
var array = [];
console.log(storage.getID() === "0-0-0");
console.log(storage.getName() === "Storage");

console.log("Construct ContainerAttribute");
var containerAttribute = new ContainerAttribute("length", 10.0, "meters", "quantity", true);
console.log(containerAttribute.getName() === "length");
console.log(containerAttribute.getValue() === 10.0);
console.log(containerAttribute.getUnit() === "meters");
console.log(containerAttribute.getType() === "quantity");
console.log(containerAttribute.isCompulsory() === true);

console.log("Construct ContainerItem");
var containerItem = new ContainerItem("0815", 7);
console.log(containerItem.getID() === "0815");
console.log(containerItem.getAmount() === 7);

console.log("Construct Item");
var item = new Item("0815", "Hammer");
console.log(item.getID() === "0815");
console.log(item.getName() === "Hammer");

console.log("Construct ItemAttribute");
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

console.log("Handling sub containers");
var container1 = new Container("0-0", "Container 1");
storage.addSubContainer(container1);
console.log(storage.getSubContainers()[0].getName() === "Container 1");
storage.removeSubContainer(container1.getID());
console.log(storage.getSubContainers().length === 0);

console.log("Handling container items")
container1.addItem(containerItem);
console.log(container1.getItems()[0].getID() === "0815");
container1.removeItem(item.getID());
console.log(container1.getItems().length === 0);

console.log("Handling item attributes");
item.addAttribute(itemAttribute);
console.log(item.getAttributes()[0].getValue() === 5.0);
item.removeAttribute(itemAttribute.getName());
console.log(item.getAttributes().length === 0);

// TODO: dynamical assign containerID
// TODO: handling amount of items and sub containers