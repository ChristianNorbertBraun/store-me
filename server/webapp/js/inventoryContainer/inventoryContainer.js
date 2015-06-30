/**
 * Created by christian on 6/8/15.
 */

var inventoryContainer = Ractive.extend({
    template: '\
        <div class="container">\
            <div class="row">\
                <div class="col-sm-3">\
                \
                    <div id="filter" class="input-group">\
                        <input on-change="filterItems()" value={{filter}} type="text" class="form-control" placeholder="Filter...">\
                        <span class="input-group-addon glyphicon glyphicon-search"></span>\
                    </div>\
                    \
                    <div class="panel panel-default attribute-panel">\
                        <div class="panel-heading">\
                            {{panel.title.attribute}}\
                        </div>\
                        \
                        <div class="panel-body">\
                            \
                            {{#each attributes}}\
                                <p>{{attributeName}}</p>\
                            {{/each}}\
                        </div>\
                    </div>\
                </div>\
                \
                <div class="col-sm-9">\
                    <div id="inventory-panel-table" class="panel panel-default">\
                        <table id="inventory-table" class="table table-bordered">\
                            <thead>\
                                <tr>\
                                    <th>ID</th>\
                                    <th>Name</th>\
                                    <th>Category</th>\
                                    <th>Parent Container</th>\
                                    <th>Amount</th>\
                                </tr>\
                            </thead>\
                            \
                            <tbody>\
                                {{#each items:i}}\
                                    <tr id="item_{{i}}">\
                                        <td>{{itemID}}</td>\
                                        <td>{{name}}</td>\
                                        <td>{{category_id}}</td>\
                                        <td>{{parentContainerName}}</td>\
                                        <td>{{amount}}</td>\
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
        items: null,         // all items for item table
        filteredItems: null,
        backupItems: null,
        attributes: null     // all attributes for attributes panel
    },

    oninit: function() {
        window.currentRactive = this;           // often can't access ractive so we save it using a global var
        window.currentRactive.refreshItems();
        window.currentRactive.refreshAttributes();
    },

    oncomplete: function() {

    },

    /* items */

    refreshItems: function() {
        loadStore(function(success, container) {
            if (success) {
                var items = getAllItems(container);

                window.tempContainer = container;

                items.map(function(item) {
                    getDataItemFromCouch(item.itemID, function(status, data) {
                        item.name = data.name;
                        item.category_id = data.category_id;
                        item.parentContainerName = getContainerById(window.tempContainer, item.parentContainerID).containerName;

                        window.currentRactive.set('items', items);
                        window.currentRactive.set('backupItems', items);
                    });
                });
            }
        });
    },

    /* attributes */

    refreshAttributes: function() {
        loadStore(function(success, container) {
            if (success) {
                var itemIds = getAllItemIDs(container, []);

                // iterates over all items and adds attributes in case they are not added yet
                itemIds.map(function(id) {
                    getDataItemFromCouch(id, function(success, data) {
                        var attributes = window.currentRactive.get('attributes');

                        if (attributes == null) {
                            attributes = [];
                        }

                        if (data.attributes != null) {
                            addAttributes(attributes, data);
                        }

                        window.currentRactive.set('attributes', attributes);
                    });
                })
            }
        });
    },

    /* filter */
    filterItems: function() {

        /* restore backup in case there was already a filter */
        var backupItemsArray = window.currentRactive.get('backupItems');
        window.currentRactive.set('items', backupItemsArray);

        /* copy current items to new filter array */
        var allItemsArray = window.currentRactive.get('items');
        var filterArray = allItemsArray.slice();
        var filterText = window.currentRactive.get('filter');

        /* filter */
        for (var i = 0; i < filterArray.length; i++) {

            if (window.currentRactive.isFiltered(filterArray[i], filterText)) {
                filterArray.splice(i, 1);
                i--;
            }
        }

        /* set filter array to current items */
        window.currentRactive.set('items', filterArray);
    },

    /* filter condition */
    isFiltered: function(item, filter) {
        if (
            (item.name.indexOf(filter) == -1) &&
            (item.itemID.indexOf(filter) == -1) &&
            (item.category_id.indexOf(filter) == -1) &&
            (item.parentContainerName.indexOf(filter) == -1)
        ) {
            return true;
        }
        else {
            return false;
        }
    }
});
