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
                            {{#if data.currentAttributes}}\
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                            {{/if}}\
                            {{#each data.currentAttributes:i}}\
                            <div class="row popup-entry" intro-outro="slideh">\
                                 <div class="col-md-5 attribute-entry">\
                                    <div class="input-group">\
                                        <span class="input-group-addon">\
                                            <input id="compulsory{{i}}" type="checkbox" value={{compulsory}} on-click="toggleCheckbox(this,i)">\
                                        </span>\
                                        <input id="attribute-name{{i}}" type="text" class="form-control" placeholder="Attribute Name" on-change="storeAttributeChanges(this,i)" value="{{attributeName}}">\
                                    </div>\
                                 </div>\
                                <div class="col-md-3 attribute-entry"><input id="attribute-value{{i}}" type="text" class="form-control" placeholder="Attribute Value" on-change="storeAttributeChanges(this,i)" value="{{value}}"></div>\
                                <div class="col-md-2 attribute-entry"><input id="attribute-unit{{i}}" type="text" class="form-control" placeholder="Unit" on-change="storeAttributeChanges(this,i)" value=""></div>\
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



    toggleCheckbox:function(event,index){
        var checkboxValue = $('#compulsory'+index).val();

        if(checkboxValue == 'false'){
            $('#compulsory'+index).val('true');
        }
        else{
            $('#compulsory'+index).val('false');
        }

    },

    storeAttributeChanges:function(event,index){
        var changedAttribute ={};
        var attrName = $('#attribute-name'+index).val();
        var attrValue = $('#attribute-value'+index).val();
        var attrUnit = $('#attribute-unit'+index).val();
        var compulsory = $('#compulsory'+index).val();

        if(compulsory == 'true'){
            compulsory = true;
        }
        else{
            compulsory = false;
        }

        if(attrName != "" || attrValue !="" || attrUnit !=""){
            changedAttribute.attributeName = attrName;
            changedAttribute.value = attrValue;
            changedAttribute.unit = attrUnit;
            changedAttribute.compulsory = compulsory;
        }

        window.currentRactive.set('data.currentAttributes.'+index,changedAttribute);
    },

    removeLine:function(event,index){
        window.currentRactive.splice('data.currentAttributes',index,1);
    },

    addLine:function(){
        var dummy = {
            attributeName:"",
            value:"",
            unit:'',
            compulsory:false
        };

        if (window.currentRactive.get('data.currentAttributes') == null) {
            window.currentRactive.set('data.currentAttributes[0]', dummy);
        }
        else {

            window.currentRactive.push('data.currentAttributes', dummy);
        }
    },

    cleanContainerValues:function(cleanAll){
        var currentAttributes = window.currentRactive.get('data.currentAttributes');
        if(currentAttributes) {
            if (cleanAll) {
                window.currentRactive.splice('data.currentAttributes', 0, currentAttributes.length);
                console.log(window.currentRactive.get('data.currentAttributes'));
            }
            else {
                for (i = 0; i < currentAttributes.length; ++i) {
                    if (currentAttributes[i].attributeName == "" || currentAttributes[i].value == "") {
                        window.currentRactive.splice('data.currentAttributes', i, 1);
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
            this.attachAttributesToContainer(subContainer,window.currentRactive.get('data.currentAttributes'));
            addSubContainer(window.parentContainer, subContainer);


        }

        window.currentRactive.set("data.container", window.parentContainer.subContainers );
        $('#add-container-modal').modal('hide');

        window.currentRactive.writeToDb();

        this.cleanContainerValues(true);
    }
});