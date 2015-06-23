/**
 * Created by christian on 22.06.15.
 */




var addContainerPopup = Ractive.extend({
    template:'\
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
                            {{#if currentAttributes}}\
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            {{#each currentAttributes:i}}\
                            <div class="row popup-entry" intro-outro="slideh">\
                                <div class="col-md-4 attribute-entry"><input id="attribute-name{{i}}" type="text" class="form-control" placeholder="Attribute Name" on-change="storeAttributeChanges(this,i)" value="{{attributeName}}"></div>\
                                <div class="col-md-4 attribute-entry"><input id="attribute-value{{i}}" type="text" class="form-control" placeholder="Attribute Value" on-change="storeAttributeChanges(this,i)" value="{{value}}"></div>\
                                <div class="col-md-2 attribute-entry"><input id="attribute-value{{i}}" type="text" class="form-control" placeholder="Unit" on-change="storeAttributeChanges(this,i)" value="{{unit}}"></div>\
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
        </div>\ ',



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

    removeLine:function(event,index){
        console.log(index);
        this.splice('data.currentAttributes',index,1);
    },

    addLine:function(){
        var dummy = {
            attributeName:"",
            value:""
        };

        if (this.get('currentAttributes') == null) {
            this.set('currentAttributes[0]', dummy);
        }
        else {

            this.push('currentAttributes', dummy);
        }
    },

    cleanContainerValues:function(cleanAll){
        var currentAttributes = this.get('currentAttributes')
        if(currentAttributes) {
            if (cleanAll) {
                this.splice('currentAttributes', 0, currentAttributes.length);
            }
            else {
                for (i = 0; i < currentAttributes.length; ++i) {
                    if (currentAttributes[i].attributeName == "" || currentAttributes[i].value == "") {
                        this.splice('currentAttributes', i, 1);
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


    saveContainer:function(){
        //TODO add validation
        var containerAmount = $("#container-amount").val();
        var containerName = $("#container-name").val();
        if(containerAmount > 0){
            addSubContainers(window.parentContainer,containerName, containerAmount);
        }
        else{
            var subContainer = new Container($("#container-name").val());

            this.cleanContainerValues();
            this.attachAttributesToContainer(subContainer,this.get('currentAttributes'));
            addSubContainer(window.parentContainer, subContainer);


        }

        window.currentRactive.set("data.container", window.parentContainer.subContainers );
        $('#add-container-modal').modal('hide');
        setTimeout(function(){
            window.currentRactive.writeToDb();
            console.log('wrote container to DB');
        },200);


        this.cleanContainerValues(true);
    }
});