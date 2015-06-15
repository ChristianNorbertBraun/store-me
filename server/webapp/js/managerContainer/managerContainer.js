/**
 * Created by captainluma on 02.06.15.
 */

//ToDo remove all hardcoded strings
//ToDO check if it is possible to load data even earlier then when the manager screen loads
var clickedContainerHistory = [];
var currentTableState;

var managerContainer = Ractive.extend(
    {
        template : '\
        <div class="manager-container">\
            <div class="container">\
                <div class="row">\
                    <div class="container">\
                        <p>\
                          {{#if pathElements.length == 0}}\
                            <div class="path-entry" >/</div>\
                          {{elseif pathElements.length > 4}}\
                            <div class="path-entry" >.../</div>\
                            {{#each pathElements:i}}\
                            {{#if i >= pathElements.length - 4}}\
                                <div id="path{{i}}" class="path-entry" value="{{i}}" on-click="navigateUp(this,i)" >{{containerName}}/</div>\
                            {{/if}}\
                            {{/each}}\
                          \
                          {{else}}\
                          {{#each pathElements:i}}\
                            <div id="path{{i}}" class="main-screen-path-entry" value="{{i}}" on-click="navigateUp(this,i)" >{{containerName}}/</div>\
                          {{/each}}\
                          {{/if}}\
                       </p>\
                    </div>\
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
                                        <li id = {{i}} intro-outro="slideh" class="list-group-item list-group-border container-entry" on-click="selectContainer(this,i)">\
                                           <div  class="row">\
                                                <div class="col-xs-10">\
                                                    <h4 class="list-group-item-heading">{{containerName}}</h4>\
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
                            <div class="panel-body no-padding">\
                             <ul class="list-group" id="item-list">\
                                    {{#each items:i}}\
                                        <li id = item{{i}} intro-outro="slideh" class="list-group-item list-group-border item-entry" on-click="selectItem(this,i)">\
                                           <div  class="row">\
                                                <div class="col-xs-10">\
                                                    <h4 class="list-group-item-heading">{{itemID}}</h4>\
                                                    \
                                                        <div class="list-group-item-text attributes">\
                                                            <span class=" badge">{{amount}} pieces</span>\
                                                        </div>\
                                                    \
                                                </div>\
                                            </div>\
                                        </li>\
                                    {{/each}}\
                                </ul>\
                                \
                            </div>\
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

        oncomplete:function(){
            loadStore(this.getStoreFromDb);
        },

        selectContainer: function(event, index){
            $('#'+index).toggleClass('list-group-item-selected');

        },

        navigateUp: function(event, index){
            window.app.set('data.container',clickedContainerHistory[index]);
            var latestClickedcontainer = clickedContainerHistory[clickedContainerHistory.length-1][0];
            //toDO pretify it!!
            var parentId = latestClickedcontainer.containerID.substring(0,latestClickedcontainer.containerID.length-2);
            var parentContainer = getContainerById(currentTableState, parentId);
            window.app.set('items', getAllItems(parentContainer));
            var parrentContainer = getContainerById(currentTableState, parentId);
            while(clickedContainerHistory.length > index){
                window.app.pop('pathElements');
                clickedContainerHistory.pop();
            }


          /*  var allItems = getAllItems(container);
            window.app.set('items',allItems);*/
        },

        navigateDown: function(event, index){
            var parentContainers = window.app.get('data.container');
            var clickedContainer = window.app.get('data.container.'+index);
            var subContainer = clickedContainer.subContainers ;

            $('#'+index).toggleClass('list-group-item-selected');
            window.app.set('data.container', subContainer);
            

            window.app.push('pathElements', clickedContainer);
            clickedContainerHistory.push(parentContainers);

            var allItems = getAllItems(clickedContainer);
            window.app.set('items',allItems);

        },

       getStoreFromDb: function(error, result){
           if(result) {
               currentTableState = result;
               var subContainer = result.subContainers;
               window.app.set('data.container', subContainer);
               var allItems = getAllItems(result);
               window.app.set('items',allItems);
           }
           else{
               console.log('noData');
           }
       }







    })
;

