/**
 * Created by Christian on 16.05.2015.
 */

var dashboardContainer = Ractive.extend({

    template: '\
        <div class="dashboard-container">\
            <div class="container">\
                <div class="row">\
                    <div class="col-sm-3">\
                        <div class="panel panel-default">\
                            <div class="panel-heading">{{panel.title.info}}</div>\
                            <div class="panel-body">\
                                <div class="row">\
                                    <p class="col-md-6">{{panel.content.info.admin}}</p>\
                                    <p class="col-md-6">{{storeAdmin}}</p>\
                                </div>\
                                \
                                <div class="row">\
                                    <p class="col-md-6">{{panel.content.info.container}}</p>\
                                    <p class="col-md-6">{{amountContainers}}</p>\
                                </div>\
                                \
                                <div class="row">\
                                    <p class="col-md-6">{{panel.content.info.items}}</p>\
                                    <p class="col-md-6">{{amountItems}}</p>\
                                </div>\
                            </div>\
                        </div>\
                        \
                        <button type="button" class="btn btn-primary dashboard-button" on-click="loadManager()">{{button.manager}}</button>\
                        <button type="button" class="btn btn-primary dashboard-button" on-click="loadInventory()">{{button.inventory}}</button>\
                        <button type="button" class="btn btn-primary dashboard-button" on-click="loadCoredata()">{{button.coredata}}</button>\
                    </div>\
                    \
                    <div class="col-sm-9">\
                        <div id="item-panel-table" class="panel panel-default">\
                            <table id="item-table" class="table table-bordered">\
                                <thead>\
                                    <tr>\
                                        {{#each table.header:i}}\
                                            <th id="column_{{i}}" on-click="">\
                                                {{column}}\
                                                <span class="dropdown hidden">\
                                                    <span class="caret"></span>\
                                                </span>\
                                                <span class="dropup hidden">\
                                                    <span class="caret">\
                                                    </span>\
                                                </span>\
                                            </th>\
                                        {{/each}}\
                                    </tr>\
                                </thead>\
                                \
                                <tbody>\
                                    {{#each logdata}}\
                                        <tr>\
                                            <td class="icon-field">\
                                            {{#if value.stored}}\
                                                <img class="table-icon" src="resources/icons/stored-icon.jpg" alt="stored">\
                                            {{else}}\
                                                <img class="table-icon" src="resources/icons/removed-icon.jpg" alt="removed">\
                                            {{/if}}\
                                            </td>\
                                            <td>{{value.date}}</td>\
                                            <td>{{value.containerID}}</td>\
                                            <td>{{value.itemName}}</td>\
                                            <td>{{value.amount}}</td>\
                                            <td>{{value.employee}}</td>\
                                        </tr>\
                                    {{/each}}\
                                </tbody>\
                            </table>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ',

    sortModeDown: true,

    data: {
        storeAdmin: 'DEFAULT',
        amountContainers: 0,
        amountItems: 0,
        logdata: null
    },

    oninit: function() {
        window.currentRactive = this;

        loadStore(function(status, container)
        {
            if (status)
            {
                var sessionID = getSessionIDFromURL();
                var userName = getUserNameBySessionID(sessionID);
                window.currentRactive.set('storeAdmin', userName);
                if(typeof container !== 'undefined') {
                    var containerCount = countContainers(container);
                    window.currentRactive.set('amountContainers', containerCount);

                    var itemCount = countItems(container);
                    window.currentRactive.set('amountItems', itemCount);
                }
            }
        });
    },

    oncomplete: function() {
        window.currentRactive.refreshLogData();
    },

    /* tablesorter not functional anymore
    sortTable: function(element, index) {
        this.determineMode(index);
        this.clearCarets();
        this.setCorrectCaret(index);
    },*/

    determineMode: function(index) {
        if ($('#column_' + index + ' span.dropdown').hasClass('hidden')) {
            // check sorted up
            if (!($('#column_' + index + ' span.dropup').hasClass('hidden'))) {
                // up is active --> change to down
                this.sortModeDown = true;
            }
        }
        else {
            this.sortModeDown = false;
        }
    },

    clearCarets: function() {
        $('span.dropdown').each(function() {
            $(this).addClass('hidden');
        });

        $('span.dropup').each(function() {
            $(this).addClass('hidden');
        });
    },

    setCorrectCaret: function(index) {
        if (this.sortModeDown) {
            $('#column_' + index + ' span.dropdown').removeClass('hidden');
        }
        else {
            $('#column_' + index + ' span.dropup').removeClass('hidden');
        }
    },

    /* links */

    loadManager: function() {
        location.href = urlBuilder(strings.link.toManager, getSessionIDFromURL());
    },

    loadInventory: function() {
        location.href = urlBuilder(strings.link.toInventory, getSessionIDFromURL());
    },

    loadCoredata: function() {
        location.href = urlBuilder(strings.link.toCoredata, getSessionIDFromURL());
    },

    refreshLogData: function() {
        loadAllLogContainer(function(status, logs) {
            if (status && logs) {
                window.currentRactive.set('logdata', logs);
                // bug: this.updateTableSorter();
            }
            else {
                alert('error');
            }
        });
    },

    updateTableSorter: function() {
        $('#item-table').tablesorter({
            textExtraction:function(s){
                if($(s).find('img').length == 0) return $(s).text();
                return $(s).find('img').attr('alt');
            }
        });
    }
});