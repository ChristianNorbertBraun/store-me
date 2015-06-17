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
                                    <li id={{i}} class="list-group-item list-group-border" on-click="selectContainer(i)">\
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
                    <button class="btn btn-primary coredata-button" data-toggle="modal" data-target="#add-category-modal">Add</button>\
                    <button type="button" class="btn btn-primary coredata-button" data-toggle="modal" data-target="#edit-category-modal" on-click="saveCurrentCategory()">Edit</button>\
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
                            \
                            </tbody>\
                        </table>\
                    \
                    </div>\
                </div>\
                \
            </div>\
        </div>\
        \
        <div class="modal fade" id="add-category-modal" tabindex="-1" role="dialog" aria-labelledby="add-criteria" aria-hidden="true">\
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
        <div class="modal fade" id="edit-category-modal" tabindex="-1" role="dialog" aria-labelledby="add-criteria" aria-hidden="true">\
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
    ',

    data: {},

    oninit: function() {
        this.refreshCategories();
        window.currentRactive = this;
    },

    selectContainer: function(index) {
        $('li.list-group-item').each(function() {
            if ($(this).attr('id') != (index + '')) {
                $(this).removeClass('list-group-item-selected');
            }
        });

        $('#' + index).toggleClass('list-group-item-selected');

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

    saveCurrentCategory: function() {
        var currentContainerIndex = $('li.list-group-item-selected').attr('id');

        if (currentContainerIndex != null) {
            console.log('hello');
            var selectedCategoryName = this.get('category.' + currentContainerIndex).id;
            window.app.selectedCategoryName = selectedCategoryName;
        } else {
            window.app.selectedCategoryName = '';
            $('#edit-category-input').val('');
        }
    }

});