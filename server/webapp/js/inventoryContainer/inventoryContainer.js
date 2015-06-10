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
                                    <button class="btn btn-primary btn-sm criteria-add-button" on-click="addCriteria()">\
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                                    </button>\
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
                            <thead class="item-table-header">\
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
        if (this.get('criteria') == null) {
            this.set('criteria[0]', 'value');
        }
        else {
            this.push('criteria', 'value');
        }
    },

    deleteCriteria: function(element, index) {
        this.splice('criteria', index, 1);
    },

    searchCriteria: function() {
        console.log('called search criteria');
    }
});