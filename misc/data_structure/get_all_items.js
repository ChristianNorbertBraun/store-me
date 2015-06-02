// container class
function Container(containerID, containerName)
{
    this.containerID = containerID;
    this.containerName = containerName;
    this.parentContainerID = null;
    this.items = [];
    this.subContainers = [];
}

// item class
function Item(itemID, itemName, amount)
{
    this.itemID = itemID;
    this.name = itemName;
    this.amount = amount;
    this.parentContainerID = null;
}

// add subcontainer to container
Container.prototype.addContainer = function(subContainer)
{
    subContainer.parentContainerID = this.containerID;
    this.subContainers.push(subContainer);
}

// add item to container
Container.prototype.addItem = function(item)
{
    item.parentContainerID = this.containerID;
    this.items.push(item);
}

// get all items from container and subcontainers
Container.prototype.getAllItems = function()
{
    // add items from this container
    var allItems = this.items;

    // add items from sub containers
    for (var i = 0; i < this.subContainers.length; i++)
    {
        var subContainer = this.subContainers[i];
        allItems = allItems.concat(subContainer.getAllItems());
    }
    return allItems;
}

// test cases
var baseContainer = new Container("0", "Base Container");

var subContainer1 = new Container("1", "Sub Container 1");
baseContainer.addContainer(subContainer1);

var subContainer2 = new Container("2", "Sub Container 2");
baseContainer.addContainer(subContainer2);

var subContainer3 = new Container("3", "Sub Container 3");
subContainer1.addContainer(subContainer3);

var item1 = new Item("1", "Schraubenzieher", 7);
var item2 = new Item("2", "Feile", 5);
var item3 = new Item("3", "Hammer", 3);
baseContainer.addItem(item1);
baseContainer.addItem(item2);
baseContainer.addItem(item3);

var item4 = new Item("4", "Zange", 1);
subContainer1.addItem(item4);

var item5 = new Item("5", "Säge", 1);
subContainer2.addItem(item5);

var item6 = new Item("6", "Hundatapack Schraubn", 6);
subContainer3.addItem(item6);

console.log(baseContainer.getAllItems());
console.log(subContainer1.getAllItems());
console.log(subContainer2.getAllItems());
console.log(subContainer3.getAllItems());