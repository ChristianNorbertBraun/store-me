/**
 * Created by Waleska on 09.06.2015.
 */

var categoryInputField , markedCategory;

function loadTable()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    var mapFunction = function (doc)
    {
            emit();
    };

    $.couch.db("categorys").query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            var rows = data["rows"];
            var i;
            for(i = 0; i < data["total_rows"] ; i++)
            {
                addCategoryToTable(rows[i].id);
            }
        },
        error: function (status) {
            console.log(status);
        },
        reduce: false
    });
}

function categoryAdd()
{
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;
        getCategoryInput();
        checkCategoryInputField();
        addCategoryToDB();
        addCategoryToTable(null);
    }
    catch(err)
    {
    }
}

function refreshTable()
{
    markedCategory = null;
    var Parent = document.getElementById("category-table");
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
    loadTable();
}

function checkIfCategoryHasItems(cbFn)
{
    var mapFunction = function (doc)
    {
        emit("category_id", doc.category_id);
    };

    $.couch.db("items").query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            var rows = data["rows"];
            var i;
            for(i = 0; i < data["total_rows"] ; i++)
            {
                if(rows[i].value == markedCategory)
                {
                    window.alert("cannot delete an category wit items");
                    throw "delete error";
                }
            }
            cbFn(true);
        },
        error: function (status) {
            console.log(status);
        },
        reduce: false
    });
}

function categoryEdit()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;
    getCategoryInput();
    checkCategoryInputField();
    setItemsToNewCategory(function (itemsReady){
        if(itemsReady)
        {
            deleteCategoryId(function (categroyReady){
                if(categroyReady)
                {
                    addCategoryToDB(function (ready){
                        if(ready)
                        {
                            refreshTable();
                            cleanItemTable();
                        };
                    });
                }
            });
        }
    });
}

function setItemsToNewCategory(cbFn)
{
    try
    {
        var mapFunction = function (doc)
        {
            emit("category_id", doc.category_id);
        };

        $.couch.db("items").query(mapFunction, "_count", "javascript", {
            success: function (data) {
                console.log(data);
                var rows = data["rows"];
                var i;
                for(i = 0; i < data["total_rows"] ; i++)
                {
                    if(rows[i].value == markedCategory) setNewCategory(rows[i].id);
                }
                cbFn(true);
            },
            error: function (status) {
                console.log(status);
            },
            reduce: false
        });
    }
    catch(err)
    {
    }
}
function setNewCategory(id)
{
    $.couch.db("items").openDoc(id, {
        success: function(data) {
            console.log(data);
            data.category_id = categoryInputField;
            $.couch.db("items").saveDoc(data, {
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

function deleteCategoryId(cbFn)
{
    $.couch.db("categorys").openDoc(markedCategory, {
        success: function(data) {
            console.log(data);
            $.couch.db("categorys").removeDoc(data, {
                success: function(data2) {
                    console.log(data2);
                    cbFn(true);
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

function keyHandlerCategory(event)
{
    var key = event.keyCode;
    if(key == 13) categoryAddOrEdit();
}

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

function categoryDelete()
{
    $.couch.urlPrefix = "http://localhost:5984";//strings.link.dbConnection;

    checkIfCategoryIsMarked();
    checkIfCategoryHasItems(function (checked){
        if(checked)
        {
            deleteCategoryFromDB();
            deleteCategoryFromTable();
        }
    });
}

function checkIfCategoryIsMarked()
{
    if(!markedCategory)
    {
        //window.alert(strings.category.noCategory);
        throw "no category";
    }
}

function deleteCategoryFromDB()
{
    $.couch.db("categorys").openDoc(markedCategory, {
        success: function(data) {
            console.log(data);
            $.couch.db("categorys").removeDoc(data, {
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