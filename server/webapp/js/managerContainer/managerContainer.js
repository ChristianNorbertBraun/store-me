/**
 * Created by captainluma on 02.06.15.
 */

//ToDo remove all hardcoded strings
//ToDO check if it is possible to load data even earlier then when the manager screen loads
var clickedContainerHistory = [];
var currentTableState;
var parentContainer;

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
                        <button class="btn btn-primary manager-button" data-toggle="modal" data-target="#add-container-modal" on-click="fillParentId()">Add</button>\
                        <button type="button" class="btn btn-primary manager-button" on-click="deleteContainer()">Delete</button>\
                        \
                        \
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
        \
        \
        \
        <div class="modal fade" id="add-container-modal" tabindex="-1" role="dialog" aria-labelledby="add-container" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                        <h4 class="modal-title modal-title-color" id="add-container">Add a new Container</h4>\
                    </div>\
                       \
                    <div id="add-container-body" class="modal-body">\
                    \
                        <div class="row popup-entry">\
                            <label class="col-md-4">Parent Container</label>\
                            <div class="col-md-8"><input id="parent-id" type="text" class="form-control" placeholder="Parent-Id" readonly></div>\
                        </div>\
                         <div class="row popup-entry">\
                            <label class="col-md-4">Name</label>\
                            <div class="col-md-8"><input id="container-name" type="text" class="form-control" placeholder="Container Name"></div>\
                        </div>\
                        \
                        <div id="attribute-container">\
                            \
                        </div>\
                        <button class="btn btn-primary btn-sm criteria-add-button popup-entry" data-toggle="modal" on-click="addLine()">\
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                        </button>\
                        <div class="row popup-entry">\
                            <label class="col-md-4">Amount of Containers</label>\
                            <div class="col-md-8"><input id="container-amount" type="number" class="form-control" placeholder="Container Amount"></div>\
                        </div>\
                    \
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                        <button type="button" class="btn btn-primary" on-click="saveContainer()">Add</button>\
                    </div>\
                </div>\
            </div>\
        </div> \
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
            parentContainer = getContainerById(currentTableState, parentId);
            window.app.set('items', getAllItems(parentContainer));

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

            parentContainer = clickedContainer;

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
               parentContainer = currentTableState;
               var subContainer = result.subContainers;
               window.app.set('data.container', subContainer);
               var allItems = getAllItems(result);
               console.log(allItems);
               window.app.set('items',allItems);
           }
           else{
               console.log('noData');
           }
       },

        saveContainer:function(){
            //TODO add validation
            var containerAmount = $("#container-amount").val();
            var containerName = $("#container-name").val();
            if(containerAmount > 0){
                addSubContainers(parentContainer,containerName, containerAmount);
            }
            else{
                var subContainer = new Container($("#container-name").val());
                addSubContainer(parentContainer, subContainer);
            }

            this.set("data.container", parentContainer.subContainers );
            $('#add-container-modal').modal('hide');
        },

        deleteContainer:function(){
            var allSelectedItems = $(".list-group-item-selected").get();
            var allIds = [];

            for(i = 0; i < allSelectedItems.length; ++i){
                var subContainer = this.get("data.container."+$(allSelectedItems[i]).attr('id'));

                removeSubContainer(parentContainer, subContainer.containerID);
                this.set("data.container", parentContainer.subContainers);
            }

        },

        fillParentId:function(){
            $("#parent-id").val(parentContainer.containerID);
        },

        addLine:function(){
            var attributeEntries = $(".attribute-entry").get();
            console.log(attributeEntries.length);
            if(attributeEntries.length == 0){
                $("#attribute-container").append('<h3 id="attribute-heading">Attributes</h3>');
            }
            $("#attribute-container").append(this.containerAttribute);
        },



        containerAttribute: '<div class="row popup-entry">\
                            <div class="col-md-4 attribute-entry"><input id="container-name" type="text" class="form-control" placeholder="Attribute Name"></div>\
                            <div class="col-md-6 attribute-entry"><input id="container-name" type="text" class="form-control" placeholder="Attribute Value"></div>\
                            <div class="col-md-2"><button class="btn btn-primary btn-sm" data-toggle="modal" on-click="removeLine()">\
                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\
                        </button></div>\
                        </div>\ '



    })
;

