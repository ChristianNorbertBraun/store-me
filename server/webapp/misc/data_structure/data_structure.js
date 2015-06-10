/**
 * Created by captainluma on 09.06.15.
 */

function Container(containerID, containerName)
{
    var _containerID = containerID;
    var _containerName = containerName;
    var _attributes = [];
    var _subContainers = [];
    var _items = [];

    this.getID = function()
    {
        return _containerID;
    };

    this.getName = function()
    {
        return _containerName;
    };

    this.setName = function(containerName)
    {
        _containerName= containerName;
    }

    this.getAttributes = function()
    {
        return _attributes;
    };

    this.getSubContainers = function()
    {
        return _subContainers;
    };

    this.getItems = function()
    {
        return _items;
    };

    this.addAttribute = function(attribute)
    {
        _attributes.push(attribute);
    };

    this.removeAttribute = function(attributeName)
    {
        for (var i = 0; i < _attributes.length; i++)
        {
            if (_attributes[i].getName() === attributeName)
            {
                _attributes = removeFromArray(_attributes, i);
                break;
            }
        }
    };

    this.addSubContainer = function(subContainer)
    {
        _subContainers.push(subContainer);
    };

    this.removeSubContainer = function(subContainerID)
    {
        for (var i = 0; i < _subContainers.length; i++)
        {
            if (_subContainers[i].getID() === subContainerID)
            {
                _subContainers = removeFromArray(_subContainers, i);
                break;
            }
        }
    };

    this.addItem = function(item)
    {
        _items.push(item);
    };

    this.removeItem = function(itemID)
    {
        for (var i = 0; i < _items.length; i++)
        {
            if (_items[i].getID() === itemID)
            {
                _items = removeFromArray(_items, i);
                break;
            }
        }
    };
}

function ContainerAttribute(attributeName, value, unit, type, compulsory)
{
    var _attributeName = attributeName;
    var _value = value;
    var _unit = unit;
    var _type = type;
    var _compulsory = compulsory;

    this.getName = function()
    {
        return _attributeName;
    };

    this.setName = function(attributeName)
    {
        _attributeName = attributeName;
    };

    this.getValue = function()
    {
        return _value;
    };

    this.setValue = function(Value)
    {
        _value = value;
    };

    this.getUnit = function()
    {
        return _unit;
    };

    this.setValue = function(unit)
    {
        _unit = unit;
    };

    this.getType = function()
    {
        return _type;
    };

    this.setType = function(type)
    {
        _type = type;
    };

    this.isCompulsory = function()
    {
        return _compulsory;
    };

    this.setCompulsory = function(compulsory)
    {
        _compulsory = compulsory;
    };
}

function ContainerItem(itemID, amount)
{
    var _itemID = itemID;
    var _amount = amount;

    this.getID = function()
    {
        return _itemID;
    };

    this.getAmount = function()
    {
        return _amount;
    };
}

function Item(itemID, itemName)
{
    var _itemID = itemID;
    var _itemName = itemName;
    var _attributes = [];

    this.getID = function()
    {
        return _itemID;
    };

    this.getName = function()
    {
        return _itemName;
    };

    this.getAttributes = function()
    {
        return _attributes;
    };

    this.addAttribute = function(attribute)
    {
        _attributes.push(attribute);
    };

    this.removeAttribute = function(attributeName)
    {
        for (var i = 0; i < _attributes.length; i++)
        {
            if (_attributes[i].getName() === attributeName)
            {
                _attributes = removeFromArray(_attributes, i);
                break;
            }
        }
    };
}

function ItemAttribute(attributeName, value, unit, type)
{
    var _attributeName = attributeName;
    var _value = value;
    var _unit = unit;
    var _type = type;

    this.getName = function()
    {
        return _attributeName;
    };

    this.getValue = function()
    {
        return _value;
    };

    this.getUnit = function()
    {
        return _unit;
    };

    this.getType = function()
    {
        return _type;
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