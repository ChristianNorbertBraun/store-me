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
                                                    <button type="button" class="close" data-dismiss="modal" on-click="resetCriteriaName()" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                                                    <h4 class="modal-title modal-title-color" id="add-criteria">Add a new criteria</h4>\
                                                </div>\
                                                \
                                                <div class="modal-body">\
                                                    <input id="add-criteria-input" type="text" class="form-control" value={{newCriteriaName}} placeholder="Criteria Name">\
                                                </div>\
                                                <div class="modal-footer">\
                                                    <button type="button" class="btn btn-default" on-click="resetCriteriaName()" data-dismiss="modal">Close</button>\
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
                                    <th>ID</th>\
                                    <th>Name</th>\
                                </tr>\
                            </thead>\
                            \
                            <tbody>\
                                {{#each items:i}}\
                                    <tr id="item_{{i}}">\
                                        <td>{{id}}</td>\
                                        <td>{{value.name}}</td>\
                                    </tr>\
                                {{/each}}\
                            </tbody>\
                        </table>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ',

    data: {
        newCriteriaName: '', // saves value of the new criteria modal input
        items: null          // all items for item table
    },

    oninit: function() {
        window.currentRactive = this;           // often can't access this so we save it using a global var
        window.currentRactive.refreshItems();
    },

    oncomplete: function() {

        /* TODO Does not work

        $('#inventory-table').tablesorter({
            textExtraction:function(s){
                if($(s).find('img').length == 0) return $(s).text();
                return $(s).find('img').attr('alt');
            }
        });*/
    },

    addCriteria: function() {
        var criteriaName = window.currentRactive.get('newCriteriaName');

        /* Create an array if it does not exist yet */
        if (window.currentRactive.get('criteria') == null) {
            window.currentRactive.set('criteria[0]', criteriaName);
        }
        else {
            window.currentRactive.push('criteria', criteriaName);
        }

        window.currentRactive.resetCriteriaName();

        $('#add-criteria-modal').modal('hide');
    },

    deleteCriteria: function(element, index) {
        window.currentRactive.splice('criteria', index, 1);
    },

    searchCriteria: function() {
        console.log('called search criteria');
    },

    resetCriteriaName: function() {
        window.currentRactive.set('newCriteriaName', '');
    },

    refreshItems: function() {
        getAllItemsFromCouch(function(ready, data) {
            if (ready) {
                var items = data.rows;
                window.currentRactive.set('items', items);
            }
        });
    }
});