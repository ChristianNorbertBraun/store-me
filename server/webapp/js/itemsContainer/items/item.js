/**
 * Created by Waleska on 12.06.2015.
 */

function Item(itemID, itemName, category_id, attributes)
{
    this._id = itemID;
    this.category_id = category_id;
    if(attributes) this.attributes = attributes;
    else this.attributes = [];
    this.name = itemName;

    this.getID = function()
    {
        return this._id;
    };

    this.setName = function(itemName)
    {
        this.name = itemName;
    };

    this.getName = function()
    {
        return this.name;
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