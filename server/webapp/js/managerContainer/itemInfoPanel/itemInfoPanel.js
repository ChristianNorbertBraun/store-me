/**
 * Created by christian on 28.06.15.
 */

var itemInfoPanel = Ractive.extend({
    template:'\
    {{#if selectedItem}}\
    <div class="row popup-entry">\
        <label class="col-md-6 modal-label">ContainerID</label>\
        <div class="col-md-6"><input id="container-id-stock" type="text" class="form-control" placeholder="ContainerID" value="{{selectedItem.containerID}}" readonly></div>\
    </div>\
    <div class="row popup-entry">\
        <label class="col-md-6 modal-label">ItemID</label>\
        <div class="col-md-6"><input id="item-id-stock" type="text" class="form-control" placeholder="ItemID"  value="{{selectedItem._id}}" readonly></div>\
    </div>\
    <div class="row popup-entry">\
        <label class="col-md-6 modal-label">Item Name</label>\
        <div class="col-md-6"><input id="item-name-stock" type="text" class="form-control" placeholder="Item Name" value="{{selectedItem.name}}" readonly></div>\
    </div>\
    <div class="row popup-entry">\
        <label class="col-md-6 modal-label">Amount</label>\
        <div class="col-md-6"><input id="item-amount-stock" min="1.0" type="number" class="form-control" placeholder="Item Amount" value={{selectedItem.amount}} readonly></div>\
    </div>\
    <div id="attribute-container">\
    {{#if selectedItem.attributes}}\
        <h3 id="attribute-heading-info" >Attributes</h3>\
    {{/if}}\
    {{#each selectedItem.attributes:i}}\
    <div class="row popup-entry" >\
        <div class="col-md-5 attribute-entry"><input id="item-attribute-name-info{{i}}" type="text" class="form-control" placeholder="Attribute Name" value="{{attributeName}}" readonly ></div>\
        <div class="col-md-4 attribute-entry"><input id="item-attribute-value-info{{i}}" type="text" class="form-control" value="{{value}}" readonly></div>\
        <div class="col-md-3 attribute-entry"><input id="item-attribute-unit-info{{i}}" type="text" class="form-control"  placeholder="Unit" value="{{unit}}" readonly></div>\
    </div>\
    {{/each}}\
    {{/if}}\
    '
});