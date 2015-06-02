/**
 * Created by captainluma on 02.06.15.
 */

var managerContainer = Ractive.extend(
    {
        template : '\
        <div class="manager-container">\
            <div class="container">\
                <div class="row">\
                    <div class="container"><p>current/container/path</p></div>\
                </div>\
                \
                \
                <div class="row">\
                    <div class="col-sm-4">\
                        <div id="container-list" class="panel panel-primary info-panel">\
                            <div class="panel-heading">{{panels[0].title}}</div>\
                            <div class="panel-body">\
                            {{#each container}}\
                                <div class="container-entry">\
                                    <div class="header">\
                                        <h3>BLA</h3>\
                                    </div>\
                                </div>\
                            {{/each}}\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-sm-4">\
                        <div id="item-list" class="panel panel-primary info-panel">\
                            <div class="panel-heading">{{panels[1].title}}</div>\
                            <div class="panel-body">Bye Chris</div>\
                        </div>\
                   </div>\
                   \
                   <div class="col-sm-4">\
                        <div id="item-info" class="container">\
                        </div>\
                   </div>\
                </div>\
            </div>\
        </div>\
        '
    }
);