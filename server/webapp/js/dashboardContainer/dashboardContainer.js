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
                        <button type="button" class="btn btn-primary dashboard-button" on-click="loadManager()">{{button.stock}}</button>\
                        <button type="button" class="btn btn-primary dashboard-button">{{button.overview}}</button>\
                    </div>\
                    \
                    <div class="col-sm-9">\
                        <div class="panel panel-default">\
                            <table id="item-table" class="table table-bordered">\
                                <thead>\
                                    <tr>\
                                        {{#each table.header:i}}\
                                            <th id="column_{{i}}" on-click="sortTable(this, i)">\
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
        storeAdmin: 'Marvin',
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
                var containerCount = countContainers(container);
                window.currentRactive.set('amountContainers', containerCount);

                var itemCount = countItems(container);
                window.currentRactive.set('amountItems', itemCount);

                var sessionID = getSessionIDFromURL();
                var userName = getUserNameBySessionID(sessionID);
                window.currentRactive.set('storeAdmin', userName);
            }
        });

        /* for creation of dummy data
        saveLogContainer(new LogContainer(true, "date", "container", "item", 4, "marvin"), function(success) {
            if (success)
                console.log("Success");
        });*/
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

    loadManager: function() {
        location.href = urlBuilder(strings.link.toManager, getSessionIDFromURL());
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