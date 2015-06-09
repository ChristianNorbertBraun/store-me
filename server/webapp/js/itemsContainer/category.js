/**
 * Created by Waleska on 09.06.2015.
 */

var categoryInputField , markedCategory;

function categoryAddOrEdit()
{
    try
    {
        $.couch.urlPrefix = strings.link.dbConnection;
        getCategoryInput();
        checkCategoryInputField();
        addCategoryToDB();
        addCategoryToTable();
    }
    catch(err)
    {
    }
}

function markField(id)
{
    blankOldElement();
    document.getElementById(id).style.backgroundColor = "#d3d3d3";
    markedCategory = id;
}

function blankOldElement()
{
    if(markedCategory)
    {
        document.getElementById(markedCategory).style.backgroundColor = "#ffffff";
    }
}

function addCategoryToTable()
{
    var newCategoryRow = document.getElementById("category-table").insertRow();
    newCategoryRow.addEventListener("click", function(event){
        markField(event.target.id);
    });
    newCategoryRow.id = categoryInputField + "row";
    var newCategory = newCategoryRow.insertCell(0);
    newCategory.id = categoryInputField;
    newCategory.innerHTML = categoryInputField;
}

function getCategoryInput() {
    categoryInputField = $('#category-input').val();
}

function checkCategoryInputField()
{
    if(!categoryInputField)
    {
        window.alert(strings.categroy.noInput);
        throw "no input";
    }
}

function addCategoryToDB()
{
    var category =
    {
        _id: categoryInputField,
        "items": []
    };

    $.couch.db("items").saveDoc(category, {
        success: function(data) {
            console.log(data);
        },
        error: function(status) {
            console.log(status);
        }
    });
}

function categoryDelete()
{
    $.couch.urlPrefix = "http://localhost:5984";

    checkIfCategoryIsMarked();
    deleteCategoryFromDB();
    deleteCategoryFromTable();
}

function checkIfCategoryIsMarked()
{
    if(!markedCategory)
    {
        window.alert(strings.category.noCategory);
        throw "no category";
    }
}

function deleteCategoryFromDB()
{
    $.couch.db("items").openDoc(markedCategory, {
        success: function(data) {
            console.log(data);
            $.couch.db("items").removeDoc(data, {
                success: function(data2) {
                    console.log(data2);
                },
                error: function(status) {
                    console.log(status);
                }
            });
        },
        error: function(status) {
            console.log(status);
        }
    });
}

function deleteCategoryFromTable()
{
    var tableRow = document.getElementById(markedCategory + "row");
    document.getElementById("category-table").deleteRow(tableRow.rowIndex);
    markedCategory = null;
}