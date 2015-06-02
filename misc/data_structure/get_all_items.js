/**
 * Created by captainluma on 02.06.15.
 */

// container class
function Container(containerID, containerName)
{
    this.containerID = containerID;
    this.parentContainerID = null;
    this.containerName = containerName;
    this.items = [];
    this.subContainers = [];
}

// item class
function Item(itemID, itemName)
{
    this.itemID = itemID;
    this.name = itemName;
}

// add subcontainer to container
Container.prototype.addContainer = function(subContainer)
{
    subContainer.parentContainerID = this.containerID;
    var index = this.subContainers.length;
    this.subContainers[index] = subContainer;
}

// add item to container
Container.prototype.addItem = function(item)
{
    var index = this.items.length;
    this.items[index] = item;
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

// create container
var baseContainer = new Container("0", "Base Container");

// add subcontainers
var subContainer1 = new Container("1", "Sub Container 1");
baseContainer.addContainer(subContainer1);

var subContainer2 = new Container("2", "Sub Container 2");
baseContainer.addContainer(subContainer2);

var subContainer3 = new Container("3", "Sub Container 3");
subContainer1.addContainer(subContainer3);

// add items
var item1 = new Item("1", "Schraubenzieher");
var item2 = new Item("2", "Feile");
var item3 = new Item("3", "Hammer");
baseContainer.addItem(item1);
baseContainer.addItem(item2);
baseContainer.addItem(item3);
var item4 = new Item("4", "Zange");
var item5 = new Item("5", "Säge");
var item6 = new Item("6", "Hundatapack Schraubn");
subContainer1.addItem(item4);
subContainer2.addItem(item5);
subContainer3.addItem(item6);

// test cases
/*
console.log(item1);
console.log(item2);
console.log(item3);
console.log(item4);
console.log(item5);
console.log(item6);
console.log(baseContainer);
console.log(subContainer1);
console.log(subContainer2);
console.log(subContainer3);
*/
console.log(baseContainer.getAllItems());
console.log(baseContainer.items);

// TODO: add multiple amounts (containers and items)