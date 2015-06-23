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
                                                <span class="glyphicon glyphicon-remove" on-click="deleteCategory(i)" aria-hidden="true"></span>\
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
                        <h4 class="modal-title modal-title-color" id="add-criteria">Add a new category</h4>\
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
                                <input id="add-item-id" type="text" class="form-control" value={{newItem.id}} placeholder="Input Item ID">\
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
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
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
                            {{#if currentItem.attributes}}\
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            \
                            {{#each currentItem.value.attributes:i}}\
                                <div id="attribute_row_{{i}}" class="row modal-row" intro-outro="slideh">\
                                    <div class="col-md-3 attribute-entry">\
                                        <input type="text" class="form-control" value="{{attributeName}}" placeholder="Attribute Name" {{#unless edit_enabled}}disabled{{/unless}}>\
                                    </div>\
                                    \
                                    <div class="col-md-3 attribute-entry">\
                                        <input type="text" class="form-control" value="{{value}}" placeholder="Attribute Value" {{#unless edit_enabled}}disabled{{/unless}}>\
                                    </div>\
                                    \
                                    <div class="col-md-2 attribute-entry">\
                                        <input type="text" class="form-control" value="{{unit}}" placeholder="Unit" {{#unless edit_enabled}}disabled{{/unless}}>\
                                    </div>\
                                    \
                                    <div class="col-md-2 attribute-entry">\
                                        <input type="text" class="form-control" value="{{type}}" placeholder="Type" {{#unless edit_enabled}}disabled{{/unless}}>\
                                    </div>\
                                    <div class="col-md-2">\
                                        <button class="btn btn-primary btn-sm" on-click="">\
                                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\
                                        </button>\
                                    </div>\
                                </div>\
                            {{/each}}\
                            \
                        </div>\
                        \
                        <button id="add-new-attribute-button" class="btn btn-primary btn-sm" on-click="">\
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                        </button>\
                        \
                        <div class="checkbox pull-right">\
                            <input checked="{{edit_enabled}}" type="checkbox"><p class="checkbox-label">  Enable Editing<p>\
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

    data: {},

    oninit: function() {
        this.refreshCategories();
        this.refreshItems();
        window.currentRactive = this;
        window.currentRactive.set('edit_enabled', false);
    },

    /* Category Methods */

    selectCategory: function(index) {
        $('li.list-group-item').each(function() {
            if ($(this).attr('id') != (index + '')) {
                $(this).removeClass('list-group-item-selected');
            }
        });

        $('#' + index).toggleClass('list-group-item-selected');

        if ($('li').hasClass('list-group-item-selected'))
            window.currentRactive.set('categorySelected', true);
        else
            window.currentRactive.set('categorySelected', false);

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

        $('#add-category-input').val("");
        $('#add-category-modal').modal('hide');
    },

    editCategory: function() {

        var newCategoryName = $('#edit-category-input').val();

        categoryEdit(window.app.selectedCategoryName, newCategoryName, function(ready, data) {
            if (ready) {
                window.currentRactive.refreshCategories();
                window.currentRactive.refreshItems();
            }
        })

        $('#edit-category-modal').modal('hide');

    },

    deleteCategory: function(index) {
        var deletedCategoryName = this.get('category.' + index).id;

        categoryDelete(deletedCategoryName, function(status) {
            if (status) {
                window.currentRactive.refreshCategories();
            }
            else {
                alert('Error while deleting');
            }
        });
    },

    refreshCategories: function() {
        getAllCategorys(function(ready, data) {
            if (ready) {
                var categories = data.rows;
                window.app.set('category', categories);
            }
        });
    },

    /* Item Methods */

    selectItem: function(index) {
        $('tr.table-entry').each(function() {
            if ($(this).attr('id') != ('item_' + index)) {
                $(this).removeClass('table-entry-selected');
            }
        });

        $('#item_' + index).toggleClass('table-entry-selected');

        this.updateTableEditButton();
    },

    prepareItem: function() {
        window.currentRactive.set('newItem', '');
    },

    addItem: function() {
        var newItemId = window.currentRactive.get('newItem.id');
        var newItemName = window.currentRactive.get('newItem.name');
        var newCategoryName = window.currentRactive.get('newItem.category');

        var attributes = window.currentRactive.get('newItem.attributes');

        if (newItemId == null || newItemName == null || newCategoryName == null) {
            alert('error with creating item');
            this.prepareItem();
            return;
        }

        var ret = createItem(newItemId, newItemName, newCategoryName, attributes, function (ready, data) {
            if(ready) {
                attributes.map(function(item) {
                    saveAttribute(function(success) {
                        window.currentRactive.refreshItems();
                    }, item.attributeName, item.unit, item.type);
                });
            }
        });

        this.prepareItem();
        $('#add-item-modal').modal('hide');
    },

    addNewAttribute: function() {
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

        updateItem(itemId, itemName, itemCategory, [], function(ready, data) {
            if (ready) {
                window.currentRactive.refreshItems();
            }
        })

        $('#edit-category-modal').modal('hide');
    },

    deleteItemFromTable: function() {
        var itemToDeleteIndex = $('.table-entry-selected').attr('id');

        if (itemToDeleteIndex == null) {
            return;
        }

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

    refreshItems: function() {
        getAllItems(function(ready, data) {
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