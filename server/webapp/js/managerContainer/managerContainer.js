/**
 * Created by captainluma on 02.06.15.
 */

//ToDo remove all hardcoded strings

var clickedContainerHistory = [];
var currentTableState;
var firstLoad = true;


var managerContainer = Ractive.extend(
    {
        template : '\
        <div class="manager-container">\
            <div class="container">\
                <div class="row">\
                    <div class="container">\
                        <p>\
                          {{#if pathElements.length == 0}}\
                            <div class="main-screen-path-entry" >/</div>\
                          {{elseif pathElements.length > 4}}\
                            <div class="main-screen-path-entry" >.../</div>\
                            {{#each pathElements:i}}\
                            {{#if i >= pathElements.length - 4}}\
                                <div id="path{{i}}" class="main-screen-path-entry" value="{{i}}" on-click="navigateUp(this,i)" >{{containerName}}/</div>\
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
                                                            <span class=" badge">{{attributeName}}: {{value}} {{unit}}</span>\
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
                        <button class="btn btn-primary manager-button" data-toggle="modal" data-target="#add-item-modal" on-click="fillParentId()">Add</button>\
                        <button type="button" class="btn btn-primary manager-button" on-click="deleteContainer()">Delete</button>\
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
                            <label class="col-md-4 modal-label">Parent ContainerID</label>\
                            <div class="col-md-8"><input id="parent-id" type="text" class="form-control" placeholder="Parent-Id" readonly></div>\
                        </div>\
                         <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">Name</label>\
                            <div class="col-md-8"><input id="container-name" type="text" class="form-control" placeholder="Container Name"></div>\
                        </div>\
                        \
                        <div id="attribute-container">\
                            {{#if data.currentAttributes}}\
                                <h3 id="attribute-heading">Attributes</h3>\
                            {{/if}}\
                            {{#each data.currentAttributes:i}}\
                            <div class="row popup-entry">\
                                <div class="col-md-4 attribute-entry"><input id="attribute-name{{i}}" type="text" class="form-control" placeholder="Attribute Name" on-change="storeAttributeChanges(this,i)" value="{{attributeName}}"></div>\
                                <div class="col-md-6 attribute-entry"><input id="attribute-value{{i}}" type="text" class="form-control" placeholder="Attribute Value" on-change="storeAttributeChanges(this,i)" value="{{value}}"></div>\
                                <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" data-toggle="modal" on-click="removeLine(this,i)">\
                                        <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\
                                    </button>\
                                </div>\
                            </div>\
                            {{/each}}\
                        </div>\
                        <button class="btn btn-primary btn-sm criteria-add-button popup-entry" data-toggle="modal" on-click="addLine()">\
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                        </button>\
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">Amount of Containers</label>\
                            <div class="col-md-8"><input id="container-amount" type="number" class="form-control" placeholder="Container Amount"></div>\
                        </div>\
                    \
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal" on-click="cleanContainerValues(true)">Close</button>\
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
            console.log(latestClickedcontainer);
            //toDO pretify it!!


            var substringLength = 0;
            while(clickedContainerHistory.length > index){
                substringLength +=2;
                window.app.pop('pathElements');
                clickedContainerHistory.pop();
            }

            var parentId = latestClickedcontainer.containerID.substring(0,latestClickedcontainer.containerID.length-substringLength);
            window.parentContainer = getContainerById(currentTableState, parentId);
            window.app.set('items', getAllItems(window.parentContainer));
            this.removeSelection();

        },

        navigateDown: function(event, index){

            var parentContainers = window.app.get('data.container');
            var clickedContainer = window.app.get('data.container.'+index);
            var subContainer = clickedContainer.subContainers ;

            window.parentContainer = clickedContainer;

            window.app.set('data.container', subContainer);


            window.app.push('pathElements', clickedContainer);
            clickedContainerHistory.push(parentContainers);

            var allItems = getAllItems(clickedContainer);
            window.app.set('items',allItems);

            this.removeSelection();
            $('#'+index).toggleClass('list-group-item-selected');

        },

       getStoreFromDb: function(error, result){
           if(result) {
               var subContainer;
               currentTableState = result;

               if(firstLoad) {
                   window.parentContainer = currentTableState;
                   subContainer = currentTableState.subContainers;
                   firstLoad = false;
               }
               else{
                   subContainer = window.parentContainer.subContainers;
               }

               window.app.set('data.container', subContainer);
               var allItems = getAllItems(window.parentContainer);
               window.app.set('items',allItems);
           }
           else{
               console.log('noData');
           }
       },

        //TODO need method to add attriubutes to multiple container
        saveContainer:function(){
            //TODO add validation
            var containerAmount = $("#container-amount").val();
            var containerName = $("#container-name").val();
            if(containerAmount > 0){
                addSubContainers(window.parentContainer,containerName, containerAmount);
            }
            else{
                var subContainer = new Container($("#container-name").val());
                addSubContainer(window.parentContainer, subContainer);
                this.cleanContainerValues();
                this.attachAttributesToContainer(subContainer,this.get('data.currentAttributes'));
                console.log(subContainer);
            }

            this.set("data.container", window.parentContainer.subContainers );
            $('#add-container-modal').modal('hide');
            this.cleanContainerValues(true);
            this.writeToDb();
        },

        deleteContainer:function(){
            var GUIallSelectedContainer = $(".list-group-item-selected").get();
            var allIds = [];
            var allSelectedContainer = [];

            for(i = 0; i < GUIallSelectedContainer.length;++i){
                allSelectedContainer.push(this.get("data.container."+$(GUIallSelectedContainer[i]).attr('id')));
            }
            for(i = 0; i < GUIallSelectedContainer.length; ++i){
                var subContainer = allSelectedContainer[i];

                removeSubContainer(window.parentContainer, subContainer.containerID);
            }
            this.set("data.container", window.parentContainer.subContainers);
            this.writeToDb();
            var allItems = getAllItems(window.parentContainer);
            window.app.set('items',allItems);

        },

        fillParentId:function(){
            $("#parent-id").val(window.parentContainer.containerID);
        },

        addLine:function(){
            var dummy = {
                attributeName:"",
                value:""
            };

            if (this.get('data.currentAttributes') == null) {
                this.set('data.currentAttributes[0]', dummy);
            }
            else {

                this.push('data.currentAttributes', dummy);
            }
        },

        removeLine:function(event,index){
            console.log(index);
            this.splice('data.currentAttributes',index,1);
        },

        storeAttributeChanges:function(event,index){
            var changedAttribute ={};
            var attrName = $('#attribute-name'+index).val();
            var attrValue = $('#attribute-value'+index).val();

            if(attrName != "" || attrValue !=""){
                changedAttribute.attributeName = attrName;
                changedAttribute.value = attrValue;
            }

            this.set('data.currentAttributes.'+index,changedAttribute);
        },

        writeToDb:function(){
            window.currentRactive = this;
            saveStore(function(boolean){
                loadStore(window.currentRactive.getStoreFromDb);
            }, currentTableState);
        },

        cleanContainerValues:function(cleanAll){
            var currentAttributes = this.get('data.currentAttributes')
            if(currentAttributes) {
                if (cleanAll) {
                    this.splice('data.currentAttributes', 0, currentAttributes.length);
                }
                else {
                    for (i = 0; i < currentAttributes.length; ++i) {
                        if (currentAttributes[i].attributeName == "" || currentAttributes[i].value == "") {
                            this.splice('data.currentAttributes', i, 1);
                        }
                    }
                }
            }

            $('#container-name').val('');
            $('#container-amount').val('');

        },

        attachAttributesToContainer:function(container, attributes){
            if(attributes){
                for(i = 0; i < attributes.length; ++i){
                    addContainerAttribute(container,attributes[i]);
                }
            }


        },

        removeSelection: function(){
            var GUIallSelectedContainer = $(".list-group-item-selected").get();

            for(i = 0; i < GUIallSelectedContainer.length; ++i){
                $(GUIallSelectedContainer[i]).toggleClass('list-group-item-selected');
            }
        }
    })
;

