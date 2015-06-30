/**
 * Created by christian on 29.06.15.
 */

qrCodePopup = Ractive.extend({
    template:'\
     <div class="modal fade" id="qrcode-modal">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h4 class="modal-title">QR Code</h4>\
                    </div>\
                    <div class="modal-body">\
                        <div id="qrcode"></div>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" on-click="closeQRModal()">Close</button>\
                        <button type="button" class="btn btn-default" on-click="printQRCode()">Print</button>\
                    </div>\
                </div>\
            </div>\
     </div>\ ',

    closeQRModal: function() {
        $('#qrcode-modal').modal('hide');
        $('#qrcode').html('');
    },

    printQRCode: function() {
        var newWindow = window.open();
        newWindow.document.write(document.getElementById("qrcode").innerHTML);
        newWindow.print();

        this.closeQRModal();
    }

})