/**
 * Created by captainluma on 15.06.15.
 */

// classes

// container


function Container(containerName)
{
    this.containerID = "0";
    this.containerName = containerName;
    this.attributes = [];
    this.subContainers = [];
    this.items = [];
}

getAllItems = function(container)
{
    var allItems = container.items;

    for (var i = 0; i < container.subContainers.length; i++)
    {
        var subContainer = container.subContainers[i];
        allItems = allItems.concat(getAllItems(subContainer));
    }
    return allItems;
};

getAllItemAttributes = function(container)
{
    var allAttributes = [];
    var allItems = getAllItems(container);
    var allDataItems = getDataItems(allItems);

    // special contains function for internal usage only
    var containsAttribute = function(attributes, attribute)
    {
        var result = false;

        for (var i = 0; i < attributes.length; i++)
        {
            if (attributes[i].attributeName === attribute.attributeName)
            {
                result = true;
                break;
            }
        }
        return result;
    };

    for (var i = 0; i < allDataItems.length; i++)
    {
        var currentItem = allDataItems[i];

        for (var k = 0; k < currentItem.attributes.length; k++)
        {
            var currentAttribute = currentItem.attributes[k];

            if (!containsAttribute(allAttributes, currentAttribute))
            {
                allAttributes.push(currentAttribute);
            }
        }
    }
    return allAttributes;
};

getDataItems = function(containerItems)
{
    var dataItems = [];

    for (var i = 0; i < containerItems.length; i++)
    {
        var currentContainerItem = containerItems[i];
        var dataItem = getDataItemFromCouch(currentContainerItem.itemID);
        dataItems.push(dataItem);
    }
    return dataItems;
};

addContainerAttribute = function(container, attribute)
{
    container.attributes.push(attribute);
};

removeContainerAttribute = function(container, attributeName)
{
    for (var i = 0; i < container.attributes.length; i++)
    {
        if (container.attributes[i].attributeName === attributeName)
        {
            removeFromArray(container.attributes, i);
            break;
        }
    }
};

removeAllContainerAttributes = function(container)
{
    container.attributes = [];
};

addSubContainer = function(container, subContainer)
{
    var id = findFreeID(container);
    subContainer.containerID = id;
    container.subContainers.push(subContainer);

    var subContainers = copyArray(subContainer.subContainers);
    removeAllSubContainers(subContainer);

    for (var i = 0; i < subContainers.length; i++)
    {
        addSubContainer(subContainer, subContainers[i]);
    }
};

addSubContainers = function(container, subContainerPrefix, amount)
{
    for (var i = 0; i < amount; i++)
    {
        var subContainer = new Container(subContainerPrefix + i);
        addSubContainer(container, subContainer);
    }
};

removeSubContainer = function(container, subContainerID)
{
    for (var i = 0; i < container.subContainers.length; i++)
    {
        if (container.subContainers[i].containerID === subContainerID)
        {
            removeFromArray(container.subContainers, i);
            break;
        }
    }
};

removeAllSubContainers = function(container)
{
    container.subContainers = [];
};

addItem = function(container, itemID, amount)
{
    var containerItem = containsItem(container, itemID);

    if (containerItem != null)
    {
        increaseAmount(containerItem, amount);
    }
    else
    {
        containerItem = new ContainerItem(itemID, amount);
        containerItem.parentContainerID = container.containerID;
        container.items.push(containerItem);
    }
};

containsItem = function(container, itemID)
{
    var result = null;

    for (var i = 0; i < container.items.length; i++)
    {
        if (container.items[i].itemID === itemID)
        {
            result = container.items[i];
            break;
        }
    }
    return result;
};

removeItem = function(container, itemID, amount)
{
    for (var i = 0; i < container.items.length; i++)
    {
        if (container.items[i].itemID === itemID)
        {
            if (container.items[i].amount === amount)
            {
                removeFromArray(container.items, i);
            }
            else
            {
                decreaseAmount(container.items[i], amount);
            }
            break;
        }
    }
};

removeAllItems = function(container)
{
    container.items = [];
};

findFreeID = function(container)
{
    var freeSubID = container.subContainers.length;
    var subContainerSubIDs = [];

    for (var i = 0; i < container.subContainers.length; i++)
    {
        var subContainerID = container.subContainers[i].containerID;
        var subContainerIDAsArray = subContainerID.split("-");
        var subContainerSubID = subContainerIDAsArray.pop();
        subContainerSubIDs.push(subContainerSubID);
    }
    subContainerSubIDs.sort(sortNumerically);

    for (var k = 0; k < subContainerSubIDs.length; k++)
    {
        if (subContainerSubIDs[k] != k)
        {
            freeSubID = k;
            break;
        }
    }
    return container.containerID + "-" + freeSubID;
};

print = function(container)
{
    var result = container.containerID + "\t" + container.containerName + "\n";

    for (var i = 0; i < container.subContainers.length; i++)
    {
        result += print(container.subContainers[i]);
    }
    return result;
};

getContainerById = function(container, searchedID)
{
    var result = null;

    if (container.containerID === searchedID)
    {
        result = container;
    }
    else
    {
        var subContainers = container.subContainers;

        for (var i = 0; i < subContainers.length; i++)
        {
            var subContainer = subContainers[i];
            var subContainerID = subContainer.containerID;
            var searchedSubID = searchedID.substring(0, subContainer.containerID.length);

            if (subContainerID === searchedSubID)
            {
                result = getContainerById(subContainer, searchedID);
                break;
            }
        }
    }
    return result;
};

// container attribute

function ContainerAttribute(attributeName, value, unit, type, compulsory)
{
    this.attributeName = attributeName;
    this.value = value;
    this.unit = unit;
    this.type = type;
    this.compulsory = compulsory;
}

// container item

function ContainerItem(itemID, amount)
{
    this.itemID = itemID;
    this.amount = amount;
    this.parentContainerID = "0";
}

increaseAmount = function(containerItem, amount)
{
    containerItem.amount += amount;
};

decreaseAmount = function(containerItem, amount)
{
    containerItem.amount -= amount;
};

// item

function Item(itemID, itemName)
{
    this.itemID = itemID;
    this.itemName = itemName;
    this.attributes = [];
}

addItemAttribute = function(item, attribute)
{
    item.attributes.push(attribute);
};

removeItemAttribute = function(item, attributeName)
{
    for (var i = 0; i < item.attributes.length; i++)
    {
        if (item.attributes[i].attributeName === attributeName)
        {
            removeFromArray(item.attributes, i);
            break;
        }
    }
};

removeAllItemAttributes = function(container)
{
    container.attributes = [];
};

// item attribute

function ItemAttribute(attributeName, value, unit, type)
{
    this.attributeName = attributeName;
    this.value = value;
    this.unit = unit;
    this.type = type;
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

// TODO: contains item von außen aufrufbar??
// TODO: what if I someone use an object which has been successfully removed from the data structure
// TODO: think about parent managing
// TODO: information hiding
// TODO: link item id with items
// TODO: plausi (already exists, etc.)
// TODO: add item attribute
// TODO: amount amount
// TODO: rename CRUD operations (Marcel W.)