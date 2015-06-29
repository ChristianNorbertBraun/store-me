/**
 * Created by christian on 27.06.15.
 */

var itemPanel = Ractive.extend({
   template:' \
   <div id="item-list" class="panel panel-primary info-panel">\
        <div class="panel-heading">{{panels[1].title}}</div>\
        <div class="panel-body no-padding">\
            <ul class="list-group" id="item-list">\
            {{#each items:i}}\
                <li id = item{{i}} intro-outro="slideh" class="list-group-item list-group-border item-entry" on-click="selectItem(this,i)">\
                    <div  class="row">\
                        <div class="col-xs-10">\
                            <h4 class="list-group-item-heading">{{name}}</h4>\
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
   <button class="btn btn-primary manager-button" data-toggle="modal" data-target="#add-item-modal" on-click="prepareAddItemPopup()">Stock</button>\
   <button class="btn btn-primary manager-button" data-toggle="modal" data-target="#deplete-item-modal" on-click="prepareDepleteItemPopup()" >Deplete</button>\
   ',

    prepareAddItemPopup:function(){
        var stockItemStructure = {
            containerID: window.parentContainer.containerID
        };
        window.currentRactive.set('stockItemStructure',stockItemStructure);
    },


    prepareDepleteItemPopup:function(){
       window.currentRactive.set('stockItemStructure.amount',"");
    },

    selectItem:function(event, index){

        if( $(".list-group-item-selected").get().length >= 1){
            window.currentRactive.removeSelection();
        }

        $('#item'+index).toggleClass('list-group-item-selected');
        var item = this.get('items.'+index);
        //toDO fix container ID bug
        var containerID = window.parentContainer.containerID;
        window.currentRactive.set('stockItemStructure',item);
        window.currentRactive.set('stockItemStructure.containerID',containerID);

        if($(".list-group-item-selected").get().length == 0){
            window.currentRactive.set('selectedItem', {});
        }
        else{
            window.currentRactive.set('selectedItem', item);
        }



    }
});