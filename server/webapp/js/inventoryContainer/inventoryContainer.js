/**
 * Created by christian on 6/8/15.
 */

var inventoryContainer = Ractive.extend({
    template: '\
        <div class="container">\
            <div class="row">\
                <div class="col-sm-3">\
                    <div class="panel panel-default criteria-panel">\
                        <div class="panel-heading">\
                            <div class="row">\
                                <div class="col-xs-9">\
                                    {{panel.title.criteria}}\
                                </div>\
                                <div class="col-xs-3">\
                                    <button class="btn btn-primary btn-sm criteria-add-button" data-toggle="modal" data-target="#add-criteria-modal">\
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                                    </button>\
                                    \
                                    <div class="modal fade" id="add-criteria-modal" tabindex="-1" role="dialog" aria-labelledby="add-criteria" aria-hidden="true">\
                                        <div class="modal-dialog">\
                                            <div class="modal-content">\
                                                <div class="modal-header">\
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                                                    <h4 class="modal-title modal-title-color" id="add-criteria">Add a new criteria</h4>\
                                                </div>\
                                                \
                                                <div class="modal-body">\
                                                    <input id="add-criteria-input" type="text" class="form-control" placeholder="Criteria Name">\
                                                </div>\
                                                <div class="modal-footer">\
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                                                    <button type="button" class="btn btn-primary" on-click="addCriteria()">Add</button>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div> \
                                </div>\
                            </div>\
                        </div>\
                        \
                        <div class="panel-body">\
                            {{#each criteria:i}}\
                            <div class="input-group criteria-input">\
                                <span class="input-group-btn">\
                                    <button class="btn btn-primary same-height disable-shadow" on-click="deleteCriteria(this, i)" type="button">\
                                        <span class="glyphicon glyphicon-minus glyphicons-small" aria-hidden="true"></span>\
                                    </button>\
                                </span>\
                                \
                                <input type="text" class="form-control same-height" placeholder="Input {{.}}">\
                                \
                                <span class="input-group-btn">\
                                    <button class="btn btn-primary same-height disable-shadow" on-click="searchCriteria()" type="button">\
                                        <span class="glyphicon glyphicon-search glyphicons-small" aria-hidden="true"></span>\
                                    </button>\
                                </span>\
                            \
                            </div>\
                            {{/each}}\
                        </div>\
                    </div>\
                    \
                    <div class="panel panel-default attribute-panel">\
                        <div class="panel-heading">\
                            {{panel.title.attribute}}\
                        </div>\
                        \
                        <div class="panel-body">\
                        \
                        </div>\
                    </div>\
                </div>\
                \
                <div class="col-sm-9">\
                    <div class="panel panel-default">\
                        <table id="inventory-table" class="table table-bordered">\
                            <thead>\
                                <tr>\
                                    <th>hello</th>\
                                    <th>hello2</th>\
                                </tr>\
                            </thead>\
                            \
                            <tbody>\
                                <tr>\
                                    <td>value</td>\
                                    <td>value2</td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ',

    data: {

    },

    oninit: function() {

    },

    addCriteria: function() {
        var criteriaName = $('#add-criteria-input').val();

        if (this.get('criteria') == null) {
            this.set('criteria[0]', criteriaName);
        }
        else {
            this.push('criteria', criteriaName);
        }

        $('#add-criteria-input').val("");

        $('#add-criteria-modal').modal('hide');
    },

    deleteCriteria: function(element, index) {
        this.splice('criteria', index, 1);
    },

    searchCriteria: function() {
        console.log('called search criteria');
    }
});