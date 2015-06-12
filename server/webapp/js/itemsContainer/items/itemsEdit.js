/**
 * Created by Waleska on 10.06.2015.
 */

function itemEdit()
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