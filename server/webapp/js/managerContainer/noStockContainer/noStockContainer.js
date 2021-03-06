/**
 * Created by christian on 22.06.15.
 */

var noStockContainer = Ractive.extend({

    template: ' \
    <div class="no-data-frame container">\
        <div class="panel panel-default center-block">\
            <div class="panel-body">\
                 <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>\
                 <h3 id="question" class="text-center no-stock-entry">You don\'t have a stock yet.<p> Create one?</p></h3>\
                 <input id="storage-name" placeholder="Stock-Name" class="no-stock-entry">\
                 <button type="button" class="btn btn-primary manager-button center-block" on-click="createStock()">Create Stock</button>\
            </div>\
        </div>\
    </div>\ ' ,

    createStock:function(){
        var stockName = $('#storage-name').val();
        stockName = stockName.trim();

        if(stockName == "Nicolas Cage"){
            var newLocation = "http://33.media.tumblr.com/5a4fa9b3ba14d727f0b1aa6df6c2ecf8/tumblr_mf5c3t2pvF1r4etbjo1_r1_500.gif";
            window.location = newLocation;
        }
        if(stockName){
            var stock = new Container(stockName);
            window.currentRactive.writeToDb(stock);
        }
        else{
            console.log($('.validation-message').get());
            if($('.validation-message').get().length < 1) {
                $('<h4 class="validation-message text-center">Please insert a name for your stock!</h4>').insertAfter('#question');
            }
        }

    }

});