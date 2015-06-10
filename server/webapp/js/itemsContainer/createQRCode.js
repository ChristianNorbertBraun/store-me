/**
 * Created by Waleska on 10.06.2015.
 */
function createQRCode()
{
    try
    {
        checkIfItemIsMarked();
        var code = new QRCode("qrcode", {
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        code.makeCode(markedItem);
    }
    catch(err)
    {
    }
}