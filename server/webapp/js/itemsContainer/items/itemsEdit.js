/**
 * Created by Waleska on 10.06.2015.
 */

function updateItem()
{
    try
    {
        loadItemAttribute();
        loadNameIntoInput();
        deleteItemFromDB();
    }
    catch(err)
    {
    }
}