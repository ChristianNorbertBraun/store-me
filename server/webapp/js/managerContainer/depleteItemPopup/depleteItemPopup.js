/**
 * Created by christian on 27.06.15.
 */

/**
 * Created by christian on 24.06.15.
 */

var depleteItemPopup = Ractive.extend({

    template:'\
      <div class="modal fade" id="deplete-item-modal" tabindex="-1" role="dialog" aria-labelledby="deplete-item" aria-hidden="true" >\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                        <h4 class="modal-title modal-title-color" id="deplete-item">Deplete Item</h4>\
                    </div>\
                       \
                    <div id="add-container-body-deplete" class="modal-body">\
                    \
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">ContainerID</label>\
                            <div class="col-md-6"><input id="container-id-deplete" type="text" class="form-control" placeholder="ContainerID" value="{{stockItemStructure.containerID}}"></div>\
                            <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" >\
                                        <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>\
                                    </button>\
                            </div>\
                        </div>\
                         <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">ItemID</label>\
                            <div class="col-md-6"><input id="item-id-deplete" type="text" class="form-control" placeholder="ItemID" on-change="loadItemDeplete()" value="{{stockItemStructure._id}}"></div>\
                            <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" >\
                                        <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>\
                                    </button>\
                            </div>\
                        </div>\
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">Item Name</label>\
                            <div class="col-md-6"><input id="item-name-deplete" type="text" class="form-control" placeholder="Item Name" value="{{stockItemStructure.name}}"></div>\
                        </div>\
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">Amount</label>\
                            <div class="col-md-6"><input id="item-amount-deplete" min="1.0" type="number" class="form-control" placeholder="Item Amount" value={{stockItemStructure.amount}}></div>\
                        </div>\
                        <div id="attribute-container">\
                            {{#if stockItemStructure.attributes}}\
                                <h3 id="attribute-heading-deplete" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            {{#each stockItemStructure.attributes:i}}\
                            <div class="row popup-entry" intro-outro="slideh">\
                                 <div class="col-md-5 attribute-entry"><input id="item-attribute-name-deplete{{i}}" type="text" class="form-control" placeholder="Attribute Name" value="{{attributeName}}" readonly ></div>\
                                <div class="col-md-5 attribute-entry"><input id="item-attribute-value-deplete{{i}}" type="text" class="form-control" value="{{value}}" readonly></div>\
                                <div class="col-md-2 attribute-entry"><input id="item-attribute-unit-deplete{{i}}" type="text" class="form-control"  placeholder="Unit" value="{{unit}}" readonly></div>\
                            </div>\
                            {{/each}}\
                        </div>\
                    \
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default"  >Close</button>\
                        <button type="button" class="btn btn-primary" on-click="depleteItem()">Deplete</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    oninit:function(){
        window.depleteItemRactive = this;
    },

    loadItemDeplete:function(){
        getDataItemFromCouch(this.get('stockItemStructure._id'),function(success,data){
            if(success){
                var stockItemStructure = window.currentRactive.get('stockItemStructure');
                stockItemStructure.name = data.name;
                stockItemStructure.attributes = data.attributes;

                window.currentRactive.set('stockItemStructure',stockItemStructure);
            }
        });
    },

    depleteItem:function(){
        var parentContainerName = window.parentContainer.containerName;
        var itemName = this.get('stockItemStructure.name');
        var username = getUserNameBySessionID(getSessionIDFromURL());
        var amount = this.get('stockItemStructure.amount');

        if(deplete(window.currentTableState,window.parentContainer.containerID,this.get('stockItemStructure._id'), amount)){
            saveLogContainer(new LogContainer(false, parentContainerName, itemName,amount, username), function(saved){});
            $('#deplete-item-modal').modal('hide');
            window.currentRactive.writeToDb();
        }
        else{
            alert('No Data');
        }



    }
});