/**
 * Created by Marvin Therolf and Marcel Groß on 17.06.15.
 */

/**
 * Stocks an amount of items into a given storage.
 * @function
 * @param {Container} storage   - Root Container object of used storage
 * @param {String} containerID  - Unique Identifier of container to stock item(s) into
 * @param {String} itemID       - Unique Identifier of item(s) to stock into container
 * @param {Number} amount       - Amount of items to stock
 * @author Marvin Therolf and Marcel Groß
 */
var stock = function(storage, containerID, itemID, amount)
{
    var container = getContainerById(storage, containerID);
    return addItem(container, itemID, amount);
};

/**
 * Depletes an amount of items from a given storage.
 * @function
 * @param {Container} storage   - Root Container object of used storage
 * @param {String} containerID  - Unique Identifier of container to deplete item(s) from
 * @param {String} itemID       - Unique Identifier of item(s) to deplete from container
 * @param {Number} amount       - Amount of items to deplete
 * @author Marvin Therolf and Marcel Groß
 */
var deplete = function(storage, containerID, itemID, amount)
{

    var container = getContainerById(storage, containerID);
    return removeItem(container, itemID, amount);
};