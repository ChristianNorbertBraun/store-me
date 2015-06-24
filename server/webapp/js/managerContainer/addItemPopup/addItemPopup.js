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
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            {{#each data.currentAttributes:i}}\
                            <div class="row popup-entry" intro-outro="slideh">\
                                 <div class="col-md-5 attribute-entry">\
                                    <div class="input-group">\
                                        <span class="input-group-addon">\
                                            <input id="compulsory{{i}}"  type="checkbox"  on-change="storeAttributeChanges(this,i)">\
                                        </span>\
                                        <input id="attribute-name{{i}}" type="text" class="form-control" placeholder="Attribute Name" on-change="storeAttributeChanges(this,i)" value="{{attributeName}}" >\
                                    </div>\
                                 </div>\
                                 \
                                <div class="col-md-3 attribute-entry"><input id="attribute-value{{i}}" type="text" class="form-control {{#if compulsory}} compulsory-value {{/if}}" {{#if compulsory}} placeholder={{value}} {{else}}placeholder="Attribute Value"{{/if}} on-change="storeAttributeChanges(this,i)" ></div>\
                                <div class="col-md-2 attribute-entry"><input id="attribute-unit{{i}}" type="text" class="form-control"  placeholder="Unit" on-change="storeAttributeChanges(this,i)" value="{{unit}}"></div>\
                                <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" data-toggle="modal"  on-click="removeLine(this,i)">\
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
        </div>\
    '
});