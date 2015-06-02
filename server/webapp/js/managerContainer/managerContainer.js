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
                        <div class="panel panel-primary info-panel">\
                            <div class="panel-heading">Hi Chris</div>\
                            <div class="panel-body">Bye Chris</div>\
                        </div>\
                    </div>\
                    <div class="col-sm-4">\
                        <div class="panel panel-primary info-panel">\
                            <div class="panel-heading">Hi Chris</div>\
                            <div class="panel-body">Bye Chris</div>\
                        </div>\
                   </div>\
                </div>\
            </div>\
        </div>\
        '
    }
);