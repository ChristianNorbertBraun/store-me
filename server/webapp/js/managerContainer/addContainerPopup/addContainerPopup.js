/**
 * Created by christian on 22.06.15.
 */




var addContainerPopup = Ractive.extend({
    template: '\
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
                            <div class="col-md-8"><input id="container-name" type="text" class="form-control" placeholder="Container Name" value={{newContainer.containerName}}></div>\
                        </div>\
                        \
                        <div id="attribute-container">\
                                {{#if newContainer.attributes.length >= 1}}\
                                <h3 id="attribute-heading" intro-outro="slideh">Attributes</h3>\
                                {{/if}}\
                            {{#each newContainer.attributes:i}}\
                            <div class="row popup-entry" intro-outro="slideh">\
                                 <div class="col-md-5 attribute-entry">\
                                    <div class="input-group">\
                                        <span class="input-group-addon">\
                                            <input id="compulsory{{i}}"  type="checkbox" checked={{compulsory}}>\
                                        </span>\
                                        <input id="attribute-name{{i}}" type="text" class="form-control" placeholder="Attribute Name" value={{attributeName}}>\
                                    </div>\
                                 </div>\
                                 \
                                <div class="col-md-3 attribute-entry"><input id="attribute-value{{i}}" type="text" class="form-control" placeholder="Attribute Value" value={{value}}  ></div>\
                                <div class="col-md-2 attribute-entry"><input id="attribute-unit{{i}}" type="text" class="form-control"  placeholder="Unit" value={{unit}}></div>\
                                <div class="col-md-2">\
                                    <button class="btn btn-primary btn-sm" on-click="removeAttribute(this,i)">\
                                        <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\
                                    </button>\
                                </div>\
                            </div>\
                            {{/each}}\
                            \
                        </div>\
                        <button class="btn btn-primary btn-sm criteria-add-button popup-entry" data-toggle="modal" on-click="addAttribute()">\
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                        </button>\
                        <div class="row popup-entry">\
                            <label class="col-md-4 modal-label">Amount of Containers</label>\
                            <div class="col-md-8"><input id="container-amount" min="1.0" type="number" class="form-control" placeholder="Container Amount"></div>\
                        </div>\
                    \
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" on-click="closeModal()">Close</button>\
                        <button type="button" class="btn btn-primary" on-click="createContainer()">Add</button>\
                    </div>\
                </div>\
            </div>\
        </div>\ ',



    closeModal:function(){
        this.prepareContainerForCreation(true);
        $('#add-container-modal').modal('hide');
        setTimeout(function(){
            $('.item-structure').remove();
        },200);
    },

    addAttribute:function(){
        var newContainer = this.get('newContainer');
        var containerAttribute = new ContainerAttribute("","","","",false);

        addContainerAttribute(newContainer,containerAttribute);
    },

    removeAttribute:function(event, index){
        this.splice('newContainer.attributes',index ,1);
    },

    removeIncompleteAttributes:function(cleanAll){
        var newContainerAttributes = this.get('newContainer.attributes');


        for (i = 0; i < newContainerAttributes.length; ++i) {
            if(cleanAll){
                newContainerAttributes.splice(i,1);
                --i;
            }

            if (!newContainerAttributes[i].attributeName || !newContainerAttributes[i].value) {
                newContainerAttributes.splice(i, 1);
                --i;
            }
        }
    },

    checkName:function(){
        var containerName = this.get('newContainer.containerName');
        var isReady = true;
        if(!containerName){
            isReady =false;
        }

        return isReady;
    },

    prepareContainerForCreation:function(){
        var isReady =true;
        this.removeIncompleteAttributes();

        isReady = this.checkName();


        return isReady;

    },

    createContainer:function(){

        if(this.prepareContainerForCreation()) {

            var containerAmount = $('#container-amount').val();
            if (containerAmount > 1) {
                addSubContainers(window.parentContainer, this.get('newContainer.containerName'), containerAmount);
            }
            else {
                addSubContainer(window.parentContainer, this.get('newContainer'));

            }
            window.currentRactive.writeToDb();
            this.closeModal;
        }
    }



});


