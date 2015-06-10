/**
 * Created by captainluma on 02.06.15.
 */

var managerContainer = Ractive.extend(
    {
        template : '\
        <div class="manager-container">\
            <div class="container">\
                <div class="row">\
                    <div class="container"><p id="path">/</p></div>\
                </div>\
                \
                \
                <div class="row">\
                    <div class="col-sm-4">\
                        <div class="panel panel-primary info-panel">\
                            <div class="panel-heading">{{panels[0].title}}</div>\
                            <div class="panel-body no-padding">\
                                <ul class="list-group" id="container-list">\
                                    {{#each data.container:i}}\
                                        <li id = {{i}} class="list-group-item list-group-border container-entry" on-click="selectContainer(this,i)">\
                                           <div class="row">\
                                                <div class="col-xs-10">\
                                                    <h4 class="list-group-item-heading">{{name}}</h4>\
                                                    {{#each attributes}}\
                                                        <div class="list-group-item-text attributes">\
                                                            <span class=" badge">{{name}} {{value}} {{unit}}</span>\
                                                        </div>\
                                                    {{/each}}\
                                                </div>\
                                                <div class="col-xs-2" on-click="navigateDown(this,i)">\
                                                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\
                                                </div>\
                                            </div>\
                                        </li>\
                                    {{/each}}\
                                </ul>\
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
                        <div id="item-info" >\
                            <h4>{{info.title}}</h4>\
                        </div>\
                   </div>\
                </div>\
            </div>\
        </div>\
        ',

        oninit: function(){
            this._super();
        },

        selectContainer: function(event, index){
            $('#'+index).toggleClass('selected');
        },

        navigateDown: function(event, index){
            var clickedContainer = window.app.get('data.container.'+index);
            var subContainer = clickedContainer.subcontainer ;
            $('#'+index).toggleClass('selected');
            window.app.set('data.container', subContainer);

            var pathContent = $('#path').text();
            $('#path').text(pathContent + clickedContainer.name+'/') ;
        },

        navigateUp: function(event, index){

        }

    })
;
