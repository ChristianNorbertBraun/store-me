/**
 * Created by Waleska on 12.06.2015.
 */

function Item(itemID, category_id)
{
    this._id = itemID;
    this.category_id = category_id;
    this.attributes = [];

    this.getID = function()
    {
        return this._id;
    };

    this.setName = function(itemName)
    {
        this._id = itemName;
    };

    this.setCategory_id = function(category_id)
    {
        this.category_id = category_id;
    };

    this.getCategory_id = function()
    {
        return this.category_id;
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
                removeFromArray(this.attributes, i);
                break;
            }
        }
    };
}