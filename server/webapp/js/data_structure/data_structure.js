/**
 * Created by Marvin Therolf on 15.06.15.
 */

/**
 * The container object is the main data structure in the StorMe business logic. It consists of a container name, a
 * unique id which also encodes the position of the container inside the storage and three arrays holding the containers
 * attributes, sub containers and contained items.<br>
 * <br>
 * A StorMe storage basically consists of a singe container given the container id "0".The storage is organized by
 * adding containers to the sub container array. The first sub container will get the id "0-0", the second will get the
 * id "0-1", the first sub container of container "0-0" will get the id "0-0-0" and so on. This creates a tree structure
 * that greatly represents the reality of the storage situation and supports a fast search.
 * @constructor
 * @param {String} containerName    - Name of the constructed container
 * @prop {String} containerID       - Unique identifier (form: 0-1-...-2)
 * @prop {String} containerName     - Container name
 * @prop {Array} attributes         - Attributes of this container (see class ContainerAttribute)
 * @prop {Array} subContainers      - Sub containers of this container
 * @prop {Array} items              - Items contained by this container (see class ContainerItem)
 * @author Marvin Therolf
 */
function Container(containerName)
{
    this.containerID = "0";
    this.containerName = containerName;
    this.attributes = [];
    this.subContainers = [];
    this.items = [];
}

/**
 * Returns a set of item IDs contained by a container and all of its sub containers.
 * @function
 * @param container {Container}     - Container to start the search from
 * @param setOfIDs {Array}          - Set of IDs
 * @returns {Array} Set of IDs
 * @author Marvin Therolf
 */
var getAllItemIDs = function (container, setOfIDs)
{
    for (var i = 0; i < container.items.length; i++)
    {
        var currentID = container.items[i].itemID;
        addToSet(setOfIDs, currentID);
    }
    for (var k = 0; k < container.subContainers.length; k++)
    {
        var currentSubContainer = container.subContainers[k];
        getAllItemIDs(currentSubContainer, setOfIDs);
    }
    return setOfIDs;
};

/**
 * Adds an item to an array if it doesn't contain this item already.
 * @param array {Array}     - Set
 * @param item {*}          - Item to add to the set
 * @author Marvin Therolf
 * */
var addToSet = function (array, item)
{
    if (!contains(array, item))
    {
        array.push(item);
    }
};

/**
 * Checks if item already exits in array.
 * @function
 * @param array
 * @param item
 * @returns {boolean}
 * @author Marvin Therolf
 */
var contains = function (array, item)
{
    var result = false;

    for (var i = 0; i < array.length; i++)
    {
        if (array[i] === item)
        {
            result = true;
            break;
        }
    }
    return result;
};

/**
 * Returns all items contained by the given container and its sub containers. The returned array is an array of
 * ContainerItem objects.
 * @function
 * @param {Container} container     - Container from where to start gathering items
 * @returns {Array} Array of ContainerItems
 * @author Marvin Therolf
 */
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

//todo delete this function it is not needed, remember the testcases
/*

/!**
 * Returns a set of all attributes of all items contained by the given container and its subcontainers. The returned
 * array is an array of ItemAttribute Objects.
 * @function
 * @param {Container} container     - Container from where to start gathering attributes
 * @returns {Array} Array of ItemAttributes
 * @author Marvin Therolf
 *!/
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
*/

/**
 * Adds all attributes of an item to a set of attributes. So if the set already contains an attribute it is not added
 * once more. Because it's a set. :)
 * @function
 * @param attributes {Array}    - Set of ItemAttribute objects
 * @param item {Item}           - Item object to get attributes from
 */
var addAttributes = function(attributes, item)
{
     for (var i = 0; i < item.attributes.length; i++)
     {
         var currentAttribute = item.attributes[i];
         addToSet(attributes, currentAttribute);
     }
};

/**
 * Transfers an array of ContainerItems into an array of Items enabling a data base connection in the process to fetch
 * the item information.
 * @function
 * @param {Array} containerItems        - Array of ContainerItems
 * @returns {Array} Array of Items
 * @author Marvin Therolf
 */
getDataItems = function(containerItems, callBackFunction)
{

    var dataItems = [];
    var counter = 0;
    for (var i = 0; i < containerItems.length; i++)
    {
        var currentContainerItem = containerItems[i];
        getDataItemFromCouch(currentContainerItem.itemID, function(status, data)
        {
            ++counter;
            if (status)
            {
                dataItems.push(data);
            }
            if(containerItems.length == counter){
                callBackFunction(true, dataItems);
            }
        });
    }
    callBackFunction(false, []);
};

/**
 * Adds a ContainerAttribute to a container.
 * @function
 * @param {Container} container             - Container to add attribute to
 * @param {ContainerAttribute} attribute    - Attribute added to container
 * @author Marvin Therolf
 */
addContainerAttribute = function(container, attribute)
{
    container.attributes.push(attribute);
};

/**
 * Removes a ContainerAttribute from a container.
 * @function
 * @param {Container} container     - Container to remove attribute from
 * @param {String} attributeName    - Name of the attribute removed from container
 * @author Marvin Therolf
 */
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

/**
 * Removes all ContainerAttributes from a container.
 * @function
 * @param {Container} container     - Container to remove attributes from
 * @author Marvin Therolf
 */
removeAllContainerAttributes = function(container)
{
    container.attributes = [];
};

/**
 * Returns all container attributes contained by the given container and its sub containers. The returned array is an array of
 * ContainerAttributes objects.
 * @function
 * @param {Container} container     - Container from where to start gathering items
 * @returns {Array} Array of ContainerAttributes
 * @author Marcel Groß
 */
getAllContainerAttributes = function(container)
{
    var allAttributes = container.attributes;

    for (var i = 0; i < container.subContainers.length; i++)
    {
        var subContainer = container.subContainers[i];
        allAttributes = allAttributes.concat(getAllContainerAttributes(subContainer));
    }
    return allAttributes;
};

/**
 * Returns all compulsory container attributes contained by the given container and its sub containers. The returned array is an array of
 * ContainerAttributes objects.
 * @function
 * @param {Container} container     - Container from where to start gathering items
 * @returns {Array} Array of ContainerAttributes
 * @author Marcel Groß
 */
getAllCompulsoryContainerAttributes = function(container)
{
    var allCompulsoryAttributes = [];
    var allContainerAttributes = container.attributes;

    for (var i = 0; i < allContainerAttributes.length; i++)
    {
        var currentContainerAttribute = allContainerAttributes[i];

        if (currentContainerAttribute.compulsory)
        {
            allCompulsoryAttributes.push(currentContainerAttribute);
        }
    }
    return allCompulsoryAttributes;
};


/**
 * Adds a sub container to a container.
 * @function
 * @param {Container} container     - Container to add sub container to
 * @param {Container} subContainer  - Sub container added to container
 * @author Marvin Therolf
 */
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

/**
 * Adds the given Amount of sub containers to the given container. Sub containers are all created within this function
 * and are named after the given prefix followed by an upcounting number (starting with 0);
 * @function
 * @param {Container} container         - Container to add sub containers to
 * @param {String} subContainerPrefix   - Prefix after which sub containers are named
 * @param {Number} amount               - Amount of sub containers to created and add
 * @param {Array} attributes            - Array of ContainerAttribute objects (may be null)
 * @author Marvin Therolf
 */
addSubContainers = function(container, subContainerPrefix, amount, attributes)
{
    for (var i = 0; i < amount; i++)
    {
        var subContainer = new Container(subContainerPrefix + i);
        subContainer.attributes = attributes;
        addSubContainer(container, subContainer);
    }
};

/**
 * Removes a sub container from a given container using the sub containers containerID.
 * @function
 * @param {Container} container     - Container to remove sub container from
 * @param {String} subContainerID   - ContainerID of the sub container to remove
 * @author Marvin Therolf
 */
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

/**
 * Removes all sub containers from a given container.
 * @function
 * @param {Container} container     - Container to remove sub containers from
 * @author Marvin Therolf
 */
removeAllSubContainers = function(container)
{
    container.subContainers = [];
};

/**
 * Adds a given amount of ContainerItems to the container.
 * @function
 * @param {Container} container     - Container to add items to
 * @param {String} itemID           - ItemID of the item to add
 * @param {Number} amount           - Amount of items to add to the container
 * @author Marvin Therolf
 */
addItem = function(container, itemID, amount)
{
    var result = false;

    if (amount > 0)
    {
        var containerItem = containsItem(container, itemID);

        if (containerItem != null)
        {
            increaseAmount(containerItem, amount);
            result = true;
        }
        else
        {
            containerItem = new ContainerItem(itemID, amount);
            containerItem.parentContainerID = container.containerID;
            container.items.push(containerItem);
            result = true;
        }
    }
    return result;
};

/**
 * Checks if a container contains an item by checking the items id. Doesn't check sub containers. Returns the item if
 * found in form of a ContainerItem. Returns null otherwise.
 * @function
 * @param {Container} container     - Container to check
 * @param {String} itemID           - ID of searched item
 * @returns {ContainerItem} ContainerItem if found, null otherwise
 * @author Marvin Therolf
 */
containsItem = function(container, itemID)
{
    var result = null;

    for (var i = 0; i < container.items.length; i++)
    {
        var currentContainerItem = container.items[i];

        if (currentContainerItem.itemID === itemID)
        {
            result = currentContainerItem;
            break;
        }
    }
    return result;
};

/**
 * Removes an amount of items from a given container.
 * @function
 * @param {Container} container     - Container to remove items from
 * @param {String} itemID           - ItemID of item to remove
 * @param {Number} amount           - amount of items to remove
 * @author Marvin Therolf
 */
removeItem = function(container, itemID, amount)
{
    var result = false;

    for (var i = 0; i < container.items.length; i++)
    {
        var containerItem = container.items[i];

        if (containerItem.itemID = itemID)
        {
            if (containerItem.amount === amount)
            {
                removeFromArray(container.items, i);
                result = true;
            }
            else if (containerItem.amount > amount)
            {
                decreaseAmount(container.items[i], amount);
                result = true;
            }
            break;
        }
    }
    return result;
};

/**
 * Removes all items from a given container.
 * @function
 * @param {Container} container     - Container to removes all items from
 * @author Marvin Therolf
 */
removeAllItems = function(container)
{
    container.items = [];
};

/**
 * Dynamically finds the first free container id for a newly added sub container. If you e.g. already have a container with
 * the container id "0-1" and this container contains the sub containers "0-1-0", "0-1-1" and "0-1-3", this function
 * will return "0-1-2" as this is the first free sub container id.
 * @function
 * @param {Container} container     - Container from where to start looking for an id
 * @returns {String} Next free container id
 * @author Marvin Therolf
 */
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

/**
 * Finds and returns a container starting at a given container recursively checking the container id.
 * @function
 * @param {Container} container     - Container to start the search at
 * @param {String} searchedID       - ContainerID of the searched container
 * @returns {Container} Searched container, or null if container wasn't found
 * @author Marvin Therolf and Marcel Groß
 */
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

/**
 * An attribute object to set properties of containers.
 * @constructor
 * @param {String} attributeName    - Name of the attribute
 * @param {Number} value            - Will normally a number but can be sth else (like boolean)
 * @param {String} unit             - The unit matching the value
 * @param {String} type             - Sets this attributes type (e.g. quantity or property)
 * @param {Boolean} compulsory      - True if items contained by this container must fulfill this requirement
 * @prop {String} attributeName    - Name of the attribute
 * @prop {Number} value            - Will normally a number but can be sth else (like boolean)
 * @prop {String} unit             - The unit matching the value
 * @prop {String} type             - Sets this attributes type (e.g. quantity or property)
 * @prop {Boolean} compulsory      - True if items contained by this container must fulfill this requirement
 * @author Marvin Therolf
 */
function ContainerAttribute(attributeName, value, unit, type, compulsory)
{
    this.attributeName = attributeName;
    this.value = value;
    this.unit = unit;
    this.type = type;
    this.compulsory = compulsory;
}

/**
 * A ContainerItem holds an ItemID as well as the amount of contained items of the id. For working with real items
 * there has to be a mapping process with the item data base. Directly storing items inside the container tree
 * structure would unnecessarily blow up the data structure and would be unhandy when trying to access the items
 * attributes outside of the container structure.
 * @constructor
 * @param {String} itemID           - ID of the contained item
 * @param {Number} amount           - Amount of items hold by the ContainerItem
 * @prop {String} itemID            - ID of the contained item
 * @prop {Number} amount            - Amount of items hold by the ContainerItem
 * @prop {String} parentContainerID - ID of the container that holds this ContainerItem
 * @author Marvin Therolf
 */
function ContainerItem(itemID, amount)
{
    this.itemID = itemID;
    this.amount = amount;
    this.parentContainerID = "0";
}

/**
 * Increases the amount of items held by a ContainerItem object by the given amount.
 * @function
 * @param {ContainerItem} containerItem     - ContainerItem the holds the item
 * @param {Number} amount               - Amount to add to the total amount
 * @author Marvin Therolf
 */
increaseAmount = function(containerItem, amount)
{
    containerItem.amount += amount;
};

/**
 * Decreases the amount of items held by a ContainerItem object by the given amount.
 * @function
 * @param {Container} containerItem     - ContainerItem the holds the item
 * @param {Number} amount               - Amount to sub from the total amount
 * @author Marvin Therolf
 */
decreaseAmount = function(containerItem, amount)
{
    containerItem.amount -= amount;
};

/**
 * This object holds the actual item objects stored in the database. Whenever it is necessary to work with the real
 * item data it is necessary to fetch the information from the database using the getDataItems function.
 * @constructor
 * @param {String} itemID           - Unique Identifier of the item
 * @param {String} itemName         - Name of the item
 * @param {String} category_id      - Unique Identifier of the category
 * @param {Array} attributes        - Array of ItemAttributes
 * @prop {String} _id               - Unique Identifier of the item in DB
 * @prop {String} category_id       - Unique Identifier of the category
 * @prop {String} itemName          - Name of the item
 * @prop {Array} attributes         - Array of ItemAttributes
 * @author Marvin Therolf
 */
function Item(itemID, itemName, category_id, attributes)
{
    this._id = itemID;
    this.category_id = category_id;
    this.attributes = attributes;
    this.name = itemName;
}

/**
 * Adds an ItemAttribute object to the attributes array of a given item.
 * @function
 * @param {Item} item                   - Item to add the attribute to
 * @param {ItemAttribute} attribute     - Attribute to add to the item
 * @author Marvin Therolf
 */
addItemAttribute = function(item, attribute)
{
    item.attributes.push(attribute);
};

/**
 * Removes an ItemAttribute object from the attributes array of a given item.
 * @function
 * @param {Item} item                   - Item to remove the attribute from
 * @param {String} attributeName        - Name of the attribute to remove from the item
 * @author Marvin Therolf
 */
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

/**
 * Removes all attributes from a given item.
 * @function
 * @param {Item} item       - Item to remove all attributes from
 * @author Marvin Therolf
 */
removeAllItemAttributes = function(item)
{
    item.attributes = [];
};

/**
 * Checks an array of Item objects taken from the database for a given categoryID.
 * Returns true if category id was found. Returns false otherwise.
 * @function
 * @param items {Array}         - Array of items from database to search
 * @param category_id {String}  - Category id to search for
 * @returns {boolean} Whether or not category id was found
 */
var categoryStillReferenced = function(items, category_id)
{
    var referenceFound = false;

    for (var i = 0; i < items.length; i++)
    {
        if (items[i].value.category_id === category_id)
        {
            referenceFound = true;
            break;
        }
    }
    return referenceFound;
};

/**
 * Checks if an Item is still stored a storage
 * @function
 * @param itemID {String}       - ID of the item which gets checked
 * @param storage {Container}   - Storage in which the item gets searched
 * @returns {boolean} Whether item was found or not
 */
var itemStillStored = function(itemID, storage)
{
    var itemStored = false;
    var allItems = getAllItems(storage);

    for (var i = 0; i < allItems.length; i++)
    {
        if (allItems[i].itemID === itemID)
        {
            itemStored = true;
            break;
        }
    }

    return itemStored;
}

/**
 * An attribute object to set properties of items.
 * @constructor
 * @param {String} attributeName   - Name of the attribute
 * @param {Number} value           - Will normally a number but can be sth else (like boolean)
 * @param {String} unit            - The unit matching the value
 * @param {String} type            - Sets this attributes type (e.g. quantity or property)
 * @prop {String} attributeName    - Name of the attribute
 * @prop {Number} value            - Will normally a number but can be sth else (like boolean)
 * @prop {String} unit             - The unit matching the value
 * @prop {String} type             - Sets this attributes type (e.g. quantity or property)
 * @author Marvin Therolf
 */
function ItemAttribute(attributeName, value, unit, type)
{
    this.attributeName = attributeName;
    this.value = value;
    this.unit = unit;
    this.type = type;
}

/**
 * Function to quickly remove an object from an array by providing the array and the object's index.
 * @function
 * @param {Array} array     - Array to remove object from
 * @param index             - Index of the object to remove
 * @author Marvin Therolf
 */
var removeFromArray = function(array, index)
{
    var hold = array[index];
    array[index] = array[array.length-1];
    array[array.length-1] = hold;
    array.pop();
};

/**
 * Copies a given array and returns the copy.
 * @function
 * @param {Array} array - Original of the array to copy
 * @returns {Array} Copy of the given array.
 */
var copyArray = function(array)
{
    var result = [];

    for (var i = 0; i < array.length; i++)
    {
        result.push(array[i]);
    }
    return result;
};

/**
 * Helping function to compare two objects (numbers). Used in the sorting algorithm.
 * @param {Number} a    - A number
 * @param {Number} b    - Another number
 * @returns {number} The difference between a and b.
 * @author Marvin Therolf
 */
var sortNumerically = function (a, b)
{
    return a - b;
};

/**
 * Counts the amount of items stored in a container and its sub containers.
 * @function
 * @param container {Container}     - Container to start counting from
 * @returns {Number} Amount of stored items.
 * @author Marvin Therolf
 */
var countItems = function(container)
{
    var amount = 0;
    var allItems = getAllItems(container);

    for (var i = 0; i < allItems.length; i++)
    {
        amount += allItems[i].amount;
    }
    return amount;
};

/**
 * Recursively counts the amount of sub containers contained by a given container.
 * @function
 * @param container {Container}     - Container to start counting from
 * @returns {Number} Amount of sub containers (recursive).
 * @author Marvin Therolf
 */
var countContainers = function(container)
{
    var amount = 1;
    var subContainers = container.subContainers;

    for (var i = 0; i < subContainers.length; i++)
    {
        amount += countContainers(subContainers[i]);
    }
    return amount;
};

/**
 * Searches a list of items for a sub string included in the item name. Returns an array of results.
 * @function
 * @param items {Array}      - Array of items to search
 * @param subString {String} - Substring to search for
 * @returns {Array} Results
 */
var searchForItemName = function(items, subString)
{
    var result = [];

    for (var i = 0; i < items.length; i++)
    {
        var currentItem = items[i];

        if (currentItem.name.indexOf(subString) > -1)
        {
            result.push(currentItem);
        }
    }
    return result;
};




// TODO: plausibility (already exists, etc.)
// TODO: rename CRUD operations (Marcel W.)
// TODO: what if I someone use an object which has been successfully removed from the data structure
// TODO: think about parent managing
// TODO: parent handling in container item
// TODO: scope (inklusive Doku-Annotations)
// TODO: exclude from misc => refresh all references???