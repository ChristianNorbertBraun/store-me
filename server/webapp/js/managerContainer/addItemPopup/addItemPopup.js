/**
 * Created by christian on 24.06.15.
 */

var addItemPopup = Ractive.extend({

    template:'\
      <div class="modal fade" id="add-item-modal" tabindex="-1" role="dialog" aria-labelledby="add-item" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                        <h4 class="modal-title modal-title-color" id="add-item">Stock Item</h4>\
                    </div>\
                       \
                    <div id="add-container-body" class="modal-body">\
                    \
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">ContainerID</label>\
                            <div class="col-md-6"><input id="container-id-stock" type="text" class="form-control" placeholder="ContainerID" value="{{stockItemStructure.containerID}}"></div>\
                            <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" onclick="scan2.performClick()" >\
                                        <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>\
                                    </button>\
                            </div>\
                        </div>\
                         <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">ItemID</label>\
                            <div class="col-md-6"><input id="item-id-stock" type="text" class="form-control" placeholder="ItemID" on-change="loadItem()" value="{{stockItemStructure._id}}"></div>\
                            <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" onclick="scan.performClick()">\
                                        <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>\
                                    </button>\
                            </div>\
                        </div>\
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">Item Name</label>\
                            <div class="col-md-6"><input id="item-name-stock" type="text" class="form-control" placeholder="Item Name" value="{{stockItemStructure.name}}"></div>\
                        </div>\
                        <div class="row popup-entry">\
                            <label id="amount-label-stock" class="col-md-4 modal-label">Amount</label>\
                            <div class="col-md-6"><input id="item-amount-stock" min="1.0" type="number" class="form-control" placeholder="Item Amount" value={{stockItemStructure.amount}}></div>\
                        </div>\
                        <div id="attribute-container">\
                            {{#if stockItemStructure.attributes}}\
                                <h3 id="attribute-heading-stock" class="item-structure" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            {{#each stockItemStructure.attributes:i}}\
                            <div class="row popup-entry" intro-outro="slideh">\
                                 <div class="col-md-5 attribute-entry item-structure"><input id="item-attribute-name-stock{{i}}" type="text" class="form-control" placeholder="Attribute Name" value="{{attributeName}}" readonly ></div>\
                                <div class="col-md-5 attribute-entry item-structure"><input id="item-attribute-value-stock{{i}}" type="text" class="form-control" value="{{value}}" readonly></div>\
                                <div class="col-md-2 attribute-entry item-structure"><input id="item-attribute-unit-stock{{i}}" type="text" class="form-control"  placeholder="Unit" value="{{unit}}" readonly></div>\
                            </div>\
                            {{/each}}\
                        </div>\
                    \
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" on-click="closeAddItemPopup()" >Close</button>\
                        <button type="button" class="btn btn-primary" on-click="stockItem()">Stock</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    oninit:function(){
        window.addItemRactive = this;
    },

    oncomplete:function(){
        window.ractiveLoaded = true;
        var event = new CustomEvent("ractiveLoaded");
        document.dispatchEvent(event);
        console.log("done");

        var modalValue = window.currentRactive.getQueryParamForModal("modal");
        if(modalValue == "stock"){
            $('#add-item-modal').modal('show');
        }
    },

    closeAddItemPopup:function(){
        $('#amount-label-stock').removeClass('red-text');
        $('#add-item-modal').modal('hide');
        //only for GUI purposes don't want the user to see the deletion
        setTimeout(function(){
            $('.item-structure').remove();
        },200);
    },

    loadItem:function(itemID){
        var inputItemID;

        if(itemID){
            inputItemID = itemID;
        }
        else{
            inputItemID = this.get('stockItemStructure._id');
        }
        getDataItemFromCouch(inputItemID,function(success,data){
            if(success){
                var stockItemStructure = window.currentRactive.get('stockItemStructure');
                stockItemStructure.name = data.name;
                stockItemStructure.attributes = data.attributes;

                window.currentRactive.set('stockItemStructure',stockItemStructure);
            }
        });
    },

    stockItem:function(){
        var itemName = this.get('stockItemStructure.name');
        var username = getUserNameBySessionID(getSessionIDFromURL());
        var amount = this.get('stockItemStructure.amount');
        var parentContainerID = this.get('stockItemStructure.containerID');
        var parentContainerName = getContainerById(window.currentTableState, parentContainerID).containerName;
        console.log(parentContainerName);

        var stocked = stock(window.currentTableState,parentContainerID,this.get('stockItemStructure._id'), amount);
        if(stocked){
            $('#amount-label-stock').removeClass('red-text');
            window.currentRactive.writeToDb();
            saveLogContainer(new LogContainer(true, parentContainerName, itemName,amount, username), function(saved){});
            this.closeAddItemPopup();
        }
        else{
            $('#amount-label-stock').addClass('red-text');
        }
    }
});


function getScanResult(val, id) {

    console.log('start get Scan Reult');
    window.inputID = val;
    if(id.indexOf("item") !=-1){

        window.itemInputValue = val;
        console.log("item");
    }
    else{
        window.containerInputValue = val;
        console.log("container");
    }

    if(!window.ractiveLoaded){
        document.addEventListener("ractiveLoaded",function(){
            if(window.itemInputValue){
                window.currentRactive.set('stockItemStructure._id', window.itemInputValue);
            }
            if(window.containerInputValue){
                window.currentRactive.set('stockItemStructure.containerID', window.containerInputValue);
            }
            window.addItemRactive.loadItem(window.itemInputValue);
        },false);
    }
    else{
        if(window.itemInputValue) {
            window.currentRactive.set('stockItemStructure._id', window.itemInputValue);
        }
        if(window.containerInputValue){
            window.currentRactive.set('stockItemStructure.containerID', window.containerInputValue);
        }
    }

}