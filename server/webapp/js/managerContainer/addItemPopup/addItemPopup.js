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
                        <h4 class="modal-title modal-title-color" id="add-container">Stock Item</h4>\
                    </div>\
                       \
                    <div id="add-container-body" class="modal-body">\
                    \
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">ContainerID</label>\
                            <div class="col-md-6"><input id="container-id" type="text" class="form-control" placeholder="ContainerID" value="{{stockItemStructure.containerID}}"></div>\
                            <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" >\
                                        <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>\
                                    </button>\
                            </div>\
                        </div>\
                         <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">ItemID</label>\
                            <div class="col-md-6"><input id="item-id" type="text" class="form-control" placeholder="ItemID" on-change="loadItem()" value="{{stockItemStructure.itemID}}"></div>\
                            <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" >\
                                        <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>\
                                    </button>\
                            </div>\
                        </div>\
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">Item Name</label>\
                            <div class="col-md-6"><input id="item-name" type="text" class="form-control" placeholder="Item Name" value="{{stockItemStructure.name}}"></div>\
                            <div class="col-md-2">\
                            </div>\
                        </div>\
                        <div id="attribute-container">\
                            {{#if stockItemStructure.attributes}}\
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            {{#each stockItemStructure.attributes:i}}\
                            <div class="row popup-entry" intro-outro="slideh">\
                                 <div class="col-md-5 attribute-entry"><input id="item-attribute-name{{i}}" type="text" class="form-control" placeholder="Attribute Name" value="{{attributeName}}" readonly ></div>\
                                <div class="col-md-5 attribute-entry"><input id="item-attribute-value{{i}}" type="text" class="form-control" value="{{value}}" readonly></div>\
                                <div class="col-md-2 attribute-entry"><input id="item-attribute-unit{{i}}" type="text" class="form-control"  placeholder="Unit" value="{{unit}}" readonly></div>\
                            </div>\
                            {{/each}}\
                        </div>\
                    \
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal" >Close</button>\
                        <button type="button" class="btn btn-primary" on-click="stockItem()">Stock</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    loadItem:function(){

        getDataItemFromCouch(this.get('stockItemStructure.itemID'),function(success,data){
            if(success){
                var stockItemStructure = window.currentRactive.get('stockItemStructure');
                stockItemStructure.name = data.name;
                stockItemStructure.attributes = data.attributes;

                window.currentRactive.set('stockItemStructure',stockItemStructure);
            }
        });
    },

    stockItem:function(){
        stock(window.currentTableState,window.parentContainer.containerID,this.get('stockItemStructure.itemID'),20);

        window.currentRactive.writeToDb();
        $('#add-item-modal').modal('hide');
    }
});