

//ToDo remove all hardcoded strings

var clickedContainerHistory = [];



var managerContainer = Ractive.extend(
    {
        template : '\
        {{#if stockExists}}\
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
                                                            <span class=" {{#if compulsory}} badge-compulsory{{/if}} badge">{{attributeName}}: {{value}} {{unit}}</span>\
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
                        <button class="btn btn-primary manager-button" data-toggle="modal" data-target="#add-container-modal" on-click="prepareAddContainerPopup()">Add</button>\
                        <button type="button" class="btn btn-primary manager-button" on-click="deleteContainer()">Delete</button>\
                        \
                        \
                    </div>\
                    <div class="col-sm-4">\
                        <itemPanel></itemPanel>\
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
        <addContainerPopup></addContainerPopup>\
        <addItemPopup></addItemPopup>\
        <depleteItemPopup></depleteItemPopup>\
        {{else}}\
        <noStockContainer entry="{{data}}" ></noStockContainer>\
        {{/if}}\
        ',

        data:{
            stockItemStructure:{},
            newContainer:{},
            compulsoryAttributes:[]
        },

        components:{
            noStockContainer:noStockContainer,
            addContainerPopup:addContainerPopup,
            addItemPopup: addItemPopup,
            itemPanel: itemPanel,
            depleteItemPopup:depleteItemPopup
        },

        oninit: function(){
            this._super();
            window.currentRactive = this;
            loadStore(this.getStoreFromDb);
            window.firstLoad = true;
        },

        oncomplete:function(){

        },

        selectContainer: function(event, index){
            $('#'+index).toggleClass('list-group-item-selected');

        },

        navigateUp: function(event, index){
            window.app.set('data.container',clickedContainerHistory[index]);
            var latestClickedcontainer = clickedContainerHistory[clickedContainerHistory.length-1][0];


            var substringLength = 0;
            while(clickedContainerHistory.length > index){
                substringLength += 2;
                window.app.pop('pathElements');
                clickedContainerHistory.pop();
            }

            var parentId = latestClickedcontainer.containerID.substring(0,latestClickedcontainer.containerID.length-substringLength);
            window.parentContainer = getContainerById(window.currentTableState, parentId);
            this.mapContainerItemOnDataItem();
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

            this.mapContainerItemOnDataItem();
            this.removeSelection();
            $('#'+index).toggleClass('list-group-item-selected');

        },

        mapContainerItemOnDataItem:function(){
            var allContainerItems = getAllItems(window.parentContainer);
            window.currentRactive.set('items',[]);
            console.log(allContainerItems);
            for(i = 0; i < allContainerItems.length; ++i){
                window.currentContainerItem = allContainerItems[i];
                getDataItemFromCouch(allContainerItems[i].itemID,function(success,data){
                    data.amount = window.currentContainerItem.amount;

                    window.currentRactive.push('items',data);

                })
            }
        },

       getStoreFromDb: function(error, result){
           if(result) {
               window.app.set('stockExists',true);
               var subContainer;
               window.currentTableState = result;

               if(window.firstLoad) {
                   window.parentContainer = window.currentTableState;
                   subContainer = window.currentTableState.subContainers;
                   window.firstLoad = false;
               }
               else{
                   var currentParentId = window.parentContainer.containerID;
                   //have to rebin the parentcontainer to the currenttable stort to make sure that cbr works fine
                   window.parentContainer = getContainerById(window.currentTableState, currentParentId);
                   subContainer = window.parentContainer.subContainers;
               }

               window.app.set('data.container', subContainer);
               window.currentRactive.mapContainerItemOnDataItem();
           }
           else{

           }
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
            this.mapContainerItemOnDataItem();

        },


        prepareAddContainerPopup:function(){
            $("#parent-id").val(window.parentContainer.containerID);
            var newContainer = new Container("");
            var parentCompulsoryAttributes = getAllCompulsoryContainerAttributes(window.parentContainer);
            newContainer.attributes = parentCompulsoryAttributes;
            this.set('newContainer', newContainer);
            $('#container-amount').val(1);
        },

        writeToDb:function(stock){
           if(stock){
               saveStore(function(boolean){
                   loadStore(window.currentRactive.getStoreFromDb);
               }, stock);
           }
           else{
               saveStore(function(boolean){
                   loadStore(window.currentRactive.getStoreFromDb);
               }, window.currentTableState);
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

