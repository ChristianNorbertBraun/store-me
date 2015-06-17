/**
 * Created by christian on 6/17/15.
 */

var coredataContainer = Ractive.extend({

    template: '\
        <div class="container">\
            <div class="row">\
            \
                <div class="col-sm-3">\
                    <div class="panel panel-default">\
                        <div class="panel-heading">\
                            {{panel.title.category}}\
                        </div>\
                        \
                        <div class="panel-body">\
                        \
                        </div>\
                    </div>\
                    \
                    <button class="btn btn-primary coredata-button" data-toggle="modal" data-target="#add-category-modal" on-click="">Add</button>\
                    <button type="button" class="btn btn-primary coredata-button" on-click="">Delete</button>\
                    <button type="button" class="btn btn-primary coredata-button" on-click="">Edit</button>\
                \
                </div>\
                \
                \
                <div class="col-sm-9">\
                    <div class="panel panel-default">\
                    \
                        <table id="item-table" class="table table-bordered">\
                            <thead>\
                            \
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
                        <input id="add-category-input" type="text" class="form-control" placeholder="Criteria Name">\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                        <button type="button" class="btn btn-primary" on-click="addCategory()">Add</button>\
                    </div>\
                </div>\
            </div>\
        </div> \
    ',

    data: {},

    oninit: function() {

    },

    addCategory: function() {

        var newCategoryName = $('#add-category-input').val();

        $('#add-category-modal').modal('hide');
    }

});