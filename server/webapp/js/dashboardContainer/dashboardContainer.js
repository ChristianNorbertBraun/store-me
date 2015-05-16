/**
 * Created by Christian on 16.05.2015.
 */

var dashboardContainer = Ractive.extend({

    template: '\
        <div class="dashboard-container">\
            <div class="container">\
                <div class="row">\
                    <div class="col-sm-3">\
                        <div class="panel panel-primary info-panel">\
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
                        <table class="table table-bordered">\
                            <thead class="item-table-header">\
                                <tr>\
                                    {{#each table.header}}\
                                        <th>{{column}}</th>\
                                    {{/each}}\
                                </tr>\
                            </thead>\
                            \
                            <tbody>\
                                {{#each table.data}}\
                                    <tr>\
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
        ',

    data: {},

    oninit: function() {

    }

});
