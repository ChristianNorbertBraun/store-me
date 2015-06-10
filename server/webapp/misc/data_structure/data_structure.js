/**
 * Created by captainluma on 09.06.15.
 */

// classes

function Container(containerName)
{
    this.containerID = "0";
    this.containerName = containerName;
    this.attributes = [];
    this.subContainers = [];
    this.items = [];

    this.getID = function()
    {
        return this.containerID;
    };

    this.setID = function(containerID)
    {
        this.containerID = containerID;
    };

    this.getName = function()
    {
        return this.containerName;
    };

    this.setName = function(containerName)
    {
        this.containerName= containerName;
    };

    this.getAttributes = function()
    {
        return this.attributes;
    };

    this.getSubContainers = function()
    {
        return this.subContainers;
    };

    this.getItems = function()
    {
        return this.items;
    };

    this.getAllItems = function()
    {
        var allItems = this.items;

        for (var i = 0; i < this.subContainers.length; i++)
        {
            var subContainer = this.subContainers[i];
            allItems = allItems.concat(subContainer.getAllItems());
        }
        return allItems;
    };

    this.addAttribute = function(attribute)
    {
        this.attributes.push(attribute);
    };

    this.removeAttribute = function(attributeName)
    {
        for (var i = 0; i < this.attributes.length; i++)
        {
            if (this.attributes[i].getName() === attributeName)
            {
                this.attributes = removeFromArray(this.attributes, i);
                break;
            }
        }
    };

    this.addSubContainer = function(subContainer)
    {
        var id = this.findFreeID();
        subContainer.setID(id);
        this.subContainers.push(subContainer);

        var subContainers = copyArray(subContainer.getSubContainers());
        subContainer.removeAllSubContainers();

        for (var i = 0; i < subContainers.length; i++)
        {
            subContainer.addSubContainer(subContainers[i]);
        }
    };

    this.removeSubContainer = function(subContainerID)
    {
        for (var i = 0; i < this.subContainers.length; i++)
        {
            if (this.subContainers[i].getID() === subContainerID)
            {
                this.subContainers = removeFromArray(this.subContainers, i);
                break;
            }
        }
    };

    this.removeAllSubContainers = function()
    {
        this.subContainers = [];
    };

    this.addItem = function(containerItem)
    {
        containerItem.setParentContainerID(this.containerID);
        this.items.push(containerItem);
    };

    this.removeItem = function(containerItemID)
    {
        for (var i = 0; i < this.items.length; i++)
        {
            if (this.items[i].getID() === containerItemID)
            {
                this.items = removeFromArray(this.items, i);
                break;
            }
        }
    };

    this.removeAllItems = function()
    {
        this.items = [];
    };

    this.findFreeID = function()
    {
        var freeSubID = this.subContainers.length;
        var subContainerSubIDs = [];

        for (var i = 0; i < this.subContainers.length; i++)
        {
            var subContainerID = this.subContainers[i].getID();
            var subContainerIDAsArray = subContainerID.split("-");
            var subContainerSubID = subContainerIDAsArray.pop();
            subContainerSubIDs.push(subContainerSubID);
        }
        subContainerSubIDs.sort();

        for (var k = 0; k < subContainerSubIDs.length; k++)
        {
            if (subContainerSubIDs[k] != k)
            {
                freeSubID = k;
                break;
            }
        }
        return this.containerID + "-" + freeSubID;
    };

    this.toString = function()
    {
        var result = this.containerID + "\t" + this.containerName + "\n";

        for (var i = 0; i < this.subContainers.length; i++)
        {
            result += this.subContainers[i].toString();
        }
        return result;
    }
}

function ContainerAttribute(attributeName, value, unit, type, compulsory)
{
    this.attributeName = attributeName;
    this.value = value;
    this.unit = unit;
    this.type = type;
    this.compulsory = compulsory;

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

    this.setValue = function(Value)
    {
        this.value = value;
    };

    this.getUnit = function()
    {
        return this.unit;
    };

    this.setValue = function(unit)
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

    this.isCompulsory = function()
    {
        return this.compulsory;
    };

    this.setCompulsory = function(compulsory)
    {
        this.compulsory = compulsory;
    };
}

function ContainerItem(itemID, amount)
{
    this.itemID = itemID;
    this.amount = amount;
    this.parentContainerID = "0";

    this.getID = function()
    {
        return this.itemID;
    };

    this.getAmount = function()
    {
        return this.amount;
    };

    this.getParentContainerID = function()
    {
        return this.parentContainerID;
    };

    this.setParentContainerID = function(parentContainerID)
    {
        this.parentContainerID = parentContainerID;
    };
}

function Item(itemID, itemName)
{
    this.itemID = itemID;
    this.itemName = itemName;
    this.attributes = [];

    this.getID = function()
    {
        return this.itemID;
    };

    this.getName = function()
    {
        return this.itemName;
    };

    this.setName = function(itemName)
    {
        this.itemName = itemName;
    };

    this.getAttributes = function()
    {
        return this.attributes;
    };

    this.addAttribute = function(attribute)
    {
        this.attributes.push(attribute);
    };

    this.removeAttribute = function(attributeName)
    {
        for (var i = 0; i < this.attributes.length; i++)
        {
            if (this.attributes[i].getName() === attributeName)
            {
                this.attributes = removeFromArray(this.attributes, i);
                break;
            }
        }
    };
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
    var result = [];

    for (var i = 0; i < array.length; i++)
    {
        if (i !== index)
        {
            result.push(array[i])
        }
    }
    return result;
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

// test cases

console.log("Construct Container");
var testStorage = new Container("Storage");
var array = [];
console.log(testStorage.getID() === "0");
console.log(testStorage.getName() === "Storage");

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
testStorage.addAttribute(containerAttribute);
console.log(testStorage.getAttributes()[0].getValue() === 10.0);
testStorage.removeAttribute(containerAttribute.getName());
console.log(testStorage.getAttributes().length === 0);

console.log("Handling sub containers");
var container1 = new Container("Container 1");
testStorage.addSubContainer(container1);
console.log(testStorage.getSubContainers()[0].getName() === "Container 1");
testStorage.removeSubContainer(container1.getID());
console.log(testStorage.getSubContainers().length === 0);

console.log("Handling container items");
container1.addItem(containerItem);
console.log(container1.getItems()[0].getID() === "0815");
container1.removeItem(item.getID());
console.log(container1.getItems().length === 0);

console.log("Handling item attributes");
item.addAttribute(itemAttribute);
console.log(item.getAttributes()[0].getValue() === 5.0);
item.removeAttribute(itemAttribute.getName());
console.log(item.getAttributes().length === 0);

console.log("Get ID dynamically");
var testContainer = new Container("Base Container");
var subContainer1 = new Container("Sub Container 1");
var subContainer2 = new Container("Sub Container 2");
var subContainer3 = new Container("Sub Container 3");
var subContainer4 = new Container("Sub Container 4");
var subContainer5 = new Container("Sub Container 5");
var subContainer6 = new Container("Sub Container 6");
var subContainer7 = new Container("Sub Container 7");
testContainer.addSubContainer(subContainer1);
subContainer2.addSubContainer(subContainer3);
subContainer2.addSubContainer(subContainer4);
subContainer2.addSubContainer(subContainer5);
subContainer2.addSubContainer(subContainer6);
subContainer6.addSubContainer(subContainer7);
console.log(testContainer.toString());
console.log(subContainer2.toString());
testContainer.addSubContainer(subContainer2);
console.log(testContainer.toString());
var testItem1 = new ContainerItem("A001", 1);
var testItem2 = new ContainerItem("A002", 3);
var testItem3 = new ContainerItem("A003", 47);
var testItem4 = new ContainerItem("A004", 9);
var testItem5 = new ContainerItem("A005", 1);
console.log(JSON.stringify(testContainer));

console.log("Get all items");
testContainer.addItem(testItem1);
subContainer1.addItem(testItem2);
subContainer2.addItem(testItem3);
subContainer3.addItem(testItem4);
subContainer7.addItem(testItem5);
console.log(testContainer.getAllItems());

// TODO: handling amount of items and sub containers
// TODO: already exist checks
// TODO: what if I somehow use an object which has been successfully removed from the data structure
// TODO: think about parent managing
// TODO: information hiding