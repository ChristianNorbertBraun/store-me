/**
 * Created by captainluma on 15.06.15.
 */

console.log("Construct Container");
var testStorage = new Container("Storage");
console.log(testStorage.containerID === "0");
console.log(testStorage.containerName === "Storage");

console.log("Construct ContainerAttribute");
var containerAttribute = new ContainerAttribute("length", 10.0, "meters", "quantity", true);
console.log(containerAttribute.attributeName === "length");
console.log(containerAttribute.value === 10.0);
console.log(containerAttribute.unit === "meters");
console.log(containerAttribute.type === "quantity");
console.log(containerAttribute.compulsory === true);

console.log("Construct ContainerItem");
var containerItem = new ContainerItem("0815", 7);
console.log(containerItem.itemID === "0815");
console.log(containerItem.amount === 7);

console.log("Construct Item");
var item = new Item("0815", "Hammer", "Tool", []);
console.log(item._id === "0815");
console.log(item.name === "Hammer");
console.log(item.category_id === "Tool");

console.log("Construct ItemAttribute");
var itemAttribute = new ItemAttribute("length", 5.0, "meters", "quantity");
console.log(itemAttribute.attributeName === "length");
console.log(itemAttribute.value === 5.0);
console.log(itemAttribute.unit === "meters");
console.log(itemAttribute.type === "quantity");

console.log("Handling container attributes");
addContainerAttribute(testStorage, containerAttribute);
console.log(testStorage.attributes[0].value === 10.0);
removeContainerAttribute(testStorage, containerAttribute.attributeName);
console.log(testStorage.attributes.length === 0);

console.log("Handling sub containers");
var container1 = new Container("Container 1");
addSubContainer(testStorage, container1);
console.log(testStorage.subContainers[0].containerName === "Container 1");
removeSubContainer(testStorage, container1.containerID);
console.log(testStorage.subContainers.length === 0);

console.log("Handling container items");
addItem(container1, containerItem.itemID, 5);
console.log(container1.items[0].itemID === "0815");
console.log(container1.items[0].amount === 5);
removeItem(container1, containerItem.itemID, 5);
console.log(container1.items.length === 0);

console.log("Handling item attributes");
addItemAttribute(item, itemAttribute);
console.log(item.attributes[0].value === 5.0);
removeItemAttribute(item, itemAttribute.attributeName);
console.log(item.attributes.length === 0);

console.log("Get ID dynamically");
var testContainer = new Container("Base Container");
var subContainer1 = new Container("Sub Container 1");
var subContainer2 = new Container("Sub Container 2");
var subContainer3 = new Container("Sub Container 3");
var subContainer4 = new Container("Sub Container 4");
var subContainer5 = new Container("Sub Container 5");
var subContainer6 = new Container("Sub Container 6");
var subContainer7 = new Container("Sub Container 7");
addSubContainer(testContainer, subContainer1);
addSubContainer(subContainer2, subContainer3);
addSubContainer(subContainer2, subContainer4);
addSubContainer(subContainer2, subContainer5);
addSubContainer(subContainer2, subContainer6);
addSubContainer(subContainer6, subContainer7);
console.log(print(testContainer));
console.log(print(subContainer2));
addSubContainer(testContainer, subContainer2);
console.log(print(testContainer));

console.log("Representations");
console.log(JSON.stringify(testContainer));
console.log(testContainer);

var testItem1 = new ContainerItem("A001", 1);
var testItem2 = new ContainerItem("A002", 3);
var testItem3 = new ContainerItem("A003", 47);
var testItem4 = new ContainerItem("A004", 9);
var testItem5 = new ContainerItem("A005", 1);

console.log("Get all items");
addItem(testContainer, testItem1);
addItem(subContainer1, testItem2);
addItem(subContainer2, testItem3);
addItem(subContainer3, testItem4);
addItem(subContainer7, testItem5);
console.log(getAllItems(testContainer));

console.log("Adding and removing amounts of items");
testContainerB = new Container("Test container for items");
addItem(testContainerB, "0815", 7);
addItem(testContainerB, "0815", 7);
console.log(testContainerB.items.length === 1);
console.log(testContainerB.items[0].amount === 14);
removeItem(testContainerB, "0815", 7);
console.log(testContainerB.items[0].amount === 7);
removeItem(testContainerB, "0815", 7);
console.log(testContainerB.items.length === 0);

console.log("Adding amounts of sub containers");
var testContainerC = new Container("Test container for sub containers");
addSubContainers(testContainerC, "sub", 20);
addSubContainers(testContainerC.subContainers[7], "subsub", 45);
console.log(print(testContainerC));

console.log("Get Container by ID");
var searchID = "0-0-1";
var store = new Container("store");
var shelf1 = new Container("shelf1");
var shelf2 = new Container("shelf2");
var subshelf1_1 = new Container("subschelf1_1");
var subshelf1_2 = new Container("subschelf1_2");
var subshelf2_1 = new Container("subschelf2_1");
var subshelf2_2 = new Container("subschelf2_2");
addSubContainer(store, shelf1);
addSubContainer(store, shelf2);
addSubContainer(shelf1, subshelf1_1);
addSubContainer(shelf1, subshelf1_2);
addSubContainer(shelf2, subshelf2_1);
addSubContainer(shelf2, subshelf2_2);
console.log(getContainerById(store, searchID).containerID === searchID);
/* works fine. requires database connection
console.log("Get all attributes");
var anotherTestContainer = new Container("Woop Woop");
addSubContainers(anotherTestContainer, "Subby-o-", 7);
addItem(anotherTestContainer, "1337", 2);
addItem(anotherTestContainer.subContainers[0], "1337", 2);
addItem(anotherTestContainer.subContainers[1], "1337", 2);
console.log(getAllItemAttributes(anotherTestContainer));

console.log("Get all compulsory attributes");
var compulsoryTestContainer = new Container("Store");
addSubContainers(compulsoryTestContainer, "SubContainer-", 2);
var compulsoryAttributes = new ContainerAttribute("compulsoryAttribute", 5, "m", "test", true);
var nonCompulsoryAttributes = new ContainerAttribute("nonCompulsoryAttribute", 6, "l", "test", false);

addContainerAttribute(compulsoryTestContainer, compulsoryAttributes);
addContainerAttribute(compulsoryTestContainer, nonCompulsoryAttributes);

addContainerAttribute(compulsoryTestContainer.subContainers[0], compulsoryAttributes);
addContainerAttribute(compulsoryTestContainer.subContainers[0], compulsoryAttributes);
addContainerAttribute(compulsoryTestContainer.subContainers[1], nonCompulsoryAttributes);
console.log(getAllCompulsoryContainerAttributes(compulsoryTestContainer).length == 3);
*/

/* Changed to only work with database key value pairs
console.log("Category still referenced");
var yoloItems = [];
yoloItems.push(new Item("100", "yolo", "cat1"));
yoloItems.push(new Item("200", "fish", "cat1"));
console.log(categoryStillReferenced(yoloItems,"cat1") === true);
console.log(categoryStillReferenced(yoloItems,"cat2") === false);
*/

console.log("Count Containers and Items");
var startHere = new Container("Start Container");
addSubContainers(startHere, "Sub Container ", 9);
for (var i = 0; i < startHere.subContainers.length; i++)
{
    var oldSubbi = startHere.subContainers[i];
    addItem(oldSubbi, "123", 5);
}
console.log(countContainers(startHere) === 10);
console.log(countItems(startHere) === 45);