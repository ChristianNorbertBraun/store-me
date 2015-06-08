/**
 * Created by Christian on 16.05.2015.
 */

var dashboardContainer = Ractive.extend({

    template: '\
        <div class="dashboard-container">\
            <div class="container">\
                <div class="row">\
                    <div class="col-sm-3">\
                        <div class="panel panel-default info-panel">\
                            <div class="panel-heading">{{panel.title.info}}</div>\
                            <div class="panel-body">\
                                <div class="row">\
                                    <p class="col-md-6">{{panel.content.info.admin}}</p>\
                                    <p class="col-md-6">Christian</p>\
                                </div>\
                                \
                                <div class="row">\
                                    <p class="col-md-6">{{panel.content.info.container}}</p>\
                                    <p class="col-md-6">20 piece</p>\
                                </div>\
                                \
                                <div class="row">\
                                    <p class="col-md-6">{{panel.content.info.items}}</p>\
                                    <p class="col-md-6">320 piece</p>\
                                </div>\
                                \
                                <div class="row">\
                                    <p class="col-md-6">{{panel.content.info.volume}}</p>\
                                    <p class="col-md-6">230 m<sup>3</sup></p>\
                                </div>\
                            </div>\
                        </div>\
                        \
                        <button type="button" class="btn btn-primary dashboard-button">{{button.stock}}</button>\
                        <button type="button" class="btn btn-primary dashboard-button">{{button.overview}}</button>\
                    </div>\
                    \
                    <div class="col-sm-9">\
                        <div class="panel panel-default">\
                            <table id="item-table" class="table table-bordered">\
                                <thead class="item-table-header">\
                                    <tr>\
                                        {{#each table.header:i}}\
                                            <th id="{{i}}" on-click="sortTable()">{{column}}\
                                            <span class="dropdown">\
                                                <span class="caret"></span>\
                                            </span>\
                                            <span class="dropup">\
                                                <span class="caret">\
                                                </span>\
                                            </span></th>\
                                        {{/each}}\
                                    </tr>\
                                </thead>\
                                \
                                <tbody>\
                                    {{#each table.data}}\
                                        <tr>\
                                            <td class="icon-field">\
                                            {{#if stored}}\
                                                <img class="table-icon" src="resources/icons/stored-icon.jpg">\
                                            {{else}}\
                                                <img class="table-icon" src="resources/icons/removed-icon.jpg">\
                                            {{/if}}\
                                            </td>\
                                            <td>{{date}}</td>\
                                            <td>{{container}}</td>\
                                            <td>{{item}}</td>\
                                            <td>{{amount}}</td>\
                                            <td>{{employee}}</td>\
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

    data: {
        columnsorted: [false,true,false,false,false,false]
    },

    oninit: function() {

    },

    oncomplete: function() {
        $('#item-table').tablesorter();

        $('.caret').each(function() {
            $(this).toggle();
        });
    },

    sortTable: function() {
        //sort();
        console.log($('#1').hasClass('headerSortDown'));

        if ($('#1').hasClass('headerSortDown')) {
            $('#1 > .dropup > .caret').hide();
            $('#1 > .dropdown > .caret').show();
        }
        if ($('#1').hasClass('headerSortUp')) {
            $('#1 > .dropup > .caret').show();
            $('#1 > .dropdown > .caret').hide();
        }
    }

});

// TODO:
// jQuery function and onclick on li elements, then read out with this and try to change classes

