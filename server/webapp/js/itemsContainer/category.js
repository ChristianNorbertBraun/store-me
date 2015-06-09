/**
 * Created by Waleska on 09.06.2015.
 */

var categoryInputField = "hallo", markedCategory;

function categoryAddOrEdit()
{
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;
        getCategoryInput();
        checkCategoryInputField();
        addCategoryToDB();
    }
    catch(err)
    {
    }
}

function markField(id)
{
    document.getElementById(id).style.backgroundColor = "#d3d3d3";
    markedCategory = id;
}


function getCategoryInput() {
    categoryInputField = $('#category-input').val();
}

function checkCategoryInputField()
{
    if(!categoryInputField) throw "no input";
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
}

function checkIfCategoryIsMarked()
{
    if(!markedCategory)
    {
        window.alert("no category choosen!");
        throw "no category";
    }
}

function deleteCategoryFromDB()
{
    $.couch.db("items").openDoc("hallo", {
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