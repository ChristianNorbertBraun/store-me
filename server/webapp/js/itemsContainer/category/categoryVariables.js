/**
 * Created by Waleska on 10.06.2015.
 */

var categoryInputField , markedCategory;

function markField(id)
{
    blankOldCategory();
    document.getElementById(id).style.backgroundColor = "#d3d3d3";
    markedCategory = id;
    cleanItemTable();
    loadCategoryItems();
}

function blankOldCategory()
{
    if(markedCategory)
    {
        document.getElementById(markedCategory).style.backgroundColor = "#ffffff";
    }
}

function checkIfCategoryIsMarked()
{
    if(!markedCategory)
    {
        //window.alert(strings.category.noCategory);
        throw "no category";
    }
}

function getCategoryInput() {
    categoryInputField = $('#category-input').val();
}

function checkCategoryInputField()
{
    if(!categoryInputField)
    {
        //window.alert(strings.categroy.noInput);
        throw "no input";
    }
}