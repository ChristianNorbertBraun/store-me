/**
 * Created by Waleska on 10.06.2015.
 */

function addCategoryToDB(cbFn)
{
    var category =
    {
        _id: categoryInputField
    };

    $.couch.db("categorys").saveDoc(category, {
        success: function(data) {
            console.log(data);
            cbFn(true);
        },
        error: function(status) {
            console.log(status);
        }
    });
}

function addCategoryToTable(name)
{
    var newCategoryRow = document.getElementById("category-table").insertRow();
    newCategoryRow.addEventListener("click", function(event){
        markField(event.target.id);
    });
    try {
        if(!name) newCategoryRow.id = categoryInputField + "row";
        else newCategoryRow.id = name + "row";
        var newCategory = newCategoryRow.insertCell(0);
        if(!name)
        {
            newCategory.id = categoryInputField;
            newCategory.innerHTML = categoryInputField;
        }
        else
        {
            newCategory.id = name;
            newCategory.innerHTML = name;
        }
    }
    catch(err)
    {
        //window.alert(strings.category.alreadyExist);
        throw "already Exist";
    }
}
