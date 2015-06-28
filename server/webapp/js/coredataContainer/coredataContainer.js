/**
 * Created by christian on 6/17/15.
 */

var coredataContainer = Ractive.extend({

    template: '\
        <div class="container">\
            <div class="row">\
            \
                <div class="col-sm-3">\
                    <div id="category-panel" class="panel panel-default">\
                        <div class="panel-heading">\
                            {{panel.title.category}}\
                        </div>\
                        \
                        <div class="panel-body no-padding">\
                            <ul class="list-group">\
                                {{#each category:i}}\
                                    <li id={{i}} class="list-group-item list-group-border" on-click="selectCategory(i)">\
                                        <div class="row">\
                                            <div class="col-xs-10">\
                                                <h4 class="list-group-item-heading">{{id}}</h4>\
                                            </div>\
                                            \
                                            <div class="col-xs-2">\
                                                <span class="cursor-pointer glyphicon glyphicon-remove" on-click="deleteCategory(i)" aria-hidden="true"></span>\
                                            </div>\
                                        </div>\
                                    </li>\
                                {{/each}}\
                            </ul>\
                        </div>\
                    </div>\
                    \
                    <button class="btn btn-primary coredata-category-button" data-toggle="modal" data-target="#add-category-modal">Add</button>\
                    <button type="button" class="btn btn-primary coredata-category-button" {{#unless categorySelected}} disabled="true" {{/unless}} data-toggle="modal" data-target="#edit-category-modal" on-click="saveCurrentCategory()">Edit</button>\
                \
                </div>\
                \
                \
                <div class="col-sm-9">\
                    <div class="panel panel-default">\
                    \
                        <table id="item-table" class="table table-bordered">\
                            <thead>\
                                <tr>\
                                    <th>ID</th>\
                                    <th>Name</th>\
                                </tr>\
                            </thead>\
                            \
                            <tbody>\
                                {{#each items:i}}\
                                    <tr id="item_{{i}}" class="table-entry" on-click="selectItem(i)">\
                                        <td>{{id}}\
                                        <td>{{value.name}}\
                                    </tr>\
                                {{/each}}\
                            </tbody>\
                        </table>\
                    \
                    </div>\
                    \
                    <button class="btn btn-primary coredata-table-button" data-toggle="modal" on-click="prepareItem()" data-target="#add-item-modal">Add</button>\
                    <button type="button" class="btn btn-primary coredata-table-button" {{#unless itemSelected}}disabled="true"{{/unless}} on-click="deleteItemFromTable()">Delete</button>\
                    <button type="button" class="btn btn-primary coredata-table-button" {{#unless itemSelected}}disabled="true"{{/unless}} data-toggle="modal" data-target="#edit-item-modal" on-click="saveCurrentItemEntry()">Edit</button>\
                    \
                </div>\
                \
            </div>\
        </div>\
        \
        <div class="modal fade" id="add-category-modal" tabindex="-1" role="dialog" aria-labelledby="add-category" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                        <h4 class="modal-title modal-title-color">Add a new category</h4>\
                    </div>\
                    \
                    <div class="modal-body">\
                        <div class="row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Category Name</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <input id="add-category-input" type="text" class="form-control" placeholder="Input Category Name">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                        <button type="button" class="btn btn-primary" on-click="addCategory()">Add</button>\
                    </div>\
                </div>\
            </div>\
        </div> \
        \
        <div class="modal fade" id="edit-category-modal" tabindex="-1" role="dialog" aria-labelledby="edit-category" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                        <h4 class="modal-title modal-title-color" id="add-criteria">Edit category</h4>\
                    </div>\
                    \
                    <div class="modal-body">\
                        <div class="row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Category Name</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <input id="edit-category-input" type="text" class="form-control" placeholder="Input Category Name">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                        <button type="button" class="btn btn-primary" on-click="editCategory()">Edit</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
        \
        \<div class="modal fade" id="add-item-modal" tabindex="-1" role="dialog" aria-labelledby="add-item" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                        <h4 class="modal-title modal-title-color" id="add-criteria">Add a new item</h4>\
                    </div>\
                    \
                    <div class="modal-body">\
                        <div class="row modal-row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Item ID</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <input id="add-item-id" type="text" on-change="checkIfItemIdUsed()" class="form-control" value={{newItem.id}} placeholder="Input Item ID">\
                            </div>\
                        </div>\
                        \
                        <div class="row modal-row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Item Name</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <input id="add-item-name" type="text" class="form-control" value={{newItem.name}} placeholder="Input Item Name">\
                            </div>\
                        </div>\
                        \
                        <div class="row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Category</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <select id="add-category-select" value={{newItem.category}} class="form-control">\
                                    <option value="" disabled selected>Nothing selected</option>\
                                    {{#each category}}\
                                        <option>{{id}}</option>\
                                    {{/each}}\
                                </select>\
                            </div>\
                        </div>\
                        \
                        <div id="attribute-container">\
                            {{#if newItem.attributes}}\
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            \
                            {{#each newItem.attributes:i}}\
                                <div id="attribute_row_{{i}}" class="row modal-row" intro-outro="slideh">\
                                    <div class="col-md-3 attribute-entry">\
                                        <input type="text" class="form-control" value="{{attributeName}}" placeholder="Attribute Name">\
                                    </div>\
                                    \
                                    <div class="col-md-3 attribute-entry">\
                                        <input type="text" class="form-control" value="{{value}}" placeholder="Attribute Value">\
                                    </div>\
                                    \
                                    <div class="col-md-2 attribute-entry">\
                                        <input type="text" class="form-control" value="{{unit}}" placeholder="Unit">\
                                    </div>\
                                    \
                                    <div class="col-md-2 attribute-entry">\
                                        <input type="text" class="form-control" value="{{type}}" placeholder="Type">\
                                    </div>\
                                    <div class="col-md-2">\
                                        <button class="btn btn-primary btn-sm" on-click="removeAttributeRow(i)">\
                                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\
                                        </button>\
                                    </div>\
                                </div>\
                            {{/each}}\
                            \
                        </div>\
                        \
                        <button id="add-new-attribute-button" class="btn btn-primary btn-sm" on-click="addNewAttribute()">\
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                        </button>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" on-click="closeModal()">Close</button>\
                        <button type="button" class="btn btn-primary" on-click="addItem()">Add</button>\
                    </div>\
                </div>\
            </div>\
        </div> \
        \
        \<div class="modal fade" id="edit-item-modal" tabindex="-1" role="dialog" aria-labelledby="edit-item" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" on-click="refreshItems()" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                        <h4 class="modal-title modal-title-color">Edit item</h4>\
                    </div>\
                    \
                    <div class="modal-body">\
                        <div class="row modal-row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Item ID</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <input id="edit-item-id" type="text" class="form-control" value={{currentItem.id}} disabled>\
                            </div>\
                        </div>\
                        \
                        <div class="row modal-row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Item Name</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <input type="text" class="form-control" value={{currentItem.value.name}} {{#unless edit_enabled}}disabled{{/unless}}>\
                            </div>\
                        </div>\
                        \
                        <div class="row modal-row">\
                            <div class="col-sm-4">\
                                <label class="modal-label">Category</label>\
                            </div>\
                            <div class="col-sm-8">\
                                <select class="form-control" value={{currentItem.value.category_id}} {{#unless edit_enabled}}disabled{{/unless}}>\
                                    {{#each category}}\
                                        <option>{{id}}</option>\
                                    {{/each}}\
                                </select>\
                            </div>\
                        </div>\
                        \
                        <div id="attribute-container">\
                            {{#if currentItem.value.attributes}}\
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            \
                            {{#each currentItem.value.attributes:i}}\
                                <div id="attribute_row_{{i}}" class="row modal-row" intro-outro="slideh">\
                                    <div class="col-md-3 attribute-entry">\
                                        <input type="text" class="form-control" value="{{attributeName}}" placeholder="Attribute Name" disabled>\
                                    </div>\
                                    \
                                    <div class="col-md-3 attribute-entry">\
                                        <input type="text" class="form-control" value="{{value}}" placeholder="Attribute Value" {{#unless edit_enabled}}disabled{{/unless}}>\
                                    </div>\
                                    \
                                    <div class="col-md-2 attribute-entry">\
                                        <input type="text" class="form-control" value="{{unit}}" placeholder="Unit" disabled>\
                                    </div>\
                                    \
                                    <div class="col-md-2 attribute-entry">\
                                        <input type="text" class="form-control" value="{{type}}" placeholder="Type" disabled>\
                                    </div>\
                                    <div class="col-md-2">\
                                        <button class="btn btn-primary btn-sm" on-click="removeEditAttributeRow(i)" {{#unless edit_enabled}}disabled{{/unless}}>\
                                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\
                                        </button>\
                                    </div>\
                                </div>\
                            {{/each}}\
                            \
                        </div>\
                        \
                        \
                        <div class="checkbox row">\
                            <div class="col-sm-offset-9 col-sm-3">\
                                <input checked="{{edit_enabled}}" type="checkbox"><p class="checkbox-label">  Enable Editing<p>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal" on-click="refreshItems()">Close</button>\
                        <button type="button" class="btn btn-primary" on-click="editItem()">Edit</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    /* removed button from attributes
    <button id="add-new-attribute-button" class="btn btn-primary btn-sm" on-click="addNewEditAttribute()" {{#unless edit_enabled}}disabled{{/unless}}>\
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
    </button>\ */

    data: {
        edit_enabled: false     // for checkbox in edit modal, if true then it is possible to edit the item in the modal
    },

    oninit: function() {
        this.refreshCategories();
        this.refreshItems();
        window.currentRactive = this;
    },

    /* Category Methods */

    selectCategory: function(index) {
        // Remove all selections from the categories except the newly selected one
        $('li.list-group-item').each(function() {
            if ($(this).attr('id') != (index + '')) {
                $(this).removeClass('list-group-item-selected');
            }
        });

        // toggle the selected one (if it was already selected then it will be unselected)
        $('#' + index).toggleClass('list-group-item-selected');

        // set categorySelected boolean for the category ADD/EDIT buttons
        if ($('li').hasClass('list-group-item-selected'))
            window.currentRactive.set('categorySelected', true);
        else
            window.currentRactive.set('categorySelected', false);

        // prepare category edit modal
        var selectedCategoryName = this.get('category.' + index).id
        $('#edit-category-input').val(selectedCategoryName);
    },

    addCategory: function() {

        var newCategoryName = $('#add-category-input').val();

        var ret = categoryAdd(newCategoryName, function (ready, data){
            if(ready) {
                window.currentRactive.refreshCategories();
            }
        });

        // clear input for next category
        $('#add-category-input').val("");
        $('#add-category-modal').modal('hide');
    },

    editCategory: function() {

        var newCategoryName = $('#edit-category-input').val();

        categoryUpdate(window.app.selectedCategoryName, newCategoryName, function(ready, data) {
            if (ready) {
                window.currentRactive.refreshCategories();

                // items must be refreshed aswell cause items may change also when category changes
                window.currentRactive.refreshItems();
            }
        })

        $('#edit-category-modal').modal('hide');
    },

    deleteCategory: function(index) {
        var deletedCategoryName = this.get('category.' + index).id;

        var items = window.currentRactive.get('items');

        if (categoryStillReferenced(items, deletedCategoryName)) {
            alert('category still is referenced');
            return;
        }

        categoryDelete(deletedCategoryName, function(status) {
            if (status) {
                window.currentRactive.refreshCategories();
            }
            else {
                alert('Error while deleting');
            }
        });
    },

    // important method, gets called always after database operations to categories
    // so they get reloaded and set to the front-end
    refreshCategories: function() {
        getAllCategories(function(ready, data) {
            if (ready) {
                var categories = data.rows;
                window.app.set('category', categories);
            }
        });
    },

    /* Item Methods */

    selectItem: function(index) {
        // removes selections from every item except the selected one
        $('tr.table-entry').each(function() {
            if ($(this).attr('id') != ('item_' + index)) {
                $(this).removeClass('table-entry-selected');
            }
        });

        // toggles the selected item --> in case it was selected it will be unselected
        $('#item_' + index).toggleClass('table-entry-selected');

        //
        this.updateTableEditButton();
    },

    prepareItem: function() {
        window.currentRactive.set('newItem.id', '');
        window.currentRactive.set('newItem.name', '');
        window.currentRactive.set('newItem.category', '');
        window.currentRactive.set('newItem.attributes', null);
    },

    checkIfItemIdUsed: function() {
        var currentId = window.currentRactive.get('newItem.id');

        console.log("hello");

        getDataItemFromCouch(currentId, function(success) {
            if (success) {
                alert("Warning: id is taken");
            }
        });
    },

    addItem: function() {
        // get all values from ractive data
        var newItemId = window.currentRactive.get('newItem.id');
        var newItemName = window.currentRactive.get('newItem.name');
        var newCategoryName = window.currentRactive.get('newItem.category');

        var attributes = window.currentRactive.get('newItem.attributes');

        // check whether important fields are empty
        if (!window.currentRactive.validateItemFields(newItemId, newItemName, newCategoryName, attributes)) {
            alert('error with creating item');
            return;
        }


        var ret = createItem(newItemId, newItemName, newCategoryName, attributes, function (ready, data) {
            if(ready) {

                // check if no attributes were added to the item
                if (attributes != null) {
                    window.currentRactive.addItemAttributesToGeneralAttributeDB(attributes);
                }
                else {
                    window.currentRactive.refreshItems();
                }
            }
        });

        this.prepareItem();
        $('#add-item-modal').modal('hide');
    },

    closeModal: function() {
        this.prepareItem();
        $('#add-item-modal').modal('hide');
    },

    validateItemFields(itemId, itemName, itemCategory, attributes) {
        // need global var because of map function
        window.tempReturn = true;

        if (itemId == null || itemName == null
            || itemId == '' || itemName == '') {

            window.tempReturn = false;
        }
        else {
            if (attributes != null) {
                attributes.map(function(attr) {
                    if (attr.attributeName == null || attr.attributeName == '' ||
                        attr.value == null || attr.value == '' ||
                        attr.unit == null || attr.unit == '' ||
                        attr.type == null || attr.type == '') {

                        window.tempReturn = false;
                    }
                });
            }
        }

        return window.tempReturn;
    },

    // prepare new attribute
    addNewAttribute: function() {
        // workaround if no attribute exists yet then create array, else you can just push it
        if (window.currentRactive.get('newItem.attributes') == null) {
            window.currentRactive.set('newItem.attributes.0', new ItemAttribute("", "", "", ""));
        }
        else {
            window.currentRactive.push('newItem.attributes', new ItemAttribute("","","",""));
        }
    },

    removeAttributeRow: function(index) {
        window.currentRactive.splice('newItem.attributes', index, 1);
    },


    editItem: function() {

        var itemId = this.get('currentItem.id');
        var itemName = this.get('currentItem.value.name');
        var itemCategory = this.get('currentItem.value.category_id');

        var attributes = this.get('currentItem.value.attributes');

        // check whether important fields are empty
        if (!window.currentRactive.validateItemFields(itemId, itemName, itemCategory, attributes)) {
            alert('error with creating item');
            return;
        }

        updateItem(itemId, itemName, itemCategory, attributes, function(ready, data) {
            if (ready) {

                // check if no attributes were added to the item
                if (attributes != null) {
                    window.currentRactive.addItemAttributesToGeneralAttributeDB(attributes);
                }
                else {
                    window.currentRactive.refreshItems();
                }
            }
        })

        $('#edit-item-modal').modal('hide');
    },

    // check every attribute if it already exists in the attributes database
    addItemAttributesToGeneralAttributeDB: function(attributes) {

        attributes.map(function (item) {
            if (loadAttributeByName(item.attributeName, function (success, result) {

                    // if it does not exist in attributes database yet then add it
                    if (success == false) {
                        saveAttribute(function (success) {
                            window.currentRactive.refreshItems();
                        }, item.attributeName, item.unit, item.type);
                    }
                    else {
                        window.currentRactive.refreshItems();
                    }
                }));
        });
    },

    // prepare new edit attribute
    addNewEditAttribute: function() {
        // workaround if no attribute exists yet then create array, else you can just push it
        if (window.currentRactive.get('currentItem.value.attributes') == null) {
            window.currentRactive.set('currentItem.value.attributes.0', new ItemAttribute("","","",""));
        }
        else {
            window.currentRactive.push('currentItem.value.attributes', new ItemAttribute("","","",""));
        }
    },

    removeEditAttributeRow: function(index) {
        window.currentRactive.splice('currentItem.value.attributes', index, 1);
    },

    deleteItemFromTable: function() {
        var itemToDeleteIndex = $('.table-entry-selected').attr('id');

        this.unselectAllEntries();

        itemToDeleteIndex = itemToDeleteIndex.substr(5);
        var deletedItemName = this.get('items.' + itemToDeleteIndex).id;

        deleteItem(deletedItemName, function(status) {
            if (status) {
                window.currentRactive.refreshItems();
            }
            else {
                alert('Error while deleting');
            }
        });

        this.updateTableEditButton();
    },

    // important method for items, gets called after every item database operations to reload the items from database
    refreshItems: function() {
        getAllItemsFromCouch(function(ready, data) {
           if (ready) {
               var items = data.rows;
               window.app.set('items', items);
           }
        });
    },

    /* Misc */

    unselectAllEntries: function() {
        $('tr.table-entry').each(function() {
            $(this).removeClass('table-entry-selected');
        });

        this.set('currentItem', '');
    },

    // preparation for editing a category
    saveCurrentCategory: function() {
        var currentContainerIndex = $('li.list-group-item-selected').attr('id');

        if (currentContainerIndex != null) {
            var selectedCategoryName = this.get('category.' + currentContainerIndex).id;
            window.app.selectedCategoryName = selectedCategoryName;
        } else {
            window.app.selectedCategoryName = '';
            $('#edit-category-input').val('');
        }
    },

    // preparation for editing an item
    saveCurrentItemEntry: function() {
        var itemToEditIndex = $('.table-entry-selected').attr('id');

        if (itemToEditIndex != null) {
            itemToEditIndex = itemToEditIndex.substr(5);
            var currentItem = this.get('items.' + itemToEditIndex);
            this.set('currentItem', currentItem);
        }
        else {
            this.set('currentItem', '');
        }

        this.set('edit_enabled', false);
    },

    updateTableEditButton: function() {
        if ($('tr').hasClass('table-entry-selected'))
            window.currentRactive.set('itemSelected', true);
        else
            window.currentRactive.set('itemSelected', false);
    }

});